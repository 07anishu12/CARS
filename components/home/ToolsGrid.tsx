'use client';

import React from 'react';
import Link from 'next/link';

export default function ToolsGrid() {
  const tools = [
    {
      title: 'On-road Price',
      subtitle: 'RTO & state taxes',
      href: '/cars',
      iconBg: 'rgba(0, 232, 135, 0.14)',
      iconColor: '#00E887',
      svg: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      )
    },
    {
      title: 'EMI Calculator',
      subtitle: 'Monthly loan plan',
      href: '/emi-calculator',
      iconBg: 'rgba(0, 180, 216, 0.14)',
      iconColor: '#00B4D8',
      svg: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <line x1="8" y1="6" x2="16" y2="6" />
          <line x1="16" y1="14" x2="16" y2="18" />
          <path d="M16 10h.01M12 10h.01M8 10h.01M12 14h.01M8 14h.01M12 18h.01M8 18h.01" />
        </svg>
      )
    },
    {
      title: 'Ownership Cost',
      subtitle: '5-year total TCO',
      href: '/calculators',
      iconBg: 'rgba(168, 85, 247, 0.14)',
      iconColor: '#A855F7',
      svg: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M14.8 9A2 2 0 0 0 13 8h-2a2 2 0 0 0 0 4h2a2 2 0 0 1 0 4h-2a2 2 0 0 1-1.8-1" />
          <path d="M12 6v2m0 8v2" />
        </svg>
      )
    },
    {
      title: 'Compare Cars',
      subtitle: 'Side-by-side spec',
      href: '/compare',
      iconBg: 'rgba(20, 184, 166, 0.14)',
      iconColor: '#14B8A6',
      svg: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
        </svg>
      )
    },
    {
      title: 'Resale Value',
      subtitle: 'Market estimate',
      href: '/calculators',
      iconBg: 'rgba(59, 130, 246, 0.14)',
      iconColor: '#3B82F6',
      svg: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
          <path d="M22 12A10 10 0 0 0 12 2v10z" />
        </svg>
      )
    },
    {
      title: 'City Price Guide',
      subtitle: 'Localized discounts',
      href: '/cars',
      iconBg: 'rgba(245, 158, 11, 0.14)',
      iconColor: '#F59E0B',
      svg: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      )
    }
  ];

  return (
    <section className="tools-grid-section" aria-labelledby="tools-calculators-title">
      <div className="kerb-page-container">
        {/* Section Header with Eyebrow, Title, Description, and Link */}
        <div className="kerb-section-header">
          <span className="kerb-section-eyebrow">CALCULATORS &amp; TOOLS</span>
          <div className="kerb-section-header-row">
            <div>
              <h2 id="tools-calculators-title" className="kerb-section-title">
                Tools &amp; calculators
              </h2>
              <p className="kerb-section-desc">
                Data-driven financial calculators to budget, finance, and compare costs.
              </p>
            </div>
            <Link href="/calculators" className="kerb-view-all-link">
              <span>View all</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>

        {/* 3x2 Grid of Glass Tool Tiles */}
        <div className="tools-grid">
          {tools.map((t) => (
            <Link key={t.title} href={t.href} className="tool-tile-card">
              <div
                className="tool-tile-icon-wrap"
                style={{
                  background: t.iconBg,
                  color: t.iconColor
                }}
                aria-hidden="true"
              >
                {t.svg}
              </div>

              <span className="tool-tile-name">{t.title}</span>
              <span className="tool-tile-sub">{t.subtitle}</span>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        .tools-grid-section {
          width: 100%;
          padding-top: 24px;
          padding-bottom: 36px;
        }

        .tools-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        @media (max-width: 380px) {
          .tools-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 768px) {
          .tools-grid {
            grid-template-columns: repeat(6, 1fr);
            gap: 14px;
          }
        }

        .tool-tile-card {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          border-radius: 20px;
          padding: 18px 10px 14px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          text-decoration: none;
          color: #FFFFFF;
          min-height: 104px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.1);
          transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
          box-sizing: border-box;
        }

        .tool-tile-card:hover {
          transform: translateY(-2px);
          background: rgba(255, 255, 255, 0.10);
          border-color: rgba(0, 232, 135, 0.45);
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.4);
        }

        .tool-tile-icon-wrap {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          display: grid;
          place-items: center;
          margin-bottom: 8px;
          flex-shrink: 0;
          transition: transform 150ms ease;
        }

        .tool-tile-card:hover .tool-tile-icon-wrap {
          transform: scale(1.08);
        }

        .tool-tile-name {
          font-size: 13.5px;
          font-weight: 750;
          color: #FFFFFF;
          line-height: 1.2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
        }

        .tool-tile-sub {
          font-size: 10.5px;
          color: rgba(255, 255, 255, 0.6);
          margin-top: 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
        }
      `}</style>
    </section>
  );
}
