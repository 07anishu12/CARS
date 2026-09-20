'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const navColumns = [
    {
      title: 'Explore',
      links: [
        { label: 'Cars', href: '/cars' },
        { label: 'Compare', href: '/compare' },
        { label: 'Research', href: '/guides' },
        { label: 'Guides', href: '/guides' },
        { label: 'EV Hub', href: '/cars?body=EV' },
        { label: 'News', href: '/guides' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/guides' },
        { label: 'Careers', href: '/guides' },
        { label: 'Contact', href: '/privacy/data-request' },
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms', href: '/privacy' },
        { label: 'Sitemap', href: '/sitemap.xml' }
      ]
    },
    {
      title: 'Help',
      links: [
        { label: 'FAQ', href: '/guides' },
        { label: 'Support', href: '/privacy/data-request' },
        { label: 'Feedback', href: '/privacy/data-request' },
        { label: 'City Price', href: '/cars' },
        { label: 'API', href: '/guides' },
        { label: 'Partners', href: '/guides' }
      ]
    }
  ];

  return (
    <footer className="kerb-global-footer" role="contentinfo" aria-label="KERB Platform Footer">
      <div className="kerb-page-container">
        {/* Brand Dossier */}
        <div className="footer-brand-col">
          <Link href="/" className="footer-logo" aria-label="KERB Homepage">
            <span className="footer-logo-wordmark">KERB</span>
            <span className="footer-logo-star">✦</span>
          </Link>

          <p className="footer-brand-mission">
            Cars. Clarity. Confidence.
          </p>

          {/* Social Icons Row */}
          <div className="footer-social-row" aria-label="KERB Social Profiles">
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="YouTube">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="X (formerly Twitter)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* 3 Nav Columns: Explore, Company, Help */}
        <div className="footer-nav-grid">
          {navColumns.map((col) => (
            <div key={col.title} className="footer-nav-col">
              <span className="footer-col-header">{col.title}</span>
              <ul className="footer-links-list">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="footer-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Tier: Made for Indian buyers & Copyright matching Screen 5 */}
        <div className="footer-bottom-bar">
          <div className="footer-made-for">
            Made for Indian car buyers.
          </div>
          <div className="footer-copyright">
            © 2024 KERB. All rights reserved.
          </div>
        </div>
      </div>

      <style jsx>{`
        .kerb-global-footer {
          background-color: var(--kerb-bg-primary, #050A09);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          color: #FFFFFF;
          padding-top: 36px;
          padding-bottom: 40px;
        }

        .footer-brand-col {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 6px;
          margin-bottom: 28px;
        }

        .footer-logo {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          text-decoration: none !important;
          color: #FFFFFF;
        }

        .footer-logo-wordmark {
          font-size: 20px;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #FFFFFF;
        }

        .footer-logo-star {
          color: var(--kerb-green-primary, #00E887);
          font-size: 14px;
          line-height: 1;
          margin-left: 1px;
          filter: drop-shadow(0 0 6px rgba(0, 232, 135, 0.6));
        }

        .footer-brand-mission {
          font-size: 11px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.6);
          margin: 0;
          line-height: 1.3;
        }

        .footer-social-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 10px;
        }

        .footer-social-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.10);
          color: rgba(255, 255, 255, 0.7);
          transition: all 150ms ease;
          text-decoration: none;
        }

        .footer-social-btn:hover {
          color: var(--kerb-green-primary, #00E887);
          background: rgba(0, 232, 135, 0.12);
          border-color: rgba(0, 232, 135, 0.35);
          transform: translateY(-2px);
        }

        /* 3 Columns Grid */
        .footer-nav-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 32px;
        }

        .footer-nav-col {
          display: flex;
          flex-direction: column;
        }

        .footer-col-header {
          font-size: 11px;
          font-weight: 750;
          color: #FFFFFF;
          text-transform: capitalize;
          margin-bottom: 8px;
        }

        .footer-links-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .footer-link {
          font-size: 10.5px;
          color: rgba(255, 255, 255, 0.55);
          text-decoration: none;
          transition: color 150ms ease;
        }

        .footer-link:hover {
          color: var(--kerb-green-primary, #00E887);
        }

        /* Bottom Bar */
        .footer-bottom-bar {
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          gap: 4px;
          align-items: center;
          text-align: center;
        }

        .footer-made-for {
          font-size: 10.5px;
          color: rgba(255, 255, 255, 0.45);
        }

        .footer-copyright {
          font-size: 10px;
          color: rgba(255, 255, 255, 0.35);
        }
      `}</style>
    </footer>
  );
}
