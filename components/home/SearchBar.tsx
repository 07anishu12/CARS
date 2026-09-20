'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CarModel, Make, City } from '../../types/vehicle';

export interface SearchBarProps {
  models: CarModel[];
  makes: Make[];
  cities?: City[];
}

interface SearchSuggestion {
  id: string;
  type: 'model' | 'brand' | 'body' | 'fuel' | 'city';
  title: string;
  subtitle: string;
  href: string;
  imageUrl?: string;
}

export default function SearchBar({ models, makes, cities = [] }: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Compute suggestions based on query
  const suggestions: SearchSuggestion[] = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      // Default initial suggestions when focused: top trending models
      return models.slice(0, 5).map((m) => {
        const make = makes.find((mk) => mk.id === m.makeId);
        return {
          id: m.id,
          type: 'model',
          title: `${make?.name || ''} ${m.name}`,
          subtitle: `₹${(m.priceRangeMin / 100000).toFixed(2)}L – ${(m.priceRangeMax / 100000).toFixed(2)}L • ${m.bodyType}`,
          href: `/cars/${make?.slug || 'cars'}/${m.slug}`,
          imageUrl: m.heroImage
        };
      });
    }

    const results: SearchSuggestion[] = [];

    // 1. Match brands
    makes.forEach((mk) => {
      if (mk.name.toLowerCase().includes(q)) {
        results.push({
          id: mk.id,
          type: 'brand',
          title: `${mk.name} Lineup`,
          subtitle: `${mk.country} • All models & specifications`,
          href: `/cars/${mk.slug}`
        });
      }
    });

    // 2. Match models
    models.forEach((m) => {
      const make = makes.find((mk) => mk.id === m.makeId);
      const fullName = `${make?.name || ''} ${m.name}`.toLowerCase();
      if (
        fullName.includes(q) ||
        m.bodyType.toLowerCase().includes(q) ||
        m.fuelTypes.some((f) => f.toLowerCase().includes(q))
      ) {
        results.push({
          id: m.id,
          type: 'model',
          title: `${make?.name || ''} ${m.name}`,
          subtitle: `₹${(m.priceRangeMin / 100000).toFixed(2)}L – ${(m.priceRangeMax / 100000).toFixed(2)}L • ${m.bodyType} • ${m.fuelTypes.join('/')}`,
          href: `/cars/${make?.slug || 'cars'}/${m.slug}`,
          imageUrl: m.heroImage
        });
      }
    });

    // 3. Match body types (SUV, Sedan, Hatchback, EV, Hybrid)
    const bodyTypes = ['SUV', 'Hatchback', 'Sedan', 'MPV', 'EV', 'Hybrid'];
    bodyTypes.forEach((b) => {
      if (b.toLowerCase().includes(q)) {
        results.push({
          id: `body-${b}`,
          type: 'body',
          title: `${b} Cars in India`,
          subtitle: `Explore all ${b.toLowerCase()} models with verified pricing`,
          href: b === 'EV' ? '/cars?body=EV' : `/cars?body=${encodeURIComponent(b)}`
        });
      }
    });

    // 4. Match cities
    cities.forEach((c) => {
      if (c.name.toLowerCase().includes(q)) {
        results.push({
          id: `city-${c.id}`,
          type: 'city',
          title: `Cars in ${c.name}`,
          subtitle: `Verified on-road RTO tax ${c.rtoPercentage}% & insurance calculations`,
          href: `/cars?city=${c.slug}`
        });
      }
    });

    return results.slice(0, 6);
  }, [query, models, makes, cities]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedIndex >= 0 && suggestions[selectedIndex]) {
      router.push(suggestions[selectedIndex].href);
      setIsOpen(false);
      return;
    }
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown') {
        setIsOpen(true);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
      setSelectedIndex(-1);
    }
  };

  const popularSearches = [
    { label: 'Creta', href: '/cars/hyundai/creta' },
    { label: 'Nexon', href: '/cars/tata/nexon' },
    { label: 'Thar', href: '/cars/mahindra/thar' },
    { label: 'Swift', href: '/cars?q=swift' },
    { label: 'EV', href: '/cars?body=EV' },
    { label: '7 Seater', href: '/cars?seats=7' }
  ];

  return (
    <div className="kerb-search-container" ref={containerRef}>
      {/* Search Input Box with Glass Pill & Circular Green Action Button */}
      <form onSubmit={handleSubmit} className="kerb-search-bar" role="search">
        <div className="search-icon-wrap" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>

        <input
          ref={inputRef}
          type="search"
          role="combobox"
          className="search-input"
          placeholder="Search cars, brands, or variants..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-controls="search-suggestions-menu"
          aria-label="Search cars, brands, or variants"
        />

        {query && (
          <button
            type="button"
            className="search-clear-btn"
            onClick={() => {
              setQuery('');
              setSelectedIndex(-1);
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}

        {/* Circular Action Button with Microphone Icon */}
        <button type="submit" className="search-action-btn" aria-label="Submit search">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="23" />
            <line x1="8" y1="23" x2="16" y2="23" />
          </svg>
        </button>
      </form>

      {/* Autocomplete Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div id="search-suggestions-menu" className="search-dropdown-menu" role="listbox">
          <div className="dropdown-header">
            <span>{query ? 'Search suggestions' : 'Popular cars in India'}</span>
          </div>

          <div className="dropdown-list">
            {suggestions.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`dropdown-item ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => setIsOpen(false)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  role="option"
                  aria-selected={isSelected}
                >
                  {item.imageUrl ? (
                    <div className="item-thumb">
                      <Image src={item.imageUrl} alt="" fill sizes="40px" style={{ objectFit: 'contain' }} />
                    </div>
                  ) : (
                    <div className="item-icon-pill" aria-hidden="true">
                      {item.type === 'brand' ? '🏷' : item.type === 'city' ? '📍' : '🚗'}
                    </div>
                  )}

                  <div className="item-meta">
                    <span className="item-title">{item.title}</span>
                    <span className="item-subtitle">{item.subtitle}</span>
                  </div>

                  <span className="item-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Popular Searches Horizontally Scrollable Glass Chips */}
      <div className="popular-searches-row">
        <div className="popular-chips-track no-scrollbar">
          {popularSearches.map((item) => (
            <Link key={item.label} href={item.href} className="popular-chip">
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        .kerb-search-container {
          position: relative;
          width: 100%;
          max-width: 540px;
          margin-inline: auto;
          box-sizing: border-box;
        }

        .kerb-search-bar {
          display: flex;
          align-items: center;
          width: 100%;
          height: 52px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 9999px;
          padding: 4px 6px 4px 18px;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.45);
          transition: border-color 150ms ease, box-shadow 150ms ease;
          box-sizing: border-box;
        }

        .kerb-search-bar:focus-within {
          border-color: var(--kerb-green-primary, #00E887);
          box-shadow: 0 0 0 3px rgba(0, 232, 135, 0.2), 0 8px 32px 0 rgba(0, 0, 0, 0.5);
        }

        .search-icon-wrap {
          color: rgba(255, 255, 255, 0.5);
          display: flex;
          align-items: center;
          margin-right: 12px;
          flex-shrink: 0;
        }

        .search-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: #FFFFFF;
          font-size: 15px;
          font-family: inherit;
          min-height: 40px;
        }

        .search-input::placeholder {
          color: rgba(255, 255, 255, 0.45);
          font-size: 14px;
        }

        .search-clear-btn {
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.5);
          padding: 6px 10px;
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .search-clear-btn:hover {
          color: #FFFFFF;
        }

        .search-action-btn {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: var(--kerb-green-primary, #00E887);
          color: #050A09;
          border: none;
          display: grid;
          place-items: center;
          cursor: pointer;
          flex-shrink: 0;
          box-shadow: 0 4px 14px rgba(0, 232, 135, 0.4);
          transition: transform 150ms ease, box-shadow 150ms ease;
        }

        .search-action-btn:hover {
          transform: scale(1.06);
          box-shadow: 0 6px 20px rgba(0, 232, 135, 0.55);
        }

        /* Autocomplete Dropdown */
        .search-dropdown-menu {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          right: 0;
          background: rgba(14, 22, 19, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-radius: 18px;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6);
          z-index: 800;
          overflow: hidden;
        }

        .dropdown-header {
          padding: 12px 18px 8px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: rgba(255, 255, 255, 0.4);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .dropdown-list {
          display: flex;
          flex-direction: column;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 18px;
          text-decoration: none;
          color: inherit;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          transition: background-color 100ms ease;
        }

        .dropdown-item:last-child {
          border-bottom: none;
        }

        .dropdown-item:hover,
        .dropdown-item.is-selected {
          background: rgba(255, 255, 255, 0.08);
        }

        .item-thumb {
          position: relative;
          width: 44px;
          height: 32px;
          background: rgba(255, 255, 255, 0.04);
          border-radius: 6px;
          flex-shrink: 0;
          overflow: hidden;
        }

        .item-icon-pill {
          width: 40px;
          height: 32px;
          display: grid;
          place-items: center;
          background: rgba(255, 255, 255, 0.04);
          border-radius: 6px;
          font-size: 14px;
          flex-shrink: 0;
        }

        .item-meta {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }

        .item-title {
          font-size: 14px;
          font-weight: 600;
          color: #FFFFFF;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .item-subtitle {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .item-arrow {
          color: rgba(255, 255, 255, 0.4);
          font-size: 14px;
          margin-left: 8px;
        }

        /* Popular searches row */
        .popular-searches-row {
          width: 100%;
          margin-top: 14px;
          overflow: hidden;
        }

        .popular-chips-track {
          display: flex;
          align-items: center;
          gap: 8px;
          overflow-x: auto;
          padding-block: 4px;
          padding-inline: 2px;
          -webkit-overflow-scrolling: touch;
        }

        .popular-chip {
          font-size: 13px;
          font-weight: 500;
          color: #FFFFFF;
          text-decoration: none;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.10);
          border-radius: 9999px;
          padding: 6px 14px;
          white-space: nowrap;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          transition: all 150ms ease;
          flex-shrink: 0;
        }

        .popular-chip:hover {
          color: var(--kerb-green-primary, #00E887);
          border-color: rgba(0, 232, 135, 0.4);
          background: rgba(255, 255, 255, 0.10);
        }
      `}</style>
    </div>
  );
}
