'use client';

import React from 'react';
import Link from 'next/link';
import { Article } from '../../types';

export interface BuyersGuideProps {
  articles: Article[];
}

export default function BuyersGuide({ articles }: BuyersGuideProps) {
  return (
    <section className="section-ivory" aria-labelledby="buyers-guide-title">
      <div className="home-section-shell">
        <div className="section-header-block with-action">
          <div>
            <span className="section-eyebrow">13 / The Reading Room & Automotive Dossiers</span>
            <h2 id="buyers-guide-title" className="section-title">
              Clear thinking for your next automotive move.
            </h2>
            <p className="section-subtitle">
              Long-form engineering analyses, taxation teardowns, and safety protocol deep-dives written by independent automotive researchers.
            </p>
          </div>

          <Link href="/guides" className="action secondary" style={{ borderColor: '#D4C8B5', color: '#101518' }}>
            <span>View All Editorial Dossiers</span>
            <span>↗</span>
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}
        >
          {articles.map((article, idx) => (
            <article
              key={article.slug}
              className="editorial-card"
              style={{
                borderRadius: '16px',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#8C6D3F'
                  }}
                >
                  0{idx + 1} / {article.category}
                </span>
                <span style={{ fontSize: '11px', color: '#6A727A' }}>
                  {article.readingTime}
                </span>
              </div>

              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#101518', lineHeight: '1.35', margin: 0 }}>
                <Link
                  href={`/guides/${article.slug}`}
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  {article.title}
                </Link>
              </h3>

              <p style={{ fontSize: '13px', color: '#55606A', lineHeight: '1.6', margin: 0 }}>
                {article.excerpt}
              </p>

              <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #E5DEC9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', color: '#6A727A' }}>
                  By {article.author}
                </span>
                <Link
                  href={`/guides/${article.slug}`}
                  style={{
                    fontSize: '12px',
                    fontWeight: 650,
                    color: '#08784A',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <span>Read Guide</span>
                  <span>→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
