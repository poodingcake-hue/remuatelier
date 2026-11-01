import Swatch from '@/components/Swatch';
import ClothesCalculator from '@/components/ClothesCalculator';
import { products, won, STORE_URL } from '@/lib/data';

export const metadata = { title: '작품' };

export default function Collection() {
  return (
    <>
      <section className="wrap page-head">
        <h1>일곱 벌의 옷이 한 장의 담요가 되기까지</h1>
        <p className="lead">모든 작품은 보내 주신 옷으로만 지어요. 같은 무늬는 세상에 하나뿐입니다.</p>
      </section>

      <section className="section">
        <div className="wrap two">
          <div className="stack" style={{ gap: 12 }}>
            <h2>옷 개수로 고르기</h2>
            <p className="muted">막대를 움직여 가진 옷의 수를 맞춰 보세요.</p>
          </div>
          <ClothesCalculator />
        </div>
      </section>

      <section className="section">
        <div className="wrap products">
          {products.map((p) => (
            <article key={p.id} className="product">
              <Swatch i={p.fabric} />
              <div className="product-meta">
                <b>{p.name}</b>
                <span className={p.open ? 'chip' : 'chip chip-closed'}>{p.open ? '주문 가능' : '다음 오픈 대기'}</span>
              </div>
              <p className="muted small">{p.clothes ? `옷 ${p.clothes}벌` : p.clothesNote} · {won(p.price)}</p>
              <p className="muted">{p.desc}</p>
            </article>
          ))}
        </div>
        <div className="wrap" style={{ marginTop: 32 }}>
          <p className="small muted">가격은 스마트스토어 할인가 기준이며 바뀔 수 있어요. <a href={STORE_URL} target="_blank" rel="noreferrer">스토어에서 확인하기</a></p>
        </div>
      </section>
    </>
  );
}
