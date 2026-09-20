'use client';

import React from 'react';
import Link from 'next/link';
import { Make } from '../../types/vehicle';

export interface BrandExplorerProps {
  makes: Make[];
}

export default function BrandExplorer({ makes }: BrandExplorerProps) {
  return (
    <section className="section-graphite" aria-labelledby="brand-explorer-title">
      <div className="home-section-shell">
        <div className="section-header-block with-action">
          <div>
            <span className="section-eyebrow">08 / Automotive Manufacturers</span>
            <h2 id="brand-explorer-title" className="section-title">
              Explore by automotive brand.
            </h2>
            <p className="section-subtitle">
              Understand each manufacturer’s philosophy—from crash-tested safety and engineering rigor to hybrid efficiency.
            </p>
          </div>

          <Link href="/cars" className="kerb-btn-secondary">
            <span>All Manufacturers</span>
            <span style={{ color: 'var(--champagne)' }}>↗</span>
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px'
          }}
        >
          {makes.map((brand) => (
            <Link
              key={brand.id}
              href={`/cars/${brand.slug}`}
              className="brand-card-item"
              style={{
                background: 'var(--obsidian-850)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'all 250ms ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', color: 'var(--champagne)', fontWeight: 650, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  {brand.country} • Est. {brand.establishedYear}
                </span>
                <span style={{ fontSize: '14px', color: 'var(--graphite-300)' }}>↗</span>
              </div>

              <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--ivory-50)', margin: 0 }}>
                {brand.name}
              </h3>

              <p style={{ fontSize: '13px', color: 'var(--graphite-200)', margin: 0, lineHeight: '1.5' }}>
                {brand.description}
              </p>

              <div style={{ marginTop: 'auto', paddingTop: '14px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <span style={{ fontSize: '12px', color: 'var(--kerb-emerald)', fontWeight: 600 }}>
                  View brand catalogue & models →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
