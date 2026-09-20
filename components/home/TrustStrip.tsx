'use client';

import React from 'react';

export default function TrustStrip() {
  const metrics = [
    {
      value: '6 Models',
      subtext: 'Deeply Profiled',
      detail: 'Nexon, Creta, XUV700, Seltos, Vitara & Windsor EV'
    },
    {
      value: '11 Variants',
      subtext: 'Feature-by-Feature',
      detail: 'Base Smart to Top-spec Fearless & AX7 Luxury'
    },
    {
      value: '6 Cities',
      subtext: 'Real On-Road Math',
      detail: 'Delhi, Mumbai, Bengaluru, Hyderabad, Chennai, Pune'
    },
    {
      value: '100% NCAP',
      subtext: 'Safety Verified',
      detail: 'Adult & Child crash ratings directly from test labs'
    },
    {
      value: '0 Dealership Bias',
      subtext: 'Independent Research',
      detail: 'Zero paid placements, strictly objective verdicts'
    }
  ];

  return (
    <section className="section-ivory" aria-label="KERB Telemetry & Verification Integrity">
      <div className="home-section-shell" style={{ paddingBlock: '48px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <span className="section-eyebrow">02 / Telemetry & Verified Data Architecture</span>
            <span style={{ fontSize: '11px', color: '#6A727A', fontWeight: 600 }}>
              Updated Q1 2026 • Real Ex-Showroom & RTO Formulas
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '24px',
              borderTop: '1px solid #E2D9CA',
              paddingTop: '24px'
            }}
          >
            {metrics.map((m) => (
              <div
                key={m.value}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}
              >
                <div
                  style={{
                    fontSize: 'clamp(20px, 2vw, 26px)',
                    fontWeight: 700,
                    letterSpacing: '-0.03em',
                    color: '#101518',
                    fontVariantNumeric: 'tabular-nums'
                  }}
                >
                  {m.value}
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    fontWeight: 650,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: '#8C6D3F'
                  }}
                >
                  {m.subtext}
                </div>
                <p
                  style={{
                    fontSize: '12px',
                    color: '#55606A',
                    margin: '4px 0 0',
                    lineHeight: '1.45'
                  }}
                >
                  {m.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
