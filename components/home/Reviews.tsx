'use client';

import React from 'react';
import Link from 'next/link';

export default function Reviews() {
  const reviews = [
    {
      car: 'Tata Nexon DCA',
      type: 'Expert Road Test',
      reviewer: 'KERB Technical Bureau',
      date: 'Q1 2026 Audit',
      rating: '4.6 / 5',
      verdict: 'The dual-clutch transmission eliminates the shift pauses of the previous AMT. Class-benchmark suspension absorption over sharp broken concrete, combined with unmatched Bharat NCAP 5-star adult cabin safety.',
      pros: 'Superb ride comfort • 5★ NCAP integrity',
      cons: 'Rear under-thigh support is modest for tall occupants'
    },
    {
      car: 'Hyundai Creta Turbo DCT',
      type: 'Long-Term Evaluation',
      reviewer: 'Powertrain Verification Desk',
      date: 'Q1 2026 Audit',
      rating: '4.7 / 5',
      verdict: 'The 1.5L Turbo GDi paired with Level 2 ADAS makes interstate touring remarkably relaxed. Cabin acoustic isolation and dual 10.25-inch instrument integration set the segment standard.',
      pros: 'Quiet high-speed cruising • Seamless ADAS calibration',
      cons: 'Braking pedal feel has an initial soft travel zone'
    },
    {
      car: 'Maruti Grand Vitara Hybrid',
      type: 'Real-World Economy Test',
      reviewer: 'Fuel Efficiency Laboratory',
      date: '2,500 KM Commute Test',
      rating: '4.6 / 5',
      verdict: 'Averaged 25.8 km/l in dense Bengaluru stop-and-go traffic and 24.2 km/l at 100 km/h expressway cruising. The electric motor effortlessly handles sub-30 km/h urban crawl without burning fuel.',
      pros: 'Unrivalled city mileage • Silent low-speed EV mode',
      cons: 'Luggage boot space compromised by hybrid battery pack'
    }
  ];

  return (
    <section className="section-obsidian" aria-labelledby="reviews-section-title">
      <div className="home-section-shell">
        <div className="section-header-block with-action">
          <div>
            <span className="section-eyebrow">15 / Rigorous Road Tests</span>
            <h2 id="reviews-section-title" className="section-title" style={{ color: 'var(--ivory-50)' }}>
              Independent road test evaluations.
            </h2>
            <p className="section-subtitle">
              Measured instrumented tests, real-world highway consumption figures, and unvarnished engineering critiques.
            </p>
          </div>

          <Link href="/cars" className="kerb-btn-secondary">
            <span>Read All Vehicle Verdicts</span>
            <span style={{ color: 'var(--champagne)' }}>↗</span>
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}
        >
          {reviews.map((r) => (
            <div
              key={r.car}
              style={{
                background: 'var(--obsidian-850)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                padding: '24px',
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
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--champagne)',
                    background: 'rgba(230, 215, 195, 0.08)',
                    padding: '3px 8px',
                    borderRadius: '4px'
                  }}
                >
                  {r.type}
                </span>
                <span style={{ fontSize: '13px', color: 'var(--kerb-emerald)', fontWeight: 700 }}>
                  ★ {r.rating}
                </span>
              </div>

              <div>
                <h3 style={{ fontSize: '19px', fontWeight: 700, color: 'var(--ivory-50)', margin: '0 0 2px' }}>
                  {r.car}
                </h3>
                <span style={{ fontSize: '11px', color: 'var(--graphite-300)' }}>
                  {r.reviewer} • {r.date}
                </span>
              </div>

              <p style={{ fontSize: '13px', color: 'rgba(245, 241, 232, 0.8)', lineHeight: '1.6', margin: 0 }}>
                &quot;{r.verdict}&quot;
              </p>

              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  fontSize: '11px'
                }}
              >
                <div style={{ color: 'var(--kerb-emerald)' }}>
                  <strong>Pros:</strong> {r.pros}
                </div>
                <div style={{ color: 'var(--graphite-300)' }}>
                  <strong>Cons:</strong> {r.cons}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
