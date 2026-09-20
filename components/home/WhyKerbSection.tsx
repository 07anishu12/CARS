'use client';

import React from 'react';

export default function WhyKerbSection() {
  const pillars = [
    {
      title: 'Research-backed',
      desc: 'No dealer influence or sponsored bias',
      iconBg: 'rgba(0, 232, 135, 0.12)',
      iconColor: '#00E887',
      svg: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      )
    },
    {
      title: 'City-wise pricing',
      desc: 'Exact RTO taxes & state levies',
      iconBg: 'rgba(20, 184, 166, 0.12)',
      iconColor: '#14B8A6',
      svg: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>
      )
    },
    {
      title: 'Easy comparison',
      desc: 'Side-by-side specs and 5-yr TCO',
      iconBg: 'rgba(0, 180, 216, 0.12)',
      iconColor: '#00B4D8',
      svg: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
        </svg>
      )
    },
    {
      title: 'Built for Indian buyers',
      desc: 'Real road test metrics & efficiency',
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
        {/* Section Header */}
        <div className="kerb-section-header">
          <span className="kerb-section-eyebrow">TRUST &amp; CLARITY</span>
          <h2 id="why-kerb-title" className="kerb-section-title">
            Why KERB?
          </h2>
          <p className="kerb-section-desc">
            Automotive clarity designed specifically for car buyers across India.
          </p>
        </div>

        {/* 2x2 Grid on Mobile / 4-col on Desktop */}
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
          padding-bottom: 36px;
        }

        .why-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
        }

        @media (min-width: 768px) {
          .why-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 18px;
          }
        }

        .why-card {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          border-radius: 22px;
          padding: 18px 16px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
          box-shadow: 0 6px 22px rgba(0, 0, 0, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.1);
          transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
          box-sizing: border-box;
        }

        .why-card:hover {
          transform: translateY(-2px);
          border-color: rgba(0, 232, 135, 0.4);
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.4);
        }

        .why-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: 14px;
          display: grid;
          place-items: center;
          flex-shrink: 0;
        }

        .why-text {
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 0;
        }

        .why-card-title {
          font-size: 14.5px;
          font-weight: 800;
          color: #FFFFFF;
          margin: 0;
          line-height: 1.25;
        }

        .why-card-desc {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.65);
          margin: 0;
          line-height: 1.35;
        }
      `}</style>
    </section>
  );
}
