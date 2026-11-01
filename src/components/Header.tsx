'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Logo from './Logo';

const links = [
  { href: '/about', label: '이야기' },
  { href: '/collection', label: '작품' },
  { href: '/stories', label: '옷장 편지' },
  { href: '/studio', label: '미리 만들어 보기' },
  { href: '/how', label: '맡기는 방법' },
  { href: '/reserve', label: '예약' },
];

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);

  return (
    <header className="header">
      <div className="wrap header-in">
        <Logo />
        <button className="menu-btn" aria-expanded={open} aria-controls="site-nav" aria-label="메뉴 열기" onClick={() => setOpen((v) => !v)}>
          <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="3 2.2" />
            )}
          </svg>
        </button>
        <nav id="site-nav" className="nav" data-open={open} aria-label="주 메뉴">
          {links.map((l) => (
            <Link key={l.href} href={l.href} aria-current={path === l.href ? 'page' : undefined}>
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
