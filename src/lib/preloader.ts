/**
 * Drives the full-screen preloader whose markup and styles are in index.html,
 * so it's on screen from the very first paint, before any JavaScript runs.
 *
 * Order: data.json → render the page underneath → fonts and images → the 3D
 * scene (started by Figure once `assetsReady` resolves). The counter shows
 * real progress from `loadProgress` and only reaches 100% when all of that is
 * done. Anything that fails or stalls is skipped, so the page always opens.
 */
import { loadContent, type SiteContent } from '../content'
import { loadProgress, markAssetsReady, withTimeout } from './loadProgress'

const ASSET_TIMEOUT_MS = 10_000
const FADE_MS = 600

/** Font tokens and weights used on the page. Loading them explicitly gives per-font progress. */
const FONTS: [token: string, weight: number][] = [
  ['--font-text', 400],
  ['--font-text', 500],
  ['--font-display', 400],
  ['--font-mono', 400],
]

const SCROLL_KEYS = new Set([' ', 'PageUp', 'PageDown', 'Home', 'End', 'ArrowUp', 'ArrowDown'])

/** Stage 2: every font and image the rendered page uses, reported one by one. */
async function loadPageAssets(): Promise<void> {
  const style = getComputedStyle(document.documentElement)
  const fonts = FONTS.map(([token, weight]) => `${weight} 1em ${style.getPropertyValue(token).trim()}`)
  const images = [...document.images].filter((image) => image.loading !== 'lazy')
  const tasks: Promise<unknown>[] = [
    ...fonts.map((font) => document.fonts.load(font)),
    ...images.map((image) => image.decode()),
  ]

  let settled = 0
  await Promise.all(
    tasks.map((task) =>
      withTimeout(task, ASSET_TIMEOUT_MS)
        .catch(() => undefined) // a missing font or broken image is skipped
        .then(() => loadProgress.report('assets', ++settled / tasks.length)),
    ),
  )
}

/** Eases the displayed number toward real progress. It never runs ahead of it. */
function showProgress(preloader: HTMLElement, onComplete: () => void): void {
  const count = preloader.querySelector<HTMLElement>('[data-preloader-count]')
  const bar = preloader.querySelector<HTMLElement>('[data-preloader-bar]')
  let shown = 0
  let written = -1

  const frame = () => {
    const target = loadProgress.value() * 100
    if (shown < target) shown = Math.min(target, shown + Math.max((target - shown) * 0.1, 0.4))
    const whole = Math.floor(shown)
    if (whole !== written) {
      written = whole
      if (count) count.textContent = String(whole)
      preloader.setAttribute('aria-valuenow', String(whole))
    }
    if (bar) bar.style.transform = `scaleX(${shown / 100})`
    if (shown >= 100) onComplete()
    else requestAnimationFrame(frame)
  }
  requestAnimationFrame(frame)
}

const preventDefault = (event: Event) => event.preventDefault()
const blockScrollKeys = (event: KeyboardEvent) => SCROLL_KEYS.has(event.key) && event.preventDefault()

/** Keeps the page underneath from scrolling while the preloader covers it. */
function lockScroll(preloader: HTMLElement): () => void {
  preloader.addEventListener('wheel', preventDefault, { passive: false })
  preloader.addEventListener('touchmove', preventDefault, { passive: false })
  document.addEventListener('keydown', blockScrollKeys)
  return () => document.removeEventListener('keydown', blockScrollKeys)
}

function reveal(preloader: HTMLElement, unlockScroll: () => void): void {
  document.getElementById('root')?.removeAttribute('inert')
  unlockScroll()
  preloader.dataset.state = 'done' // CSS fades it out (index.html)
  const remove = () => preloader.remove()
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return remove()
  preloader.addEventListener('transitionend', remove, { once: true })
  window.setTimeout(remove, FADE_MS + 200)
}

/**
 * Runs the loading sequence. `render` mounts the page with the loaded content;
 * it's called as soon as data.json is in, underneath the preloader.
 */
export function runPreloader(render: (content: SiteContent) => void): void {
  const preloader = document.getElementById('preloader')
  if (preloader) {
    const unlockScroll = lockScroll(preloader)
    showProgress(preloader, () => reveal(preloader, unlockScroll))
  }

  const sequence = async () => {
    // 1. data.json
    const content = await loadContent((fraction) => loadProgress.report('data', fraction))
    loadProgress.report('data', 1)
    render(content)
    // 2. Fonts and images on the rendered page
    await loadPageAssets()
    // 3. Releases the 3D scene, which reports its own progress (components/Figure.tsx)
    markAssetsReady()
  }

  sequence().catch((error: unknown) => {
    console.error('Loading failed; opening the page anyway.', error)
    loadProgress.report('data', 1)
    markAssetsReady()
    loadProgress.report('scene', 1)
  })
}
