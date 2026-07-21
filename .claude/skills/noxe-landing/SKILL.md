---
name: noxe-landing
description: >-
  Conventions and ready-made recipes for the NOXÉ Audio scroll-driven product
  landing site. USE THIS SKILL whenever working on the NOXÉ One headphones
  landing page — any request touching its sections, scroll-scrubbed background
  video, Higgsfield MCP-generated assets, GSAP ScrollTrigger pins, Lenis smooth
  scroll, glass panels/cards, brand typography/colors, reference images,
  all-keyframe video encoding, or "swap the background video / add a section /
  change the scroll animation" should follow these rules. This skill adapts the
  original AURA motion website workflow to a premium noise-cancelling headphones
  product designed for creators, editors, developers, and deep-focus work.
---

# NOXÉ Audio landing site

A single-page, scroll-driven motion landing page for **NOXÉ Audio**, a fictional
premium noise-cancelling headphones brand.

Flagship product: **NOXÉ One**  
Slogan: **"Silence, engineered."**

The site should feel dark, cinematic, minimal, premium, creator-focused, and
designed around deep work. The full-screen background video is generated with
Higgsfield MCP, encoded for smooth scroll scrubbing, and used as the core motion
layer behind the website content.

The goal is not to build a normal static product page. The goal is to build a
motion-driven product experience where the visitor scrolls through the story of
the headphones: silence, material detail, sound quality, comfort, creator use
cases, specs, and pre-order.

---

## Project facts

- **Project type:** Scroll-driven product landing page
- **Brand:** NOXÉ Audio
- **Product:** NOXÉ One — premium over-ear noise-cancelling headphones
- **Slogan:** "Silence, engineered."
- **Audience:** creators, video editors, developers, remote workers, students,
  and productivity-focused users
- **Website goal:** Introduce NOXÉ One, create premium product desire, explain
  the key benefits, and drive users to pre-order

### Suggested project root

Use the current working directory opened in Claude Code. A typical structure:

```txt
/
├─ assets/
│  ├─ images/
│  ├─ videos/
│  └─ references/
├─ copy/
│  └─ brand-kit.md
└─ website/
   ├─ index.html
   ├─ package.json
   ├─ src/
   │  ├─ main.js
   │  ├─ style.css
   │  └─ glass.css
   └─ public/
      ├─ bg.mp4
      └─ img/
```

### Stack

- Vite
- Vanilla JavaScript ES modules, unless the user explicitly requests React
- GSAP + `gsap/ScrollTrigger`
- Lenis for smooth scroll
- Optional lightweight cursor / glow layer
- CSS variables for brand tokens
- Higgsfield MCP for media generation
- `ffmpeg` for all-keyframe video encoding

### Files that matter

- `website/index.html` — all page section markup and Google Fonts link
- `website/src/main.js` — Lenis, ScrollTrigger, video scrub, section render logic
- `website/src/style.css` — base layout, typography, sections, video layer
- `website/src/glass.css` — glass panels, buttons, chips, cards
- `website/public/bg.mp4` — scroll-scrubbed all-keyframe background video
- `assets/references/noxe-hero-reference.png` — main hero/product reference
- `assets/references/noxe-material-reference.png` — material/detail reference
- `assets/references/noxe-workspace-reference.png` — creator workspace reference
- `assets/videos/noxe-scroll-background.mp4` — raw Higgsfield-generated video
- `copy/brand-kit.md` — product positioning, visual mood, site sections, video brief

### Run and build

```bash
cd website
npm install
npm run dev
```

Portable static build:

```bash
npm run build -- --base=./
```

Preview the build over HTTP, not `file://`:

```bash
npx serve dist
```

---

## Brand tokens

Use the NOXÉ Audio brand kit as the source of truth. If the brand kit exists,
read `copy/brand-kit.md` before editing the site.

### Core identity

- **Name:** NOXÉ Audio
- **Product:** NOXÉ One
- **Slogan:** "Silence, engineered."
- **Positioning:** Premium noise-cancelling headphones engineered for focused
  creative work, not just casual listening.
- **Tone:** confident, quiet, precise, premium, not hype-driven.

