import Swatch from '@/components/Swatch';

export const metadata = { title: '이야기' };

const values = [
  { t: '기억', b: '옷 한 조각이 그날의 장면이에요. 똑딱이, 리본, 작은 얼룩까지 이야기로 봅니다.', f: 1 },
  { t: '온기', b: '장식장에 두는 물건보다 아이가 덮고 안는 물건을 만들어요.', f: 6 },
  { t: '손', b: '한 벌씩 받아 한 장씩 꿰매요. 그래서 한 달에 받을 수 있는 수가 정해져 있어요.', f: 8 },
  { t: '이어짐', b: '오늘의 담요가 언젠가 아이에게 건네는 선물이 되고, 동생에게 이어집니다.', f: 10 },
];

export default function About() {
  return (
    <>
      <section className="wrap page-head">
        <h1>옷은 작아져도, 그날은 그대로</h1>
        <p className="lead">리뮤(REMU)는 다시(Re) 쓰이는 무늬(Mu)라는 뜻을 담았어요.</p>
      </section>

      <section className="section">
        <div className="wrap two">
          <div className="prose">
            <p>
              {/* TODO: 작가님이 직접 쓰는 시작 이야기로 교체 */}
              아이가 자라는 속도만큼 옷장은 빠르게 차올라요. 한 번 입고 작아진 배냇저고리, 처음 걸음마를 뗀 날 입었던 내복.
              버리자니 미안하고, 두자니 짐이 되는 옷들을 보며 이 일을 시작했습니다.
            </p>
            <p>
              리뮤아틀리에는 그 옷들을 다시 아이 곁으로 돌려보내는 작은 작업실이에요.
              보내 주신 옷의 무늬를 하나하나 펼쳐 놓고, 어떤 조각이 어디에 놓일지 오래 고민한 뒤에 가위를 듭니다.
            </p>
          </div>
          <Swatch i={13} style={{ aspectRatio: '4 / 3', borderRadius: 14 }} />
        </div>
      </section>

      <section className="section">
        <div className="wrap stack" style={{ gap: 28 }}>
          <h2>작업대 위에서 지키는 것</h2>
          <div className="products">
            {values.map((v) => (
              <div key={v.t} className="stack" style={{ gap: 10 }}>
                <Swatch i={v.f} style={{ height: 10, borderRadius: 5 }} />
                <h3>{v.t}</h3>
                <p className="muted">{v.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
