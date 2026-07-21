# Clark & Harper Visions — Landing Page

A premium, scroll-driven motion landing page for **Clark & Harper Visions**
("Crafted Digital. Envisioned Beyond."), built with the `noxe-landing`
project skill's conventions and adapted end-to-end to the CHV brand kit
(`copy/brand-kit.md`).

The signature lion transformation video (`assets/videos/chv-scroll-background.mp4`,
re-encoded as `public/bg.mp4`) is used as a single fixed full-screen background
for the entire page. It does not autoplay — its `currentTime` is mapped
directly to scroll position, so scrolling down plays forward through the
transformation and into the studio walk, and scrolling back up reverses
through the same footage.

## Setup

```bash
cd website
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Production build

```bash
npm run build -- --base=./
npm run preview   # or: npx serve dist
```

Always preview the build over HTTP (Vite preview, `npx serve`, etc.) —
never open `dist/index.html` directly via `file://`, the scroll video and
module scripts will not load correctly.

## Structure

```
website/
├─ index.html          all section markup, Google Fonts link
├─ src/
│  ├─ main.js           Lenis + GSAP ScrollTrigger + video scrub + gallery logic
│  ├─ style.css         layout, typography, section styles, brand tokens
│  └─ glass.css         glass panels and buttons
├─ public/
│  ├─ bg.mp4             all-keyframe H.264 background video (scroll-scrubbed)
│  └─ img/chv-logo.png   Clark & Harper Visions wordmark/logo
└─ scripts/ (repo root)  scripts/swap-bg-video.sh — re-encode helper
```

## Sections

1. **Hero** — wordmark, "Crafted Digital. Envisioned Beyond.", CTAs
2. **Impact** — pinned word-by-word reveal of the studio's positioning statement
3. **Showcase** — "Every site begins on a blank canvas" philosophy statement
4. **Features** — the four pillars that set the studio apart
5. **Workflow** — one-card-at-a-time gallery of who the studio is built for
6. **Specs** — the six-step delivery process, presented as a clean spec table
7. **Buy/CTA** — final consultation call-to-action
8. **Footer** — logo, nav, copyright

## Re-encoding the background video

Raw AI-generated MP4s often seek poorly when scroll-scrubbed. The helper
script re-encodes to all-keyframe H.264 (every frame a keyframe, so any
`currentTime` seek lands instantly):

```bash
# from the repo root
scripts/swap-bg-video.sh "assets/videos/chv-scroll-background.mp4"
```

This writes `website/public/bg.mp4`. Because every frame is a keyframe, the
file is intentionally large (~40MB for this ~25s clip) — that trade-off is
what makes scroll scrubbing smooth instead of jumpy.

**Important:** the encode must set an explicit H.264 level (`-level:v 5.1`
in this project). All-keyframe streams are unusually decode-intensive, and
if the level is left at whatever `libx264`'s default profile heuristics pick
(typically 4.0 for 1080p), some browsers reject the file outright with a
`MEDIA_ERR_SRC_NOT_SUPPORTED` decode error even though the file is
structurally valid. Level 5.1 clears that ceiling.

## Verifying it's working

In the browser console:

```js
window.__bgv.readyState   // 4 once the video can play through
window.__bgv.duration     // ~25 (seconds)
window.__ST.refresh()     // recompute ScrollTrigger positions after layout changes
```

## Notes

- No new media was generated for this build — the background video and the
  three reference images (`assets/references/chv-*.png`) are the existing
  CHV assets already produced earlier in this project.
- The logo is applied via HTML (`<img>` in the nav and footer), not baked
  into the video, so it stays crisp and independently stylable.
- Mobile: pinned/gallery scroll motion is disabled on touch devices in
  favor of a simple stacked layout, and the background video is dimmed
  (rather than swapped for a poster image, since no poster asset was
  generated for this build).
