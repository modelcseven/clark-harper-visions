import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./style.css";
import "./glass.css";

gsap.registerPlugin(ScrollTrigger);

const bgVideo = document.querySelector("#bgv");
const isTouch = window.matchMedia("(hover: none), (max-width: 768px)").matches;

/* ---------- Lenis smooth scroll ---------- */

const lenis = new Lenis({
  duration: 1.3,
  easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 1.5,
  syncTouch: false,
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

/* ---------- scroll-scrubbed background video ---------- */

let lastVideoT = -1;
let videoSeeking = false;
let pendingT = null;

function setupVideoScrub() {
  if (!bgVideo) return;

  // Never let more than one seek be in flight — if new scroll updates
  // arrive while a seek is still resolving, just remember the latest
  // requested time and jump straight there once the current one lands.
  // Firing a fresh `currentTime` assignment every scroll tick (up to 60x/s)
  // queues up seeks faster than the decoder can resolve them, which is
  // the main source of scroll-scrub stutter.
  bgVideo.addEventListener("seeked", () => {
    videoSeeking = false;
    if (pendingT !== null) {
      const t = pendingT;
      pendingT = null;
      seekTo(t);
    }
  });

  function seekTo(t) {
    if (videoSeeking) {
      pendingT = t;
      return;
    }
    videoSeeking = true;
    bgVideo.currentTime = t;
  }

  const onReady = () => {
    ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        if (!bgVideo.duration) return;
        const t = self.progress * (bgVideo.duration - 0.05);
        if (Math.abs(t - lastVideoT) > 0.008) {
          lastVideoT = t;
          seekTo(t);
        }
      },
    });
  };

  if (bgVideo.readyState >= 1) {
    onReady();
  } else {
    bgVideo.addEventListener("loadedmetadata", onReady, { once: true });
  }
}

/* ---------- impact: pinned word-by-word reveal ---------- */

function setupImpact() {
  const section = document.querySelector("#impact");
  if (!section) return;
  const pin = section.querySelector(".impact__pin");
  const words = [...section.querySelectorAll(".word")];

  function render(p) {
    words.forEach((word, i) => {
      const start = (i / words.length) * 0.72;
      const o = gsap.utils.clamp(0, 1, (p - start) / 0.12);
      word.style.opacity = 0.12 + o * 0.88;
      word.style.filter = `blur(${(1 - o) * 8}px)`;
      word.style.transform = `translateY(${(1 - o) * 18}px)`;
    });
  }

  render(0);

  ScrollTrigger.create({
    trigger: section,
    start: "top top",
    end: () => "+=" + innerHeight * 1.7,
    pin,
    scrub: 1,
    invalidateOnRefresh: true,
    onUpdate: (self) => render(self.progress),
  });
}

/* ---------- workflow: one-card-at-a-time gallery ---------- */

let galleryST = null;

function setupCreatorGallery() {
  const track = document.querySelector("#workflow-track");
  if (!track) return;
  const slides = [...track.querySelectorAll(".workflow-card")];
  const N = slides.length;

  function render(p) {
    const pos = p * (N - 1);

    slides.forEach((el, i) => {
      const d = pos - i;
      const ad = Math.abs(d);

      el.style.opacity = Math.max(0, 1 - ad / 0.6);
      el.style.transform = `translateY(-50%) translateX(${-d * 130}px) scale(${1 - Math.min(ad, 1) * 0.06})`;
      el.style.filter = `blur(${Math.min(ad * 10, 14)}px)`;
      el.style.zIndex = String(100 - Math.round(ad * 10));
      el.style.pointerEvents = el.style.opacity > 0.6 ? "auto" : "none";
    });
  }

  render(0);

  galleryST = ScrollTrigger.create({
    trigger: "#workflow",
    start: "top top",
    end: () => "+=" + Math.max(1, N - 1) * innerHeight * 0.72,
    pin: ".workflow__pin",
    scrub: 1,
    invalidateOnRefresh: true,
    onUpdate: (self) => render(self.progress),
  });
}

/* ---------- hero entrance (GSAP timeline, page load) ---------- */

