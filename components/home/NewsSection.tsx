'use client';

import React from 'react';
import Link from 'next/link';

export default function NewsSection() {
  const updates = [
    {
      id: 'news-1',
      category: 'Policy & Safety',
      date: 'September 2026',
      headline: 'Bharat NCAP standardises 6 airbags for 5-star crash ratings',
      summary: 'Updated AIS-197 protocol mandates ESC and side curtain airbags across all test variants.'
    },
    {
      id: 'news-2',
      category: 'Technology',
      date: 'August 2026',
      headline: 'Strong hybrids register 38% annual growth across metro hubs',
      summary: 'Urban drivers favour 25+ km/l stop-and-go fuel efficiency without charging cable dependency.'
    },
    {
      id: 'news-3',
      category: 'Infrastructure',
      date: 'July 2026',
      headline: 'Expressway fast-charging network crosses 12,000 km in India',
      summary: '50 kW and 120 kW CCS2 DC chargers now operational at 45 km intervals along major corridors.'
    }
  ];

  return (
    <section className="kerb-section news-section-wrapper" aria-labelledby="news-heading">
      <div className="kerb-container">
        {/* Section Header */}
        <div className="kerb-section-header">
          <div>
            <span className="kerb-eyebrow">Industry Intelligence</span>
            <h2 id="news-heading" className="kerb-section-title">
              Latest automotive updates
            </h2>
            <p className="kerb-section-desc">
              Regulatory shifts, safety protocol updates, and technological advancements in India.
            </p>
          </div>

          <Link href="/guides" className="kerb-btn kerb-btn-secondary kerb-btn-sm">
            <span>All updates</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* News Cards Grid */}
        <div className="news-cards-grid">
          {updates.map((item) => (
            <div key={item.id} className="news-card">
              <div className="news-meta">
                <span className="news-category">{item.category}</span>
                <span className="news-date">{item.date}</span>
              </div>
              <h3 className="news-headline">{item.headline}</h3>
              <p className="news-summary">{item.summary}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .news-section-wrapper {
          background-color: var(--surface-elevated);
        }

        .news-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: var(--card-gap);
        }

        .news-card {
          background-color: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 22px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          transition: border-color var(--transition-hover), box-shadow var(--transition-hover);
        }

        .news-card:hover {
          border-color: var(--border-hover);
          box-shadow: var(--shadow-sm);
        }

        .news-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .news-category {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--accent);
        }

        .news-date {
          font-size: 11px;
          color: var(--text-muted);
        }

        .news-headline {
          font-size: 16px;
          font-weight: 700;
          line-height: 1.35;
          color: var(--text-primary);
          margin: 0;
        }

        .news-summary {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.5;
          margin: 0;
        }
      `}</style>
    </section>
  );
}