### Color palette

Recommended CSS variables:

```css
:root {
  --bg: #0B0B0F;          /* Obsidian */
  --surface: #16171D;     /* Graphite */
  --surface-2: #23252E;   /* Slate */
  --text: #F4F5F7;        /* Mist White */
  --muted: #9AA0AB;       /* Ash Gray */
  --accent: #FF8A3D;      /* Signal Amber */
  --accent-2: #3DE0E0;    /* Focus Cyan */
  --line: #2C2E37;        /* Carbon Line */
}
```

Rules:

- Signal Amber is the primary accent. Use it sparingly for CTAs, active states,
  sound-wave particles, counters, and key highlights.
- Focus Cyan is optional and should only be used as a small secondary technical
  accent.
- The site should stay mostly dark and neutral.
- Avoid neon rainbow color palettes, busy gradients, and generic SaaS colors.

### Typography

Use Google Fonts:

- **Headings:** `Space Grotesk`
- **Body:** `Inter`
- **Labels/specs:** `JetBrains Mono` or `Space Mono`

Recommended CSS variables:

```css
:root {
  --font: "Inter", system-ui, sans-serif;
  --font-head: "Space Grotesk", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", monospace;
}
```

Apply `--font-head` to display elements such as:

```css
.nav__logo,
.hero__title,
.impact__head,
.section-head h2,
.showcase__line,
.feature__title,
.spec__value,
.buy__title,
.buy__amount,
.footer__big,
.preloader__word {
  font-family: var(--font-head);
}
```

Use mono typography for small labels, counters, specs, and technical chips.

---

## Visual direction

NOXÉ should feel like a premium product commercial for deep work.

### Mood

- dark
- cinematic
- minimal
- premium
- tactile
- focused
- creator-driven
- quiet luxury

### Lighting

- low-key cinematic lighting
- warm Signal Amber rim light
- soft monitor glow
- deep falloff into black
- controlled highlights
- rich shadows

### Materials

- vegan leather grain
- brushed/anodized aluminum reflections
- matte black surfaces
- soft-touch earcups
- subtle amber accent ring
- dust particles in light
- refined desk materials

### Motion

- slow macro camera movement
- smooth push-in
- subtle orbital drift
- shallow depth of field
- gentle parallax
- sound-wave particles used minimally
- no fast cuts
- no shaky movement
- no distracting background motion

---

## Reference assets

The three reference images define the visual foundation for the video and site.

### `noxe-hero-reference.png`

Use as the main product design and hero composition reference.

Purpose:

- Defines the main headphones silhouette
- Defines the hero product placement
- Establishes dark negative space for headline and CTA
- Useful for hero section composition and first video phase

### `noxe-material-reference.png`

Use as the material/detail reference.

Purpose:

- Defines vegan leather texture
- Defines brushed metal and matte black surfaces
- Defines amber accent treatment
- Useful for material/design sections and second video phase

### `noxe-workspace-reference.png`

Use as the creator workspace/environment reference.

Purpose:

- Defines the desk setup mood
- Adds laptop, keyboard, notebook, monitor glow context
- Connects the product to creators, developers, and deep work
- Useful for creator workflow sections and third video phase

---

## Background video requirements

The main background video must be designed for a **scroll-driven website**, not
just as a standalone cinematic clip.

### Raw generated file

```txt
assets/videos/noxe-scroll-background.mp4
```

### Final scrubbed file

```txt
website/public/bg.mp4
```

### Creative direction

The background video should feel like one continuous premium product film with
three slow phases:

1. **Hero composition**  
   Headphones resting on a dark creator studio desk. Keep the right side or
   center-right calmer and darker for hero text and buttons.

2. **Material detail**  
   Slow move closer into the earcup, headband, leather texture, brushed metal,
   matte surfaces, and amber accent.

3. **Workspace mood**  
   Reveal more creator environment: monitor glow, laptop or keyboard edge,
   notebook, dark desk surface, focused late-night studio atmosphere.

### Constraints

