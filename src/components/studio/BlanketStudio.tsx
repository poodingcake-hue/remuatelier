'use client';
import { useEffect, useState, type ReactNode } from 'react';
import { download, loadImage, type Upload } from '@/lib/patch';

const GRIDS = [
  { n: 3, label: '작은 담요 (3×3)' },
  { n: 4, label: '큰 담요 (4×4)' },
];

export default function BlanketStudio({ uploads, selected, tray }: { uploads: Upload[]; selected: string | null; tray: ReactNode }) {
  const [n, setN] = useState(3);
  const [cells, setCells] = useState<(string | null)[]>(Array(9).fill(null));

  useEffect(() => {
    setCells((c) => Array.from({ length: n * n }, (_, i) => c[i] ?? null));
  }, [n]);

  const byId = (id: string | null) => uploads.find((u) => u.id === id);

  const place = (i: number) => {
    setCells((c) => {
      const next = [...c];
      next[i] = next[i] === selected ? null : selected;
      return next;
    });
  };

  const fill = () => {
    if (!uploads.length) return;
    setCells((c) => c.map((_, i) => uploads[(i * 7 + Math.floor(i / n)) % uploads.length].id));
  };

  const save = async () => {
    const size = 900, border = 36, cell = (size - border * 2) / n;
    const cv = document.createElement('canvas');
    cv.width = cv.height = size;
    const ctx = cv.getContext('2d')!;
    ctx.fillStyle = '#efe7d6';
    ctx.fillRect(0, 0, size, size);
    for (let i = 0; i < cells.length; i++) {
      const x = border + (i % n) * cell, y = border + Math.floor(i / n) * cell;
      const u = byId(cells[i]);
      if (u) ctx.drawImage(await loadImage(u.square), x, y, cell, cell);
      else { ctx.fillStyle = '#f6f1e7'; ctx.fillRect(x, y, cell, cell); }
      ctx.setLineDash([10, 8]);
      ctx.strokeStyle = 'rgba(255,255,255,.85)';
      ctx.lineWidth = 3;
      ctx.strokeRect(x + 7, y + 7, cell - 14, cell - 14);
    }
    download(cv.toDataURL('image/png'), 'remu-blanket.png');
  };

  const filled = cells.filter(Boolean).length;

  return (
    <div className="studio">
      <div className="stack" style={{ gap: 12 }}>
        <div className="blanket" style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}>
          {cells.map((id, i) => {
            const u = byId(id);
            return (
              <button key={i} className={u ? '' : 'empty'} onClick={() => place(i)} aria-label={`${i + 1}번 칸${u ? ', 조각 있음' : ', 비어 있음'}`}>
                {u && <img src={u.square} alt="" />}
              </button>
            );
          })}
        </div>
        <p className="small muted">{filled} / {cells.length}칸 채움 · 같은 조각으로 다시 누르면 비워져요</p>
      </div>
      <div className="stack" style={{ gap: 16 }}>
        <div className="shape-row" role="group" aria-label="담요 크기">
          {GRIDS.map((g) => (
            <button key={g.n} aria-pressed={n === g.n} onClick={() => setN(g.n)}>{g.label}</button>
          ))}
        </div>
        {tray}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button className="btn btn-line" onClick={fill}>조각 골고루 채우기</button>
          <button className="btn btn-line" onClick={() => setCells(Array(n * n).fill(null))}>모두 비우기</button>
          <button className="btn" onClick={save} disabled={!filled}>그림으로 저장</button>
        </div>
      </div>
    </div>
  );
}
