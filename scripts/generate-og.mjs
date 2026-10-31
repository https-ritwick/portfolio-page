/**
 * Generates image assets from the source portrait (src/assets/portrait.webp):
 *
 *   src/assets/avatar-face.jpg   tight face crop → header logo (optimised by Astro at build)
 *   src/assets/avatar-bust.jpg   head-and-shoulders crop → hero portrait
 *   public/favicon-32.png        circular favicon
 *   public/favicon-192.png       circular icon for Android / manifest use
 *   public/apple-touch-icon.png  square 180×180 home-screen icon
 *   public/og.png                1200×630 social preview card
 *
 * Run with `npm run og` after replacing the portrait or changing your name,
 * headline or colours. Outputs are committed, so this never runs on deploy.
 *
 * Crops are in source-image pixels (portrait is 1254×1254). Adjust them if
 * you swap in a different photo.
 */
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const path = (rel) => fileURLToPath(new URL(`../${rel}`, import.meta.url));
const source = path('src/assets/portrait.webp');

const FACE = { left: 418, top: 165, width: 500, height: 500 };
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

// Source crops for the site (Astro resizes these and converts them to WebP/AVIF).
await crop(FACE).resize(320).jpeg({ quality: 88, mozjpeg: true }).toFile(path('src/assets/avatar-face.jpg'));
await crop(BUST).resize(640).jpeg({ quality: 86, mozjpeg: true }).toFile(path('src/assets/avatar-bust.jpg'));

// Icons
await sharp(await circle(FACE, 32)).toFile(path('public/favicon-32.png'));
await sharp(await circle(FACE, 192)).png({ palette: true, quality: 90 }).toFile(path('public/favicon-192.png'));
// iOS ignores transparency, so the touch icon is a full square crop.
await crop(FACE).resize(180, 180).png({ palette: true, quality: 90 }).toFile(path('public/apple-touch-icon.png'));

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

console.log(`Generated avatars, icons and og.png for ${name}.`);
