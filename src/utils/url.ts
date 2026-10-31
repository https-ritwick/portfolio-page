/**
 * Prefixes a site-relative path with the configured base path, so links and
 * assets keep working when the site is served from a sub-path
 * (e.g. GitHub Pages project sites). On Render or a custom domain the base is "/".
 */
export function withBase(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.replace(/^\//, '');
  return clean ? `${base}/${clean}` : `${base}/`;
}

/** Absolute URL on the deployed site, for canonical/Open Graph tags. */
export function absoluteUrl(path: string, site: URL | undefined): string {
  return new URL(withBase(path), site).toString();
}
