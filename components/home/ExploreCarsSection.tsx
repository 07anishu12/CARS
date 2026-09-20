'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import CarCard from './CarCard';
import { CarModel, Make } from '../../types/vehicle';

export interface ExploreCarsSectionProps {
  models: CarModel[];
  makes: Make[];
  activeCategory?: string;
  onCategoryChange?: (cat: string) => void;
}

const CATEGORIES = ['Popular', 'SUV', 'Hatchback', 'Sedan', 'EV', 'Hybrid', 'Luxury'];

export default function ExploreCarsSection({
  models,
  makes,
  activeCategory: controlledCategory,
  onCategoryChange
}: ExploreCarsSectionProps) {
  // Category tabs
  const [selectedCategory, setSelectedCategory] = useState<string>('Popular');

  // Keep internal state in sync if parent changes activeCategory
  useEffect(() => {
    if (controlledCategory && CATEGORIES.includes(controlledCategory)) {
      setSelectedCategory(controlledCategory);
    }
  }, [controlledCategory]);

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    if (onCategoryChange) onCategoryChange(cat);
  };

  // Detailed Filter states
  const [budget, setBudget] = useState<string>('ALL');
  const [brand, setBrand] = useState<string>('ALL');
  const [fuel, setFuel] = useState<string>('ALL');
  const [transmission, setTransmission] = useState<string>('ALL');
  const [seating, setSeating] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<string>('popular');

  // Mobile Bottom Sheet toggle
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const bottomSheetRef = useRef<HTMLDivElement>(null);

  // Close mobile filter on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileFilterOpen) {
        setMobileFilterOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileFilterOpen]);

  // Clear all filters
  const handleClearAll = () => {
    setBudget('ALL');
    setBrand('ALL');
    setFuel('ALL');
    setTransmission('ALL');
    setSeating('ALL');
  };

  // Filter calculation
  const filteredVehicles = useMemo(() => {
    return models
      .filter((m) => {
        // 1. Category Tab Filter
        if (selectedCategory === 'Popular') {
          // Keep all or trending
        } else if (selectedCategory === 'SUV') {
          if (m.bodyType !== 'SUV') return false;
        } else if (selectedCategory === 'Hatchback') {
          if (m.bodyType !== 'Hatchback') return false;
        } else if (selectedCategory === 'Sedan') {
          if (m.bodyType !== 'Sedan') return false;
        } else if (selectedCategory === 'EV') {
          if (!m.isEV) return false;
        } else if (selectedCategory === 'Hybrid') {
          if (!m.isHybrid) return false;
        } else if (selectedCategory === 'Luxury') {
          if (!m.isLuxury && m.priceRangeMin < 2500000) return false;
        }

        // 2. Budget Filter
        if (budget !== 'ALL') {
          if (budget === 'UNDER_10L' && m.priceRangeMin >= 1000000) return false;
          if (budget === '10L_15L' && (m.priceRangeMin > 1500000 || m.priceRangeMax < 1000000)) return false;
          if (budget === '15L_20L' && (m.priceRangeMin > 2000000 || m.priceRangeMax < 1500000)) return false;
          if (budget === 'ABOVE_20L' && m.priceRangeMax < 2000000) return false;
        }

        // 3. Brand Filter
        if (brand !== 'ALL') {
          const make = makes.find((mk) => mk.slug === brand);
          if (!make || m.makeId !== make.id) return false;
        }

        // 4. Fuel Filter
        if (fuel !== 'ALL') {
          if (!m.fuelTypes.some((f) => f.toLowerCase() === fuel.toLowerCase())) {
            return false;
          }
        }

        // 5. Transmission Filter
        if (transmission !== 'ALL') {
          if (transmission === 'Automatic') {
            const hasAuto = m.transmissions.some((t) => t !== 'Manual');
            if (!hasAuto) return false;
          } else if (transmission === 'Manual') {
            if (!m.transmissions.includes('Manual')) return false;
          }
        }

        // 6. Seating Filter
        if (seating !== 'ALL') {
          const seatNum = parseInt(seating, 10);
          if (!m.seatingCapacities.includes(seatNum)) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_asc') {
          return a.priceRangeMin - b.priceRangeMin;
        }
        if (sortBy === 'price_desc') {
          return b.priceRangeMax - a.priceRangeMax;
        }
        if (sortBy === 'rating') {
          return b.rating - a.rating;
        }
        // Popular: trending first, then rating
        if (a.isTrending && !b.isTrending) return -1;
        if (!a.isTrending && b.isTrending) return 1;
        return b.rating - a.rating;
      });
  }, [models, makes, selectedCategory, budget, brand, fuel, transmission, seating, sortBy]);

  // Active filter count (excluding Category tab)
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (budget !== 'ALL') count++;
    if (brand !== 'ALL') count++;
    if (fuel !== 'ALL') count++;
    if (transmission !== 'ALL') count++;
    if (seating !== 'ALL') count++;
    return count;
  }, [budget, brand, fuel, transmission, seating]);

  // Generate URL for "View all cars" button preserving active filters
  const viewAllHref = useMemo(() => {
    const params = new URLSearchParams();
    if (selectedCategory !== 'Popular') {
      params.set('body', selectedCategory);
    }
    if (budget !== 'ALL') params.set('budget', budget);
    if (brand !== 'ALL') params.set('brand', brand);
    if (fuel !== 'ALL') params.set('fuel', fuel);
    if (transmission !== 'ALL') params.set('transmission', transmission);
    if (seating !== 'ALL') params.set('seats', seating);
    const qs = params.toString();
    return qs ? `/cars?${qs}` : '/cars';
  }, [selectedCategory, budget, brand, fuel, transmission, seating]);

  // Display only first 6 cards on homepage
  const displayedVehicles = filteredVehicles.slice(0, 6);

  return (
    <section id="explore-cars" className="kerb-section explore-section" aria-labelledby="explore-title">
      <div className="kerb-container">
        {/* Section Header */}
        <div className="kerb-section-header">
          <div>
            <span className="kerb-eyebrow">Vehicle Catalogue</span>
            <h2 id="explore-title" className="kerb-section-title">
              Explore cars
            </h2>
            <p className="kerb-section-desc">Browse cars by what you&apos;re looking for.</p>
          </div>

          <Link href={viewAllHref} className="kerb-btn kerb-btn-secondary kerb-btn-sm desktop-view-all">
            <span>View all {filteredVehicles.length} cars</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* 1. Category Controls (Pills) */}
        <div className="category-tabs-wrap" role="tablist" aria-label="Car categories">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={`kerb-chip category-tab-btn ${isSelected ? 'is-active' : ''}`}
                onClick={() => handleCategorySelect(cat)}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* 2. Desktop Horizontal Filter Bar */}
        <div className="desktop-filter-bar" role="search" aria-label="Car filter bar">
          <div className="filter-dropdowns">
            {/* Budget */}
            <div className="filter-select-wrap">
              <label htmlFor="filter-budget" className="sr-only">
                Budget
              </label>
              <select
                id="filter-budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className={`filter-select ${budget !== 'ALL' ? 'is-filtered' : ''}`}
              >
                <option value="ALL">Budget: All</option>
                <option value="UNDER_10L">Under ₹10 Lakh</option>
                <option value="10L_15L">₹10L – ₹15 Lakh</option>
                <option value="15L_20L">₹15L – ₹20 Lakh</option>
                <option value="ABOVE_20L">₹20 Lakh+</option>
              </select>
            </div>

            {/* Brand */}
            <div className="filter-select-wrap">
              <label htmlFor="filter-brand" className="sr-only">
                Brand
              </label>
              <select
                id="filter-brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className={`filter-select ${brand !== 'ALL' ? 'is-filtered' : ''}`}
              >
                <option value="ALL">Brand: All</option>
                {makes.map((mk) => (
                  <option key={mk.id} value={mk.slug}>
                    {mk.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Fuel */}
            <div className="filter-select-wrap">
              <label htmlFor="filter-fuel" className="sr-only">
                Fuel
              </label>
              <select
                id="filter-fuel"
                value={fuel}
                onChange={(e) => setFuel(e.target.value)}
                className={`filter-select ${fuel !== 'ALL' ? 'is-filtered' : ''}`}
              >
                <option value="ALL">Fuel: All</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
                <option value="CNG">CNG</option>
              </select>
            </div>

            {/* Transmission */}
            <div className="filter-select-wrap">
              <label htmlFor="filter-transmission" className="sr-only">
                Transmission
              </label>
              <select
                id="filter-transmission"
                value={transmission}
                onChange={(e) => setTransmission(e.target.value)}
                className={`filter-select ${transmission !== 'ALL' ? 'is-filtered' : ''}`}
              >
                <option value="ALL">Transmission: All</option>
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
              </select>
            </div>

            {/* Seating */}
            <div className="filter-select-wrap">
              <label htmlFor="filter-seating" className="sr-only">
                Seating
              </label>
              <select
                id="filter-seating"
                value={seating}
                onChange={(e) => setSeating(e.target.value)}
                className={`filter-select ${seating !== 'ALL' ? 'is-filtered' : ''}`}
              >
                <option value="ALL">Seats: All</option>
                <option value="5">5 Seater</option>
                <option value="7">7 Seater</option>
              </select>
            </div>
          </div>

          {/* Right: Showing count & Sort */}
          <div className="filter-meta-actions">
            <span className="showing-counter">
              Showing <strong>{filteredVehicles.length}</strong> cars
            </span>

            <div className="filter-select-wrap sort-select-wrap">
              <label htmlFor="filter-sort" className="sr-only">
                Sort vehicles
              </label>
              <select
                id="filter-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select sort-select"
              >
                <option value="popular">Sort: Popular</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Mobile Filter & Sort Triggers */}
        <div className="mobile-filter-triggers">
          <button
            type="button"
            className="kerb-btn kerb-btn-secondary mobile-filter-btn"
            onClick={() => setMobileFilterOpen(true)}
          >
            <span>Filters</span>
            {activeFiltersCount > 0 && <span className="filter-count-badge">{activeFiltersCount}</span>}
          </button>

          <div className="filter-select-wrap mobile-sort-wrap">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select mobile-sort-select"
              aria-label="Sort cars"
            >
              <option value="popular">Sort: Popular</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* 3. Selected Active Filter Chips */}
        {activeFiltersCount > 0 && (
          <div className="active-filter-chips-row" aria-label="Active filters">
            <span className="active-label">Active:</span>

            {budget !== 'ALL' && (
              <span className="active-filter-chip">
                <span>
                  {budget === 'UNDER_10L'
                    ? 'Under ₹10L'
                    : budget === '10L_15L'
                    ? '₹10L – ₹15L'
                    : budget === '15L_20L'
                    ? '₹15L – ₹20L'
                    : '₹20L+'}
                </span>
                <button
                  type="button"
                  onClick={() => setBudget('ALL')}
                  className="chip-remove-btn"
                  aria-label="Remove budget filter"
                >
                  ✕
                </button>
              </span>
            )}

            {brand !== 'ALL' && (
              <span className="active-filter-chip">
                <span>{makes.find((m) => m.slug === brand)?.name || brand}</span>
                <button
                  type="button"
                  onClick={() => setBrand('ALL')}
                  className="chip-remove-btn"
                  aria-label="Remove brand filter"
                >
                  ✕
                </button>
              </span>
            )}

            {fuel !== 'ALL' && (
              <span className="active-filter-chip">
                <span>{fuel}</span>
                <button
                  type="button"
                  onClick={() => setFuel('ALL')}
                  className="chip-remove-btn"
                  aria-label="Remove fuel filter"
                >
                  ✕
                </button>
              </span>
            )}

            {transmission !== 'ALL' && (
              <span className="active-filter-chip">
                <span>{transmission}</span>
                <button
                  type="button"
                  onClick={() => setTransmission('ALL')}
                  className="chip-remove-btn"
                  aria-label="Remove transmission filter"
                >
                  ✕
                </button>
              </span>
            )}

            {seating !== 'ALL' && (
              <span className="active-filter-chip">
                <span>{seating} Seats</span>
                <button
                  type="button"
                  onClick={() => setSeating('ALL')}
                  className="chip-remove-btn"
                  aria-label="Remove seating filter"
                >
                  ✕
                </button>
              </span>
            )}

            <button type="button" onClick={handleClearAll} className="clear-all-text-btn">
              Clear all
            </button>
          </div>
        )}

        {/* 4. Car Grid (Desktop) / Carousel Rail (Mobile) */}
        {displayedVehicles.length === 0 ? (
          <div className="no-results-card">
            <p>No vehicles match your active criteria.</p>
            <button type="button" onClick={handleClearAll} className="kerb-btn kerb-btn-primary kerb-btn-sm">
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="cars-grid-container">
              {displayedVehicles.map((model, idx) => {
                const make = makes.find((mk) => mk.id === model.makeId);
                return (
                  <div key={model.id} className="car-card-cell">
                    <CarCard model={model} make={make} priority={idx < 2} />
                  </div>
                );
              })}
            </div>

            {/* Mobile View All Link */}
            <div className="mobile-view-all-wrap">
              <Link href={viewAllHref} className="kerb-btn kerb-btn-secondary" style={{ width: '100%' }}>
                <span>View all {filteredVehicles.length} cars</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </>
        )}
      </div>

      {/* Mobile Filters Bottom Sheet */}
      {mobileFilterOpen && (
        <div
          className="mobile-filter-sheet-overlay"
          onClick={() => setMobileFilterOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-filter-title"
        >
          <div
            className="mobile-filter-sheet"
            ref={bottomSheetRef}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sheet-header">
              <h3 id="mobile-filter-title" className="sheet-title">
                Filters {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ''}
              </h3>
              <button
                type="button"
                className="sheet-close-btn"
                onClick={() => setMobileFilterOpen(false)}
                aria-label="Close filters"
              >
                ✕
              </button>
            </div>

            <div className="sheet-body">
              {/* Budget */}
              <div className="sheet-group">
                <span className="sheet-group-label">Budget</span>
                <div className="sheet-options-grid">
                  {[
                    { val: 'ALL', label: 'Any Budget' },
                    { val: 'UNDER_10L', label: 'Under ₹10L' },
                    { val: '10L_15L', label: '₹10L – ₹15L' },
                    { val: '15L_20L', label: '₹15L – ₹20L' },
                    { val: 'ABOVE_20L', label: '₹20 Lakh+' }
                  ].map((item) => (
                    <button
                      key={item.val}
                      type="button"
                      className={`kerb-chip ${budget === item.val ? 'is-active' : ''}`}
                      onClick={() => setBudget(item.val)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand */}
              <div className="sheet-group">
                <span className="sheet-group-label">Brand</span>
                <div className="sheet-options-grid">
                  <button
                    type="button"
                    className={`kerb-chip ${brand === 'ALL' ? 'is-active' : ''}`}
                    onClick={() => setBrand('ALL')}
                  >
                    All Brands
                  </button>
                  {makes.map((mk) => (
                    <button
                      key={mk.id}
                      type="button"
                      className={`kerb-chip ${brand === mk.slug ? 'is-active' : ''}`}
                      onClick={() => setBrand(mk.slug)}
                    >
                      {mk.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fuel */}
              <div className="sheet-group">
                <span className="sheet-group-label">Fuel Type</span>
                <div className="sheet-options-grid">
                  {['ALL', 'Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG'].map((f) => (
                    <button
                      key={f}
                      type="button"
                      className={`kerb-chip ${fuel === f ? 'is-active' : ''}`}
                      onClick={() => setFuel(f)}
                    >
                      {f === 'ALL' ? 'All Fuels' : f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Transmission */}
              <div className="sheet-group">
                <span className="sheet-group-label">Transmission</span>
                <div className="sheet-options-grid">
                  {['ALL', 'Manual', 'Automatic'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      className={`kerb-chip ${transmission === t ? 'is-active' : ''}`}
                      onClick={() => setTransmission(t)}
                    >
                      {t === 'ALL' ? 'All Transmissions' : t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Seating */}
              <div className="sheet-group">
                <span className="sheet-group-label">Seating Capacity</span>
                <div className="sheet-options-grid">
                  {[
                    { val: 'ALL', label: 'All' },
                    { val: '5', label: '5 Seater' },
                    { val: '7', label: '7 Seater' }
                  ].map((s) => (
                    <button
                      key={s.val}
                      type="button"
                      className={`kerb-chip ${seating === s.val ? 'is-active' : ''}`}
                      onClick={() => setSeating(s.val)}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="sheet-footer">
              <button
                type="button"
                onClick={handleClearAll}
                className="kerb-btn kerb-btn-ghost kerb-btn-sm"
              >
                Clear all
              </button>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="kerb-btn kerb-btn-primary kerb-btn-sm"
              >
                Show {filteredVehicles.length} cars
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .explore-section {
          background-color: var(--background);
        }

        .desktop-view-all {
          display: none;
        }

        @media (min-width: 768px) {
          .desktop-view-all {
            display: inline-flex;
          }
        }

        .category-tabs-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 12px;
          margin-bottom: 24px;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
        }

        .category-tabs-wrap::-webkit-scrollbar {
          display: none;
        }

        .category-tab-btn {
          font-size: 13px;
          padding: 8px 18px;
          min-height: 38px;
        }

        /* Desktop Filter Bar */
        .desktop-filter-bar {
          display: none;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 12px 16px;
          background-color: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          margin-bottom: 20px;
        }

        @media (min-width: 880px) {
          .desktop-filter-bar {
            display: flex;
          }
        }

        .filter-dropdowns {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .filter-select-wrap {
          position: relative;
        }

        .filter-select {
          appearance: none;
          -webkit-appearance: none;
          background-color: var(--surface-elevated);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          font-size: 13px;
          font-weight: 500;
          padding: 8px 28px 8px 12px;
          cursor: pointer;
          min-height: 36px;
          background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%236B736F' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 10px center;
          transition: all var(--transition-hover);
        }

        .filter-select:hover {
          border-color: var(--border-hover);
          color: var(--text-primary);
        }

        .filter-select.is-filtered {
          background-color: var(--accent-dim);
          border-color: var(--accent-border);
          color: var(--accent);
          font-weight: 600;
        }

        .filter-meta-actions {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-shrink: 0;
        }

        .showing-counter {
          font-size: 13px;
          color: var(--text-muted);
          white-space: nowrap;
        }

        .showing-counter strong {
          color: var(--text-primary);
        }

        /* Mobile Filter Triggers */
        .mobile-filter-triggers {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }

        @media (min-width: 880px) {
          .mobile-filter-triggers {
            display: none;
          }
        }

        .mobile-filter-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .filter-count-badge {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: var(--accent);
          color: #0B0F0E;
          font-size: 11px;
          font-weight: 800;
          display: inline-grid;
          place-items: center;
        }

        .mobile-sort-wrap {
          flex: 1;
        }

        .mobile-sort-select {
          width: 100%;
        }

        /* Active Filter Chips */
        .active-filter-chips-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 24px;
        }

        .active-label {
          font-size: 12px;
          color: var(--text-muted);
          font-weight: 600;
        }

        .active-filter-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border-radius: var(--radius-pill);
          background-color: var(--surface-elevated);
          border: 1px solid var(--border);
          font-size: 12px;
          color: var(--text-primary);
          font-weight: 500;
        }

        .chip-remove-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          font-size: 12px;
          padding: 0 2px;
          display: flex;
          align-items: center;
        }

        .chip-remove-btn:hover {
          color: var(--danger);
        }

        .clear-all-text-btn {
          background: transparent;
          border: none;
          color: var(--accent);
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          text-decoration: underline;
          padding: 4px 8px;
        }

        /* Cars Grid System */
        .cars-grid-container {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--card-gap);
        }

        @media (min-width: 640px) {
          .cars-grid-container {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .cars-grid-container {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 639px) {
          /* Mobile horizontal scrolling rail with 1.2-1.4 cards visible */
          .cars-grid-container {
            display: flex !important;
            flex-direction: row !important;
            flex-wrap: nowrap !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory;
            gap: 14px;
            padding-bottom: 12px;
            scrollbar-width: none;
            -webkit-overflow-scrolling: touch;
          }

          .cars-grid-container::-webkit-scrollbar {
            display: none;
          }

          .car-card-cell {
            flex: 0 0 76% !important;
            min-width: 260px;
            max-width: 290px;
            scroll-snap-align: start;
          }
        }

        .no-results-card {
          padding: 48px 24px;
          text-align: center;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .mobile-view-all-wrap {
          margin-top: 24px;
          display: block;
        }

        @media (min-width: 768px) {
          .mobile-view-all-wrap {
            display: none;
          }
        }

        /* Mobile Bottom Sheet */
        .mobile-filter-sheet-overlay {
          position: fixed;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.65);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          z-index: 9999;
          display: flex;
          align-items: flex-end;
        }

        .mobile-filter-sheet {
          width: 100%;
          max-height: 85vh;
          background-color: var(--surface);
          border-top: 1px solid var(--border);
          border-radius: var(--radius-xl) var(--radius-xl) 0 0;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-lg);
          animation: slideUp 200ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

        .sheet-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 20px;
          border-bottom: 1px solid var(--border);
        }

        .sheet-title {
          font-size: 17px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .sheet-close-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-size: 18px;
          cursor: pointer;
          padding: 4px;
        }

        .sheet-body {
          padding: 20px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .sheet-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .sheet-group-label {
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
        }

        .sheet-options-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .sheet-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          border-top: 1px solid var(--border);
          background-color: var(--surface-elevated);
        }
      `}</style>
    </section>
  );
}
