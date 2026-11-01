import Link from 'next/link';
import { steps, faqs } from '@/lib/data';

export const metadata = { title: '맡기는 방법' };

export default function How() {
  return (
    <>
      <section className="wrap page-head">
        <h1>옷과 함께, 그 옷을 입던 날의 이야기도 보내 주세요</h1>
        <p className="lead">예약부터 받는 날까지 다섯 단계예요. 옷이 도착한 날부터 최대 한 달이 걸립니다.</p>
      </section>
      <section className="section">
        <div className="wrap two">
          <ol className="steps">
            {steps.map((s) => (
              <li key={s.title}><h3>{s.title}</h3><p className="muted">{s.body}</p></li>
            ))}
          </ol>
          <div className="stack" style={{ alignContent: 'start' }}>
            <div className="calc">
              <h3>옷 보내는 곳</h3>
              <p className="muted">{/* TODO: 실제 주소로 교체 */}예약이 확정되면 문자로 주소를 알려드려요.</p>
              <p className="small muted">상자 안에 주문자 이름과 연락처, 사연 메모를 함께 넣어 주세요.</p>
            </div>
            <Link href="/reserve" className="btn">예약 알림 받기</Link>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap stack">
          <h2>자주 묻는 질문</h2>
          <div className="faq">
            {faqs.map((f) => (
              <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
