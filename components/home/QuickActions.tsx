'use client';

import React from 'react';
import Link from 'next/link';

export default function QuickActions() {
  const actions = [
    {
      title: 'Compare',
      line1: 'Compare',
      line2: '',
      href: '/compare',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
        </svg>
      )
    },
    {
      title: 'On-road Price',
      line1: 'On-road',
      line2: 'Price',
      href: '/cars',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      )
    },
    {
      title: 'EMI Calculator',
      line1: 'EMI',
      line2: 'Calculator',
      href: '/emi-calculator',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <line x1="8" y1="6" x2="16" y2="6" />
          <line x1="16" y1="14" x2="16" y2="18" />
          <path d="M16 10h.01M12 10h.01M8 10h.01M12 14h.01M8 14h.01M12 18h.01M8 18h.01" />
        </svg>
      )
    },
    {
      title: 'Ownership Cost',
      line1: 'Ownership',
      line2: 'Cost',
      href: '/calculators',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M14.8 9A2 2 0 0 0 13 8h-2a2 2 0 0 0 0 4h2a2 2 0 0 1 0 4h-2a2 2 0 0 1-1.8-1" />
          <path d="M12 6v2m0 8v2" />
        </svg>
      )
    },
    {
      title: 'Expert Reviews',
      line1: 'Expert',
      line2: 'Reviews',
      href: '/guides',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      )
    }
  ];

  return (
    <section className="quick-actions-section" aria-label="Quick automotive tools">
      <div className="kerb-page-container">
        <div className="quick-actions-track no-scrollbar">
          {actions.map((act) => (
            <Link key={act.title} href={act.href} className="quick-tool-card">
              <div className="tool-icon-wrap" aria-hidden="true">
                {act.icon}
              </div>
              <div className="tool-text-wrap">
                <span className="tool-title-line">{act.line1}</span>
                {act.line2 && <span className="tool-title-line">{act.line2}</span>}
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        .quick-actions-section {
          width: 100%;
          padding-top: 14px;
          padding-bottom: 20px;
        }

        .quick-actions-track {
          display: flex;
          align-items: stretch;
          gap: 8px;
          width: 100%;
          box-sizing: border-box;
        }

        .quick-tool-card {
          flex: 1 1 0;
          min-width: 0;
          height: 84px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.10);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 16px;
          padding: 10px 4px 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          text-decoration: none;
          color: #FFFFFF;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
          transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease, background 180ms ease;
          box-sizing: border-box;
        }

        .quick-tool-card:hover {
          transform: translateY(-2px);
          background: rgba(255, 255, 255, 0.09);
          border-color: rgba(0, 232, 135, 0.4);
          box-shadow: 0 8px 24px -4px rgba(0, 232, 135, 0.25);
        }

        .tool-icon-wrap {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          background: rgba(0, 232, 135, 0.12);
          border: 1px solid rgba(0, 232, 135, 0.22);
          color: var(--kerb-green-primary, #00E887);
          display: grid;
          place-items: center;
          margin-bottom: 6px;
          flex-shrink: 0;
          transition: transform 150ms ease;
        }

        .quick-tool-card:hover .tool-icon-wrap {
          transform: scale(1.08);
          background: rgba(0, 232, 135, 0.18);
        }

        .tool-text-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          line-height: 1.15;
        }

        .tool-title-line {
          font-size: 9.5px;
          font-weight: 650;
          color: #FFFFFF;
          white-space: nowrap;
          text-align: center;
        }
      `}</style>
    </section>
  );
}
