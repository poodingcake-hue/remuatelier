'use client';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { fileToUpload, sampleUploads, type Upload } from '@/lib/patch';
import BlanketStudio from './BlanketStudio';

const BagStudio = dynamic(() => import('./BagStudio'), {
  ssr: false,
  loading: () => <div className="canvas3d" style={{ display: 'grid', placeItems: 'center' }}><p className="muted small">가방을 꺼내는 중…</p></div>,
});

type Tab = 'blanket' | 'bag';

export default function Studio() {
  const [tab, setTab] = useState<Tab>('blanket');
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    sampleUploads().then((s) => { setUploads(s); setSelected(s[0].id); });
  }, []);

  const add = async (files: FileList | null) => {
    if (!files?.length) return;
    setBusy(true);
    try {
      const list = await Promise.all(Array.from(files).filter((f) => f.type.startsWith('image/')).map(fileToUpload));
      setUploads((u) => [...list, ...u]);
      if (list[0]) setSelected(list[0].id);
    } finally {
      setBusy(false);
    }
  };

  const tray = (
    <div className="panel">
      <div
        className="drop"
        role="button"
        tabIndex={0}
        onClick={() => input.current?.click()}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && input.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); add(e.dataTransfer.files); }}
      >
        <strong style={{ color: 'var(--ink)' }}>{busy ? '사진을 자르는 중…' : '아이 옷 사진 올리기'}</strong>
        <span className="small">옷을 펼쳐 무늬가 잘 보이게 찍어 주세요. 사진은 이 기기 밖으로 나가지 않아요.</span>
        <input ref={input} type="file" accept="image/*" multiple hidden onChange={(e) => { add(e.target.files); e.target.value = ''; }} />
      </div>
      <div>
        <p className="small muted" style={{ marginBottom: 8 }}>조각을 골라 {tab === 'blanket' ? '담요 칸을 누르세요' : '가방을 누르세요'}</p>
        <div className="tray">
          {uploads.map((u, i) => (
            <button key={u.id} aria-pressed={selected === u.id} aria-label={`조각 ${i + 1}`} onClick={() => setSelected(u.id)}>
              <img src={u.square} alt="" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="stack" style={{ gap: 24 }}>
      <div className="tabs" role="tablist" aria-label="만들 작품">
        <button role="tab" aria-selected={tab === 'blanket'} onClick={() => setTab('blanket')}>패치워크 담요</button>
        <button role="tab" aria-selected={tab === 'bag'} onClick={() => setTab('bag')}>가방 (3D)</button>
      </div>
      {tab === 'blanket' ? (
        <BlanketStudio uploads={uploads} selected={selected} tray={tray} />
      ) : (
        <BagStudio uploads={uploads} selected={selected} tray={tray} />
      )}
      <p className="note">미리 보기는 상상을 돕는 도구예요. 실제 배치는 작가가 옷의 무늬와 결을 보고 조정합니다. 저장한 그림을 사연과 함께 보내 주시면 최대한 반영할게요.</p>
    </div>
  );
}
