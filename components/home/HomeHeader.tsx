'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '../../hooks/useTheme';

export interface HomeHeaderProps {
  onOpenLeadModal?: () => void;
}

export default function HomeHeader({ onOpenLeadModal }: HomeHeaderProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const navLinks = [
    { label: 'Cars', href: '/cars' },
    { label: 'Compare', href: '/compare' },
    { label: 'Research', href: '/guides' },
    { label: 'Guides', href: '/guides' }
  ];

  return (
    <>
      <header className={`kerb-unified-header ${isScrolled ? 'is-scrolled' : ''}`} role="banner">
        <div className="kerb-container header-inner">
          {/* Left: Logo with Green Star & Tagline */}
          <div className="header-left">
            <Link href="/" className="header-logo" aria-label="KERB Homepage">
              <div className="logo-text-group">
                <div className="logo-row">
                  <span className="logo-wordmark">KERB</span>
                  <span className="logo-star" aria-hidden="true">✦</span>
                </div>
                <span className="logo-tagline">Cars. Clarity. Confidence.</span>
              </div>
            </Link>
          </div>

          {/* Center: Simplified Desktop Navigation */}
          <nav className="header-nav-desktop" aria-label="Primary Navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`nav-link ${isActive ? 'is-active' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: Actions */}
          <div className="header-actions">
            {/* Quick Search Link */}
            <Link href="/search" className="header-icon-btn glass-circle-btn" aria-label="Search cars and specifications">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </Link>

            {/* Theme Switcher Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="header-icon-btn glass-circle-btn"
              aria-label={`Current theme: ${theme}. Click to switch to ${theme === 'dark' ? 'light' : 'dark'} mode.`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            {/* Notification Bell with Green Dot */}
            <button
              type="button"
              className="header-icon-btn glass-circle-btn bell-btn"
              aria-label="Notifications"
              onClick={() => {
                if (onOpenLeadModal) onOpenLeadModal();
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span className="bell-badge-dot" />
            </button>

            {/* Primary Header CTA on Desktop */}
            {onOpenLeadModal ? (
              <button
                type="button"
                onClick={onOpenLeadModal}
                className="kerb-btn kerb-btn-primary kerb-btn-sm header-cta-desktop"
              >
                Get Options
              </button>
            ) : (
              <Link href="#lead-cta" className="kerb-btn kerb-btn-primary kerb-btn-sm header-cta-desktop">
                Get Options
              </Link>
            )}

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              className="header-icon-btn glass-circle-btn mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {mobileMenuOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Down Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-navigation-drawer" className="mobile-header-drawer" role="dialog" aria-modal="true">
          <nav className="mobile-drawer-nav" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="mobile-drawer-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>{link.label}</span>
                <span className="mobile-drawer-arrow">→</span>
              </Link>
            ))}
            <Link
              href="/emi-calculator"
              className="mobile-drawer-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>EMI Calculator</span>
              <span className="mobile-drawer-arrow">→</span>
            </Link>
            <Link
              href="/ai-advisor"
              className="mobile-drawer-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>AI Advisor</span>
              <span className="mobile-drawer-arrow">→</span>
            </Link>
          </nav>

          <div className="mobile-drawer-footer">
            <button
              type="button"
              className="kerb-btn kerb-btn-primary"
              style={{ width: '100%' }}
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenLeadModal) onOpenLeadModal();
                else window.location.hash = 'lead-cta';
              }}
            >
              Get Personalised Options
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .kerb-unified-header {
          position: sticky;
          top: 0;
          left: 0;
          right: 0;
          height: 68px;
          z-index: 900;
          background-color: var(--background);
          border-bottom: 1px solid var(--border);
          transition: background-color var(--transition-theme), border-color var(--transition-theme), box-shadow var(--transition-hover);
        }

        .kerb-unified-header.is-scrolled {
          background-color: var(--surface-overlay);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: var(--shadow-sm);
        }

        .header-inner {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .header-left {
          display: flex;
          align-items: center;
        }

        .header-logo {
          display: inline-flex;
          align-items: center;
          text-decoration: none !important;
          color: var(--kerb-text-primary, #FFFFFF);
        }

        .header-logo:hover {
          text-decoration: none !important;
        }

        .logo-text-group {
          display: flex;
          flex-direction: column;
          gap: 1px;
          text-decoration: none !important;
        }

        .logo-row {
          display: flex;
          align-items: center;
          gap: 5px;
          text-decoration: none !important;
        }

        .logo-wordmark {
          font-size: 20px;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: var(--kerb-text-primary, #FFFFFF);
          line-height: 1.1;
          text-decoration: none !important;
        }

        .logo-star {
          color: var(--kerb-green-primary, #00E887);
          font-size: 14px;
          line-height: 1;
          display: inline-block;
          text-shadow: 0 0 10px rgba(0, 232, 135, 0.5);
          text-decoration: none !important;
        }

        .logo-tagline {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.01em;
          color: var(--kerb-text-secondary, #A8B3AE);
          line-height: 1.1;
          text-decoration: none !important;
        }

        .header-nav-desktop {
          display: none;
          align-items: center;
          gap: 28px;
        }

        @media (min-width: 768px) {
          .header-nav-desktop {
            display: flex;
          }
        }

        .nav-link {
          font-size: 14px;
          font-weight: 500;
          color: var(--text-secondary);
          text-decoration: none;
          transition: color var(--transition-hover);
          padding: 6px 0;
          position: relative;
        }

        .nav-link:hover {
          color: var(--text-primary);
        }

        .nav-link.is-active {
          color: var(--text-primary);
          font-weight: 600;
        }

        .nav-link.is-active::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background-color: var(--accent);
          border-radius: 2px;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .header-icon-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.10);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          color: var(--kerb-text-primary, #FFFFFF);
          display: grid;
          place-items: center;
          cursor: pointer;
          text-decoration: none;
          position: relative;
          transition: all 150ms ease;
        }

        .header-icon-btn:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.20);
          transform: scale(1.04);
        }

        .bell-btn {
          position: relative;
        }

        .bell-badge-dot {
          position: absolute;
          top: 7px;
          right: 8px;
          width: 6px;
          height: 6px;
          background-color: #FF5252;
          border-radius: 50%;
          box-shadow: 0 0 6px #FF5252;
        }

        .header-cta-desktop {
          display: none;
          margin-left: 8px;
        }

        @media (min-width: 640px) {
          .header-cta-desktop {
            display: inline-flex;
          }
        }

        .mobile-menu-toggle {
          display: none !important;
        }

        @media (min-width: 768px) {
          .mobile-menu-toggle {
            display: none;
          }
        }

        .mobile-header-drawer {
          position: fixed;
          top: 68px;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: var(--background);
          z-index: 899;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 24px;
          overflow-y: auto;
          border-top: 1px solid var(--border);
        }

        .mobile-drawer-nav {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .mobile-drawer-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 16px;
          min-height: 48px;
          font-size: 16px;
          font-weight: 600;
          color: var(--text-primary);
          text-decoration: none;
          border-radius: var(--radius-md);
          background: var(--surface);
          border: 1px solid var(--border);
        }

        .mobile-drawer-link:active {
          background: var(--surface-elevated);
        }

        .mobile-drawer-arrow {
          color: var(--text-muted);
          font-size: 18px;
        }

        .mobile-drawer-footer {
          margin-top: auto;
          padding-top: 16px;
        }
      `}</style>
    </>
  );
}
