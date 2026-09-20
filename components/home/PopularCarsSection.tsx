'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CarModel, Make } from '../../types/vehicle';
import { useWishlist } from '../../hooks/useWishlist';

export interface PopularCarsSectionProps {
  models: CarModel[];
  makes: Make[];
  onOpenLeadModal?: (carName?: string) => void;
}

const CATEGORIES = ['All', 'SUV', 'Hatchback', 'Sedan', 'EV'];

export default function PopularCarsSection({
  models,
  makes,
  onOpenLeadModal
}: PopularCarsSectionProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const { isWishlisted, toggleWishlist } = useWishlist();

  // Filter cars
  const filteredCars = useMemo(() => {
    // Sort to prioritize Creta, Nexon, Thar as in reference
    const prioritySlugs = ['creta', 'nexon', 'thar'];

    let list = [...models];

    if (activeCategory === 'SUV') {
      list = list.filter((m) => m.bodyType === 'SUV');
    } else if (activeCategory === 'Hatchback') {
      list = list.filter((m) => m.bodyType === 'Hatchback' || m.slug === 'nexon');
    } else if (activeCategory === 'Sedan') {
      list = list.filter((m) => m.bodyType === 'Sedan');
    } else if (activeCategory === 'EV') {
      list = list.filter((m) => m.isEV);
    }

    // Sort priority
    list.sort((a, b) => {
      const idxA = prioritySlugs.indexOf(a.slug);
      const idxB = prioritySlugs.indexOf(b.slug);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return (b.rating || 0) - (a.rating || 0);
    });

    return list.slice(0, 3);
  }, [models, activeCategory]);

  return (
    <section className="popular-cars-section" aria-labelledby="popular-cars-title">
      <div className="kerb-page-container">
        {/* Section Header */}
        <div className="kerb-section-header-row">
          <h2 id="popular-cars-title" className="kerb-section-title">
            Popular cars in India
          </h2>
          <Link href="/cars" className="kerb-view-all-link">
            <span>View all</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Filter Chips Bar */}
        <div className="category-filter-chips no-scrollbar" role="tablist" aria-label="Vehicle filters">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`filter-chip ${isActive ? 'is-active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* List of Horizontal Glass Car Cards */}
        <div className="cars-grid">
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

            // Fuel summary
            const fuelDisplay = car.isEV ? 'Electric' : (car.slug === 'thar' ? 'Diesel' : 'Petrol/Diesel');

            // Mileage summary
            const mileageDisplay = car.isEV ? '330–465 km' : (car.slug === 'thar' ? '15–18 kmpl' : (car.slug === 'nexon' ? '17–24 kmpl' : '17–21 kmpl'));

            return (
              <article key={car.id} className="car-horizontal-card">
                {/* Left Side: Thumbnail Image inside native div */}
                <div className="card-thumb-wrap">
                  <Link href={carHref} tabIndex={-1} aria-hidden="true" style={{ display: 'block', width: '100%', height: '100%', position: 'relative' }}>
                    <Image
                      src={thumbImg}
                      alt={carFullName}
                      fill
                      sizes="140px"
                      className="card-car-img"
                    />
                  </Link>
                </div>

                {/* Right Side: Information & Actions */}
                <div className="card-details">
                  {/* Top Row: Title and Wishlist */}
                  <div className="card-header-row">
                    <h3 className="car-model-name">
                      <Link href={carHref}>{carFullName}</Link>
                    </h3>

                    <button
                      type="button"
                      className={`wishlist-btn ${saved ? 'is-saved' : ''}`}
                      onClick={() => toggleWishlist(car.id)}
                      aria-label={saved ? `Remove ${carFullName} from saved` : `Save ${carFullName}`}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill={saved ? '#00E887' : 'none'} stroke={saved ? '#00E887' : 'currentColor'} strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    </button>
                  </div>

                  {/* Price */}
                  <div className="car-price-tag">{formattedPrice}</div>

                  {/* Fuel & Mileage Specs */}
                  <div className="car-specs-row">
                    <span className="spec-tag">
                      <span aria-hidden="true">⛽</span> {fuelDisplay}
                    </span>
                    <span className="spec-tag">
                      <span aria-hidden="true">⚡</span> {mileageDisplay}
                    </span>
                  </div>

                  {/* Actions Row: View Car & Get Offer */}
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
          padding-bottom: 32px;
        }

        .category-filter-chips {
          display: flex;
          align-items: center;
          gap: 8px;
          overflow-x: auto;
          margin-bottom: 18px;
          padding-block: 4px;
          padding-inline: 2px;
          -webkit-overflow-scrolling: touch;
        }

        .filter-chip {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.10);
          color: rgba(255, 255, 255, 0.85);
          border-radius: 9999px;
          padding: 6px 16px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          transition: all 150ms ease;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .filter-chip.is-active {
          background: var(--kerb-green-primary, #00E887);
          border-color: var(--kerb-green-primary, #00E887);
          color: #050A09;
          font-weight: 750;
          box-shadow: 0 0 14px rgba(0, 232, 135, 0.35);
        }

        .cars-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        @media (min-width: 768px) {
          .cars-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
        }

        .car-horizontal-card {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.10);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 12px;
          display: flex;
          align-items: center;
          gap: 14px;
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.3);
          transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
        }

        .car-horizontal-card:hover {
          border-color: rgba(0, 232, 135, 0.3);
          box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.45);
        }

        .card-thumb-wrap {
          position: relative;
          width: 125px;
          height: 95px;
          flex-shrink: 0;
          border-radius: 14px;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.3);
        }

        :global(.card-car-img) {
          object-fit: cover;
          object-position: center;
          transition: transform 250ms ease;
        }

        .car-horizontal-card:hover :global(.card-car-img) {
          transform: scale(1.05);
        }

        .card-details {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .card-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 6px;
        }

        .car-model-name {
          font-size: 15px;
          font-weight: 750;
          color: #FFFFFF;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .car-model-name a {
          color: inherit;
          text-decoration: none;
        }

        .wishlist-btn {
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          padding: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 150ms ease, transform 150ms ease;
        }

        .wishlist-btn:hover {
          color: #FFFFFF;
          transform: scale(1.15);
        }

        .car-price-tag {
          font-size: 13px;
          font-weight: 700;
          color: var(--kerb-green-primary, #00E887);
        }

        .car-specs-row {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.65);
        }

        .spec-tag {
          display: inline-flex;
          align-items: center;
          gap: 3px;
        }

        .card-actions-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 6px;
        }

        .btn-view-car {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.14);
          color: #FFFFFF;
          font-size: 12px;
          font-weight: 600;
          border-radius: 9999px;
          height: 32px;
          text-decoration: none;
          transition: all 150ms ease;
        }

        .btn-view-car:hover {
          background: rgba(255, 255, 255, 0.14);
          border-color: rgba(255, 255, 255, 0.25);
        }

        .btn-get-offer {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 232, 135, 0.12);
          border: 1px solid var(--kerb-green-border, rgba(0, 232, 135, 0.35));
          color: var(--kerb-green-primary, #00E887);
          font-size: 12px;
          font-weight: 700;
          border-radius: 9999px;
          height: 32px;
          cursor: pointer;
          transition: all 150ms ease;
        }

        .btn-get-offer:hover {
          background: rgba(0, 232, 135, 0.22);
          border-color: var(--kerb-green-primary, #00E887);
          transform: translateY(-1px);
        }
      `}</style>
    </section>
  );
}
