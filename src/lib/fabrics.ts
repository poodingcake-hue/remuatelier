// 아기옷에서 흔히 보는 천 무늬를 CSS로 흉내 낸 패치들.
// 실제 사진이 준비되기 전까지 사이트 곳곳의 '천 조각' 자리를 채웁니다.
import type { CSSProperties } from 'react';

const c = {
  cream: '#f7efdc',
  butter: '#f4dc8f',
  pink: '#f3c9c4',
  rose: '#e9a39a',
  sky: '#bcd2e6',
  sage: '#c9d8b0',
  mustard: '#e2a72e',
  brick: '#c4553b',
  olive: '#6e8b3d',
  navy: '#454b78',
  white: '#fffdf8',
};

export const fabrics: CSSProperties[] = [
  // 깅엄 체크
  { background: `repeating-linear-gradient(0deg, ${c.sky}aa 0 10px, transparent 10px 20px), repeating-linear-gradient(90deg, ${c.sky}aa 0 10px, ${c.white} 10px 20px)` },
  // 물방울
  { background: `radial-gradient(${c.brick} 2.4px, transparent 2.8px) 0 0 / 16px 16px, ${c.pink}` },
  // 골지 줄무늬
  { background: `repeating-linear-gradient(90deg, ${c.butter} 0 6px, ${c.cream} 6px 9px)` },
  // 무지 세이지
  { background: c.sage },
  // 가로 줄무늬
  { background: `repeating-linear-gradient(0deg, ${c.navy} 0 3px, ${c.white} 3px 14px)` },
  // 작은 꽃 (점 두 겹)
  { background: `radial-gradient(${c.rose} 3px, transparent 3.5px) 0 0 / 22px 22px, radial-gradient(${c.mustard} 1.6px, transparent 2px) 11px 11px / 22px 22px, ${c.cream}` },
  // 무지 버터
  { background: c.butter },
  // 누빔(퀼팅) 다이아
  { background: `repeating-linear-gradient(45deg, transparent 0 13px, ${c.white}cc 13px 14.5px), repeating-linear-gradient(-45deg, transparent 0 13px, ${c.white}cc 13px 14.5px), ${c.rose}` },
  // 체크 (올리브)
  { background: `repeating-linear-gradient(0deg, ${c.olive}55 0 6px, transparent 6px 18px), repeating-linear-gradient(90deg, ${c.olive}55 0 6px, ${c.cream} 6px 18px)` },
  // 무지 하늘
  { background: c.sky },
  // 물방울 (네이비 바탕)
  { background: `radial-gradient(${c.white} 2px, transparent 2.5px) 0 0 / 14px 14px, ${c.navy}` },
  // 거즈 결
  { background: `repeating-linear-gradient(0deg, ${c.white}88 0 1px, transparent 1px 4px), repeating-linear-gradient(90deg, ${c.white}88 0 1px, transparent 1px 4px), ${c.pink}` },
  // 세로 굵은 줄무늬
  { background: `repeating-linear-gradient(90deg, ${c.mustard} 0 12px, ${c.white} 12px 24px)` },
  // 무지 크림
  { background: c.cream },
  // 체크 (브릭)
  { background: `repeating-linear-gradient(0deg, ${c.brick}44 0 8px, transparent 8px 16px), repeating-linear-gradient(90deg, ${c.brick}44 0 8px, ${c.white} 8px 16px)` },
  // 별 대신 점선 줄
  { background: `radial-gradient(${c.navy} 1.6px, transparent 2px) 0 0 / 10px 20px, ${c.sky}` },
];

export const fabric = (i: number): CSSProperties => fabrics[((i % fabrics.length) + fabrics.length) % fabrics.length];
