'use client';

import React from 'react';
import Link from 'next/link';

export default function UsedCars() {
  const pillars = [
    {
      step: '01',
      title: '180-Point Structural Audit',
      description: 'Chassis laser-alignment, engine cylinder compression, OBD-II ECU diagnostic readouts, and paint depth meter analysis for accidental repair detection.'
    },
    {
      step: '02',
      title: 'Parivahan Title Verification',
      description: 'Zero hypothecation encumbrance, clean RTO ownership chain, genuine non-tampered odometer validation, and verified insurance claim histories.'
    },
    {
      step: '03',
      title: '12-Month Comprehensive Warranty',
      description: 'Engine, transmission, steering rack, and air conditioning compressor components covered with roadside assistance across 450+ cities.'
    },
    {
      step: '04',
      title: 'Algorithmic Fair Pricing',
      description: 'Depreciation curves benchmarked against real transaction registries rather than inflated dealer listings, guaranteeing authentic market valuation.'
    }
  ];

  return (
    <section className="section-ivory" aria-labelledby="used-cars-title">
      <div className="home-section-shell">
        <div className="section-header-block with-action">
          <div>
            <span className="section-eyebrow">12 / Certified Pre-Owned Verification</span>
            <h2 id="used-cars-title" className="section-title">
              Pre-owned vehicles. Rigorously vetted.
            </h2>
            <p className="section-subtitle">
              Eliminate used car anxiety through transparent diagnostic scorecards and independent structural audits.
            </p>
          </div>

          <Link href="/used-cars" className="action secondary" style={{ borderColor: '#D4C8B5', color: '#101518' }}>
            <span>Explore Certified Pre-Owned</span>
            <span>↗</span>
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px'
          }}
        >
          {pillars.map((p) => (
            <div
              key={p.step}
              className="editorial-card"
              style={{
                borderRadius: '16px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#8C6D3F',
                    letterSpacing: '0.1em'
                  }}
                >
                  {p.step} / PILLAR
                </span>
                <span style={{ fontSize: '14px', color: '#08784A' }}>✓ Verified</span>
              </div>

              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#101518', margin: '4px 0 0' }}>
                {p.title}
              </h3>

              <p style={{ fontSize: '13px', color: '#55606A', lineHeight: '1.5', margin: 0 }}>
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