function setupHeroEntrance() {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  tl.fromTo(".nav", { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.7 })
    .fromTo(".hero .eyebrow", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.35")
    .fromTo(".hero__title", { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.9 }, "-=0.35")
    .fromTo(".hero__sub", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.55")
    .fromTo(
      ".hero__cta a",
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.55, stagger: 0.12 },
      "-=0.4"
    )
    .fromTo(".scroll-cue", { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.25");
}

/* ---------- standalone section reveals ---------- */

function setupReveals() {
  const targets = document.querySelectorAll(".showcase__inner, .buy__panel");

  targets.forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
      }
    );
  });

  gsap.fromTo(
    ".footer",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power2.out",
      scrollTrigger: { trigger: ".footer", start: "top 92%" },
    }
  );
}

/* ---------- staggered grid reveals (features, work, about, process) ---------- */

function setupGridStagger(containerSelector, itemSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  const items = container.querySelectorAll(itemSelector);
  if (!items.length) return;

  gsap.fromTo(
    items,
    { opacity: 0, y: 34 },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "power2.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: container,
        start: "top 82%",
      },
    }
  );
}

/* ---------- subtle parallax on section headings ---------- */

function setupParallax() {
  gsap.utils.toArray(".section-head").forEach((el) => {
    gsap.to(el, {
      yPercent: -8,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });
}

/* ---------- hero eyebrow typewriter ---------- */

function setupTypewriter() {
  const el = document.querySelector("[data-typewriter]");
  if (!el) return;
  const text = el.textContent;
  el.textContent = "";
  el.classList.add("typewriter");

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) {
    el.textContent = text;
    el.classList.add("done");
    return;
  }

  let i = 0;
  function type() {
    el.textContent = text.slice(0, i);
    i++;
    if (i <= text.length) {
      setTimeout(type, 38);
    } else {
      el.classList.add("done");
    }
  }
  type();
}

/* ---------- cursor glow + particle trail ---------- */

function setupCursorFX() {
  if (isTouch) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const glow = document.createElement("div");
  glow.className = "cursor-glow";
  document.body.appendChild(glow);

  let mx = innerWidth / 2;
  let my = innerHeight / 2;
  let gx = mx;
  let gy = my;
  let lastSpawn = 0;

  window.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    spawnParticle(mx, my);
  });

  function raf() {
    gx += (mx - gx) * 0.12;
    gy += (my - gy) * 0.12;
    glow.style.transform = `translate(${gx}px, ${gy}px) translate(-50%, -50%)`;
    requestAnimationFrame(raf);
  }
  raf();

  function spawnParticle(x, y) {
    const now = performance.now();
    if (now - lastSpawn < 45) return;
    lastSpawn = now;

    const p = document.createElement("div");
    p.className = "cursor-particle";
    const size = 3 + Math.random() * 4;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.left = `${x + (Math.random() - 0.5) * 12}px`;
    p.style.top = `${y + (Math.random() - 0.5) * 12}px`;
    document.body.appendChild(p);

    const dx = (Math.random() - 0.5) * 40;
    const dy = -20 - Math.random() * 30;

    const anim = p.animate(
      [
        { transform: "translate(-50%, -50%) scale(1)", opacity: 0.9 },
        { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(0.2)`, opacity: 0 },
      ],
      { duration: 900 + Math.random() * 400, easing: "ease-out" }
    );
    anim.onfinish = () => p.remove();
  }
}

/* ---------- init ---------- */

setupVideoScrub();
setupHeroEntrance();
setupImpact();
setupTypewriter();
setupCursorFX();
if (!isTouch) {
  setupCreatorGallery();
} else {
  // mobile: cards stack normally via CSS, no pin/gallery motion
  document
    .querySelectorAll("#workflow-track .workflow-card")
    .forEach((el) => {
      el.style.opacity = "1";
      el.style.filter = "none";
    });
}
setupReveals();
setupGridStagger(".features__grid--six", "article");
setupGridStagger(".work__grid", "article");
setupGridStagger(".about__grid", "article");
setupGridStagger(".specs__table", ".spec-row");
setupParallax();

ScrollTrigger.refresh();

if (import.meta.env.DEV) {
  window.__lenis = lenis;
  window.__ST = ScrollTrigger;
  window.__bgv = bgVideo;
}
