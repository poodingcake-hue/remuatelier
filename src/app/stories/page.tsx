import StoryCard from '@/components/StoryCard';
import { stories } from '@/lib/data';
import Link from 'next/link';

export const metadata = { title: '옷장 편지' };

export default function Stories() {
  return (
    <>
      <section className="wrap page-head">
        <h1>옷장 편지</h1>
        <p className="lead">원래의 옷, 다시 태어난 물건, 그리고 받은 날의 한마디를 모았어요.</p>
      </section>
      <section className="section">
        <div className="wrap stack" style={{ gap: 32 }}>
          <div className="stories">
            {[...stories, ...stories].map((s, i) => <StoryCard key={i} s={s} />)}
          </div>
          <div className="notice">
            <div>
              <strong>우리 아이 이야기도 들려주세요</strong>
              <p className="small muted">받은 날의 사진과 한마디를 보내 주시면 동의를 받아 이곳에 실어 드려요.</p>
            </div>
            <Link className="btn" href="/reserve#letter">편지 보내기</Link>
          </div>
        </div>
      </section>
    </>
  );
}
