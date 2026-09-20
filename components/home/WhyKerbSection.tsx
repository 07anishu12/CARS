'use client';

import React from 'react';

export default function WhyKerbSection() {
  const pillars = [
    {
      title: 'Unbiased information',
      desc: 'No dealer influence',
      iconBg: 'rgba(0, 232, 135, 0.12)',
      iconColor: '#00E887',
      svg: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      )
    },
    {
      title: 'Expert insights',
      desc: 'Research-backed',
      iconBg: 'rgba(20, 184, 166, 0.12)',
      iconColor: '#14B8A6',
      svg: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M12 8v4M12 16h.01" />
        </svg>
      )
    },
    {
      title: 'City-wise prices',
      desc: 'Accurate & updated',
      iconBg: 'rgba(0, 180, 216, 0.12)',
      iconColor: '#00B4D8',
      svg: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      )
    },
    {
      title: 'Built for Indian buyers',
      desc: 'Simpler decisions',
      iconBg: 'rgba(16, 185, 129, 0.12)',
      iconColor: '#10B981',
      svg: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      )
    }
  ];

  return (
    <section className="why-kerb-section" aria-labelledby="why-kerb-title">
      <div className="kerb-page-container">
        <h2 id="why-kerb-title" className="kerb-section-title" style={{ marginBottom: '16px' }}>
          Why KERB?
        </h2>

        <div className="why-grid">
          {pillars.map((p) => (
            <div key={p.title} className="why-card">
              <div
                className="why-icon-wrap"
                style={{
                  background: p.iconBg,
                  color: p.iconColor
                }}
                aria-hidden="true"
              >
                {p.svg}
              </div>

              <div className="why-text">
                <h3 className="why-card-title">{p.title}</h3>
                <p className="why-card-desc">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .why-kerb-section {
          width: 100%;
          padding-top: 24px;
          padding-bottom: 32px;
        }

        .why-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        @media (min-width: 768px) {
          .why-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
          }
        }

        .why-card {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.10);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 16px 14px;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
          transition: transform 180ms ease, border-color 180ms ease;
        }

        .why-card:hover {
          transform: translateY(-2px);
          border-color: rgba(0, 232, 135, 0.3);
        }

        .why-icon-wrap {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          display: grid;
          place-items: center;
          flex-shrink: 0;
        }

        .why-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }

        .why-card-title {
          font-size: 13px;
          font-weight: 750;
          color: #FFFFFF;
          margin: 0;
          line-height: 1.25;
        }

        .why-card-desc {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.6);
          margin: 0;
        }
      `}</style>
    </section>
  );
}
