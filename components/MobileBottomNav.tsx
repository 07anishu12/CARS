'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Hide on deep showroom pages if needed
  if (/^\/cars\/[^/]+\/[^/]+/.test(pathname)) return null;

  const navItems = [
    {
      label: 'Home',
      href: '/',
      icon: (active: boolean) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      )
    },
    {
      label: 'Cars',
      href: '/cars',
      icon: (active: boolean) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? '2.5' : '2'} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      )
    },
    {
      label: 'Compare',
      href: '/compare',
      icon: (active: boolean) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? '2.5' : '2'} strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      )
    },
    {
      label: 'Research',
      href: '/guides',
      icon: (active: boolean) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? '2.5' : '2'} strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      )
    }
  ];

  return (
    <>
      <nav aria-label="Mobile Navigation Bar" className="mobile-bottom-nav">
        <div className="nav-inner">
          {navItems.map((item) => {
            const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-item ${isActive ? 'active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                <div className="nav-icon-wrap">{item.icon(isActive)}</div>
                <span className="nav-label">{item.label}</span>
              </Link>
            );
          })}

          {/* 5th item: Menu button */}
          <button
            type="button"
            className={`nav-item ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close quick menu' : 'Open quick menu'}
          >
            <div className="nav-icon-wrap">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </div>
            <span className="nav-label">Menu</span>
          </button>
        </div>
      </nav>

      {/* Quick Menu Sheet when Menu button clicked */}
      {menuOpen && (
        <div
          className="menu-sheet-overlay"
          onClick={() => setMenuOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Quick site navigation"
        >
          <div className="menu-sheet-card" onClick={(e) => e.stopPropagation()}>
            <div className="sheet-top-bar">
              <span className="sheet-heading">Quick Navigation</span>
              <button
                type="button"
                className="sheet-close"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <div className="sheet-links-grid">
              <Link href="/cars" className="sheet-link" onClick={() => setMenuOpen(false)}>
                <span>Explore All Cars</span>
                <span aria-hidden="true">→</span>
              </Link>
              <Link href="/compare" className="sheet-link" onClick={() => setMenuOpen(false)}>
                <span>Car Comparison Desk</span>
                <span aria-hidden="true">→</span>
              </Link>
              <Link href="/emi-calculator" className="sheet-link" onClick={() => setMenuOpen(false)}>
                <span>EMI & Loan Calculator</span>
                <span aria-hidden="true">→</span>
              </Link>
              <Link href="/ai-advisor" className="sheet-link" onClick={() => setMenuOpen(false)}>
                <span>AI Car Advisor</span>
                <span aria-hidden="true">→</span>
              </Link>
              <Link href="/new-cars" className="sheet-link" onClick={() => setMenuOpen(false)}>
                <span>2026 New Launches</span>
                <span aria-hidden="true">→</span>
              </Link>
              <Link href="/guides" className="sheet-link" onClick={() => setMenuOpen(false)}>
                <span>Automotive Buying Guides</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .mobile-bottom-nav {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 999;
          height: 64px;
          background: rgba(11, 21, 19, 0.92);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: env(safe-area-inset-bottom, 0px);
          box-shadow: 0 -8px 24px rgba(0, 0, 0, 0.5);
        }

        .nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-around;
          height: 100%;
          max-width: 500px;
          margin: 0 auto;
        }

        .nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex: 1;
          height: 100%;
          min-height: 48px;
          min-width: 44px;
          text-decoration: none;
          color: rgba(255, 255, 255, 0.5);
          gap: 3px;
          transition: all 150ms ease;
          background: transparent;
          border: none;
          cursor: pointer;
          font-family: inherit;
          user-select: none;
          -webkit-tap-highlight-color: transparent;
        }

        .nav-icon-wrap {
          display: grid;
          place-items: center;
          transition: transform 150ms ease;
        }

        .nav-label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: -0.01em;
        }

        .nav-item.active {
          color: #00E887;
        }

        .nav-item.active .nav-icon-wrap {
          filter: drop-shadow(0 0 8px rgba(0, 232, 135, 0.6));
        }

        .nav-item.active .nav-label {
          font-weight: 700;
          color: #00E887;
        }

        @media (max-width: 768px) {
          .mobile-bottom-nav {
            display: block;
          }
        }

        /* Menu Sheet */
        .menu-sheet-overlay {
          position: fixed;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.65);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          z-index: 1000;
          display: flex;
          align-items: flex-end;
        }

        .menu-sheet-card {
          width: 100%;
          background-color: var(--surface);
          border-top: 1px solid var(--border);
          border-radius: var(--radius-xl) var(--radius-xl) 0 0;
          padding: 20px 20px calc(24px + env(safe-area-inset-bottom, 0px));
          display: flex;
          flex-direction: column;
          gap: 16px;
          animation: slideUp 200ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

        .sheet-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border-subtle);
        }

        .sheet-heading {
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .sheet-close {
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-size: 18px;
          cursor: pointer;
          padding: 4px;
        }

        .sheet-links-grid {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .sheet-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          min-height: 48px;
          border-radius: var(--radius-md);
          background-color: var(--surface-elevated);
          border: 1px solid var(--border);
          color: var(--text-primary);
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
        }

        .sheet-link:active {
          background-color: var(--surface);
        }
      `}</style>
    </>
  );
};

export default MobileBottomNav;
