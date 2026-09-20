'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function FinalCTA() {
  return (
    <section className="final-cta-section" aria-label="Begin your car journey">
      <div className="kerb-page-container">
        <div className="final-cta-card">
          <div className="cta-bg-media" aria-hidden="true">
            <Image
              src="/hero-journey.jpg"
              alt="Sunset car drive"
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              className="final-cta-img"
            />
            <div className="cta-overlay" />
          </div>

          <div className="final-cta-content">
            <h2 className="final-cta-title">
              Better cars. <br />
              Brighter journeys.
            </h2>
            <p className="final-cta-desc">
              Explore a smarter way to choose your next car.
            </p>

            <Link href="/cars" className="btn-get-started">
              <span>Get Started</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .final-cta-section {
          width: 100%;
          padding-top: 24px;
          padding-bottom: 28px;
        }

        .final-cta-card {
          position: relative;
          min-height: 220px;
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          padding: 28px 24px;
        }

        @media (min-width: 768px) {
          .final-cta-card {
            min-height: 280px;
            padding: 44px 48px;
          }
        }

        .cta-bg-media {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        :global(.final-cta-img) {
          object-fit: cover;
          object-position: center 60%;
        }

        .cta-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(5, 10, 9, 0.85) 0%,
            rgba(5, 10, 9, 0.5) 50%,
            rgba(5, 10, 9, 0.85) 100%
          );
        }

        .final-cta-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
          max-width: 440px;
        }

        .final-cta-title {
          font-size: clamp(24px, 5.5vw, 36px);
          font-weight: 850;
          color: #FFFFFF;
          margin: 0;
          line-height: 1.15;
          letter-spacing: -0.03em;
        }

        .final-cta-desc {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.78);
          margin: 0 0 8px;
        }

        .btn-get-started {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--kerb-green-primary, #00E887);
          color: #050A09;
          font-size: 14px;
          font-weight: 750;
          border-radius: 9999px;
          padding: 10px 24px;
          text-decoration: none;
          box-shadow: 0 4px 18px rgba(0, 232, 135, 0.4);
          transition: transform 150ms ease, box-shadow 150ms ease;
        }

        .btn-get-started:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 26px rgba(0, 232, 135, 0.6);
        }
      `}</style>
    </section>
  );
}
