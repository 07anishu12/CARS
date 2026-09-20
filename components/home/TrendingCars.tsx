'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CarModel, Make } from '../../types/vehicle';
import { useWishlist } from '../../hooks/useWishlist';

export interface TrendingCarsProps {
  models: CarModel[];
  makes: Make[];
}

export default function TrendingCars({ models, makes }: TrendingCarsProps) {
  const { toggleWishlist, isWishlisted } = useWishlist();

  const formatPrice = (min: number, max: number) => {
    return `₹${(min / 100000).toFixed(2)} - ${(max / 100000).toFixed(2)} Lakh`;
  };

  return (
    <section className="section-graphite" aria-labelledby="trending-cars-title">
      <div className="home-section-shell">
        <div className="section-header-block with-action">
          <div>
            <span className="section-eyebrow">04 / Market Velocity & Interest</span>
            <h2 id="trending-cars-title" className="section-title">
              Trending vehicles in India.
            </h2>
            <p className="section-subtitle">
              Verified road test telemetry, crash test safety ratings, and current market delivery waitlists.
            </p>
          </div>

          <Link href="/cars" className="kerb-btn-secondary">
            <span>View All 2026 Models</span>
            <span style={{ color: 'var(--champagne)' }}>↗</span>
          </Link>
        </div>

        {/* Cars Showcase Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px'
          }}
        >
          {models.slice(0, 6).map((model) => {
            const make = makes.find((mk) => mk.id === model.makeId);
            const saved = isWishlisted(model.id);

            const handleSave = (e: React.MouseEvent) => {
              e.preventDefault();
              toggleWishlist(model.id);
            };

            return (
              <article
                key={model.id}
                style={{
                  background: 'var(--obsidian-850)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 250ms ease, border-color 250ms ease'
                }}
                className="trending-vehicle-card"
              >
                {/* Vehicle Media Header */}
                <div style={{ position: 'relative', aspectRatio: '16 / 10', background: '#06090B' }}>
                  <Image
                    src={model.heroImage}
                    alt={`${make?.name} ${model.name} automotive exterior`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      display: 'flex',
                      gap: '6px'
                    }}
                  >
                    {model.safetyRating && (
                      <span
                        style={{
                          background: 'rgba(8, 12, 15, 0.85)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          color: 'var(--champagne)',
                          fontSize: '10px',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: '999px',
                          letterSpacing: '0.05em'
                        }}
                      >
                        {model.safetyRating.stars}★ NCAP
                      </span>
                    )}
                    {model.isEV && (
                      <span
                        style={{
                          background: 'rgba(31, 209, 123, 0.2)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid var(--kerb-emerald-border)',
                          color: 'var(--kerb-emerald)',
                          fontSize: '10px',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: '999px'
                        }}
                      >
                        100% EV
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleSave}
                    aria-label={saved ? `Remove ${model.name} from saved` : `Save ${model.name}`}
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'rgba(8, 12, 15, 0.85)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: saved ? 'var(--kerb-emerald)' : 'var(--ivory-100)',
                      cursor: 'pointer',
                      display: 'grid',
                      placeItems: 'center',
                      fontSize: '14px'
                    }}
                  >
                    {saved ? '★' : '☆'}
                  </button>
                </div>

                {/* Metadata Body */}
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontSize: '11px', color: 'var(--graphite-300)', textTransform: 'uppercase', fontWeight: 600 }}>
                      {model.bodyType} • {model.fuelTypes.join('/')}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--champagne)', fontWeight: 600 }}>
                      ★ {model.rating} ({model.reviewCount})
                    </span>
                  </div>

                  <h3 style={{ fontSize: '19px', fontWeight: 700, color: 'var(--ivory-50)', margin: '6px 0 10px' }}>
                    <Link
                      href={`/cars/${make?.slug}/${model.slug}`}
                      style={{ color: 'inherit', textDecoration: 'none' }}
                    >
                      {make?.name} {model.name}
                    </Link>
                  </h3>

                  <div style={{ fontSize: '17px', fontWeight: 700, color: 'var(--champagne-light)', marginBottom: '14px' }}>
                    {formatPrice(model.priceRangeMin, model.priceRangeMax)}
                  </div>

                  {/* Specification Pill Grid */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '8px',
                      padding: '12px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      borderRadius: '10px',
                      marginBottom: '16px',
                      fontSize: '12px'
                    }}
                  >
                    <div>
                      <span style={{ color: 'var(--graphite-300)', fontSize: '10px', display: 'block' }}>Transmissions</span>
                      <strong style={{ color: 'var(--ivory-100)', fontWeight: 600 }}>
                        {model.transmissions.slice(0, 2).join(', ')}
                      </strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--graphite-300)', fontSize: '10px', display: 'block' }}>Waiting Period</span>
                      <strong style={{ color: 'var(--ivory-100)', fontWeight: 600 }}>
                        ~{model.waitingPeriodWeeks} Weeks
                      </strong>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: 'auto',
                      paddingTop: '12px',
                      borderTop: '1px solid rgba(255, 255, 255, 0.08)'
                    }}
                  >
                    <Link
                      href={`/cars/${make?.slug}/${model.slug}`}
                      style={{
                        fontSize: '13px',
                        fontWeight: 650,
                        color: 'var(--kerb-emerald)',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <span>Explore Dossier</span>
                      <span>↗</span>
                    </Link>

                    <Link
                      href={`/compare?cars=${model.slug}`}
                      style={{
                        fontSize: '12px',
                        color: 'var(--graphite-300)',
                        textDecoration: 'none'
                      }}
                    >
                      Compare +
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
