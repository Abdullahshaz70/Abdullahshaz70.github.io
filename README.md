# Portfolio

A single-page portfolio built around one figure: a loss surface that a marker descends as you scroll. Each section is a stretch of training. The surface starts noisy, smooths out, and converges by the contact section. The readout in the corner (`step`, `loss`, `σ`) shows where the run is.

Vite, React 19, TypeScript, three.js via React Three Fiber, Motion for the few UI transitions, and Lenis for smooth scrolling.

## Run

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check and production build into dist/
npm run preview   # serve the production build
npm run lint
```

Requires Node 20.19+ or 22.12+.

## How to swap content

**All your details live in [`data.json`](data.json) in the project root.** The page fetches it on load, so edit it and reload; no code changes needed. Leave any text as `""` or any list as `[]` and that element is hidden. Keys starting with `_` are notes and are ignored.

| Key | What it controls |
| --- | --- |
| `person` | Name (hero and browser tab), short name in the nav, `title` (search description), email, optional phone |
| `nav` | Label for each section in the top nav |
| `hero` | Tagline (`positioning`), the facts along the bottom, scroll cue |
| `about` | Bio: lead sentence, paragraphs, fact list |
| `projects` | The project list and each detail sheet: problem, approach, outcome metrics, stack, links |
| `work` | Section title and meta line |
| `contests` | Intro, summary numbers, platform ratings table, notable problems |
| `stack` | Skills table. `seenIn` takes project `id`s and links each tool to its project sheet |
| `contact` | Lead, social links |
| `colophon`, `figure` | Footer text and the figure caption |

Notes:

- **Project `id`s** are referenced by `stack.groups[].items[].seenIn`. If you rename one, update both.
- **Links:** `"href": "#"` is a placeholder. Absolute `http(s)` links open in a new tab automatically.
- **Outcome metrics** read best as a short value plus a plain-language label (`"38 ms"` / `"per image on a $90 Android phone"`).
- **If data.json has a mistake** (for example a trailing comma), the page still opens without your details and the browser console says what and where.
- **After `npm run build`,** your details are in `dist/data.json`. Edit that file on the server, or edit the root `data.json` and rebuild.

## Preloader

A full-screen counter (markup and styles in [`index.html`](index.html), logic in [`src/lib/preloader.ts`](src/lib/preloader.ts)) covers the page until everything has loaded. It shows real progress, in this order: `data.json` (10%), fonts and images used on the page (30%), then the 3D scene (60%: downloading three.js, compiling shaders, first frame). It reaches 100% only when all three are done, then fades out. Anything that fails or stalls is skipped so the page always opens. Without WebGL or with reduced motion, the 3D stage completes immediately with the static poster.

## Structure

```
src/
  content.ts          content types, data.json loading and validation
  App.tsx             page composition
  sections/           Hero, About, Work, Contests, Stack, Contact
  components/         Nav, Hud, ProjectSheet, Figure (ready-gate), Poster, …
  scene/              three.js scene, lazy-loaded
  lib/
    landscape.ts      the loss function and precomputed SGD path
    choreography.ts   per-section camera keyframes and training progress
    projection.ts     camera math for the static poster (no three.js)
    figure.ts         drawing constants shared by scene and poster
    scrollState.ts    scroll position as a "section float", outside React
  hooks/              media queries, scroll tracking, smooth scroll
  styles/             tokens.css (palette, type scale, spacing), fonts.css, global.css
```

## Changing the look

- **Palette:** three variables at the top of [`src/styles/tokens.css`](src/styles/tokens.css): `--paper`, `--ink`, `--accent`. The 3D scene reads them at startup, so canvas and page always match.
- **Type:** Schibsted Grotesk for all text, Newsreader for headings (h1, h2, project titles), IBM Plex Mono only for the step/loss/σ readout. Sizes come from a 1.25 modular scale in `tokens.css` (`--text-xs` … `--text-2xl`); use only those, and only the two weights (`--weight-regular`, `--weight-medium`). Use the `.figures` class (tabular figures) only on elements that are purely numeric: in Schibsted, `tnum` also widens commas and periods.
- **Swapping a typeface:** change the fontsource import in `src/main.tsx`, the family in `tokens.css`, the filename pattern in `vite.config.ts` (font preloads), and recompute the fallback metrics in `src/styles/fonts.css`, otherwise text will shift when the font loads.
- **Camera moves:** one keyframe per section in [`src/lib/choreography.ts`](src/lib/choreography.ts). `shift` slides the figure sideways (as a fraction of viewport width) so it sits beside the text.
- **The surface itself:** `loss()` in [`src/lib/landscape.ts`](src/lib/landscape.ts). If you change it, check that the descent still makes steady progress; the comment on `runDescent` explains why the gradient is damped.

## Behaviour notes

- **Loading.** See [Preloader](#preloader). The critical font files are preloaded and have metric-matched fallbacks, so nothing reflows when they arrive. The canvas stays invisible while it waits for final layout, compiles its shaders and renders one complete frame for the current scroll position; only then does it fade in.
- **Poster.** Visitors who prefer reduced motion, browsers without WebGL or with software-only WebGL, low-end devices (≤2 cores or ≤2 GB memory), data-saver mode, and devices that can't finish warming up in 2.5s get a static drawing of the scene's opening frame instead. It's rendered from the same surface and camera, so it matches the 3D composition.
- **Rendering.** The canvas renders only when the scroll position changes, never while idle. DPR is fixed per session: min(devicePixelRatio, 1.75) on desktop, 1.25 on narrow screens, where the grid also drops from 84² to 44² vertices.

## Hosting

Serve `dist/assets/*` with `Cache-Control: public, max-age=31536000, immutable` (the files are content-hashed) and `index.html` with `no-cache`. Without the immutable header, a reload revalidates the font preloads while the page reuses fonts it already has, and Chrome logs "preloaded but not used" warnings. `npm run preview` already sends these headers.
