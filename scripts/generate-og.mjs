/**
 * Generates the raster social/preview images in /public from SVG templates:
 *   og.png (1200×630), apple-touch-icon.png (180×180), favicon-32.png (32×32)
 *
 * Run with `npm run og` after changing your name, headline or colours.
 * The outputs are committed, so this never runs during deployment.
 */
import sharp from 'sharp';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const pub = (file) => fileURLToPath(new URL(`../public/${file}`, import.meta.url));

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

const og = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${bg}"/>
  <rect x="0" y="0" width="1200" height="8" fill="${accent}"/>

  <rect x="80" y="84" width="48" height="48" rx="8" fill="${ink}"/>
  <text x="104" y="116" text-anchor="middle" font-family="${serif}" font-weight="bold" font-size="22" fill="${bg}">RJ</text>
  <text x="148" y="116" font-family="${sans}" font-size="24" fill="${ink3}">Software Engineer · New Delhi, India</text>

  <text x="76" y="268" font-family="${serif}" font-weight="bold" font-size="104" fill="${ink}" letter-spacing="-2">${name}</text>
  <text x="80" y="330" font-family="${sans}" font-size="34" fill="${ink2}">${headline}</text>

  <rect x="80" y="390" width="1040" height="168" rx="14" fill="${surface}" stroke="${rule}"/>
  ${facts
    .map(
      ([label, value], i) => `
  <text x="112" y="${438 + i * 46}" font-family="${sans}" font-weight="bold" font-size="20" fill="${ink3}">${label.toUpperCase()}</text>
  <text x="270" y="${438 + i * 46}" font-family="${sans}" font-size="25" fill="${ink}">${esc(value)}</text>`,
    )
    .join('')}
</svg>`;

await sharp(Buffer.from(og)).png({ compressionLevel: 9 }).toFile(pub('og.png'));

const favicon = await readFile(pub('favicon.svg'));
await sharp(favicon, { density: 400 }).resize(180, 180).png().toFile(pub('apple-touch-icon.png'));
await sharp(favicon, { density: 200 }).resize(32, 32).png().toFile(pub('favicon-32.png'));

console.log(`Generated og.png, apple-touch-icon.png and favicon-32.png for ${name}.`);
