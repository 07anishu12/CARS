'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function NewLaunchesSection() {
  const launches = [
    {
      name: 'Tata Curvv',
      price: 'From ₹10.00L',
      image: '/curvv.jpg',
      href: '/cars/tata/curvv'
    },
    {
      name: 'Honda Elevate',
      price: 'From ₹11.91L',
      image: '/elevate.jpg',
      href: '/cars/honda/elevate'
    },
    {
      name: 'Hyundai IONIQ 5',
      price: 'From ₹46.05L',
      image: '/ioniq5.jpg',
      href: '/cars/hyundai/ioniq-5'
    }
  ];

  return (
    <section className="new-launches-section" aria-labelledby="new-launches-title">
      <div className="kerb-page-container">
        {/* Section Header with Eyebrow, Title, Description, and Link */}
        <div className="kerb-section-header">
          <span className="kerb-section-eyebrow">UPCOMING &amp; RECENT</span>
          <div className="kerb-section-header-row">
            <div>
              <h2 id="new-launches-title" className="kerb-section-title">
                New launches
              </h2>
              <p className="kerb-section-desc">
                The newest nameplates and generational updates entering the Indian market.
              </p>
            </div>
            <Link href="/cars" className="kerb-view-all-link">
              <span>View all</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>

        {/* Horizontal Scroll Track of New Launch Cards */}
        <div className="launches-track no-scrollbar">
          {launches.map((item) => (
            <Link key={item.name} href={item.href} className="launch-card">
              <div className="launch-media-wrap">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 220px, 320px"
                  className="launch-img"
                />
                <span className="badge-new">New</span>
              </div>

              <div className="launch-info">
                <h3 className="launch-name">{item.name}</h3>
                <span className="launch-price">{item.price}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        .new-launches-section {
          width: 100%;
          padding-top: 24px;
          padding-bottom: 36px;
        }

        .launches-track {
          display: flex;
          align-items: stretch;
          gap: 16px;
          overflow-x: auto;
          padding-bottom: 8px;
          padding-inline: 2px;
          -webkit-overflow-scrolling: touch;
        }

        @media (min-width: 768px) {
          .launches-track {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            overflow: visible;
          }
        }

        .launch-card {
          flex: 0 0 220px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          border-radius: 22px;
          overflow: hidden;
          padding: 12px;
          display: flex;
          flex-direction: column;
          text-decoration: none;
          color: #FFFFFF;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.32), inset 0 1px 0 rgba(255, 255, 255, 0.1);
          transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
          box-sizing: border-box;
        }

        @media (min-width: 440px) {
          .launch-card {
            flex: 0 0 250px;
          }
        }

        .launch-card:hover {
          transform: translateY(-3px);
          border-color: rgba(0, 232, 135, 0.4);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);
        }

        .launch-media-wrap {
          position: relative;
          width: 100%;
          height: 125px;
          border-radius: 14px;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.35);
        }

        @media (min-width: 440px) {
          .launch-media-wrap {
            height: 140px;
          }
        }

        :global(.launch-img) {
          object-fit: cover;
          object-position: center;
          transition: transform 250ms ease;
        }

        .launch-card:hover :global(.launch-img) {
          transform: scale(1.05);
        }

        .badge-new {
          position: absolute;
          top: 8px;
          left: 8px;
          background: #00E887;
          color: #050A09;
          font-size: 10px;
          font-weight: 850;
          text-transform: uppercase;
          padding: 3px 8px;
          border-radius: 9999px;
          box-shadow: 0 2px 8px rgba(0, 232, 135, 0.4);
        }

        .launch-info {
          padding: 10px 4px 4px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .launch-name {
          font-size: 15.5px;
          font-weight: 800;
          color: #FFFFFF;
          margin: 0;
          letter-spacing: -0.01em;
        }

        .launch-price {
          font-size: 13.5px;
          font-weight: 750;
          color: var(--kerb-green-primary, #00E887);
        }
      `}</style>
    </section>
  );
}
