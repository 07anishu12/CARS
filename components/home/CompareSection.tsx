'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CarModel, Make } from '../../types/vehicle';

export interface CompareSectionProps {
  models?: CarModel[];
  makes?: Make[];
}

export default function CompareSection({ models = [], makes = [] }: CompareSectionProps) {
  const carA = models.find((m) => m.slug === 'creta') || models[0] || {
    name: 'Creta',
    slug: 'creta',
    heroImage: '/creta.jpg',
    priceRangeMin: 1111000,
    priceRangeMax: 2050000
  };

  const carB = models.find((m) => m.slug === 'nexon') || models[1] || {
    name: 'Nexon',
    slug: 'nexon',
    heroImage: '/nexon.jpg',
    priceRangeMin: 810000,
    priceRangeMax: 1550000
  };

  const specsComparison = [
    { label: 'Price', valA: '₹11.11L – ₹20.50L', valB: '₹8.10L – ₹15.50L' },
    { label: 'Mileage', valA: '17.4 – 21.8 kmpl', valB: '17.1 – 24.1 kmpl' },
    { label: 'Fuel', valA: 'Petrol / Diesel', valB: 'Petrol / Diesel' },
    { label: 'Power', valA: '113 – 158 bhp', valB: '118 – 113 bhp' },
    { label: 'Safety', valA: '★ 5-Star (B-NCAP)', valB: '★ 5-Star (G-NCAP)' }
  ];

  return (
    <section className="compare-section" aria-labelledby="compare-heading">
      <div className="kerb-page-container">
        {/* Section Header with Eyebrow, Title, Description, and Link */}
        <div className="kerb-section-header">
          <span className="kerb-section-eyebrow">SIDE-BY-SIDE</span>
          <div className="kerb-section-header-row">
            <div>
              <h2 id="compare-heading" className="kerb-section-title">
                Compare cars side by side
              </h2>
              <p className="kerb-section-desc">
                See the key differences that matter before you book a test drive.
              </p>
            </div>
            <Link href="/compare" className="kerb-view-all-link">
              <span>View all</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>

        {/* Large Cinematic Comparison Card */}
        <div className="compare-glass-card">
          {/* Visual Showcase: Car A vs Car B with Large Images */}
          <div className="compare-visual-stage">
            {/* Left Car (Car A) */}
            <div className="compare-car-pane">
              <div className="car-media-wrap">
                <Image
                  src="/creta.jpg"
                  alt={`Hyundai ${carA.name}`}
                  fill
                  sizes="(max-width: 640px) 180px, 320px"
                  className="compare-car-img"
                />
              </div>
              <h3 className="car-name-label">Hyundai {carA.name}</h3>
            </div>

            {/* Glowing VS Badge */}
            <div className="vs-badge-wrap" aria-hidden="true">
              <span className="vs-badge">VS</span>
            </div>

            {/* Right Car (Car B) */}
            <div className="compare-car-pane">
              <div className="car-media-wrap">
                <Image
                  src="/nexon.jpg"
                  alt={`Tata ${carB.name}`}
                  fill
                  sizes="(max-width: 640px) 180px, 320px"
                  className="compare-car-img"
                />
              </div>
              <h3 className="car-name-label">Tata {carB.name}</h3>
            </div>
          </div>

          {/* Key Spec Comparison Rows */}
          <div className="specs-table-container">
            {specsComparison.map((row) => (
              <div key={row.label} className="spec-comparison-row">
                <span className="spec-cell cell-left">{row.valA}</span>
                <span className="spec-cell cell-label">{row.label}</span>
                <span className="spec-cell cell-right">{row.valB}</span>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="compare-cta-row">
            <Link
              href={`/compare?cars=${carA.slug},${carB.slug}`}
              className="compare-action-btn"
            >
              <span>Start Comparing</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .compare-section {
          width: 100%;
          padding-top: 24px;
          padding-bottom: 36px;
        }

        .compare-glass-card {
          position: relative;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.14);
          backdrop-filter: blur(28px) saturate(180%);
          -webkit-backdrop-filter: blur(28px) saturate(180%);
          border-radius: 24px;
          padding: 24px 18px;
          box-shadow: 0 16px 44px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.15);
          display: flex;
          flex-direction: column;
          gap: 20px;
          box-sizing: border-box;
        }

        @media (min-width: 768px) {
          .compare-glass-card {
            padding: 36px 32px;
            gap: 24px;
          }
        }

        .compare-visual-stage {
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          gap: 12px;
        }

        .compare-car-pane {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .car-media-wrap {
          position: relative;
          width: 100%;
          height: 120px;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 16px;
          overflow: hidden;
        }

        @media (min-width: 440px) {
          .car-media-wrap {
            height: 145px;
          }
        }

        @media (min-width: 768px) {
          .car-media-wrap {
            height: 180px;
          }
        }

        :global(.compare-car-img) {
          object-fit: cover;
          object-position: center;
          transition: transform 300ms ease;
        }

        .compare-glass-card:hover :global(.compare-car-img) {
          transform: scale(1.05);
        }

        .car-name-label {
          font-size: 15px;
          font-weight: 800;
          color: #FFFFFF;
          margin: 0;
          letter-spacing: -0.01em;
          text-align: center;
        }

        @media (min-width: 768px) {
          .car-name-label {
            font-size: 18px;
          }
        }

        .vs-badge-wrap {
          position: absolute;
          left: 50%;
          top: 36%;
          transform: translate(-50%, -50%);
          z-index: 10;
        }

        .vs-badge {
          display: grid;
          place-items: center;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #050A09;
          border: 2px solid #00E887;
          color: #00E887;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 0.05em;
          box-shadow: 0 0 20px rgba(0, 232, 135, 0.5);
        }

        /* Spec Comparison Table */
        .specs-table-container {
          display: flex;
          flex-direction: column;
          gap: 8px;
          background: rgba(0, 0, 0, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 12px 14px;
        }

        .spec-comparison-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-block: 6px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .spec-comparison-row:last-child {
          border-bottom: none;
        }

        .spec-cell {
          font-size: 12.5px;
          line-height: 1.2;
        }

        .cell-left {
          flex: 1;
          color: #FFFFFF;
          font-weight: 650;
          text-align: left;
        }

        .cell-label {
          padding-inline: 8px;
          color: rgba(255, 255, 255, 0.5);
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          text-align: center;
        }

        .cell-right {
          flex: 1;
          color: #FFFFFF;
          font-weight: 650;
          text-align: right;
        }

        .compare-cta-row {
          display: flex;
          justify-content: center;
          width: 100%;
        }
      `}</style>
    </section>
  );
}
