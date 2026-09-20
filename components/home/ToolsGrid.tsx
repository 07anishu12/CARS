'use client';

import React from 'react';
import Link from 'next/link';

export default function ToolsGrid() {
  const tools = [
    {
      title: 'On-road Price',
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
        {/* Header */}
        <div className="kerb-section-header-row">
          <h2 id="tools-calculators-title" className="kerb-section-title">
            Tools & calculators
          </h2>
          <Link href="/calculators" className="kerb-view-all-link">
            <span>View all</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* 3x2 Grid of Glass Tool Tiles */}
        <div className="tools-grid">
          {tools.map((t) => (
            <Link key={t.title} href={t.href} className="tool-tile-card">
              <div
                className="tool-tile-icon"
                style={{
                  background: t.iconBg,
                  color: t.iconColor
                }}
                aria-hidden="true"
              >
                {t.svg}
              </div>
              <span className="tool-tile-title">{t.title}</span>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        .tools-grid-section {
          width: 100%;
          padding-top: 24px;
          padding-bottom: 28px;
        }

        .tools-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }

        @media (min-width: 768px) {
          .tools-grid {
            grid-template-columns: repeat(6, 1fr);
            gap: 14px;
          }
        }

        .tool-tile-card {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.10);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 18px;
          padding: 16px 8px 14px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          text-decoration: none;
          color: #FFFFFF;
          min-height: 90px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
          transition: transform 180ms ease, border-color 180ms ease, background 180ms ease, box-shadow 180ms ease;
        }

        .tool-tile-card:hover {
          transform: translateY(-2px);
          background: rgba(255, 255, 255, 0.09);
          border-color: rgba(255, 255, 255, 0.22);
          box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.4);
        }

        .tool-tile-icon {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          display: grid;
          place-items: center;
          margin-bottom: 8px;
          transition: transform 150ms ease;
        }

        .tool-tile-card:hover .tool-tile-icon {
          transform: scale(1.08);
        }

        .tool-tile-title {
          font-size: 12px;
          font-weight: 700;
          line-height: 1.25;
          color: #FFFFFF;
        }
      `}</style>
    </section>
  );
}
