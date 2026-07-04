/**
 * Transcode the extracted cinematic frame sequence into web-optimized WebP.
 * Source:  ~/Downloads/frames/frame_000000.png … (1406x768 PNG, ~1.1 MB each)
 * Output:  public/assets/sequence/desktop/frame_XXXX.webp  (1406w)
 *          public/assets/sequence/mobile/frame_XXXX.webp   (720w, every 2nd frame)
 */
import { readdir, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';

const SRC = '/Users/tahirtamam/Downloads/frames';
const OUT_DESKTOP = new URL('../public/assets/sequence/desktop/', import.meta.url).pathname;
const OUT_MOBILE = new URL('../public/assets/sequence/mobile/', import.meta.url).pathname;

const QUALITY = 62;
const CONCURRENCY = 8;

// Frames 205+ carry baked-in (garbled) marketing text from the AI render — unusable.
// The story ends on the settled "evidence" shot at frame 204.
const LAST_USABLE_FRAME = 204;
// Source watermarks (KlingAI / MINIMAX) live in the bottom ~70px; crop them out.
const SRC_WIDTH = 1406;
const SRC_HEIGHT = 768;
const CROP_BOTTOM = 70;

const frames = (await readdir(SRC))
  .filter((f) => f.endsWith('.png'))
  .sort()
  .slice(0, LAST_USABLE_FRAME + 1);
await mkdir(OUT_DESKTOP, { recursive: true });
await mkdir(OUT_MOBILE, { recursive: true });

console.log(`Transcoding ${frames.length} frames…`);

let done = 0;
const crop = {
  left: 0,
  top: 0,
  width: SRC_WIDTH,
  height: SRC_HEIGHT - CROP_BOTTOM,
};

async function processFrame(file, index) {
  const src = join(SRC, file);
  const name = `frame_${String(index).padStart(4, '0')}.webp`;

  await sharp(src).extract(crop).webp({ quality: QUALITY }).toFile(join(OUT_DESKTOP, name));

  // Mobile: half the frames, center-cropped — portrait screens render the
  // sequence "cover" (no bars), so the lateral 40% would never be seen and
  // shipping it would only cost payload and sharpness.
  if (index % 2 === 0) {
    const mobileName = `frame_${String(index / 2).padStart(4, '0')}.webp`;
    const mobileWidth = 844;
    await sharp(src)
      .extract({
        left: Math.round((SRC_WIDTH - mobileWidth) / 2),
        top: 0,
        width: mobileWidth,
        height: crop.height,
      })
      .webp({ quality: QUALITY })
      .toFile(join(OUT_MOBILE, mobileName));
  }

  done++;
  if (done % 50 === 0) console.log(`  ${done}/${frames.length}`);
}

for (let i = 0; i < frames.length; i += CONCURRENCY) {
  await Promise.all(
    frames.slice(i, i + CONCURRENCY).map((f, j) => processFrame(f, i + j))
  );
}

console.log(`Done. ${frames.length} desktop + ${Math.ceil(frames.length / 2)} mobile frames.`);
