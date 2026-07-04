/**
 * Cinematic frame-sequence engine for the hero.
 * Preloads every frame (decoded off-thread via createImageBitmap),
 * then draws scroll-mapped frames onto a full-viewport canvas,
 * contain-fitted — never stretched, never cropped.
 */

export interface SequenceSource {
  basePath: string;
  frameCount: number;
}

export const DESKTOP_SEQUENCE: SequenceSource = {
  basePath: '/assets/sequence/desktop',
  frameCount: 205,
};

export const MOBILE_SEQUENCE: SequenceSource = {
  basePath: '/assets/sequence/mobile',
  frameCount: 103,
};

export function pickSequence(): SequenceSource {
  return window.matchMedia('(max-width: 768px)').matches
    ? MOBILE_SEQUENCE
    : DESKTOP_SEQUENCE;
}

const frameUrl = (src: SequenceSource, i: number) =>
  `${src.basePath}/frame_${String(i).padStart(4, '0')}.webp`;

/** Preload all frames with bounded concurrency; reports 0..1 progress. */
export async function preloadFrames(
  src: SequenceSource,
  onProgress: (loaded: number, total: number) => void
): Promise<ImageBitmap[]> {
  const frames: ImageBitmap[] = new Array(src.frameCount);
  let loaded = 0;
  let cursor = 0;
  const CONCURRENCY = 10;

  async function worker() {
    while (cursor < src.frameCount) {
      const i = cursor++;
      const res = await fetch(frameUrl(src, i));
      const blob = await res.blob();
      frames[i] = await createImageBitmap(blob);
      loaded++;
      onProgress(loaded, src.frameCount);
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  return frames;
}

export class SequenceRenderer {
  private ctx: CanvasRenderingContext2D;
  private frames: ImageBitmap[];
  private currentIndex = -1;
  private dpr = 1;

  constructor(
    private canvas: HTMLCanvasElement,
    frames: ImageBitmap[]
  ) {
    this.frames = frames;
    this.ctx = canvas.getContext('2d')!;
    this.resize();
  }

  get frameCount(): number {
    return this.frames.length;
  }

  resize(): void {
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    const { clientWidth, clientHeight } = this.canvas;
    this.canvas.width = Math.round(clientWidth * this.dpr);
    this.canvas.height = Math.round(clientHeight * this.dpr);
    // Force redraw of current frame at the new size.
    const index = Math.max(this.currentIndex, 0);
    this.currentIndex = -1;
    this.drawFrame(index);
  }

  /** Map scroll progress (0..1) to a frame and draw it if it changed. */
  render(progress: number): void {
    const index = Math.min(
      this.frames.length - 1,
      Math.max(0, Math.round(progress * (this.frames.length - 1)))
    );
    this.drawFrame(index);
  }

  drawFrame(index: number): void {
    if (index === this.currentIndex) return;
    const frame = this.frames[index];
    if (!frame) return;
    this.currentIndex = index;

    const cw = this.canvas.width;
    const ch = this.canvas.height;
    // Cover: fill the whole viewport — no bars, no stretch. Aspect is
    // preserved; overflow is cropped equally from the edges.
    const scale = Math.max(cw / frame.width, ch / frame.height);
    const dw = frame.width * scale;
    const dh = frame.height * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;

    this.ctx.drawImage(frame, dx, dy, dw, dh);
  }
}
