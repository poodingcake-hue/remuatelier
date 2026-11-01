// 사진을 '천 조각'으로 오려내는 브라우저 전용 유틸.
// 서버로 사진을 보내지 않고 모두 기기 안에서 처리합니다.

export type Shape = 'round' | 'circle' | 'heart' | 'square';

export const SHAPES: { id: Shape; label: string }[] = [
  { id: 'round', label: '둥근 네모' },
  { id: 'circle', label: '동그라미' },
  { id: 'heart', label: '하트' },
  { id: 'square', label: '네모 그대로' },
];

export type Upload = { id: string; square: string; img: HTMLImageElement };

const SIZE = 512;

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((res, rej) => {
    const img = new Image();
    img.onload = () => res(img);
    img.onerror = rej;
    img.src = src;
  });
}

function drawCover(ctx: CanvasRenderingContext2D, img: HTMLImageElement, x: number, y: number, w: number, h: number) {
  const s = Math.max(w / img.width, h / img.height);
  const iw = img.width * s, ih = img.height * s;
  ctx.drawImage(img, x + (w - iw) / 2, y + (h - ih) / 2, iw, ih);
}

/** 업로드한 사진을 정사각형으로 잘라 둡니다 (담요 칸에 쓰임). */
export async function fileToUpload(file: File): Promise<Upload> {
  const url = URL.createObjectURL(file);
  const img = await loadImage(url);
  const c = document.createElement('canvas');
  c.width = c.height = SIZE;
  drawCover(c.getContext('2d')!, img, 0, 0, SIZE, SIZE);
  URL.revokeObjectURL(url);
  const square = c.toDataURL('image/jpeg', 0.88);
  return { id: crypto.randomUUID(), square, img: await loadImage(square) };
}

function shapePath(ctx: CanvasRenderingContext2D, shape: Shape, x: number, y: number, s: number) {
  ctx.beginPath();
  if (shape === 'circle') {
    ctx.arc(x + s / 2, y + s / 2, s / 2, 0, Math.PI * 2);
  } else if (shape === 'heart') {
    const w = s, h = s;
    ctx.moveTo(x + w / 2, y + h * 0.93);
    ctx.bezierCurveTo(x - w * 0.05, y + h * 0.58, x + w * 0.02, y + h * 0.08, x + w * 0.27, y + h * 0.08);
    ctx.bezierCurveTo(x + w * 0.4, y + h * 0.08, x + w * 0.48, y + h * 0.17, x + w / 2, y + h * 0.27);
    ctx.bezierCurveTo(x + w * 0.52, y + h * 0.17, x + w * 0.6, y + h * 0.08, x + w * 0.73, y + h * 0.08);
    ctx.bezierCurveTo(x + w * 0.98, y + h * 0.08, x + w * 1.05, y + h * 0.58, x + w / 2, y + h * 0.93);
  } else if (shape === 'round') {
    const r = s * 0.16;
    ctx.roundRect(x, y, s, s, r);
  } else {
    ctx.rect(x, y, s, s);
  }
  ctx.closePath();
}

/** 와펜처럼 흰 테두리와 바느질 점선을 두른 패치 PNG를 만듭니다. */
export function makeSticker(img: HTMLImageElement, shape: Shape): string {
  const c = document.createElement('canvas');
  c.width = c.height = SIZE;
  const ctx = c.getContext('2d')!;
  const pad = 10, border = 22;
  // 테두리 천
  shapePath(ctx, shape, pad, pad, SIZE - pad * 2);
  ctx.fillStyle = '#fffaf0';
  ctx.fill();
  // 사진
  ctx.save();
  const inner = SIZE - (pad + border) * 2;
  shapePath(ctx, shape, pad + border, pad + border, inner);
  ctx.clip();
  drawCover(ctx, img, pad + border, pad + border, inner, inner);
  ctx.restore();
  // 바느질 점선
  ctx.setLineDash([14, 10]);
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#c4553b';
  shapePath(ctx, shape, pad + border / 2, pad + border / 2, SIZE - (pad + border / 2) * 2);
  ctx.stroke();
  return c.toDataURL('image/png');
}

/** 사진이 없어도 바로 해 볼 수 있도록 천 무늬 샘플을 그립니다. */
export async function sampleUploads(): Promise<Upload[]> {
  const draws: ((ctx: CanvasRenderingContext2D) => void)[] = [
    (ctx) => { // 깅엄
      ctx.fillStyle = '#fffdf8'; ctx.fillRect(0, 0, SIZE, SIZE);
      ctx.fillStyle = 'rgba(140,175,210,.55)';
      for (let i = 0; i < SIZE; i += 64) { ctx.fillRect(i, 0, 32, SIZE); ctx.fillRect(0, i, SIZE, 32); }
    },
    (ctx) => { // 물방울
      ctx.fillStyle = '#f3c9c4'; ctx.fillRect(0, 0, SIZE, SIZE);
      ctx.fillStyle = '#c4553b';
      for (let y = 0; y < SIZE; y += 48) for (let x = (y / 48) % 2 ? 24 : 0; x < SIZE; x += 48) { ctx.beginPath(); ctx.arc(x, y, 7, 0, 7); ctx.fill(); }
    },
    (ctx) => { // 골지
      ctx.fillStyle = '#f7efdc'; ctx.fillRect(0, 0, SIZE, SIZE);
      ctx.fillStyle = '#f4dc8f';
      for (let x = 0; x < SIZE; x += 26) ctx.fillRect(x, 0, 17, SIZE);
    },
    (ctx) => { // 네이비 별점
      ctx.fillStyle = '#454b78'; ctx.fillRect(0, 0, SIZE, SIZE);
      ctx.fillStyle = '#fffdf8';
      for (let y = 20; y < SIZE; y += 56) for (let x = (y / 56) % 2 ? 48 : 20; x < SIZE; x += 56) { ctx.beginPath(); ctx.arc(x, y, 5, 0, 7); ctx.fill(); }
    },
    (ctx) => { // 세이지 누빔
      ctx.fillStyle = '#c9d8b0'; ctx.fillRect(0, 0, SIZE, SIZE);
      ctx.strokeStyle = 'rgba(255,255,255,.8)'; ctx.lineWidth = 4;
      for (let i = -SIZE; i < SIZE * 2; i += 60) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i + SIZE, SIZE); ctx.moveTo(i, SIZE); ctx.lineTo(i + SIZE, 0); ctx.stroke(); }
    },
  ];
  return Promise.all(draws.map(async (d) => {
    const c = document.createElement('canvas');
    c.width = c.height = SIZE;
    d(c.getContext('2d')!);
    const square = c.toDataURL('image/png');
    return { id: crypto.randomUUID(), square, img: await loadImage(square) };
  }));
}

export function download(dataUrl: string, name: string) {
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = name;
  a.click();
}
