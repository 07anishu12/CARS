'use client';

import React from 'react';
import Link from 'next/link';

export default function QuickActions() {
  const actions = [
    {
      title: 'Compare Cars',
      subtitle: 'Side-by-side specs',
      href: '/compare',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
        </svg>
      )
    },
    {
      title: 'On-road Price',
      subtitle: 'RTO & insurance',
      href: '/cars',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      )
    },
    {
      title: 'EMI Calculator',
      subtitle: 'Monthly estimate',
      href: '/emi-calculator',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <line x1="8" y1="6" x2="16" y2="6" />
          <line x1="16" y1="14" x2="16" y2="18" />
          <path d="M16 10h.01M12 10h.01M8 10h.01M12 14h.01M8 14h.01M12 18h.01M8 18h.01" />
        </svg>
      )
    },
    {
      title: 'Ownership Cost',
      subtitle: '5-year TCO',
      href: '/calculators',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M14.8 9A2 2 0 0 0 13 8h-2a2 2 0 0 0 0 4h2a2 2 0 0 1 0 4h-2a2 2 0 0 1-1.8-1" />
          <path d="M12 6v2m0 8v2" />
        </svg>
      )
    },
    {
      title: 'Expert Reviews',
      subtitle: 'Road test ratings',
      href: '/guides',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      )
    },
    {
      title: 'Resale Value',
      subtitle: 'Depreciation curve',
      href: '/calculators',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      )
    }
  ];

  return (
    <section className="quick-actions-section" aria-label="Quick automotive tools">
      <div className="kerb-page-container">
        <div className="quick-actions-grid">
          {actions.map((act) => (
            <Link key={act.title} href={act.href} className="quick-tool-card">
              <div className="tool-icon-wrap" aria-hidden="true">
                {act.icon}
              </div>
              <div className="tool-text-wrap">
                <span className="tool-title">{act.title}</span>
                <span className="tool-sub">{act.subtitle}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        .quick-actions-section {
          width: 100%;
          padding-top: 20px;
          padding-bottom: 28px;
        }

        .quick-actions-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          width: 100%;
          box-sizing: border-box;
        }

        @media (max-width: 360px) {
          .quick-actions-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 768px) {
          .quick-actions-grid {
            grid-template-columns: repeat(6, 1fr);
            gap: 14px;
          }
        }

        .quick-tool-card {
          min-height: 98px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          border-radius: 20px;
          padding: 14px 10px 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          text-decoration: none;
          color: #FFFFFF;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.12);
          transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease, background 180ms ease;
          box-sizing: border-box;
        }

        .quick-tool-card:hover {
          transform: translateY(-2px);
          background: rgba(255, 255, 255, 0.10);
          border-color: rgba(0, 232, 135, 0.45);
          box-shadow: 0 10px 28px -4px rgba(0, 232, 135, 0.3);
        }

        .tool-icon-wrap {
          width: 38px;
          height: 38px;
          border-radius: 12px;
          background: rgba(0, 232, 135, 0.12);
          border: 1px solid rgba(0, 232, 135, 0.28);
          color: var(--kerb-green-primary, #00E887);
          display: grid;
          place-items: center;
          margin-bottom: 8px;
          flex-shrink: 0;
          transition: transform 150ms ease;
        }

        .quick-tool-card:hover .tool-icon-wrap {
          transform: scale(1.08);
          background: rgba(0, 232, 135, 0.2);
        }

        .tool-text-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          line-height: 1.2;
        }

        .tool-title {
          font-size: 13px;
          font-weight: 750;
          color: #FFFFFF;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
        }

        .tool-sub {
          font-size: 10.5px;
          color: rgba(255, 255, 255, 0.6);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
        }
      `}</style>
    </section>
  );
}
