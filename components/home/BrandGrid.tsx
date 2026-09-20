'use client';

import React from 'react';
import Link from 'next/link';

export default function BrandGrid() {
  const brands = [
    {
      name: 'Maruti Suzuki',
      slug: 'maruti-suzuki',
      svg: (
        <svg width="40" height="40" viewBox="0 0 100 100" fill="currentColor">
          {/* Suzuki S emblem */}
          <path d="M78 26L48 45H22L52 26H78ZM22 74L52 55H78L48 74H22ZM30 38L62 18H86L54 38H30ZM70 62L38 82H14L46 62H70Z" />
        </svg>
      )
    },
    {
      name: 'Hyundai',
      slug: 'hyundai',
      svg: (
        <svg width="42" height="30" viewBox="0 0 100 65" fill="none" stroke="currentColor" strokeWidth="6">
          <ellipse cx="50" cy="32.5" rx="46" ry="28" />
          <path d="M36 18L44 47M64 18L56 47M39 33H61" strokeLinecap="round" />
        </svg>
      )
    },
    {
      name: 'Tata',
      slug: 'tata',
      svg: (
        <svg width="42" height="30" viewBox="0 0 100 65" fill="none" stroke="currentColor" strokeWidth="6">
          <ellipse cx="50" cy="32.5" rx="46" ry="28" />
          <path d="M30 20C40 28 60 28 70 20M50 24V48" strokeLinecap="round" />
        </svg>
      )
    },
    {
      name: 'Mahindra',
      slug: 'mahindra',
      svg: (
        <svg width="42" height="32" viewBox="0 0 100 70" fill="none" stroke="currentColor" strokeWidth="6">
          <path d="M22 54L42 16L50 32L58 16L78 54M34 54L46 32M66 54L54 32" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      name: 'Toyota',
      slug: 'toyota',
      svg: (
        <svg width="42" height="30" viewBox="0 0 100 65" fill="none" stroke="currentColor" strokeWidth="5.5">
          <ellipse cx="50" cy="32.5" rx="46" ry="28" />
          <ellipse cx="50" cy="27" rx="28" ry="13" />
          <ellipse cx="50" cy="32" rx="14" ry="22" />
        </svg>
      )
    },
    {
      name: 'Kia',
      slug: 'kia',
      svg: (
        <svg width="44" height="24" viewBox="0 0 120 40" fill="currentColor">
          <path d="M12 5H22V17L33 5H45L31 20L46 35H33L22 23V35H12V5ZM55 5H65V35H55V5ZM98 5H108L118 35H107L105 27H91L89 35H78L88 5ZM94 19H102L98 9L94 19Z" />
        </svg>
      )
    },
    {
      name: 'Honda',
      slug: 'honda',
      svg: (
        <svg width="38" height="32" viewBox="0 0 100 80" fill="none" stroke="currentColor" strokeWidth="6">
          <path d="M16 12H84L76 72H24L16 12Z" rx="4" />
          <path d="M34 18V64M66 18V64M34 42H66" strokeLinecap="round" />
        </svg>
      )
    },
    {
      name: 'MG',
      slug: 'mg',
      svg: (
        <svg width="38" height="38" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6">
          <polygon points="30,8 70,8 92,30 92,70 70,92 30,92 8,70 8,30" />
          <path d="M26 68V34L38 52L50 34V68M74 44C74 38 68 34 60 34C52 34 48 42 48 50C48 58 54 66 62 66C70 66 74 60 74 54H62" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" />
        </svg>
      )
    }
  ];

  return (
    <section className="brand-grid-section" aria-labelledby="top-brands-title">
      <div className="kerb-page-container">
        {/* Section Header with Eyebrow, Title, Description, and Link */}
        <div className="kerb-section-header">
          <span className="kerb-section-eyebrow">TOP BRANDS</span>
          <div className="kerb-section-header-row">
            <div>
              <h2 id="top-brands-title" className="kerb-section-title">
                Explore by brand
              </h2>
              <p className="kerb-section-desc">
                Leading automotive manufacturers in India with authorized service networks.
              </p>
            </div>
            <Link href="/cars" className="kerb-view-all-link">
              <span>View all</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>

        {/* 2-Row Brand Grid on Mobile (4 cols x 2 rows) / 8 cols on Desktop */}
        <div className="brand-cards-grid">
          {brands.map((b) => (
            <Link key={b.slug} href={`/cars/${b.slug}`} className="brand-glass-card">
              <div className="brand-emblem-wrap" aria-hidden="true">
                {b.svg}
              </div>
              <span className="brand-card-name">{b.name}</span>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        .brand-grid-section {
          width: 100%;
          padding-top: 24px;
          padding-bottom: 32px;
        }

        .brand-cards-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          width: 100%;
          box-sizing: border-box;
        }

        @media (max-width: 360px) {
          .brand-cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 768px) {
          .brand-cards-grid {
            grid-template-columns: repeat(8, 1fr);
            gap: 14px;
          }
        }

        .brand-glass-card {
          background: #FFFFFF !important;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          padding: 16px 8px 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          text-decoration: none;
          min-height: 92px;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
          transition: transform 180ms ease, box-shadow 180ms ease;
          box-sizing: border-box;
        }

        .brand-glass-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.45);
        }

        .brand-emblem-wrap {
          color: #0F1715;
          display: grid;
          place-items: center;
          height: 42px;
          margin-bottom: 6px;
          transition: transform 180ms ease;
        }

        .brand-glass-card:hover .brand-emblem-wrap {
          transform: scale(1.08);
        }

        .brand-card-name {
          font-size: 11.5px;
          font-weight: 750;
          color: #0F1715;
          letter-spacing: -0.01em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
        }
      `}</style>
    </section>
  );
}
