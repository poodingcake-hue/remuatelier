'use client';
import { useState, type FormEvent } from 'react';

// MVP: 서버가 아직 없어서 제출 내용은 화면에만 확인으로 보여 줍니다.
// TODO: /api/subscribe, /api/letters 를 만들어 알림톡·DB와 연결

export function AlertForm() {
  const [done, setDone] = useState<string | null>(null);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = new FormData(e.currentTarget).get('name') as string;
    setDone(name || '고객');
  };
  if (done) return <p className="form-ok">{done}님, 알림을 신청했어요. 오픈 하루 전과 당일에 문자로 알려드릴게요.</p>;
  return (
    <form onSubmit={submit} className="stack" style={{ gap: 14 }}>
      <div className="field"><label htmlFor="a-name">이름</label><input id="a-name" name="name" autoComplete="name" required /></div>
      <div className="field"><label htmlFor="a-phone">휴대폰 번호</label><input id="a-phone" name="phone" type="tel" inputMode="tel" placeholder="010-0000-0000" autoComplete="tel" required /></div>
      <div className="field">
        <label htmlFor="a-item">관심 있는 작품</label>
        <select id="a-item" name="item" defaultValue="blanket-s">
          <option value="blanket-s">패치워크 담요 (작은)</option>
          <option value="blanket-l">패치워크 담요 (큰)</option>
          <option value="tote">미니 토트백</option>
          <option value="pouch-bag">복주머니</option>
          <option value="basket">패브릭 바구니</option>
          <option value="etc">아직 고민 중</option>
        </select>
      </div>
      <label className="small" style={{ display: 'flex', gap: 8, alignItems: 'start' }}>
        <input type="checkbox" required style={{ marginTop: 5 }} /> 예약 알림을 위한 개인정보 수집에 동의합니다.
      </label>
      <button className="btn" type="submit">알림 신청</button>
    </form>
  );
}

const STAGES = ['옷 도착', '재단', '바느질', '마무리', '발송'];
const DEMO: Record<string, { stage: number; note: string }> = {
  'REMU-0001': { stage: 2, note: '조각을 이어 앞판을 꿰매고 있어요. 배냇저고리 리본은 가운데 칸에 놓았습니다.' },
};

export function TrackForm() {
  const [code, setCode] = useState('');
  const [res, setRes] = useState<{ stage: number; note: string } | null | 'none'>(null);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setRes(DEMO[code.trim().toUpperCase()] ?? 'none');
  };
  return (
    <div className="stack" style={{ gap: 16 }}>
      <form onSubmit={submit} className="stack" style={{ gap: 12 }}>
        <div className="field">
          <label htmlFor="code">작업 번호</label>
          <input id="code" value={code} onChange={(e) => setCode(e.target.value)} placeholder="예: REMU-0001" />
        </div>
        <button className="btn btn-line" type="submit">작업 일지 보기</button>
      </form>
      {res === 'none' && <p className="small" role="alert">해당 번호의 작업을 찾지 못했어요. 문자로 받은 번호를 다시 확인해 주세요.</p>}
      {res && res !== 'none' && (
        <div className="stack" style={{ gap: 14 }}>
          <ol className="track">
            {STAGES.map((s, i) => (
              <li key={s} data-done={i <= res.stage}><span />{s}</li>
            ))}
          </ol>
          <p className="hand" style={{ fontSize: 17 }}>“{res.note}”</p>
        </div>
      )}
    </div>
  );
}

export function LetterForm() {
  const [sent, setSent] = useState(false);
  if (sent) return <p className="form-ok">편지를 받았어요. 게재 전에 꼭 한 번 더 여쭤볼게요.</p>;
  return (
    <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="stack" style={{ gap: 14 }}>
      <div className="field"><label htmlFor="l-who">아이를 부르는 이름</label><input id="l-who" name="who" placeholder="예: 우리 첫째" /></div>
      <div className="field"><label htmlFor="l-text">이 옷을 입던 날</label><textarea id="l-text" name="text" rows={4} required placeholder="처음 집에 오던 날 입었던 옷이에요." /></div>
      <div className="field"><label htmlFor="l-photo">사진 (선택)</label><input id="l-photo" name="photo" type="file" accept="image/*" multiple /></div>
      <button className="btn" type="submit">편지 보내기</button>
    </form>
  );
}
