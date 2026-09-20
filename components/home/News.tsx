'use client';

import React from 'react';
import Link from 'next/link';

export default function News() {
  const briefings = [
    {
      id: 'news-1',
      date: 'September 2026',
      tag: 'Policy & Safety',
      title: 'Bharat NCAP mandates 6 standard airbags for all subcompact vehicles',
      summary: 'Automotive research institutes confirm zero structural concessions will be permitted for 5-star crash certification in the 2026 testing protocol.'
    },
    {
      id: 'news-2',
      date: 'August 2026',
      tag: 'Infrastructure',
      title: 'National expressway fast-charging corridor network crosses 12,000 km',
      summary: 'Public 60 kW and 120 kW CCS2 DC chargers now installed at guaranteed 45 km intervals along major interstate trade links.'
    },
    {
      id: 'news-3',
      date: 'July 2026',
      tag: 'Technology',
      title: 'Strong hybrids register 38% annual growth across Tier-1 metropolitan hubs',
      summary: 'Self-charging hybrid powertrains lead urban purchase trends due to 27+ km/l stop-and-go fuel efficiency and zero charging cable dependency.'
    }
  ];

  return (
    <section className="section-graphite" aria-labelledby="news-briefings-title">
      <div className="home-section-shell">
        <div className="section-header-block with-action">
          <div>
            <span className="section-eyebrow">14 / Automotive Intelligence</span>
            <h2 id="news-briefings-title" className="section-title">
              Market briefings & regulatory updates.
            </h2>
            <p className="section-subtitle">
              Stay ahead of tax reforms, safety regulations, and technological shifts reshaping the Indian automotive sector.
            </p>
          </div>

          <Link href="/guides" className="kerb-btn-secondary">
            <span>All Industry Briefings</span>
            <span style={{ color: 'var(--champagne)' }}>↗</span>
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
          }}
        >
          {briefings.map((b) => (
            <div
              key={b.id}
              style={{
                background: 'var(--obsidian-850)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', color: 'var(--champagne)', fontWeight: 650, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {b.tag}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--graphite-300)' }}>
                  {b.date}
                </span>
              </div>

              <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--ivory-50)', margin: 0, lineHeight: '1.4' }}>
                {b.title}
              </h3>

              <p style={{ fontSize: '13px', color: 'var(--graphite-200)', lineHeight: '1.5', margin: 0 }}>
                {b.summary}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
