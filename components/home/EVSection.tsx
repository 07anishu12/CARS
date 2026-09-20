'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface EVSectionProps {
  variant?: 'banner' | 'showcase';
}

export default function EVSection({ variant = 'banner' }: EVSectionProps) {
  if (variant === 'showcase') {
    // Screen 3 Big Showcase Card
    return (
      <section className="ev-showcase-section" aria-label="Electric Vehicle Showcase">
        <div className="kerb-page-container">
          <div className="ev-showcase-card">
            {/* Background Glow */}
            <div className="ev-showcase-glow" />

            <div className="ev-showcase-top">
              <span className="ev-badge-pill">GO ELECTRIC</span>
              <h2 className="ev-showcase-title">
                Same thrill. <br />
                Lower bills.
              </h2>
            </div>

            {/* EV Car Image */}
            <div className="ev-showcase-media">
              <Image
                src="/ev-charging.jpg"
                alt="Modern electric vehicle charging"
                fill
                sizes="(max-width: 768px) 100vw, 540px"
                className="ev-showcase-img"
              />
            </div>

            {/* 3 Stats in Green Circles */}
            <div className="ev-stats-circles-row">
              <div className="stat-circle-item">
                <div className="stat-circle-icon">⚡</div>
                <div className="stat-circle-text">
                  <span className="stat-circle-val">300–650 km</span>
                  <span className="stat-circle-lbl">Range</span>
                </div>
              </div>

              <div className="stat-circle-item">
                <div className="stat-circle-icon">⏱</div>
                <div className="stat-circle-text">
                  <span className="stat-circle-val">Fast Charging</span>
                </div>
              </div>

              <div className="stat-circle-item">
                <div className="stat-circle-icon">💰</div>
                <div className="stat-circle-text">
                  <span className="stat-circle-val">Lower</span>
                  <span className="stat-circle-lbl">Running Cost</span>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <Link href="/cars?body=EV" className="ev-pill-cta">
              <span>Explore EVs</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <style jsx>{`
          .ev-showcase-section {
            width: 100%;
            padding-top: 14px;
            padding-bottom: 24px;
          }

          .ev-showcase-card {
            position: relative;
            background: linear-gradient(135deg, rgba(5, 36, 24, 0.75) 0%, rgba(11, 21, 19, 0.85) 100%);
            border: 1px solid rgba(0, 232, 135, 0.3);
            border-radius: 24px;
            padding: 20px 18px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            gap: 16px;
            box-shadow: 0 12px 36px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1);
          }

          .ev-showcase-glow {
            position: absolute;
            top: -40px;
            left: -40px;
            width: 200px;
            height: 200px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(0, 232, 135, 0.22) 0%, transparent 70%);
            pointer-events: none;
          }

          .ev-showcase-top {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
            z-index: 2;
          }

          .ev-badge-pill {
            display: inline-block;
            background: rgba(0, 232, 135, 0.15);
            border: 1px solid rgba(0, 232, 135, 0.4);
            color: #00E887;
            font-size: 10px;
            font-weight: 800;
            letter-spacing: 0.08em;
            padding: 3px 10px;
            border-radius: 9999px;
          }

          .ev-showcase-title {
            font-size: 22px;
            font-weight: 800;
            line-height: 1.15;
            color: #FFFFFF;
            margin: 0;
            letter-spacing: -0.02em;
          }

          .ev-showcase-media {
            position: relative;
            width: 100%;
            height: 160px;
            border-radius: 16px;
            overflow: hidden;
            background: rgba(0, 0, 0, 0.4);
          }

          :global(.ev-showcase-img) {
            object-fit: cover;
            object-position: center;
          }

          .ev-stats-circles-row {
            display: flex;
            align-items: center;
            justify-content: space-around;
            gap: 8px;
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 16px;
            padding: 10px 8px;
          }

          .stat-circle-item {
            display: flex;
            align-items: center;
            gap: 6px;
          }

          .stat-circle-icon {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: rgba(0, 232, 135, 0.15);
            color: #00E887;
            display: grid;
            place-items: center;
            font-size: 11px;
            flex-shrink: 0;
          }

          .stat-circle-text {
            display: flex;
            flex-direction: column;
            line-height: 1.1;
          }

          .stat-circle-val {
            font-size: 11px;
            font-weight: 700;
            color: #FFFFFF;
          }

          .stat-circle-lbl {
            font-size: 9px;
            color: rgba(255, 255, 255, 0.6);
          }

          .ev-pill-cta {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            background: #00E887;
            color: #050A09;
            font-size: 13px;
            font-weight: 750;
            padding: 12px 24px;
            border-radius: 9999px;
            text-decoration: none;
            box-shadow: 0 4px 16px rgba(0, 232, 135, 0.35);
            transition: all 150ms ease;
            width: 140px;
          }

          .ev-pill-cta:hover {
            background: #00FF95;
            transform: translateY(-1px);
          }
        `}</style>
      </section>
    );
  }

  // Screen 1 Compact Banner
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

            <Link href="/cars?body=EV" className="ev-cta-btn">
              <span>Explore EVs</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Right / Visual Column */}
          <div className="ev-visual-column">
            <div className="ev-media-container">
              <Image
                src="/ev-charging.jpg"
                alt="Electric car fast charging"
                fill
                sizes="(max-width: 768px) 150px, 260px"
                className="ev-media-img"
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .kerb-ev-banner-section {
          width: 100%;
          padding-top: 14px;
          padding-bottom: 24px;
        }

        .ev-glass-banner {
          position: relative;
          background: linear-gradient(135deg, rgba(5, 30, 20, 0.8) 0%, rgba(11, 21, 19, 0.9) 100%);
          border: 1px solid rgba(0, 232, 135, 0.25);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 16px 18px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        }

        .ev-glow-orb {
          position: absolute;
          top: -30px;
          left: -30px;
          width: 140px;
          height: 140px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0, 232, 135, 0.25) 0%, transparent 70%);
          pointer-events: none;
        }

        .ev-content-column {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 6px;
          z-index: 2;
          flex: 1;
        }

        .ev-badge {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: #00E887;
          text-transform: uppercase;
        }

        .ev-heading {
          font-size: 16px;
          font-weight: 800;
          line-height: 1.2;
          color: #FFFFFF;
          margin: 0;
          letter-spacing: -0.01em;
        }

        .ev-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: #00E887;
          color: #050A09;
          font-size: 11.5px;
          font-weight: 750;
          padding: 7px 14px;
          border-radius: 9999px;
          text-decoration: none;
          margin-top: 4px;
          transition: all 150ms ease;
        }

        .ev-cta-btn:hover {
          background: #00FF95;
          transform: translateY(-1px);
        }

        .ev-visual-column {
          position: relative;
          width: 130px;
          height: 85px;
          flex-shrink: 0;
        }

        .ev-media-container {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 12px;
          overflow: hidden;
        }

        :global(.ev-media-img) {
          object-fit: cover;
          object-position: center;
        }
      `}</style>
    </section>
  );
}