- 16:9
- 12–16 seconds
- dark, premium, minimal, cinematic
- slow and smooth movement
- suitable for scroll scrubbing
- enough dark negative space for text overlays
- no people
- no readable text baked into the video
- no real brand logos
- no third-party marks
- no busy background
- no fast cuts
- no overdone particles
- no shaky camera
- no flickering UI elements
- product design should stay consistent with the reference images

---

## Suggested section order

Use a clean product story. Keep the scroll experience focused.

1. `#home` — Hero  
   Full-screen video background, NOXÉ wordmark, slogan, product value
   proposition, CTA.

2. `#impact` — Silence statement  
   Large pinned text reveal explaining the core emotional promise:
   "When the noise ends, the work begins."

3. `#showcase` — Product detail / macro moment  
   Short section focused on design, material, and sound.

4. `#features` — Key feature cards  
   Adaptive Silence, Reference-Grade Sound, All-Day Comfort, 40-Hour Battery,
   Studio/Aware Modes, Premium Build.

5. `#workflow` — Made for creators  
   One-card-at-a-time gallery or pinned cards for editors, developers, remote
   workers, students.

6. `#specs` — Technical credibility  
   Clean specs table: drivers, ANC, weight, battery, fast charge, wired modes.

7. `#buy` — Pre-order section  
   Price, box contents, CTA: "Pre-order NOXÉ One."

8. `footer` — Footer dissolve to black  
   Minimal links, brand signature, secondary CTA.

---

## Layer architecture

Background is fixed. Content scrolls over it.

Keep this stack intact:

| Element | z-index | Role |
|---|---:|---|
| `.bg-video` / `#bgv` | 0 | Fixed full-screen video, object-fit cover, scrubbed by scroll |
| `.bg-tint` | 1 | Radial darkening and contrast layer for text readability |
| `.motion-glow` / optional cursor layer | 2 | Subtle amber/cyan motion accents, never dominant |
| `#page` | 10 | All page sections |
| `.custom-cursor` | 100 | Optional cursor ring or hover detail |

The footer should live outside the padded sections as a full-bleed black band.
Use a gradient dissolve above the footer rather than a fixed black overlay.

---

## Interaction rules

### Scroll-scrubbed video

The video should be controlled by scroll position, not autoplay timing. Map
scroll progress to `bgVideo.currentTime`.

Keep redundant seeks low:

```js
const t = progress * (bgVideo.duration - 0.05);

if (Math.abs(t - lastVideoT) > 0.008) {
  bgVideo.currentTime = t;
  lastVideoT = t;
}
```

### ScrollTrigger pins

Use pinned sections sparingly. Each pin changes the scroll timing.

Good candidates:

- impact statement
- feature/card gallery
- specs or final CTA

### Text readability

The video is beautiful, but the website must remain readable.

Use:

- radial dark overlay
- background blur behind glass cards
- text shadows used subtly
- calmer zones on the right/center-right for hero copy
- glass panels with enough opacity over bright frames

---

## Recipes

### 1. Generate reference images with Higgsfield MCP

Use GPT Image 2 to create three 16:9 visual references:

```txt
assets/references/noxe-hero-reference.png
assets/references/noxe-material-reference.png
assets/references/noxe-workspace-reference.png
```

Use the brand kit as the source of truth. The references should define product
design, materials, lighting, and workspace mood before video generation.

### 2. Generate the scroll background video

Use the three reference images and the brand kit to generate:

```txt
assets/videos/noxe-scroll-background.mp4
```

The prompt must explicitly say that the video will be used in a scroll-driven
motion website and must be slow, stable, text-friendly, cinematic, and suitable
for frame-by-frame scrubbing.

### 3. Re-encode the background video for scroll scrubbing

Raw AI-generated MP4 files often seek poorly during scroll scrubbing. Re-encode
to all-keyframe H.264.

Create a helper script:

```bash
mkdir -p scripts
cat > scripts/swap-bg-video.sh <<'EOF'
#!/usr/bin/env bash
set -euo pipefail

INPUT="$1"
OUTPUT="website/public/bg.mp4"

mkdir -p website/public

ffmpeg -y -i "$INPUT" -an -c:v libx264 -preset slow -crf 18   -g 1 -keyint_min 1 -sc_threshold 0 -pix_fmt yuv420p   -movflags +faststart "$OUTPUT"

echo "Encoded all-keyframe background video to $OUTPUT"
EOF

chmod +x scripts/swap-bg-video.sh
```

