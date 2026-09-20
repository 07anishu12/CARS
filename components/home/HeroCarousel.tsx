'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CarModel, Make } from '../../types/vehicle';

export interface HeroCarouselProps {
  models?: CarModel[];
  makes?: Make[];
}

interface FeaturedItem {
  id: string;
  name: string;
  tagline: string;
  image: string;
  href: string;
}

const DEFAULT_FEATURED: FeaturedItem[] = [
  {
    id: 'creta',
    name: 'Hyundai Creta',
    tagline: 'Bold. Modern. Versatile.',
    image: '/creta.jpg',
    href: '/cars/hyundai/creta'
  },
  {
    id: 'nexon',
    name: 'Tata Nexon',
    tagline: 'Built for every road.',
    image: '/nexon.jpg',
    href: '/cars/tata/nexon'
  },
  {
    id: 'thar',
    name: 'Mahindra Thar',
    tagline: 'Adventure. Always.',
    image: '/thar.jpg',
    href: '/cars/mahindra/thar'
  },
  {
    id: 'curvv',
    name: 'Tata Curvv',
    tagline: 'Shaped for style.',
    image: '/curvv.jpg',
    href: '/cars/tata/curvv'
  },
  {
    id: 'elevate',
    name: 'Honda Elevate',
    tagline: 'Urban confidence.',
    image: '/elevate.jpg',
    href: '/cars/honda/elevate'
  }
];

export default function HeroCarousel({ models = [], makes = [] }: HeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0); // Creta active by default like in Screen 1
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const items = DEFAULT_FEATURED;
  const total = items.length;

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Autoplay
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(handleNext, 6000);
    return () => clearInterval(timer);
  }, [isPaused, handleNext]);

  // Touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div
      className="hero-carousel-container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label="Featured Cars Carousel"
    >
      <div className="cards-track no-scrollbar">
        {items.map((item, idx) => {
          const isActive = idx === activeIndex;

          return (
            <div
              key={item.id}
              className={`carousel-card ${isActive ? 'card-active' : ''}`}
              onClick={() => setActiveIndex(idx)}
            >
              <div className="card-top-info">
                <h3 className="car-name">{item.name}</h3>
                <p className="car-tagline">{item.tagline}</p>
              </div>

              <div className="card-bottom-row">
                <div className="car-image-box">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="90px"
                    className="car-thumb"
                  />
                </div>

                <Link
                  href={item.href}
                  className="card-arrow-cta"
                  aria-label={`View ${item.name} details`}
                  onClick={(e) => {
                    if (!isActive) {
                      e.preventDefault();
                      setActiveIndex(idx);
                    }
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Carousel Indicators (Pill + Dots matching Screen 1) */}
      <div className="carousel-indicators" role="tablist" aria-label="Carousel navigation">
        {items.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            className={`indicator-dot ${idx === activeIndex ? 'active-pill' : ''}`}
            onClick={() => setActiveIndex(idx)}
            aria-label={`Go to slide ${idx + 1}: ${item.name}`}
            aria-selected={idx === activeIndex}
            role="tab"
          />
        ))}
      </div>

      <style jsx>{`
        .hero-carousel-container {
          position: relative;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .cards-track {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 8px;
          width: 100%;
          overflow-x: auto;
          padding: 6px 12px;
          box-sizing: border-box;
          scroll-snap-type: x mandatory;
        }

        @media (min-width: 440px) {
          .cards-track {
            justify-content: center;
          }
        }

        .carousel-card {
          flex: 0 0 calc((100% - 16px) / 3);
          min-width: 110px;
          max-width: 122px;
          height: 106px;
          scroll-snap-align: start;
          background: rgba(18, 28, 25, 0.78);
          border: 1px solid rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 16px;
          padding: 8px 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          cursor: pointer;
          transition: all 250ms cubic-bezier(0.25, 1, 0.5, 1);
          user-select: none;
          box-sizing: border-box;
        }

        @media (min-width: 440px) {
          .carousel-card {
            flex: 0 0 120px;
            height: 110px;
            padding: 9px 11px;
          }
        }

        .carousel-card.card-active {
          border-color: rgba(0, 232, 135, 0.5);
          background: rgba(18, 35, 28, 0.88);
          box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.6), 0 0 16px -2px rgba(0, 232, 135, 0.25);
        }

        .card-top-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
          text-align: left;
        }

        .car-name {
          font-size: 11.5px;
          font-weight: 750;
          color: #FFFFFF;
          margin: 0;
          letter-spacing: -0.01em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .car-tagline {
          font-size: 8.5px;
          color: rgba(255, 255, 255, 0.65);
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .card-bottom-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-top: 4px;
        }

        .car-image-box {
          position: relative;
          width: 58px;
          height: 38px;
        }

        :global(.car-thumb) {
          object-fit: contain;
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5));
        }

        .card-arrow-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.25);
          color: #FFFFFF;
          text-decoration: none;
          transition: all 150ms ease;
          flex-shrink: 0;
        }

        .card-active .card-arrow-cta {
          background: rgba(255, 255, 255, 0.95);
          color: #050A09;
        }

        /* Carousel Indicator */
        .carousel-indicators {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 2px;
        }

        .indicator-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.25);
          border: none;
          padding: 0;
          cursor: pointer;
          transition: all 250ms ease;
        }

        .indicator-dot.active-pill {
          width: 20px;
          height: 6px;
          border-radius: 9999px;
          background: var(--kerb-green-primary, #00E887);
          box-shadow: 0 0 10px rgba(0, 232, 135, 0.6);
        }
      `}</style>
    </div>
  );
}
