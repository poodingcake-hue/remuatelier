import { STORE_URL } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-in">
        <p className="hand" style={{ fontSize: 17, color: 'var(--ink)' }}>아이의 시간이 담긴 옷을, 오늘의 온기로.</p>
        <p>
          결제와 리뷰는 <a href={STORE_URL} target="_blank" rel="noreferrer">네이버 스마트스토어</a>에서 진행합니다.
        </p>
        <p>© 리뮤아틀리에</p>
      </div>
    </footer>
  );
}
