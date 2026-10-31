// @ts-check
import { defineConfig } from 'astro/config';

/**
 * Deployment configuration
 * ------------------------
 * SITE_URL  – the public origin of the site, used for canonical URLs, Open Graph
 *             tags and the sitemap. Set it in Render (Environment tab or render.yaml)
 *             once you know your final URL or custom domain.
 *             If SITE_URL is unset, RENDER_EXTERNAL_URL is used when Render
 *             provides it, then the default below.
 * BASE_PATH – only needed if the site is served from a sub-path
 *             (e.g. GitHub Pages project sites: "/repository-name"). Render and
 *             custom domains serve from the root, so leave it unset.
 */
const site =
  process.env.SITE_URL ||
  process.env.RENDER_EXTERNAL_URL ||
  'https://ritwick-johari.onrender.com';

const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  // Pure static output: every page is pre-rendered to HTML at build time.
  output: 'static',
});
