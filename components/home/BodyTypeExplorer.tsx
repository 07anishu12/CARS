'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function BodyTypeExplorer() {
  const bodyTypes = [
    {
      name: 'SUV',
      desc: 'Commanding stance & high clearance',
      image: '/creta.jpg',
      href: '/cars?body=SUV'
    },
    {
      name: 'Hatchback',
      desc: 'Nimble agility for daily city traffic',
      image: '/nexon.jpg',
      href: '/cars?body=Hatchback'
    },
    {
      name: 'Sedan',
      desc: 'Plush highway ride & executive comfort',
      image: '/elevate.jpg',
      href: '/cars?body=Sedan'
    },
    {
      name: 'EV',
      desc: 'Zero emissions with instant electric torque',
      image: '/ev-charging.jpg',
      href: '/cars?body=EV'
    },
    {
      name: 'MPV',
      desc: 'Spacious 7-seater modular family cabin',
      image: '/xuv700.jpg',
      href: '/cars?seats=7'
    },
    {
      name: 'Luxury',
      desc: 'Uncompromising prestige & refinements',
      image: '/hero-journey.jpg',
      href: '/cars?budget=ABOVE_20L'
    },
    {
      name: 'Coupe',
      desc: 'Fastback aero styling & sporty stance',
      image: '/curvv.jpg',
      href: '/cars?body=SUV'
    }
  ];

  return (
    <section className="body-type-section" aria-labelledby="body-type-title">
      <div className="kerb-page-container">
        {/* Section Header with Eyebrow, Title, Description, and Link */}
        <div className="kerb-section-header">
          <span className="kerb-section-eyebrow">BODY STYLES</span>
          <div className="kerb-section-header-row">
            <div>
              <h2 id="body-type-title" className="kerb-section-title">
                Explore by body type
              </h2>
              <p className="kerb-section-desc">
                Find cars engineered for your lifestyle, terrain, and city driving needs.
              </p>
            </div>
            <Link href="/cars" className="kerb-view-all-link">
              <span>View all</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>

        {/* Horizontal Track with Generous Cards */}
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
          padding-top: 24px;
          padding-bottom: 32px;
        }

        .body-type-track {
          display: flex;
          align-items: stretch;
          gap: 14px;
          overflow-x: auto;
          padding-bottom: 8px;
          padding-inline: 2px;
          -webkit-overflow-scrolling: touch;
        }

        @media (min-width: 1024px) {
          .body-type-track {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
            overflow: visible;
          }
        }

        .body-type-card {
          flex: 0 0 150px;
          min-width: 140px;
          min-height: 185px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          border-radius: 22px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          text-decoration: none;
          color: #FFFFFF;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.12);
          transition: transform 200ms ease, border-color 200ms ease, box-shadow 200ms ease;
          box-sizing: border-box;
        }

        @media (min-width: 440px) {
          .body-type-card {
            flex: 0 0 165px;
            min-height: 200px;
          }
        }

        .body-type-card:hover {
          transform: translateY(-3px);
          border-color: rgba(0, 232, 135, 0.45);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);
        }

        .card-media-wrap {
          position: relative;
          width: 100%;
          height: 110px;
          background: rgba(0, 0, 0, 0.35);
          overflow: hidden;
        }

        @media (min-width: 440px) {
          .card-media-wrap {
            height: 120px;
          }
        }

        :global(.card-media-img) {
          object-fit: cover;
          object-position: center;
          transition: transform 250ms ease;
        }

        .body-type-card:hover :global(.card-media-img) {
          transform: scale(1.06);
        }

        .media-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(5,10,9,0.7) 100%);
        }

        .card-info {
          padding: 12px 14px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex: 1;
        }

        .card-name {
          font-size: 15px;
          font-weight: 800;
          color: #FFFFFF;
          margin: 0;
          letter-spacing: -0.01em;
        }

        .card-desc {
          font-size: 11.5px;
          color: rgba(255, 255, 255, 0.65);
          margin: 0;
          line-height: 1.35;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}
