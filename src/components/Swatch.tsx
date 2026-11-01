import type { CSSProperties } from 'react';
import { fabric } from '@/lib/fabrics';

/** 바느질 점선이 들어간 천 조각 */
export default function Swatch({ i, className = '', style }: { i: number; className?: string; style?: CSSProperties }) {
  return <div className={`fabric ${className}`} style={{ ...fabric(i), ...style }} aria-hidden />;
}
