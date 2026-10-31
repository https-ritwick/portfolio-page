import type { APIRoute } from 'astro';
import { absoluteUrl } from '../utils/url';

// Generated at build time so the sitemap URL always matches SITE_URL.
export const GET: APIRoute = ({ site }) =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl('sitemap.xml', site)}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
