'use client';
import { useState } from 'react';
import { products, won } from '@/lib/data';

export default function ClothesCalculator() {
  const [n, setN] = useState(7);
  const fits = products.filter((p) => p.clothes !== null && p.clothes <= n).sort((a, b) => (b.clothes ?? 0) - (a.clothes ?? 0));
  const next = products.filter((p) => p.clothes !== null && p.clothes > n).sort((a, b) => (a.clothes ?? 0) - (b.clothes ?? 0))[0];

  return (
    <div className="calc">
      <label htmlFor="cnt" style={{ fontWeight: 600 }}>가지고 있는 옷</label>
      <div className="calc-row">
        <span className="calc-count" aria-live="polite">{n}벌</span>
        <input id="cnt" type="range" min={1} max={30} value={n} onChange={(e) => setN(Number(e.target.value))} />
      </div>
      <div className="calc-result">
        <p className="small muted">이만큼이면 만들 수 있어요</p>
        <ul>
          {fits.map((p) => (
            <li key={p.id}><span>{p.name}</span><span className="muted">{p.clothes}벌 · {won(p.price)}</span></li>
          ))}
        </ul>
        {next && <p className="small muted">{next.clothes! - n}벌이 더 있으면 {next.name}도 만들 수 있어요.</p>}
      </div>
    </div>
  );
}
