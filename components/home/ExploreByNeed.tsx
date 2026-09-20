'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CarModel, Make } from '../../types/vehicle';

export interface ExploreByNeedProps {
  models: CarModel[];
  makes: Make[];
}

export default function ExploreByNeed({ models, makes }: ExploreByNeedProps) {
  const needs = [
    {
      id: 'city',
      label: 'City Commuting',
      tagline: 'Effortless stop-and-go navigation, compact footprint, automatic transmission & 18+ km/l.',
      targetFilter: 'automatic',
      recommendedSlug: 'nexon',
      matchCriteria: 'Sub-4m length & DCT/AMT ease',
      categoryHref: '/category/automatic'
    },
    {
      id: 'family',
      label: 'Family & 7-Seaters',
      tagline: '3-row versatility, 6 airbags standard, ISOFIX anchors, and vast luggage volume.',
      targetFilter: '7-seater',
      recommendedSlug: 'xuv700',
      matchCriteria: '7-Seater flexibility & 5★ NCAP',
      categoryHref: '/cars?seats=7'
    },
    {
      id: 'electric',
      label: 'Electric Shift',
      tagline: 'Whisper-quiet electric propulsion, 331 km tested range, and running cost under ₹1.5/km.',
      targetFilter: 'ev',
      recommendedSlug: 'windsor',
      matchCriteria: 'Zero tailpipe emissions & 38 kWh battery',
      categoryHref: '/category/electric'
    },
    {
      id: 'highway',
      label: 'Highway Touring',
      tagline: 'Rock-solid straight-line composure, cruise control, and plush long-distance damper tuning.',
      targetFilter: 'highway',
      recommendedSlug: 'creta',
      matchCriteria: 'Long wheelbase & Level 2 ADAS',
      categoryHref: '/cars?body=SUV'
    },
    {
      id: 'mileage',
      label: 'High Fuel Economy',
      tagline: 'Self-charging strong hybrid electric powertrain delivering 27.97 km/l in real city traffic.',
      targetFilter: 'hybrid',
      recommendedSlug: 'vitara',
      matchCriteria: '27.97 km/l ARAI Strong Hybrid',
      categoryHref: '/category/hybrid'
    }
  ];

  const [activeNeedId, setActiveNeedId] = useState(needs[0].id);

  const currentNeed = needs.find((n) => n.id === activeNeedId) || needs[0];
  const matchedModel = models.find((m) => m.slug === currentNeed.recommendedSlug) || models[0];
  const matchedMake = makes.find((mk) => mk.id === matchedModel?.makeId);

  return (
    <section className="section-obsidian" aria-labelledby="need-explorer-title">
      <div className="home-section-shell">
        <div className="section-header-block with-action">
          <div>
            <span className="section-eyebrow">03 / Purpose-Driven Selection</span>
            <h2 id="need-explorer-title" className="section-title" style={{ color: 'var(--ivory-50)' }}>
              Explore cars by practical everyday need.
            </h2>
            <p className="section-subtitle">
              Instead of generic body types, match vehicles to how you actually drive—from congested metro commutes to long cross-country tours.
            </p>
          </div>

          <Link href="/cars" className="kerb-btn-secondary">
            <span>Browse Full Catalogue</span>
            <span style={{ color: 'var(--champagne)' }}>↗</span>
          </Link>
        </div>

        {/* Need Selection Tabs */}
        <div
          role="tablist"
          aria-label="Driving requirement categories"
          style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '12px',
            marginBottom: '32px',
            scrollbarWidth: 'none'
          }}
        >
          {needs.map((need) => {
            const isSelected = need.id === activeNeedId;
            return (
              <button
                key={need.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveNeedId(need.id)}
                style={{
                  padding: '12px 20px',
                  borderRadius: 'var(--radius-pill)',
                  background: isSelected ? 'var(--kerb-emerald)' : 'rgba(255, 255, 255, 0.04)',
                  color: isSelected ? 'var(--obsidian-950)' : 'var(--ivory-100)',
                  border: isSelected ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                  fontWeight: isSelected ? 700 : 500,
                  fontSize: '13px',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  transition: 'all 200ms ease'
                }}
              >
                {need.label}
              </button>
            );
          })}
        </div>

        {/* Dynamic Architectural Showcase for Selected Need */}
        <div className="kerb-double-bezel">
          <div
            className="kerb-inner-core"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '32px',
              alignItems: 'center'
            }}
          >
            {/* Left Copy & Rationale */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--champagne)'
                }}
              >
                Engineered Match / {currentNeed.label}
              </span>

              <h3 style={{ fontSize: 'clamp(22px, 2.4vw, 30px)', fontWeight: 700, color: 'var(--ivory-50)', margin: 0 }}>
                {matchedMake?.name} {matchedModel?.name}
              </h3>

              <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'rgba(245, 241, 232, 0.75)', margin: 0 }}>
                {currentNeed.tagline}
              </p>

              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  padding: '14px 18px',
                  marginTop: '8px'
                }}
              >
                <div style={{ fontSize: '11px', color: 'var(--graphite-300)', textTransform: 'uppercase', fontWeight: 600 }}>
                  Key Qualification
                </div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--kerb-emerald)', marginTop: '2px' }}>
                  {currentNeed.matchCriteria}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '12px', flexWrap: 'wrap' }}>
                <Link
                  href={`/cars/${matchedMake?.slug}/${matchedModel?.slug}`}
                  className="kerb-btn-primary"
                >
                  <span>Explore {matchedModel?.name} Dossier</span>
                  <span className="btn-icon-bubble">↗</span>
                </Link>

                <Link
                  href={currentNeed.categoryHref}
                  className="kerb-btn-secondary"
                >
                  <span>All {currentNeed.label} Cars</span>
                </Link>
              </div>
            </div>

            {/* Right Media Card */}
            <div
              style={{
                position: 'relative',
                aspectRatio: '16 / 10',
                borderRadius: '16px',
                overflow: 'hidden',
                background: '#090C0E',
                border: '1px solid rgba(230, 215, 195, 0.2)'
              }}
            >
              {matchedModel && (
                <Image
                  src={matchedModel.heroImage}
                  alt={`${matchedMake?.name} ${matchedModel.name} photography`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                />
              )}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, transparent 40%, rgba(8, 12, 15, 0.85) 100%)'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  right: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline'
                }}
              >
                <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--ivory-50)' }}>
                  ₹{(matchedModel.priceRangeMin / 100000).toFixed(2)} - {(matchedModel.priceRangeMax / 100000).toFixed(2)} Lakh
                </span>
                <span style={{ fontSize: '12px', color: 'var(--champagne)' }}>
                  Ex-showroom
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
