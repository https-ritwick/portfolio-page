/**
 * Generates the site's raster/vector brand assets:
 *
 *   public/favicon.svg           logo mark (crisp at any size)
 *   public/favicon-32.png        logo mark, PNG fallback
 *   public/favicon-192.png       logo mark for Android / manifest use
 *   public/apple-touch-icon.png  logo mark, 180×180 home-screen icon
 *   src/assets/avatar-bust.jpg   head-and-shoulders crop of the portrait → hero
 *   public/og.png                1200×630 social preview card (with portrait)
 *
 * Run with `npm run og` after replacing the portrait or changing your name,
 * headline or colours. Outputs are committed, so this never runs on deploy.
 *
 * The portrait crop is in source-image pixels (portrait is 1254×1254).
 * Adjust BUST if you swap in a different photo.
 */
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const path = (rel) => fileURLToPath(new URL(`../${rel}`, import.meta.url));
const source = path('src/assets/portrait.webp');

const BUST = { left: 225, top: 110, width: 880, height: 880 };

const crop = (box) => sharp(source).extract(box);

/** A square image masked to a circle (transparent corners). */
async function circle(box, size) {
  const mask = Buffer.from(
    `<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}"/></svg>`,
  );
  return crop(box)
    .resize(size, size)
    .composite([{ input: mask, blend: 'dest-in' }])
    .png()
    .toBuffer();
}

// Hero portrait source (Astro resizes it and converts it to WebP at build).
await crop(BUST).resize(640).jpeg({ quality: 86, mozjpeg: true }).toFile(path('src/assets/avatar-bust.jpg'));

// Logo mark — keep in sync with src/components/LogoMark.astro.
const mark = (tileRadius = 14) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="${tileRadius}" fill="#15171b"/>
  <g fill="none" stroke="#fafaf8" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 46 V27"/>
    <path d="M21 35 C21 29.5 25.5 26.5 32 27"/>
    <path d="M43 27 V45 C43 51 39.5 54 33 53.5"/>
  </g>
  <circle cx="43" cy="16.5" r="4.2" fill="#8ea9ff"/>
</svg>
`;

await writeFile(path('public/favicon.svg'), mark());
const png = (svg, size) => sharp(Buffer.from(svg), { density: 600 }).resize(size, size).png({ compressionLevel: 9 });
await png(mark(), 32).toFile(path('public/favicon-32.png'));
await png(mark(), 192).toFile(path('public/favicon-192.png'));
// iOS rounds the corners itself and ignores transparency, so the touch icon is a full square.
await png(mark(0), 180).toFile(path('public/apple-touch-icon.png'));

// Social preview
const name = 'Ritwick Johari';
const esc = (s) => s.replace(/&/g, '&amp;');
const headline = esc('Software engineer building agentic AI and LLM systems.');
const facts = [
  ['Now', 'Advanced App Engineering Associate, Accenture'],
  ['Research', 'First-author paper · ETAAV 2025 (IEEE)'],
  ['Awards', 'Global Top 50 · IBM watsonx Hackathon'],
];

// Matches the site's light theme tokens.
const bg = '#fafaf8';
const surface = '#f2f2ee';
const ink = '#15171b';
const ink2 = '#3f444d';
const ink3 = '#646b75';
const rule = '#e3e3dd';
const accent = '#1f48c9';

const serif = "Georgia, 'Times New Roman', serif";
const sans = "'Segoe UI', Arial, sans-serif";

const PHOTO = { x: 900, y: 64, size: 220 };

const og = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${bg}"/>
  <rect x="0" y="0" width="1200" height="8" fill="${accent}"/>
  <circle cx="${PHOTO.x + PHOTO.size / 2}" cy="${PHOTO.y + PHOTO.size / 2}" r="${PHOTO.size / 2 + 6}" fill="${bg}" stroke="${rule}" stroke-width="2"/>

  <text x="80" y="116" font-family="${sans}" font-size="24" fill="${ink3}">Software Engineer · New Delhi, India</text>
  <text x="76" y="252" font-family="${serif}" font-weight="bold" font-size="96" fill="${ink}" letter-spacing="-2">${name}</text>
  <text x="80" y="318" font-family="${sans}" font-size="32" fill="${ink2}">${headline}</text>

  <rect x="80" y="380" width="1040" height="172" rx="14" fill="${surface}" stroke="${rule}"/>
  ${facts
    .map(
      ([label, value], i) => `
  <text x="112" y="${430 + i * 46}" font-family="${sans}" font-weight="bold" font-size="20" fill="${ink3}">${label.toUpperCase()}</text>
  <text x="270" y="${430 + i * 46}" font-family="${sans}" font-size="25" fill="${ink}">${esc(value)}</text>`,
    )
    .join('')}
</svg>`;

await sharp(Buffer.from(og))
  .composite([{ input: await circle(BUST, PHOTO.size), left: PHOTO.x, top: PHOTO.y }])
  .png({ compressionLevel: 9 })
  .toFile(path('public/og.png'));

console.log(`Generated logo icons, hero portrait and og.png for ${name}.`);
