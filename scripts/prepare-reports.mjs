/**
 * Convert rendered report pages (PNG, from scripts/render-pdf.swift) into
 * web-optimized WebP under public/assets/reports/<slug>/.
 */
import { readdir, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';

const SRC =
  '/private/tmp/claude-501/-Users-tahirtamam-Desktop-Nevara-3-0/359ead88-7f0d-4ea1-9cd4-8e0d54905cb2/scratchpad/reports-png';
const OUT = new URL('../public/assets/reports/', import.meta.url).pathname;

const slugs = await readdir(SRC);
for (const slug of slugs) {
  const outDir = join(OUT, slug);
  await mkdir(outDir, { recursive: true });
  const pages = (await readdir(join(SRC, slug))).filter((f) => f.endsWith('.png')).sort();
  for (const page of pages) {
    await sharp(join(SRC, slug, page))
      .resize({ width: 900 })
      .webp({ quality: 78 })
      .toFile(join(outDir, page.replace('.png', '.webp')));
  }
  console.log(`${slug}: ${pages.length} pages`);
}
