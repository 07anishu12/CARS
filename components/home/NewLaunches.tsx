'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CarModel, Make } from '../../types/vehicle';

export interface NewLaunchesProps {
  models: CarModel[];
  makes: Make[];
}

export default function NewLaunches({ models, makes }: NewLaunchesProps) {
  // Focus on current generation facelifts and new launches
  const launches = models.filter((m) => m.isNewLaunch || m.slug === 'windsor' || m.slug === 'creta' || m.slug === 'nexon');

  return (
    <section className="section-ivory" aria-labelledby="new-launches-title">
      <div className="home-section-shell">
        <div className="section-header-block with-action">
          <div>
            <span className="section-eyebrow">06 / Fresh to the Indian Market</span>
            <h2 id="new-launches-title" className="section-title">
              2026 New releases & facelifts.
            </h2>
            <p className="section-subtitle">
              The latest generation updates, interior refreshes, and electric mobility arrivals.
            </p>
          </div>

          <Link href="/new-cars" className="action secondary" style={{ borderColor: '#D4C8B5', color: '#101518' }}>
            <span>Full 2026 Release Schedule</span>
            <span>↗</span>
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px'
          }}
        >
          {launches.slice(0, 3).map((car, idx) => {
            const make = makes.find((mk) => mk.id === car.makeId);
            return (
              <div
                key={car.id}
                className="editorial-card"
                style={{
                  borderRadius: '20px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ position: 'relative', aspectRatio: '16 / 10' }}>
                  <Image
                    src={car.heroImage}
                    alt={`${make?.name} ${car.name}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      background: '#101518',
                      color: 'var(--champagne)',
                      fontSize: '10px',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      padding: '4px 10px',
                      borderRadius: '999px'
                    }}
                  >
                    {idx === 0 ? 'Brand New 2026' : 'Gen 2 Facelift'}
                  </div>
                </div>

                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontSize: '11px', color: '#6A727A', textTransform: 'uppercase', fontWeight: 600 }}>
                      {car.bodyType} • {car.fuelTypes.join('/')}
                    </span>
                    <span style={{ fontSize: '11px', color: '#8C6D3F', fontWeight: 600 }}>
                      Wait: ~{car.waitingPeriodWeeks} Weeks
                    </span>
                  </div>

                  <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#101518', margin: 0 }}>
                    {make?.name} {car.name}
                  </h3>

                  <div style={{ fontSize: '16px', fontWeight: 700, color: '#08784A' }}>
                    ₹{(car.priceRangeMin / 100000).toFixed(2)} - {(car.priceRangeMax / 100000).toFixed(2)} Lakh
                  </div>

                  <p style={{ fontSize: '13px', color: '#55606A', lineHeight: '1.5', margin: 0 }}>
                    {car.kerbVerdict}
                  </p>

                  <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #E5DEC9' }}>
                    <Link
                      href={`/cars/${make?.slug}/${car.slug}`}
                      style={{
                        fontSize: '13px',
                        fontWeight: 650,
                        color: '#101518',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <span>Read full road test report</span>
                      <span style={{ color: '#8C6D3F' }}>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
