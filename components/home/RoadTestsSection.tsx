'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function RoadTestsSection() {
  const reviews = [
    {
      car: 'Tata Nexon',
      rating: '4.6 / 5',
      review: 'A well-rounded compact SUV with class-leading 5-star crash safety and punchy turbo performance.',
      image: '/nexon.jpg',
      href: '/cars/tata/nexon'
    },
    {
      car: 'Hyundai Creta',
      rating: '4.7 / 5',
      review: 'Refined suspension, whisper-quiet cabin, and benchmark connected tech that excels on Indian roads.',
      image: '/creta.jpg',
      href: '/cars/hyundai/creta'
    },
    {
      car: 'Maruti Grand Vitara',
      rating: '4.5 / 5',
      review: 'Strong intelligent hybrid system offering unmatched 27+ kmpl real-world city fuel economy.',
      image: '/vitara.jpg',
      href: '/cars/maruti-suzuki/grand-vitara'
    }
  ];

  return (
    <section className="roadtests-section" aria-labelledby="roadtests-title">
      <div className="kerb-page-container">
        {/* Section Header with Eyebrow, Title, Description, and Link */}
        <div className="kerb-section-header">
          <span className="kerb-section-eyebrow">VERIFIED REVIEWS</span>
          <div className="kerb-section-header-row">
            <div>
              <h2 id="roadtests-title" className="kerb-section-title">
                Independent road test reviews
              </h2>
              <p className="kerb-section-desc">
                Instrumented acceleration tests, real-world mileage verification, and expert verdict.
              </p>
            </div>
            <Link href="/cars" className="kerb-view-all-link">
              <span>View all</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>

        {/* Horizontal Track of Larger Review Cards */}
        <div className="reviews-track no-scrollbar">
          {reviews.map((r) => (
            <div key={r.car} className="review-glass-card">
              <div className="review-media-wrap">
                <Image
                  src={r.image}
                  alt={r.car}
                  fill
                  sizes="(max-width: 640px) 260px, 360px"
                  className="review-img"
                />
                <span className="rating-pill">★ {r.rating}</span>
              </div>

              <div className="review-body">
                <h3 className="review-car-title">{r.car}</h3>
                <p className="review-quote">&ldquo;{r.review}&rdquo;</p>

                <div className="review-action-wrap">
                  <Link href={r.href} className="review-read-link">
                    <span>Read Review</span>
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .roadtests-section {
          width: 100%;
          padding-top: 24px;
          padding-bottom: 36px;
        }

        .reviews-track {
          display: flex;
          align-items: stretch;
          gap: 16px;
          overflow-x: auto;
          padding-bottom: 8px;
          padding-inline: 2px;
          -webkit-overflow-scrolling: touch;
        }

        @media (min-width: 1024px) {
          .reviews-track {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            overflow: visible;
          }
        }

        .review-glass-card {
          flex: 0 0 265px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          border-radius: 22px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 8px 26px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.12);
          transition: transform 200ms ease, border-color 200ms ease, box-shadow 200ms ease;
          box-sizing: border-box;
        }

        @media (min-width: 440px) {
          .review-glass-card {
            flex: 0 0 285px;
          }
        }

        .review-glass-card:hover {
          transform: translateY(-3px);
          border-color: rgba(0, 232, 135, 0.45);
          box-shadow: 0 14px 36px rgba(0, 0, 0, 0.45);
        }

        .review-media-wrap {
          position: relative;
          width: 100%;
          height: 135px;
          background: rgba(0, 0, 0, 0.35);
          overflow: hidden;
        }

        @media (min-width: 440px) {
          .review-media-wrap {
            height: 150px;
          }
        }

        :global(.review-img) {
          object-fit: cover;
          object-position: center;
          transition: transform 250ms ease;
        }

        .review-glass-card:hover :global(.review-img) {
          transform: scale(1.05);
        }

        .rating-pill {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(5, 10, 9, 0.82);
          border: 1px solid rgba(0, 232, 135, 0.5);
          color: #00E887;
          font-size: 11px;
          font-weight: 800;
          padding: 4px 10px;
          border-radius: 9999px;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
        }

        .review-body {
          padding: 16px 16px 18px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex: 1;
        }

        .review-car-title {
          font-size: 16.5px;
          font-weight: 800;
          color: #FFFFFF;
          margin: 0;
          letter-spacing: -0.015em;
        }

        .review-quote {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.45;
          margin: 0;
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .review-action-wrap {
          margin-top: 6px;
        }
      `}</style>
    </section>
  );
}
