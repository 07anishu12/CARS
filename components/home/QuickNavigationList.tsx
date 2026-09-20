'use client';

import React from 'react';
import Link from 'next/link';

export default function QuickNavigationList() {
  const links = [
    {
      label: 'Cars',
      href: '/cars',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="13" rx="3" />
          <path d="M16 3H8l-3 4h14l-3-4z" />
          <circle cx="7" cy="15" r="2" />
          <circle cx="17" cy="15" r="2" />
        </svg>
      )
    },
    {
      label: 'Compare',
      href: '/compare',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      )
    },
    {
      label: 'Research & Guides',
      href: '/guides',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      )
    },
    {
      label: 'Tools & Calculators',
      href: '/calculators',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <line x1="8" y1="6" x2="16" y2="6" />
          <line x1="16" y1="14" x2="16" y2="18" />
          <path d="M16 10h.01M12 10h.01M8 10h.01M12 14h.01M8 14h.01M12 18h.01M8 18h.01" />
        </svg>
      )
    },
    {
      label: 'EV Hub',
      href: '/cars?body=EV',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      )
    },
    {
      label: 'News & Updates',
      href: '/guides',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1m2 13a2 2 0 0 1-2-2V7m2 13a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      )
    }
  ];

  return (
    <section className="quick-nav-section" aria-label="Explore automotive hubs">
      <div className="kerb-page-container">
        {/* Navigation list items */}
        <div className="nav-links-list">
          {links.map((link) => (
            <Link key={link.label} href={link.href} className="nav-list-item">
              <div className="link-left">
                <span className="link-icon" aria-hidden="true">{link.icon}</span>
                <span className="link-label">{link.label}</span>
              </div>
              <span className="link-chevron" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </span>
            </Link>
          ))}
        </div>

        {/* Download App Section */}
        <div className="download-app-card">
          <div className="download-text">
            <h3 className="download-title">Download the app</h3>
            <p className="download-desc">Get a faster, smoother experience on the go.</p>
          </div>

          <div className="app-badges-row">
            {/* App Store Badge */}
            <div className="store-badge-glass" role="button" tabIndex={0} aria-label="Download on the App Store">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 0.92-2.85-.9.04-2 .6-2.65 1.35-.58.66-1.09 1.73-.95 2.76 1.01.08 2.05-.51 2.68-1.26z" />
              </svg>
              <div className="badge-text-box">
                <span className="badge-sub">Download on the</span>
                <span className="badge-main">App Store</span>
              </div>
            </div>

            {/* Google Play Badge */}
            <div className="store-badge-glass" role="button" tabIndex={0} aria-label="Get it on Google Play">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.609 1.814L13.793 12 3.61 22.186c-.352-.36-.56-.893-.56-1.572V3.386c0-.679.208-1.212.559-1.572zm11.236 11.237l2.257 2.257-11.83 6.83 9.573-9.087zm0-2.102L5.272 1.862l11.83 6.83-2.257 2.257zm1.488 1.487l3.295-1.9c.82-.473.82-1.246 0-1.72l-3.295-1.9-1.928 1.928 1.928 1.928z" />
              </svg>
              <div className="badge-text-box">
                <span className="badge-sub">GET IT ON</span>
                <span className="badge-main">Google Play</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .quick-nav-section {
          width: 100%;
          padding-top: 20px;
          padding-bottom: 28px;
        }

        .nav-links-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 24px;
        }

        @media (min-width: 768px) {
          .nav-links-list {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
        }

        .nav-list-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.10);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 18px;
          padding: 14px 18px;
          text-decoration: none;
          color: #FFFFFF;
          min-height: 48px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
          transition: transform 150ms ease, border-color 150ms ease, background 150ms ease;
        }

        .nav-list-item:hover {
          background: rgba(255, 255, 255, 0.09);
          border-color: rgba(0, 232, 135, 0.35);
          transform: translateX(3px);
        }

        .link-left {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .link-icon {
          color: rgba(255, 255, 255, 0.6);
          display: flex;
          align-items: center;
        }

        .nav-list-item:hover .link-icon {
          color: var(--kerb-green-primary, #00E887);
        }

        .link-label {
          font-size: 14px;
          font-weight: 600;
          color: #FFFFFF;
        }

        .link-chevron {
          color: rgba(255, 255, 255, 0.4);
          display: flex;
          align-items: center;
        }

        .nav-list-item:hover .link-chevron {
          color: var(--kerb-green-primary, #00E887);
        }

        .download-app-card {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.10);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 22px;
          padding: 22px 20px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        @media (min-width: 768px) {
          .download-app-card {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: 24px 32px;
          }
        }

        .download-title {
          font-size: 17px;
          font-weight: 750;
          color: #FFFFFF;
          margin: 0 0 4px;
        }

        .download-desc {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.65);
          margin: 0;
        }

        .app-badges-row {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .store-badge-glass {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 12px;
          padding: 8px 16px;
          color: #FFFFFF;
          cursor: pointer;
          transition: all 150ms ease;
        }

        .store-badge-glass:hover {
          background: rgba(255, 255, 255, 0.14);
          border-color: rgba(255, 255, 255, 0.25);
          transform: translateY(-1px);
        }

        .badge-text-box {
          display: flex;
          flex-direction: column;
        }

        .badge-sub {
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1;
        }

        .badge-main {
          font-size: 13px;
          font-weight: 700;
          color: #FFFFFF;
          line-height: 1.2;
        }
      `}</style>
    </section>
  );
}
