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
    priceRangeMin: 1100000,
    priceRangeMax: 2015000
  };

  const carB = models.find((m) => m.slug === 'nexon') || models[1] || {
    name: 'Nexon',
    slug: 'nexon',
    heroImage: '/nexon.jpg',
    priceRangeMin: 810000,
    priceRangeMax: 1560000
  };

  return (
    <section className="compare-section" aria-labelledby="compare-heading">
      <div className="kerb-page-container">
        {/* Header */}
        <div className="compare-header">
          <h2 id="compare-heading" className="kerb-section-title">
            Compare cars side by side
          </h2>
          <p className="compare-subtitle">
            See the differences that matter.
          </p>
        </div>

        {/* Large Glass Comparison Card */}
        <div className="compare-glass-card">
          {/* Visual Showcase with VS badge */}
          <div className="compare-visual-stage">
            {/* Left Car */}
            <div className="compare-car-pane">
              <div className="car-media-wrap">
                <Image
                  src={carA.heroImage || '/creta.jpg'}
                  alt={`Hyundai ${carA.name}`}
                  fill
                  sizes="(max-width: 640px) 150px, 260px"
                  className="compare-car-img"
                />
              </div>
              <span className="car-name-label">Hyundai {carA.name}</span>
            </div>

            {/* Glowing VS Badge in Center */}
            <div className="vs-badge-wrap" aria-hidden="true">
              <span className="vs-badge">VS</span>
            </div>

            {/* Right Car */}
            <div className="compare-car-pane">
              <div className="car-media-wrap">
                <Image
                  src={carB.heroImage || '/nexon.jpg'}
                  alt={`Tata ${carB.name}`}
                  fill
                  sizes="(max-width: 640px) 150px, 260px"
                  className="compare-car-img"
                />
              </div>
              <span className="car-name-label">Tata {carB.name}</span>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="compare-cta-row">
            <Link
              href={`/compare?cars=${carA.slug},${carB.slug}`}
              className="compare-action-btn"
            >
              <span>Start Comparing</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .compare-section {
          width: 100%;
          padding-top: 24px;
          padding-bottom: 32px;
        }

        .compare-header {
          margin-bottom: 16px;
        }

        .compare-subtitle {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.65);
          margin: 4px 0 0;
        }

        .compare-glass-card {
          position: relative;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.10);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 20px 16px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        @media (min-width: 768px) {
          .compare-glass-card {
            padding: 32px;
          }
        }

        .compare-visual-stage {
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          padding-bottom: 8px;
        }

        .compare-car-pane {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 8px;
        }

        .car-media-wrap {
          position: relative;
          width: 100%;
          max-width: 170px;
          height: 90px;
        }

        @media (min-width: 768px) {
          .car-media-wrap {
            max-width: 280px;
            height: 150px;
          }
        }

        :global(.compare-car-img) {
          object-fit: contain;
          filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.5));
        }

        .car-name-label {
          font-size: 13px;
          font-weight: 700;
          color: #FFFFFF;
        }

        .vs-badge-wrap {
          position: absolute;
          left: 50%;
          top: 40%;
          transform: translate(-50%, -50%);
          z-index: 5;
        }

        .vs-badge {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(11, 21, 19, 0.95);
          border: 1px solid var(--kerb-green-primary, #00E887);
          color: var(--kerb-green-primary, #00E887);
          font-size: 11px;
          font-weight: 900;
          display: grid;
          place-items: center;
          box-shadow: 0 0 16px rgba(0, 232, 135, 0.45);
        }

        .compare-cta-row {
          display: flex;
          justify-content: center;
          width: 100%;
        }

        .compare-action-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          max-width: 320px;
          background: var(--kerb-green-primary, #00E887);
          color: #050A09;
          font-weight: 750;
          font-size: 14px;
          border-radius: 9999px;
          height: 44px;
          text-decoration: none;
          box-shadow: 0 4px 18px rgba(0, 232, 135, 0.4);
          transition: transform 150ms ease, box-shadow 150ms ease;
        }

        .compare-action-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 232, 135, 0.6);
        }
      `}</style>
    </section>
  );
}
