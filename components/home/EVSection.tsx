'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface EVSectionProps {
  variant?: 'banner' | 'showcase';
}

export default function EVSection({ variant = 'banner' }: EVSectionProps) {
  if (variant === 'showcase') {
    // Large Showcase Card
    return (
      <section className="ev-showcase-section" aria-label="Electric Vehicle Showcase">
        <div className="kerb-page-container">
          <div className="ev-showcase-card">
            {/* Background Atmospheric Glow */}
            <div className="ev-showcase-glow" />
            <div className="ev-secondary-glow" />

            <div className="ev-showcase-top">
              <span className="ev-badge-pill">GO ELECTRIC</span>
              <h2 className="ev-showcase-title">
                Same thrill. <br />
                Fraction of the running cost.
              </h2>
              <p className="ev-showcase-sub">
                Quiet powertrains, instant electric acceleration, and home charging convenience.
              </p>
            </div>

            {/* Large EV Car Image */}
            <div className="ev-showcase-media">
              <Image
                src="/ev-charging.jpg"
                alt="Modern electric vehicle charging"
                fill
                sizes="(max-width: 768px) 100vw, 720px"
                className="ev-showcase-img"
              />
            </div>

            {/* 3 Key Stats: Range, Charging, Running cost */}
            <div className="ev-stats-circles-row">
              <div className="stat-circle-item">
                <div className="stat-circle-icon">⚡</div>
                <div className="stat-circle-text">
                  <span className="stat-circle-val">300–650 km</span>
                  <span className="stat-circle-lbl">Real-world Range</span>
                </div>
              </div>

              <div className="stat-circle-item">
                <div className="stat-circle-icon">⏱</div>
                <div className="stat-circle-text">
                  <span className="stat-circle-val">18 min</span>
                  <span className="stat-circle-lbl">10-80% Fast Charge</span>
                </div>
              </div>

              <div className="stat-circle-item">
                <div className="stat-circle-icon">💰</div>
                <div className="stat-circle-text">
                  <span className="stat-circle-val">₹1.2 / km</span>
                  <span className="stat-circle-lbl">Low Running Cost</span>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="ev-cta-row">
              <Link href="/cars?body=EV" className="ev-pill-cta">
                <span>Explore EVs</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>

        <style jsx>{`
          .ev-showcase-section {
            width: 100%;
            padding-top: 24px;
            padding-bottom: 36px;
          }

          .ev-showcase-card {
            position: relative;
            background: linear-gradient(135deg, rgba(4, 32, 20, 0.85) 0%, rgba(8, 20, 17, 0.95) 100%);
            border: 1px solid rgba(0, 232, 135, 0.35);
            backdrop-filter: blur(28px) saturate(180%);
            -webkit-backdrop-filter: blur(28px) saturate(180%);
            border-radius: 26px;
            padding: 26px 20px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            gap: 20px;
            box-shadow: 0 16px 44px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.15);
            box-sizing: border-box;
          }

          @media (min-width: 768px) {
            .ev-showcase-card {
              padding: 36px 32px;
            }
          }

          .ev-showcase-glow {
            position: absolute;
            top: -60px;
            left: -60px;
            width: 240px;
            height: 240px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(0, 232, 135, 0.35) 0%, transparent 70%);
            pointer-events: none;
          }

          .ev-secondary-glow {
            position: absolute;
            bottom: -50px;
            right: -50px;
            width: 220px;
            height: 220px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(0, 232, 135, 0.2) 0%, transparent 70%);
            pointer-events: none;
          }

          .ev-showcase-top {
            display: flex;
            flex-direction: column;
            gap: 8px;
            z-index: 2;
          }

          .ev-badge-pill {
            align-self: flex-start;
            font-size: 11px;
            font-weight: 800;
            letter-spacing: 0.12em;
            color: #00E887;
            background: rgba(0, 232, 135, 0.14);
            border: 1px solid rgba(0, 232, 135, 0.35);
            padding: 4px 12px;
            border-radius: 9999px;
          }

          .ev-showcase-title {
            font-size: 24px;
            font-weight: 900;
            line-height: 1.2;
            color: #FFFFFF;
            letter-spacing: -0.025em;
            margin: 0;
          }

          @media (min-width: 768px) {
            .ev-showcase-title {
              font-size: 32px;
            }
          }

          .ev-showcase-sub {
            font-size: 13.5px;
            color: rgba(255, 255, 255, 0.7);
            margin: 0;
            line-height: 1.45;
          }

          .ev-showcase-media {
            position: relative;
            width: 100%;
            height: 190px;
            border-radius: 18px;
            overflow: hidden;
            background: rgba(0, 0, 0, 0.4);
            border: 1px solid rgba(255, 255, 255, 0.1);
          }

          @media (min-width: 768px) {
            .ev-showcase-media {
              height: 260px;
            }
          }

          :global(.ev-showcase-img) {
            object-fit: cover;
            object-position: center;
            transition: transform 300ms ease;
          }

          .ev-showcase-card:hover :global(.ev-showcase-img) {
            transform: scale(1.04);
          }

          .ev-stats-circles-row {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            z-index: 2;
          }

          .stat-circle-item {
            background: rgba(0, 0, 0, 0.35);
            border: 1px solid rgba(0, 232, 135, 0.22);
            border-radius: 18px;
            padding: 12px 8px;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 6px;
          }

          .stat-circle-icon {
            font-size: 18px;
          }

          .stat-circle-text {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2px;
          }

          .stat-circle-val {
            font-size: 13.5px;
            font-weight: 850;
            color: #00E887;
            white-space: nowrap;
          }

          .stat-circle-lbl {
            font-size: 10.5px;
            color: rgba(255, 255, 255, 0.65);
            white-space: nowrap;
          }

          .ev-cta-row {
            display: flex;
            justify-content: flex-start;
          }
        `}</style>
      </section>
    );
  }

  // Compact Banner Variant
  return (
    <section className="kerb-ev-banner-section" aria-label="Electric Vehicle Showcase">
      <div className="kerb-page-container">
        <div className="ev-glass-banner">
          {/* Background Atmospheric Glow */}
          <div className="ev-glow-orb" />

          {/* Left / Content Column */}
          <div className="ev-content-column">
            <span className="ev-badge">GO ELECTRIC</span>

            <h2 className="ev-heading">
              A cleaner tomorrow <br />
              starts today.
            </h2>
            <p className="ev-tagline">Save up to 75% on daily fuel with electric mobility.</p>

            <Link href="/cars?body=EV" className="ev-cta-btn">
              <span>Explore EVs</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          {/* Right / Visual Column */}
          <div className="ev-visual-column">
            <div className="ev-media-container">
              <Image
                src="/ev-charging.jpg"
                alt="Electric car fast charging"
                fill
                sizes="(max-width: 768px) 160px, 280px"
                className="ev-media-img"
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .kerb-ev-banner-section {
          width: 100%;
          padding-top: 20px;
          padding-bottom: 28px;
        }

        .ev-glass-banner {
          position: relative;
          background: linear-gradient(135deg, rgba(4, 30, 20, 0.85) 0%, rgba(10, 22, 19, 0.95) 100%);
          border: 1px solid rgba(0, 232, 135, 0.3);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          border-radius: 22px;
          padding: 20px 22px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.12);
          box-sizing: border-box;
        }

        .ev-glow-orb {
          position: absolute;
          top: -40px;
          left: -40px;
          width: 180px;
          height: 180px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0, 232, 135, 0.3) 0%, transparent 70%);
          pointer-events: none;
        }

        .ev-content-column {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 8px;
          z-index: 2;
          flex: 1;
        }

        .ev-badge {
          font-size: 10.5px;
          font-weight: 800;
          letter-spacing: 0.1em;
          color: #00E887;
          text-transform: uppercase;
        }

        .ev-heading {
          font-size: 18px;
          font-weight: 850;
          line-height: 1.2;
          color: #FFFFFF;
          margin: 0;
          letter-spacing: -0.015em;
        }

        .ev-tagline {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.7);
          margin: 0;
          line-height: 1.35;
        }

        .ev-visual-column {
          position: relative;
          width: 140px;
          height: 95px;
          flex-shrink: 0;
        }

        @media (min-width: 440px) {
          .ev-visual-column {
            width: 160px;
            height: 105px;
          }
        }

        .ev-media-container {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 14px;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.3);
        }

        :global(.ev-media-img) {
          object-fit: cover;
          object-position: center;
        }
      `}</style>
    </section>
  );
}
