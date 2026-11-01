import Link from 'next/link';
import Quilt from '@/components/Quilt';
import StoryCard from '@/components/StoryCard';
import Swatch from '@/components/Swatch';
import { NEXT_OPEN, openLabel, stories } from '@/lib/data';

const sizes = [
  { n: 1, name: '패브릭 바구니', f: 2 },
  { n: 3, name: '복주머니', f: 14 },
  { n: 7, name: '작은 담요', f: 0 },
  { n: 17, name: '큰 담요', f: 7 },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <h1>
              <span className="line">작아진 옷,</span>
              <span className="line">커지는 이야기</span>
            </h1>
            <p className="lead">
              아이가 입던 옷을 한 벌씩 받아, 한 땀씩 이어 담요와 가방으로 지어 드려요.
              버리기엔 너무 많은 날들이 묻어 있으니까요.
            </p>
            <div className="hero-cta">
              <Link className="btn" href="/studio">우리 아이 옷으로 미리 만들어 보기</Link>
              <Link className="btn btn-line" href="/reserve">다음 예약 알림 받기</Link>
            </div>
          </div>
          <Quilt />
        </div>
      </section>

      <div className="wrap">
        <div className="notice">
          <div>
            <p className="small muted">다음 바느질 자리</p>
            <strong>{openLabel()} · {NEXT_OPEN.slots}자리</strong>
          </div>
          <Link className="btn" href="/reserve">알림 신청</Link>
        </div>
      </div>

      <section className="section">
        <div className="wrap stack" style={{ gap: 32 }}>
          <div className="stack" style={{ gap: 10 }}>
            <h2>옷장 편지</h2>
            <p className="lead">옷을 맡겨 주신 분들이 받은 날 남겨 주신 이야기예요.</p>
          </div>
          <div className="stories">
            {stories.map((s, i) => <StoryCard key={i} s={s} />)}
          </div>
          <Link href="/stories" className="btn btn-line" style={{ justifySelf: 'start' }}>편지 더 읽기</Link>
        </div>
      </section>

      <section className="section">
        <div className="wrap stack" style={{ gap: 28 }}>
          <div className="stack" style={{ gap: 10 }}>
            <h2>옷이 몇 벌 있나요?</h2>
            <p className="lead">한 벌부터 열일곱 벌까지, 가진 옷의 수에 맞춰 만들 수 있는 게 달라져요.</p>
          </div>
          <div className="products" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 16 }}>
            {sizes.map((s) => (
              <Link key={s.n} href="/collection" style={{ textDecoration: 'none' }} className="product">
                <Swatch i={s.f} style={{ aspectRatio: '1', borderRadius: 10 }} />
                <div className="product-meta"><b>{s.n}벌</b><span className="muted small">{s.name}</span></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap two">
          <div className="stack" style={{ gap: 12 }}>
            <h2>옷과 함께, 그날의 이야기도 보내 주세요</h2>
            <p className="lead">예약부터 손편지가 담긴 상자를 여는 날까지, 한 달 남짓의 여정이에요.</p>
            <Link href="/how" className="btn btn-line" style={{ justifySelf: 'start', marginTop: 8 }}>맡기는 방법 보기</Link>
          </div>
          <ol className="steps">
            <li><h3>예약하기</h3><p className="muted">한 달에 한 번, 정해진 수량만 받아요.</p></li>
            <li><h3>옷과 사연 보내기</h3><p className="muted">세탁한 옷에 짧은 메모를 함께 넣어 주세요.</p></li>
            <li><h3>작업 일지로 지켜보기</h3><p className="muted">재단과 바느질 사진을 단계마다 올려 드려요.</p></li>
            <li><h3>받는 날</h3><p className="muted">완성품과 작가의 손편지가 함께 도착합니다.</p></li>
          </ol>
        </div>
      </section>
    </>
  );
}
