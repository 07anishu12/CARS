'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function BodyTypeExplorer() {
  const bodyTypes = [
    {
      name: 'SUV',
      desc: 'Commanding stance & ground clearance',
      image: '/creta.jpg',
      href: '/cars?body=SUV'
    },
    {
      name: 'Hatchback',
      desc: 'Nimble footprint for city traffic',
      image: '/nexon.jpg',
      href: '/cars?body=Hatchback'
    },
    {
      name: 'Sedan',
      desc: 'Plush highway ride & boot space',
      image: '/elevate.jpg',
      href: '/cars?body=Sedan'
    },
    {
      name: 'MPV',
      desc: 'Maximum 7-seater family comfort',
      image: '/xuv700.jpg',
      href: '/cars?seats=7'
    }
  ];

  return (
    <section className="body-type-section" aria-labelledby="body-type-title">
      <div className="kerb-page-container">
        {/* Section Header */}
        <div className="kerb-section-header-row">
          <h2 id="body-type-title" className="kerb-section-title">
            Explore by body type
          </h2>
          <Link href="/cars" className="kerb-view-all-link">
            <span>View all</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Horizontal Track of Rich Compact Cards */}
        <div className="body-type-track no-scrollbar">
          {bodyTypes.map((item) => (
            <Link key={item.name} href={item.href} className="body-type-card">
              <div className="card-media-wrap">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="180px"
                  className="card-media-img"
                />
                <div className="media-overlay" />
              </div>

              <div className="card-info">
                <h3 className="card-name">{item.name}</h3>
                <p className="card-desc">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        .body-type-section {
          width: 100%;
          padding-top: 20px;
          padding-bottom: 28px;
        }

        .body-type-track {
          display: flex;
          align-items: stretch;
          gap: 12px;
          overflow-x: auto;
          padding-bottom: 6px;
          padding-inline: 2px;
          -webkit-overflow-scrolling: touch;
        }

        @media (min-width: 768px) {
          .body-type-track {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 14px;
            overflow: visible;
          }
        }

        .body-type-card {
          flex: 1 1 0;
          min-width: 0;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.10);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 16px;
          padding: 8px 6px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          text-decoration: none;
          color: #FFFFFF;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
          transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease, background 180ms ease;
          box-sizing: border-box;
        }

        .body-type-card:hover {
          transform: translateY(-2px);
          background: rgba(255, 255, 255, 0.09);
          border-color: rgba(0, 232, 135, 0.35);
          box-shadow: 0 10px 24px -4px rgba(0, 0, 0, 0.5);
        }

        .card-media-wrap {
          position: relative;
          width: 100%;
          height: 48px;
          border-radius: 10px;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.25);
          margin-bottom: 6px;
        }

        :global(.card-media-img) {
          object-fit: contain;
          object-position: center;
          transition: transform 250ms ease;
        }

        .body-type-card:hover :global(.card-media-img) {
          transform: scale(1.05);
        }

        .media-overlay {
          display: none;
        }

        .card-info {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }

        .card-name {
          font-size: 11px;
          font-weight: 700;
          color: #FFFFFF;
          margin: 0;
          text-align: center;
        }

        .card-desc {
          display: none;
        }
      `}</style>
    </section>
  );
}
