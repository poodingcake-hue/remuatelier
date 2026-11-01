import Link from 'next/link';

/** 로고 블록을 단순화한 자리표시용 마크. 실제 로고 파일로 교체하세요. */
export default function Logo() {
  return (
    <Link href="/" className="logo-wrap" aria-label="리뮤아틀리에 홈">
      <span className="logo" aria-hidden>
        <span style={{ background: 'var(--mustard)' }}>R</span>
        <span style={{ background: 'var(--brick)' }}>E</span>
        <span style={{ background: 'var(--olive)' }}>M</span>
        <span style={{ background: 'var(--navy)' }}>U</span>
      </span>
      <span className="logo-name">리뮤아틀리에</span>
    </Link>
  );
}
