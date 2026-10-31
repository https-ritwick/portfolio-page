# Ritwick Johari — Portfolio

Personal portfolio of **Ritwick Johari**, software engineer working on agentic AI, RAG/LLM systems and computer vision.

A fully static site: [Astro](https://astro.build) compiles everything to plain HTML, CSS and a small amount of
JavaScript (a few KB, inlined) at build time. No server, database or runtime is needed, so it deploys on Render's free
**Static Site** tier (or any static host).

---

## Stack

| Concern       | Choice                                                                    | Why                                                                                  |
| ------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Framework     | Astro 7 (static output)                                                   | Pre-renders real HTML: fast, SEO-friendly, readable without JavaScript.              |
| Language      | TypeScript                                                                | Typed content data and scripts.                                                      |
| Styling       | Hand-written CSS with design tokens, scoped per component                 | Full control over a distinctive art direction; no utility-class noise.              |
| Interactivity | Vanilla TypeScript (`src/scripts/main.ts`)                                | Theme, active nav, mobile menu, copy buttons: no framework runtime shipped.         |
| Fonts         | Self-hosted via Fontsource (Source Serif 4, IBM Plex Sans, IBM Plex Mono) | No third-party font requests; heading and body faces are preloaded.                |
| Icons         | Inline SVG (Lucide paths)                                                 | Zero icon library weight.                                                            |

No analytics or trackers are included.

## Project structure

```
├── render.yaml              # Render Blueprint (static site, headers, env vars)
├── .node-version            # Node 24, read by Render and nvm/fnm
├── astro.config.mjs         # SITE_URL / BASE_PATH configuration
├── public/                  # Copied as-is: resume.pdf, og.png, favicons
├── scripts/generate-og.mjs  # Regenerates og.png + PNG favicons (npm run og)
└── src/
    ├── data/                # ← ALL CONTENT LIVES HERE
    │   ├── profile.ts       #   name, current role, headline, intro, links, education, nav
    │   ├── projects.ts      #   featured projects
    │   ├── experience.ts    #   roles (current role first)
    │   ├── publications.ts  #   papers
    │   ├── talks.ts         #   talks & speaking
    │   ├── achievements.ts  #   awards & placements
    │   ├── skills.ts        #   skill groups
    │   └── leadership.ts    #   leadership roles (shown under About)
    ├── components/
    │   ├── sections/        # Hero, Projects, Experience, Research, Awards, Skills, About, Contact
    │   ├── diagrams/        # Project architecture schematics (SVG)
    │   ├── Header.astro / Footer.astro / SectionHead.astro / Icon.astro
    ├── layouts/BaseLayout.astro  # <head>, SEO/OG tags, theme bootstrap
    ├── pages/               # index, 404, robots.txt, sitemap.xml
    ├── scripts/main.ts      # Client-side progressive enhancement
    ├── styles/global.css    # Design tokens, base styles, buttons, disclosure, motion
    └── utils/url.ts         # Base-path-aware URL helpers
```

## Run locally

Requires Node 22.23+ (Node 24 recommended — see `.node-version`).

```bash
npm install
```

```bash
npm run dev        # http://localhost:4321 with hot reload
```

```bash
npm run build      # production build → dist/
```

```bash
npm run preview    # serve the production build locally
```

```bash
npm run check      # TypeScript + Astro diagnostics
```

---

## Deploy to Render

### 1. Push the project to GitHub

Create an **empty** repository on GitHub (no README/licence), e.g. `portfolio`, then from this folder:

```bash
git init -b main
```

```bash
git add .
```

```bash
git commit -m "Initial commit: portfolio site"
```

```bash
git remote add origin https://github.com/<your-username>/<repository-name>.git
```

```bash
git push -u origin main
```

### 2. Create the site on Render (Blueprint, uses `render.yaml`)

1. Sign in at [dashboard.render.com](https://dashboard.render.com) (connecting with GitHub is easiest).
2. **New → Blueprint**.
3. Select the repository. Render detects `render.yaml` and shows one service: `ritwick-johari` (Static Site).
4. Click **Apply** / **Deploy Blueprint**.

Render then runs `npm ci && npm run build` and publishes `./dist`. The first build takes about a minute.

> **Alternative (no Blueprint):** New → **Static Site** → pick the repo → Build command `npm ci && npm run build`,
> Publish directory `dist`. Add the `SITE_URL` environment variable manually. Headers from `render.yaml` would then
> need adding under **Settings → Headers**.

### 3. Confirm the URL and set `SITE_URL`

Your site is served at `https://<service-name>.onrender.com`. If `ritwick-johari` was taken, Render adds a suffix
(e.g. `ritwick-johari-x1y2.onrender.com`). `SITE_URL` drives the canonical link, Open Graph image URLs,
`robots.txt` and `sitemap.xml`, so it must match:

- edit `SITE_URL` in `render.yaml` and push, **or**
- change it under **Dashboard → your site → Environment** and trigger **Manual Deploy → Clear build cache & deploy**.

### 4. Verify the deployment

- Open the URL; check the hero, theme toggle, mobile menu and the **Resume** button (should download the PDF).
- `https://<your-url>/robots.txt` and `/sitemap.xml` should show your real domain.
- `https://<your-url>/anything-missing` should show the custom 404 page.
- Paste the URL into [opengraph.xyz](https://www.opengraph.xyz) or LinkedIn's
  [Post Inspector](https://www.linkedin.com/post-inspector/) to confirm the preview image.

### Updating the site

Every push to `main` redeploys automatically (`autoDeployTrigger: commit`):

```bash
git add .
```

```bash
git commit -m "Update projects"
```

```bash
git push
```

### Custom domain (optional)

1. Render dashboard → your site → **Settings → Custom Domains → Add** (e.g. `ritwickjohari.com` and `www.ritwickjohari.com`).
2. At your DNS provider add the records Render shows (a `CNAME` for `www` to `<service>.onrender.com`, and for the
   apex domain an `ALIAS`/`ANAME` record, or the `A` record Render lists).
3. Render issues a free TLS certificate automatically once DNS resolves.
4. Set `SITE_URL=https://yourdomain.com` (in `render.yaml` or the dashboard) and redeploy.
5. Optionally uncomment the `domains:` block in `render.yaml` to keep it under version control.

### Troubleshooting

| Symptom                                    | Fix                                                                                                                 |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| Build fails with an engine/Node error      | Render reads `.node-version` (24). Don't override `NODE_VERSION` with an older value.                               |
| `npm ci` fails: lockfile out of sync       | Run `npm install` locally, commit the updated `package-lock.json`, push.                                            |
| OG preview / sitemap shows the wrong domain | `SITE_URL` doesn't match your live URL. Update it and redeploy.                                                     |
| Old content still showing                  | Hard-refresh; or **Manual Deploy → Clear build cache & deploy**. Hashed assets in `/_astro/` are cached for a year by design. |
| Site 404s on every page                    | Publish directory must be `dist` (Blueprint sets `./dist`).                                                         |

### Other static hosts

The `dist/` folder works on any static host. For a GitHub Pages **project** site (`username.github.io/repo/`), build with
`BASE_PATH=/repo SITE_URL=https://username.github.io npm run build`: all internal links and assets go through
`withBase()` and respect the base path. A **user** site (`username.github.io`) or a custom domain needs no `BASE_PATH`.

---

## Updating content: checklist

All content is in `src/data/*.ts`. Components read from it, so you rarely touch markup.

- **Current role changes:** update `current` in `profile.ts` (hero + "At a glance") and the first entry in `experience.ts`.
- **Accenture details:** add `start`, `location`, `summary` and `highlights` to the Accenture entry in `experience.ts` once they're shareable.
- **New job:** add an object at the top of `experience.ts`; mark it `current: true` and remove `current` from the previous one.
- **New project:** add to `projects.ts`. Only add `repo`/`demo`/`publication` links that exist. For a new schematic,
  add a component in `components/diagrams/` and register it in `Projects.astro`.
- **New talk / paper / award:** `talks.ts`, `publications.ts`, `achievements.ts` (`tier: 'major'` is highlighted).
- **Skills:** `skills.ts`.
- **Resume:** replace `public/resume.pdf` (keep the filename).
- **About text:** written prose lives in `components/sections/About.astro`.
- **Name, headline or current role change:** also run `npm run og` to regenerate the social preview image.
- Run `npm run check && npm run build` before pushing.

## Accessibility & performance notes

- Semantic landmarks, one `h1`, ordered `h2`/`h3` hierarchy, skip link, visible focus styles.
- All content renders without JavaScript; reveals only apply when JS is running (`html.js`).
- `prefers-reduced-motion` disables all transitions and the fade-in.
- Motion is limited to a short section fade-in, hover states, the mobile menu and the diagram disclosure. All of it uses `opacity`/`transform`, so there's no layout shift.
- Light/dark theme follows the OS until toggled, and the choice is saved in `localStorage`.
- Essential project and experience information is always visible; only architecture diagrams sit in a native `<details>` (keyboard-accessible, works without JS).
- Smallest text on the page is 13px; body text is 17px.