Run:

```bash
scripts/swap-bg-video.sh "assets/videos/noxe-scroll-background.mp4"
```

After swapping, confirm in the browser console:

```js
window.__bgv.readyState === 4
window.__bgv.duration
```

### 4. Add a pinned, scroll-scrubbed section

Use this pattern for pinned content reveals:

```js
function setupImpact() {
  const section = document.querySelector("#impact");
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
    onUpdate: self => render(self.progress),
  });
}
```

### 5. Create a creator-use gallery

Use a one-card-at-a-time gallery for creator use cases:

- Editors
- Developers
- Remote workers
- Students

Park cards on the left or right depending on where the video is calmest. Keep
one card active at a time.

```js
function setupCreatorGallery() {
  const track = document.querySelector("#workflow-track");
  const slides = [...track.querySelectorAll(".workflow-card")];
  const N = slides.length;

  function render(p) {
    const pos = p * (N - 1);

    slides.forEach((el, i) => {
      const d = pos - i;
      const ad = Math.abs(d);

      el.style.opacity = Math.max(0, 1 - ad / 0.6);
      el.style.transform = `translate(${-d * 130}px, -50%) scale(${1 - Math.min(ad, 1) * 0.06})`;
      el.style.filter = `blur(${Math.min(ad * 10, 14)}px)`;
      el.style.zIndex = String(100 - Math.round(ad * 10));
      el.style.pointerEvents = el.style.opacity > 0.6 ? "auto" : "none";
    });
  }

  render(0);

  ScrollTrigger.create({
    trigger: "#workflow",
    start: "top top",
    end: () => "+=" + Math.max(1, N - 1) * innerHeight * 0.72,
    pin: ".workflow__pin",
    scrub: 1,
    invalidateOnRefresh: true,
    onUpdate: self => render(self.progress),
  });
}
```

CSS note:

```css
.workflow .workflow-card {
  position: absolute;
  top: 50%;
  left: clamp(1.5rem, 6vw, 7rem);
  width: min(420px, 44vw);
}
```

If cards also use `.glass`, make the selector more specific than `.glass`
because `glass.css` may load after `style.css`.

### 6. Glass panels and buttons

Use glass UI sparingly. It should feel premium, not cluttered.

```css
.glass {
  position: relative;
  overflow: hidden;
  background: rgba(18, 19, 25, 0.46);
  border: 1px solid color-mix(in srgb, var(--line) 75%, transparent);
  backdrop-filter: blur(22px) saturate(1.18);
  -webkit-backdrop-filter: blur(22px) saturate(1.18);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.32);
}

.glass::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.08),
    transparent 38%,
    rgba(255, 138, 61, 0.05)
  );
  pointer-events: none;
}

.glass > * {
  position: relative;
  z-index: 2;
}
```

Buttons:

```css
.glass-btn--primary {
  background: linear-gradient(
    135deg,
    var(--accent),
    color-mix(in srgb, var(--accent) 70%, #ffffff 20%)
  );
  color: #100905;
}
```

### 7. Footer dissolve-to-black

```css
.footer {
  position: relative;
  margin-top: 30vh;
  padding: 16vh clamp(1.25rem, 5vw, 6rem) 8vh;
  background: var(--bg);
}

.footer::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 100%;
  height: 45vh;
  background: linear-gradient(to bottom, transparent, var(--bg));
  pointer-events: none;
}
```

### 8. Freeze or slow the video during a pin

If a pinned section needs more time while the video slows down, use effective
scroll mapping:

```js
const k = 0.18; // 1 = normal, 0 = freeze, 0.18 = much slower

let eff = scrollY;
let removed = 0;

if (galleryST) {
  const gs = galleryST.start;
  const ge = galleryST.end;
  const gl = ge - gs;

  removed = gl * (1 - k);

  if (scrollY >= ge) {
    eff = scrollY - removed;
  } else if (scrollY > gs) {
    eff = gs + (scrollY - gs) * k;
  }
}

const p = eff / Math.max(1, lenis.limit - removed);
const t = p * (bgVideo.duration - 0.05);

if (Math.abs(t - lastVideoT) > 0.008) {
  bgVideo.currentTime = t;
  lastVideoT = t;
}
```

