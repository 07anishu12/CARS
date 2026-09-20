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
        {/* Header */}
        <div className="kerb-section-header-row">
          <h2 id="new-launches-title" className="kerb-section-title">
            New launches
          </h2>
          <Link href="/cars" className="kerb-view-all-link">
            <span>View all</span>
            <span aria-hidden="true">→</span>
          </Link>
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
                  sizes="(max-width: 640px) 180px, 260px"
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
          padding-bottom: 32px;
        }

        .launches-track {
          display: flex;
          align-items: stretch;
          gap: 12px;
          overflow-x: auto;
          padding-bottom: 6px;
          padding-inline: 2px;
          -webkit-overflow-scrolling: touch;
        }

        @media (min-width: 768px) {
          .launches-track {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
            overflow: visible;
          }
        }

        .launch-card {
          flex: 1 0 170px;
          min-width: 160px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.10);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 10px;
          display: flex;
          flex-direction: column;
          text-decoration: none;
          color: #FFFFFF;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
          transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
        }

        .launch-card:hover {
          transform: translateY(-2px);
          border-color: rgba(0, 232, 135, 0.35);
          box-shadow: 0 10px 24px -4px rgba(0, 0, 0, 0.45);
        }

        .launch-media-wrap {
          position: relative;
          width: 100%;
          height: 100px;
          border-radius: 14px;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.3);
          margin-bottom: 10px;
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
          background: rgba(11, 21, 19, 0.85);
          border: 1px solid rgba(0, 232, 135, 0.4);
          color: var(--kerb-green-primary, #00E887);
          font-size: 10px;
          font-weight: 750;
          text-transform: uppercase;
          border-radius: 9999px;
          padding: 2px 8px;
          backdrop-filter: blur(8px);
        }

        .launch-info {
          padding: 0 4px 4px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .launch-name {
          font-size: 13px;
          font-weight: 750;
          color: #FFFFFF;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .launch-price {
          font-size: 12px;
          font-weight: 600;
          color: var(--kerb-green-primary, #00E887);
        }
      `}</style>
    </section>
  );
}
