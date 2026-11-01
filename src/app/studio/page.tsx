import Studio from '@/components/studio/Studio';

export const metadata = { title: '미리 만들어 보기' };

export default function StudioPage() {
  return (
    <>
      <section className="wrap page-head">
        <h1>우리 아이 옷으로 미리 만들어 보기</h1>
        <p className="lead">옷 사진을 올려 담요 칸에 놓아 보거나, 가방에 조각을 오려 붙여 보세요.</p>
      </section>
      <section className="section" style={{ paddingTop: 32 }}>
        <div className="wrap"><Studio /></div>
      </section>
    </>
  );
}
