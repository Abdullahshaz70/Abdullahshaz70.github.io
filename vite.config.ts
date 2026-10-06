import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, type HtmlTagDescriptor, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/** Latin font files used on first paint. Hashed at build time, so they're matched by name. */
const CRITICAL_FONTS = [
  /schibsted-grotesk-latin-wght-normal-[\w-]+\.woff2$/,
  /newsreader-latin-wght-normal-[\w-]+\.woff2$/,
  /ibm-plex-mono-latin-400-normal-[\w-]+\.woff2$/,
]

/**
 * Adds <link rel="preload"> for the critical fonts to the built index.html,
 * so they download alongside the main bundle instead of being discovered
 * only after the CSS is parsed and text is laid out.
 *
 * Preloads assume hashed assets are served as immutable. Without that, a
 * reload revalidates the preload while the page reuses the font it already
 * has, and Chrome warns that the preload went unused. `vite preview` gets the
 * production header here; set the same one on your host (see README).
 */
function preloadFonts(): Plugin {
  let base = '/'
  return {
    name: 'preload-fonts',
    apply: (_config, env) => env.command === 'build' || env.isPreview === true,
    configResolved(config) {
      base = config.base
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.startsWith(`${base}assets/`)) res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
        next()
      })
    },
    transformIndexHtml: {
      order: 'post',
      handler(_html, { bundle }) {
        if (!bundle) return
        const files = Object.values(bundle)
        return files
          .filter((file) => file.type === 'asset' && CRITICAL_FONTS.some((pattern) => pattern.test(file.fileName)))
          .map((file) => ({
            tag: 'link',
            attrs: { rel: 'preload', as: 'font', type: 'font/woff2', href: base + file.fileName, crossorigin: '' },
            injectTo: 'head',
          })) satisfies HtmlTagDescriptor[]
      },
    },
  }
}

/**
 * data.json (your details) sits in the project root so it's easy to find.
 * The dev server serves it from there as /data.json; this copies it into
 * dist/ for production builds.
 */
function copyDataJson(): Plugin {
  let root = process.cwd()
  return {
    name: 'copy-data-json',
    apply: 'build',
    configResolved(config) {
      root = config.root
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'data.json', source: readFileSync(resolve(root, 'data.json'), 'utf8') })
    },
  }
}

export default defineConfig({
  plugins: [react(), preloadFonts(), copyDataJson()],
  build: {
    // The three.js scene chunk (~900 kB, ~240 kB gzipped) is requested only
    // once the main bundle runs, so it never competes with first paint. Warn above that.
    chunkSizeWarningLimit: 1000,
  },
})
