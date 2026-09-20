'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CarModel, Make } from '../../types/vehicle';

export interface PopularCarsSectionProps {
  models: CarModel[];
  makes: Make[];
  onOpenLeadModal?: (carName?: string) => void;
}

const CATEGORIES = [
  { label: 'All', value: 'all' },
  { label: 'SUV', value: 'suv' },
  { label: 'Hatchback', value: 'hatchback' },
  { label: 'Sedan', value: 'sedan' },
  { label: 'EV', value: 'ev' }
];

export default function PopularCarsSection({
  models,
  makes,
  onOpenLeadModal
}: PopularCarsSectionProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [wishlist, setWishlist] = useState<string[]>([]);

  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const isWishlisted = (id: string) => wishlist.includes(id);

  // Filter cars based on active category
  const filteredCars = useMemo(() => {
    if (!models || models.length === 0) return [];

    const prioritySlugs = ['creta', 'nexon', 'thar', 'curvv', 'elevate', 'ioniq-5'];
    const sorted = [...models].sort((a, b) => {
      const aIdx = prioritySlugs.indexOf(a.slug);
      const bIdx = prioritySlugs.indexOf(b.slug);
      if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
      if (aIdx !== -1) return -1;
      if (bIdx !== -1) return 1;
      return (b.priceRangeMax || 0) - (a.priceRangeMax || 0);
    });

    if (activeCategory === 'all') {
      return sorted.slice(0, 6);
    }

    if (activeCategory === 'suv') {
      return sorted.filter((c) => c.bodyType?.toLowerCase() === 'suv').slice(0, 6);
    }

    if (activeCategory === 'ev') {
      return sorted.filter((c) => c.isEV || c.fuelTypes?.includes('Electric')).slice(0, 6);
    }

    if (activeCategory === 'hatchback') {
      const match = sorted.filter((c) => c.bodyType?.toLowerCase() === 'hatchback');
      return match.length > 0 ? match.slice(0, 6) : sorted.slice(1, 4);
    }

    if (activeCategory === 'sedan') {
      const match = sorted.filter((c) => c.bodyType?.toLowerCase() === 'sedan');
      return match.length > 0 ? match.slice(0, 6) : sorted.slice(2, 5);
    }

    return sorted.slice(0, 6);
  }, [models, activeCategory]);

  return (
    <section className="popular-cars-section" aria-labelledby="popular-cars-title">
      <div className="kerb-page-container">
        {/* Section Header with Eyebrow, Title, Description, and Link */}
        <div className="kerb-section-header">
          <span className="kerb-section-eyebrow">POPULAR CARS</span>
          <div className="kerb-section-header-row">
            <div>
              <h2 id="popular-cars-title" className="kerb-section-title">
                Popular cars in India
              </h2>
              <p className="kerb-section-desc">
                Explore some of the most searched cars with verified on-road pricing.
              </p>
            </div>
            <Link href="/cars" className="kerb-view-all-link">
              <span>View all</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="category-filter-chips no-scrollbar" role="tablist" aria-label="Car Categories">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              type="button"
              className={`filter-chip ${activeCategory === cat.value ? 'is-active' : ''}`}
              onClick={() => setActiveCategory(cat.value)}
              role="tab"
              aria-selected={activeCategory === cat.value}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Visual Car Cards: Mobile Horizontal Carousel / Desktop 3-col Grid */}
        <div className="cars-carousel-track no-scrollbar">
          {filteredCars.map((car) => {
            const make = makes.find((mk) => mk.id === car.makeId);
            const makeName = make?.name || '';
            const carFullName = `${makeName} ${car.name}`.trim();
            const minLakh = (car.priceRangeMin / 100000).toFixed(2);
            const maxLakh = (car.priceRangeMax / 100000).toFixed(2);
            const formattedPrice = `₹${minLakh}L – ${maxLakh}L`;
            const carHref = `/cars/${make?.slug || 'cars'}/${car.slug}`;
            const saved = isWishlisted(car.id);

            const thumbImg = car.slug === 'creta' ? '/creta.jpg' : (car.slug === 'thar' ? '/thar.jpg' : (car.slug === 'nexon' ? '/nexon.jpg' : car.heroImage));
            const fuelDisplay = car.isEV ? 'Electric' : (car.slug === 'thar' ? 'Diesel' : 'Petrol');
            const mileageDisplay = car.isEV ? '330–465 km' : (car.slug === 'thar' ? '15–18 kmpl' : (car.slug === 'nexon' ? '17–24 kmpl' : '17–21 kmpl'));

            return (
              <article key={car.id} className="car-card-visual">
                {/* 1. Large Top Image with Favorite Button */}
                <div className="card-image-hero">
                  <Link href={carHref} tabIndex={-1} aria-hidden="true" style={{ display: 'block', width: '100%', height: '100%', position: 'relative' }}>
                    <Image
                      src={thumbImg}
                      alt={carFullName}
                      fill
                      sizes="(max-width: 768px) 280px, 360px"
                      className="card-car-img"
                    />
                  </Link>

                  <button
                    type="button"
                    className={`wishlist-btn ${saved ? 'is-saved' : ''}`}
                    onClick={() => toggleWishlist(car.id)}
                    aria-label={saved ? `Remove ${carFullName} from saved` : `Save ${carFullName}`}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill={saved ? '#00E887' : 'none'} stroke={saved ? '#00E887' : '#FFFFFF'} strokeWidth="2.2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>
                </div>

                {/* 2. Car Information Body */}
                <div className="card-body">
                  <div className="name-price-group">
                    <h3 className="car-model-name">
                      <Link href={carHref}>{carFullName}</Link>
                    </h3>
                    <div className="car-price-tag">{formattedPrice}</div>
                  </div>

                  <div className="car-specs-row">
                    <span className="spec-text">{fuelDisplay} &bull; {mileageDisplay}</span>
                  </div>

                  {/* 3. Clearly Visible Action Buttons (Min 44px Height) */}
                  <div className="card-actions-row">
                    <Link href={carHref} className="btn-view-car">
                      View Car
                    </Link>

                    <button
                      type="button"
                      className="btn-get-offer"
                      onClick={() => {
                        if (onOpenLeadModal) {
                          onOpenLeadModal(carFullName);
                        } else {
                          const el = document.getElementById('lead-cta');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                    >
                      Get Offer
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .popular-cars-section {
          width: 100%;
          padding-top: 24px;
          padding-bottom: 36px;
        }

        .category-filter-chips {
          display: flex;
          align-items: center;
          gap: 10px;
          overflow-x: auto;
          margin-bottom: 20px;
          padding-block: 4px;
          padding-inline: 2px;
          -webkit-overflow-scrolling: touch;
        }

        .filter-chip {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: rgba(255, 255, 255, 0.85);
          border-radius: 9999px;
          padding: 8px 18px;
          min-height: 40px;
          font-size: 13.5px;
          font-weight: 650;
          cursor: pointer;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          transition: all 150ms ease;
          white-space: nowrap;
          flex-shrink: 0;
          box-sizing: border-box;
        }

        .filter-chip.is-active {
          background: var(--kerb-green-primary, #00E887);
          border-color: var(--kerb-green-primary, #00E887);
          color: #050A09;
          font-weight: 800;
          box-shadow: 0 0 16px rgba(0, 232, 135, 0.4);
        }

        /* Mobile Horizontal Carousel / Desktop Grid */
        .cars-carousel-track {
          display: flex;
          align-items: stretch;
          gap: 16px;
          overflow-x: auto;
          padding-bottom: 12px;
          padding-inline: 2px;
          -webkit-overflow-scrolling: touch;
        }

        @media (min-width: 1024px) {
          .cars-carousel-track {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            overflow: visible;
          }
        }

        .car-card-visual {
          flex: 0 0 280px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          border-radius: 22px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.38), inset 0 1px 0 rgba(255, 255, 255, 0.12);
          transition: transform 200ms ease, border-color 200ms ease, box-shadow 200ms ease;
          box-sizing: border-box;
        }

        @media (min-width: 440px) {
          .car-card-visual {
            flex: 0 0 310px;
          }
        }

        .car-card-visual:hover {
          transform: translateY(-3px);
          border-color: rgba(0, 232, 135, 0.4);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);
        }

        .card-image-hero {
          position: relative;
          width: 100%;
          height: 165px;
          background: rgba(0, 0, 0, 0.4);
          overflow: hidden;
        }

        :global(.card-car-img) {
          object-fit: cover;
          object-position: center;
          transition: transform 300ms ease;
        }

        .car-card-visual:hover :global(.card-car-img) {
          transform: scale(1.05);
        }

        .wishlist-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          color: #FFFFFF;
          display: grid;
          place-items: center;
          cursor: pointer;
          transition: transform 150ms ease, background 150ms ease;
          z-index: 3;
        }

        .wishlist-btn:hover {
          transform: scale(1.1);
          background: rgba(0, 0, 0, 0.7);
        }

        .wishlist-btn.is-saved {
          background: rgba(0, 232, 135, 0.2);
          border-color: #00E887;
        }

        .card-body {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex: 1;
        }

        .name-price-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .car-model-name {
          font-size: 17px;
          font-weight: 800;
          letter-spacing: -0.015em;
          color: #FFFFFF;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .car-model-name a {
          color: #FFFFFF;
          text-decoration: none;
        }

        .car-price-tag {
          font-size: 15px;
          font-weight: 800;
          color: var(--kerb-green-primary, #00E887);
          letter-spacing: -0.01em;
        }

        .car-specs-row {
          display: flex;
          align-items: center;
        }

        .spec-text {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.65);
          font-weight: 500;
        }

        .card-actions-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 4px;
        }
      `}</style>
    </section>
  );
}
