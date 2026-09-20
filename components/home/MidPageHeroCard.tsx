'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function MidPageHeroCard() {
  return (
    <section className="mid-hero-section" aria-label="Explore car platform showcase">
      <div className="kerb-page-container">
        <div className="mid-hero-card">
          <div className="card-bg-media" aria-hidden="true">
            <Image
              src="/hero-journey.jpg"
              alt="Mountain car journey"
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              className="mid-hero-img"
            />
            <div className="card-overlay" />
          </div>

          <div className="card-content">
            <h2 className="card-heading">
              Your next car is <br />
              closer than you think.
            </h2>
            <p className="card-subheading">
              Explore. Compare. Decide. Only at KERB.
            </p>

            <Link href="/cars" className="explore-cars-btn">
              <span>Explore Cars</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .mid-hero-section {
          width: 100%;
          padding-top: 24px;
          padding-bottom: 32px;
        }

        .mid-hero-card {
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
          .mid-hero-card {
            min-height: 280px;
            padding: 44px 48px;
          }
        }

        .card-bg-media {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        :global(.mid-hero-img) {
          object-fit: cover;
          object-position: center;
        }

        .card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(5, 10, 9, 0.85) 0%,
            rgba(5, 10, 9, 0.55) 50%,
            rgba(5, 10, 9, 0.8) 100%
          );
        }

        .card-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
          max-width: 480px;
        }

        .card-heading {
          font-size: clamp(22px, 5vw, 32px);
          font-weight: 850;
          color: #FFFFFF;
          margin: 0;
          line-height: 1.18;
          letter-spacing: -0.025em;
        }

        .card-subheading {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.75);
          margin: 0 0 6px;
        }

        .explore-cars-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.22);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          color: #FFFFFF;
          font-size: 13px;
          font-weight: 700;
          border-radius: 9999px;
          padding: 8px 20px;
          text-decoration: none;
          transition: all 150ms ease;
        }

        .explore-cars-btn:hover {
          background: var(--kerb-green-primary, #00E887);
          border-color: var(--kerb-green-primary, #00E887);
          color: #050A09;
          transform: translateY(-1px);
        }
      `}</style>
    </section>
  );
}
