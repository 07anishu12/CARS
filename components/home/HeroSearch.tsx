'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CarModel, Make, City } from '../../types/vehicle';

export interface HeroSearchProps {
  models: CarModel[];
  makes: Make[];
  cities: City[];
}

export default function HeroSearch({ models, makes, cities }: HeroSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'all' | 'brand' | 'budget' | 'body' | 'fuel' | 'city'>('all');
  const searchRef = useRef<HTMLDivElement>(null);

  // Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setIsExpanded(false);
    }
  };

  // Filter models based on query or category
  const filteredModels = models.filter((m) => {
    const make = makes.find((mk) => mk.id === m.makeId);
    const fullName = `${make?.name || ''} ${m.name}`.toLowerCase();
    const q = query.toLowerCase();

    if (query) {
      return (
        fullName.includes(q) ||
        m.bodyType.toLowerCase().includes(q) ||
        m.fuelTypes.some((f) => f.toLowerCase().includes(q))
      );
    }

    if (activeCategory === 'brand') return true;
    if (activeCategory === 'budget') return m.priceRangeMin < 1500000;
    if (activeCategory === 'body') return m.bodyType === 'SUV';
    if (activeCategory === 'fuel') return m.isEV || m.isHybrid;
    return true;
  });

  const popularSearches = [
    { label: 'Tata Nexon', href: '/cars/tata/nexon' },
    { label: 'Cars Under ₹10L', href: '/cars?budget=UNDER_10L' },
    { label: 'Electric Cars (EV)', href: '/cars?body=EV' },
    { label: 'Hyundai Creta', href: '/cars/hyundai/creta' },
    { label: 'Strong Hybrids', href: '/category/hybrid' },
    { label: '7-Seater SUVs', href: '/cars?seats=7' }
  ];

  return (
    <div className="liquid-search-anchor" ref={searchRef}>
      <div className={`liquid-search-glass-card ${isExpanded ? 'is-expanded' : ''}`}>
        <form onSubmit={handleSearchSubmit} className="liquid-search-input-row">
          <span className="search-icon-symbol" aria-hidden="true">
            ⌕
          </span>

          <label htmlFor="liquid-hero-search-input" className="sr-only">
            Search cars by make, model, budget, fuel or city
          </label>

          <input
            id="liquid-hero-search-input"
            type="search"
            className="liquid-search-field"
            placeholder="Search by model, brand, budget, body type or city..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (!isExpanded) setIsExpanded(true);
            }}
            onFocus={() => setIsExpanded(true)}
            autoComplete="off"
          />

          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--graphite-300)',
                fontSize: '14px',
                cursor: 'pointer',
                padding: '4px'
              }}
              aria-label="Clear search query"
            >
              ✕
            </button>
          )}

          <button type="submit" className="search-submit-btn" aria-label="Submit search">
            <span>Search</span>
            <span style={{ fontSize: '14px' }}>→</span>
          </button>
        </form>

        {/* Category Filter Chips */}
        <div className="search-facet-chips" role="tablist" aria-label="Search filter categories">
          {[
            { id: 'all', label: 'All Categories' },
            { id: 'brand', label: 'Top Brands' },
            { id: 'budget', label: 'Under ₹15 Lakh' },
            { id: 'body', label: 'SUVs' },
            { id: 'fuel', label: 'EV & Hybrids' },
            { id: 'city', label: 'Top Cities' }
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={activeCategory === cat.id}
              className={`facet-chip-btn ${activeCategory === cat.id ? 'is-active' : ''}`}
              onClick={() => {
                setActiveCategory(cat.id as any);
                if (!isExpanded) setIsExpanded(true);
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Expanded Suggestions & Real Grounded Results */}
        {isExpanded && (
          <div className="search-suggestions-panel" aria-label="Search Suggestions">
            {activeCategory === 'city' ? (
              <div>
                <span style={{ fontSize: '11px', color: 'var(--bronze)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Select City for Accurate On-Road Pricing
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px' }}>
                  {cities.map((city) => (
                    <Link
                      key={city.id}
                      href={`/cars?city=${city.slug}`}
                      className="facet-chip-btn"
                      onClick={() => setIsExpanded(false)}
                      style={{ fontSize: '12px' }}
                    >
                      {city.name} (RTO {city.rtoPercentage}%)
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--bronze)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    {query ? `Matching Vehicles (${filteredModels.length})` : 'Popular Models in Catalogue'}
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--graphite-300)' }}>
                    Verified 2026 specs & prices
                  </span>
                </div>

                <div className="suggestions-grid">
                  {filteredModels.slice(0, 4).map((m) => {
                    const make = makes.find((mk) => mk.id === m.makeId);
                    return (
                      <Link
                        key={m.id}
                        href={`/cars/${make?.slug}/${m.slug}`}
                        className="suggestion-card-item"
                        onClick={() => setIsExpanded(false)}
                      >
                        <div className="sugg-thumb">
                          <Image
                            src={m.heroImage}
                            alt={`${m.name}`}
                            fill
                            sizes="48px"
                          />
                        </div>
                        <div className="sugg-info">
                          <span className="sugg-title">
                            {make?.name} {m.name}
                          </span>
                          <span className="sugg-meta">
                            ₹{(m.priceRangeMin / 100000).toFixed(1)}L - {(m.priceRangeMax / 100000).toFixed(1)}L
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>

                <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '11px', color: 'var(--graphite-300)', fontWeight: 600 }}>
                    Quick searches:
                  </span>
                  {popularSearches.map((ps) => (
                    <Link
                      key={ps.label}
                      href={ps.href}
                      onClick={() => setIsExpanded(false)}
                      style={{
                        fontSize: '11px',
                        color: 'var(--champagne)',
                        textDecoration: 'none',
                        background: 'rgba(255,255,255,0.04)',
                        padding: '3px 8px',
                        borderRadius: '4px'
                      }}
                    >
                      {ps.label} ↗
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
