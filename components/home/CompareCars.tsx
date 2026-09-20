'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CarModel, Make } from '../../types/vehicle';

export interface CompareCarsProps {
  models: CarModel[];
  makes: Make[];
}

export default function CompareCars({ models, makes }: CompareCarsProps) {
  const [carASlug, setCarASlug] = useState('nexon');
  const [carBSlug, setCarBSlug] = useState('creta');

  const carA = models.find((m) => m.slug === carASlug) || models[0];
  const carB = models.find((m) => m.slug === carBSlug) || models[1];

  const makeA = makes.find((mk) => mk.id === carA?.makeId);
  const makeB = makes.find((mk) => mk.id === carB?.makeId);

  // Helper to extract a spec value
  const getSpecValue = (model: CarModel, sectionTitle: string, itemName: string, fallback: string = '—') => {
    const section = model.specifications?.find((s) => s.title.toLowerCase().includes(sectionTitle.toLowerCase()));
    const item = section?.items?.find((i) => i.name.toLowerCase().includes(itemName.toLowerCase()));
    return item?.value || fallback;
  };

  const specRows = [
    {
      label: 'Ex-Showroom Price Range',
      valA: `₹${(carA.priceRangeMin / 100000).toFixed(2)} - ${(carA.priceRangeMax / 100000).toFixed(2)} L`,
      valB: `₹${(carB.priceRangeMin / 100000).toFixed(2)} - ${(carB.priceRangeMax / 100000).toFixed(2)} L`
    },
    {
      label: 'Crash Safety Rating',
      valA: carA.safetyRating ? `${carA.safetyRating.stars}★ ${carA.safetyRating.agency}` : '6 Airbags Std',
      valB: carB.safetyRating ? `${carB.safetyRating.stars}★ ${carB.safetyRating.agency}` : '6 Airbags Std'
    },
    {
      label: 'Fuel Types Available',
      valA: carA.fuelTypes.join(' / '),
      valB: carB.fuelTypes.join(' / ')
    },
    {
      label: 'Transmission Choices',
      valA: carA.transmissions.join(', '),
      valB: carB.transmissions.join(', ')
    },
    {
      label: 'Body Length',
      valA: getSpecValue(carA, 'Dimensions', 'Length', '3995 mm'),
      valB: getSpecValue(carB, 'Dimensions', 'Length', '4330 mm')
    },
    {
      label: 'Ground Clearance',
      valA: getSpecValue(carA, 'Dimensions', 'Ground Clearance', '208 mm'),
      valB: getSpecValue(carB, 'Dimensions', 'Ground Clearance', '190 mm')
    },
    {
      label: 'Luggage Boot Capacity',
      valA: getSpecValue(carA, 'Dimensions', 'Boot Space', '382 Litres'),
      valB: getSpecValue(carB, 'Dimensions', 'Boot Space', '433 Litres')
    }
  ];

  return (
    <section className="section-graphite" aria-labelledby="compare-cars-title">
      <div className="home-section-shell">
        <div className="section-header-block with-action">
          <div>
            <span className="section-eyebrow">10 / Comparative Decision Desk</span>
            <h2 id="compare-cars-title" className="section-title">
              Two contenders. One clear verdict.
            </h2>
            <p className="section-subtitle">
              Put any two vehicles head-to-head to see mechanical trade-offs, dimensional differences, and pricing deltas.
            </p>
          </div>

          <Link href={`/compare?cars=${carA.slug},${carB.slug}`} className="kerb-btn-primary">
            <span>Build Deep Comparison</span>
            <span className="btn-icon-bubble">↗</span>
          </Link>
        </div>

        {/* Comparison Desk Interface */}
        <div
          style={{
            background: 'var(--obsidian-850)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '20px',
            overflow: 'hidden',
            padding: '24px'
          }}
        >
          {/* Car Selectors Header */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '24px',
              paddingBottom: '24px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            {/* Contender A */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <label htmlFor="select-car-a" style={{ fontSize: '11px', color: 'var(--champagne)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Contender 01
              </label>
              <select
                id="select-car-a"
                value={carASlug}
                onChange={(e) => setCarASlug(e.target.value)}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: 'var(--ivory-50)',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  fontSize: '14px',
                  fontWeight: 600
                }}
              >
                {models.map((m) => {
                  const mk = makes.find((k) => k.id === m.makeId);
                  return (
                    <option key={m.id} value={m.slug} style={{ background: '#090C0E' }}>
                      {mk?.name} {m.name}
                    </option>
                  );
                })}
              </select>

              <div style={{ position: 'relative', aspectRatio: '16 / 9', borderRadius: '10px', overflow: 'hidden', background: '#000' }}>
                <Image
                  src={carA.heroImage}
                  alt={`${makeA?.name} ${carA.name}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 30vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>

            {/* Contender B */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <label htmlFor="select-car-b" style={{ fontSize: '11px', color: 'var(--kerb-emerald)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Contender 02
              </label>
              <select
                id="select-car-b"
                value={carBSlug}
                onChange={(e) => setCarBSlug(e.target.value)}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: 'var(--ivory-50)',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  fontSize: '14px',
                  fontWeight: 600
                }}
              >
                {models.map((m) => {
                  const mk = makes.find((k) => k.id === m.makeId);
                  return (
                    <option key={m.id} value={m.slug} style={{ background: '#090C0E' }}>
                      {mk?.name} {m.name}
                    </option>
                  );
                })}
              </select>

              <div style={{ position: 'relative', aspectRatio: '16 / 9', borderRadius: '10px', overflow: 'hidden', background: '#000' }}>
                <Image
                  src={carB.heroImage}
                  alt={`${makeB?.name} ${carB.name}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 30vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '16px', fontSize: '13px' }}>
              <tbody>
                {specRows.map((row, idx) => (
                  <tr
                    key={row.label}
                    style={{
                      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                      background: idx % 2 === 0 ? 'rgba(255, 255, 255, 0.015)' : 'transparent'
                    }}
                  >
                    <td style={{ padding: '12px 0', color: 'var(--graphite-300)', width: '30%', fontWeight: 500 }}>
                      {row.label}
                    </td>
                    <td style={{ padding: '12px 16px', color: 'var(--ivory-50)', width: '35%', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
                      {row.valA}
                    </td>
                    <td style={{ padding: '12px 16px', color: 'var(--ivory-50)', width: '35%', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
                      {row.valB}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
            <Link
              href={`/compare?cars=${carA.slug},${carB.slug}`}
              style={{
                fontSize: '13px',
                color: 'var(--kerb-emerald)',
                fontWeight: 650,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>View 40+ Technical Points of Comparison</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
