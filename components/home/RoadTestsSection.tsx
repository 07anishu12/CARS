'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function RoadTestsSection() {
  const reviews = [
    {
      car: 'Tata Nexon',
      rating: '4.6/5',
      review: 'A well-rounded SUV for Indian roads.',
      image: '/nexon.jpg',
      href: '/cars/tata/nexon'
    },
    {
      car: 'Hyundai Creta',
      rating: '4.7/5',
      review: 'Refined, comfortable and feature-loaded.',
      image: '/creta.jpg',
      href: '/cars/hyundai/creta'
    },
    {
      car: 'Maruti Grand Vitara',
      rating: '4.5/5',
      review: 'Strong hybrid with great efficiency.',
      image: '/vitara.jpg',
      href: '/cars/maruti-suzuki/grand-vitara'
    }
  ];

  return (
    <section className="roadtests-section" aria-labelledby="roadtests-title">
      <div className="kerb-page-container">
        {/* Header */}
        <div className="kerb-section-header-row">
          <h2 id="roadtests-title" className="kerb-section-title">
            Independent road test reviews
          </h2>
          <Link href="/cars" className="kerb-view-all-link">
            <span>View all</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Horizontal Track of Review Cards */}
        <div className="reviews-track no-scrollbar">
          {reviews.map((r) => (
            <div key={r.car} className="review-glass-card">
              <div className="review-media-wrap">
                <Image
                  src={r.image}
                  alt={r.car}
                  fill
                  sizes="(max-width: 640px) 200px, 320px"
                  className="review-img"
                />
                <span className="rating-pill">★ {r.rating}</span>
              </div>

              <div className="review-body">
                <h3 className="review-car-title">{r.car}</h3>
                <p className="review-quote">&ldquo;{r.review}&rdquo;</p>

                <Link href={r.href} className="review-read-link">
                  <span>Read Review</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .roadtests-section {
          width: 100%;
          padding-top: 24px;
          padding-bottom: 32px;
        }

        .reviews-track {
          display: flex;
          align-items: stretch;
          gap: 12px;
          overflow-x: auto;
          padding-bottom: 6px;
          padding-inline: 2px;
          -webkit-overflow-scrolling: touch;
        }

        @media (min-width: 768px) {
          .reviews-track {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
            overflow: visible;
          }
        }

        .review-glass-card {
          flex: 1 0 200px;
          min-width: 190px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.10);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.3);
          transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
        }

        .review-glass-card:hover {
          transform: translateY(-2px);
          border-color: rgba(0, 232, 135, 0.35);
          box-shadow: 0 10px 24px -4px rgba(0, 0, 0, 0.45);
        }

        .review-media-wrap {
          position: relative;
          width: 100%;
          height: 110px;
          background: rgba(0, 0, 0, 0.4);
          overflow: hidden;
        }

        :global(.review-img) {
          object-fit: cover;
          object-position: center;
          transition: transform 300ms ease;
        }

        .review-glass-card:hover :global(.review-img) {
          transform: scale(1.05);
        }

        .rating-pill {
          position: absolute;
          bottom: 8px;
          left: 8px;
          background: rgba(11, 21, 19, 0.85);
          border: 1px solid rgba(0, 232, 135, 0.4);
          color: var(--kerb-green-primary, #00E887);
          font-size: 11px;
          font-weight: 750;
          border-radius: 9999px;
          padding: 3px 8px;
          backdrop-filter: blur(8px);
        }

        .review-body {
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex: 1;
        }

        .review-car-title {
          font-size: 14px;
          font-weight: 700;
          color: #FFFFFF;
          margin: 0;
        }

        .review-quote {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.35;
          margin: 0;
          flex: 1;
        }

        .review-read-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          font-weight: 600;
          color: var(--kerb-green-primary, #00E887);
          text-decoration: none;
          margin-top: 8px;
          transition: transform 150ms ease;
        }

        .review-read-link:hover {
          transform: translateX(2px);
        }
      `}</style>
    </section>
  );
}