---

## Mobile behavior

Scroll-scrubbed video can be heavy on mobile. Provide a fallback.

Recommended:

- keep the video on larger screens
- use a poster image on touch devices
- reduce or remove pinned sections on small screens
- convert card galleries into vertical stacked cards
- disable custom cursor on touch devices

CSS example:

```css
@media (hover: none), (max-width: 768px) {
  .bg-video {
    display: none;
  }

  .mobile-poster {
    display: block;
    position: fixed;
    inset: 0;
    background-image: url("/img/mobile-poster.jpg");
    background-size: cover;
    background-position: center;
    z-index: 0;
  }
}
```

---

## Claude Preview verification

Claude Preview can throttle animation when backgrounded. If screenshots look
wrong, verify with dev hooks and browser console before assuming the code is
broken.

Expose dev hooks in development:

```js
if (import.meta.env.DEV) {
  window.__lenis = lenis;
  window.__ST = ScrollTrigger;
  window.__bgv = bgVideo;
}
```

Use:

```js
window.__bgv.readyState
window.__bgv.duration
window.__ST.refresh()
```

For pinned states, native scroll jumps are often more reliable than Lenis jumps:

```js
window.scrollTo(0, document.querySelector("#impact").offsetTop + innerHeight * 0.8);
window.__ST.update();
```

Always run:

```bash
npm run build
```

after major edits.

---

## Gotchas

1. **Raw AI video may scrub poorly.**  
   Always re-encode the final background video to all-keyframe H.264.

2. **Text readability beats video beauty.**  
   If the video is too bright or busy, darken with `.bg-tint`, add a gradient,
   or adjust the section layout.

3. **Pinned sections shift later ScrollTriggers.**  
   Use `invalidateOnRefresh: true` and call `ScrollTrigger.refresh()` after
   layout-affecting changes.

4. **Glass cards may override positioning.**  
   If `.glass { position: relative; }` overrides absolutely positioned cards,
   out-specify it with `.workflow .workflow-card { position: absolute; }`.

5. **Do not use real brands or logos.**  
   NOXÉ Audio is fictional. Keep all assets original.

6. **Do not bake website text into images or video.**  
   Text should be rendered in HTML/CSS, not inside generated media.

7. **Do not open the build through `file://`.**  
   Use Vite dev server or `npx serve dist`.

8. **Keep the motion slow.**  
   Scroll-driven video should feel deliberate. Fast motion becomes unpleasant
   when scrubbed manually.

---

## Quality checklist

Before considering the site complete:

- [ ] `copy/brand-kit.md` exists and matches NOXÉ Audio
- [ ] three reference images exist in `assets/references`
- [ ] raw Higgsfield video exists in `assets/videos`
- [ ] all-keyframe video exists at `website/public/bg.mp4`
- [ ] site runs with `npm run dev`
- [ ] `window.__bgv.readyState === 4`
- [ ] video scrubs smoothly on scroll
- [ ] hero text remains readable over the video
- [ ] at least one pinned ScrollTrigger section works
- [ ] Lenis smooth scroll works without breaking pins
- [ ] glass cards remain legible over bright frames
- [ ] mobile fallback exists
- [ ] `npm run build -- --base=./` passes
- [ ] no real logos, third-party marks, or baked-in text appear in media

---

## Preferred build philosophy

Start simple, then add motion.

Recommended order:

1. Create or verify brand kit
2. Generate reference images
3. Generate scroll-friendly video
4. Re-encode all-keyframe
5. Build Vite project shell
6. Add fixed video background and scrub mapping
7. Add hero
8. Add one pinned impact section
9. Add feature cards
10. Add specs and CTA
11. Add mobile fallback
12. Polish glass, typography, spacing, and performance

The website should feel like a premium product launch, not a generic AI demo.
