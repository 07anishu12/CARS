'use client';
import React, { useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useWishlist } from '../hooks/useWishlist';
import { useTheme } from '../hooks/useTheme';
export interface StickyNavProps { exploreHref?: string; compareHref?: string; emiHref?: string; aiAdvisorHref?: string; accountHref?: string; }
export default function StickyNav({ exploreHref='/cars', compareHref='/compare', emiHref='/emi-calculator', aiAdvisorHref='/ai-advisor', accountHref='/account' }: StickyNavProps) {
  const pathname = usePathname();
  const { wishlist } = useWishlist();
  const { theme, setTheme } = useTheme();
  const dialog = useRef<HTMLDialogElement>(null);
  const links = [['Explore cars',exploreHref],['New cars','/new-cars'],['Compare',compareHref],['Buying guides','/guides'],['Tools',emiHref]];
  return <><header className="kerb-nav"><nav className="kerb-shell kerb-nav-inner" aria-label="Main Navigation"><Link href="/" className="kerb-wordmark" aria-label="KERB Homepage">KERB<span> /</span></Link><div className="nav-desktop">{links.map(([name,url]) => <Link key={name} href={url} aria-current={pathname === url ? 'page' : undefined}>{name}</Link>)}</div><div className="nav-utilities"><button className="theme-toggle" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'} title={theme === 'light' ? 'Try dark mode' : 'Switch to light mode'}>{theme === 'light' ? '☾' : '☀'}</button><Link href="/wishlist" aria-label={`Wishlist, ${wishlist.length} cars`}>Shortlist <span>{wishlist.length}</span></Link><button className="menu-toggle" onClick={() => dialog.current?.showModal()} aria-label="Open navigation menu">Menu ☰</button></div></nav></header><dialog ref={dialog} className="nav-dialog" aria-label="Navigation menu"><div className="dialog-top"><strong className="kerb-wordmark">KERB /</strong><button className="action secondary" onClick={() => dialog.current?.close()}>Close ×</button></div><nav aria-label="More navigation">{[...links,['Used cars','/used-cars'],['AI advisor',aiAdvisorHref],['Account',accountHref]].map(([name,url]) => <Link key={name} href={url} onClick={() => dialog.current?.close()}>{name} ↗</Link>)}</nav><label className="theme-field">Appearance<select value={theme} onChange={e => setTheme(e.target.value as 'dark'|'light'|'luxury')}><option value="dark">Dark</option><option value="light">Light</option><option value="luxury">Luxury</option></select></label></dialog></>;
}
