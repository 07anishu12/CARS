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
  price: string;
  image: string;
  href: string;
}

const DEFAULT_FEATURED: FeaturedItem[] = [
  {
    id: 'creta',
    name: 'Hyundai Creta',
    tagline: 'Bold. Modern. Versatile.',
    price: '₹11.11L – ₹20.50L',
    image: '/creta.jpg',
    href: '/cars/hyundai/creta'
  },
  {
    id: 'nexon',
    name: 'Tata Nexon',
    tagline: 'Built for every road.',
    price: '₹8.10L – ₹15.50L',
    image: '/nexon.jpg',
    href: '/cars/tata/nexon'
  },
  {
    id: 'thar',
    name: 'Mahindra Thar',
    tagline: 'Adventure. Always.',
    price: '₹11.35L – ₹17.60L',
    image: '/thar.jpg',
    href: '/cars/mahindra/thar'
  },
  {
    id: 'curvv',
    name: 'Tata Curvv',
    tagline: 'Shaped for style.',
    price: 'From ₹10.00L',
    image: '/curvv.jpg',
    href: '/cars/tata/curvv'
  },
  {
    id: 'elevate',
    name: 'Honda Elevate',
    tagline: 'Urban confidence.',
    price: 'From ₹11.91L',
    image: '/elevate.jpg',
    href: '/cars/honda/elevate'
  }
];

export default function HeroCarousel({ models = [], makes = [] }: HeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0); // Creta active by default
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
    const timer = setInterval(handleNext, 7000);
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

  // Compute 3 items for display: left (prev), center (active), right (next)
  const prevIdx = (activeIndex - 1 + total) % total;
  const nextIdx = (activeIndex + 1) % total;

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
      {/* 3-Card Stage: Left (partially visible), Center (large active), Right (partially visible) */}
      <div className="carousel-stage">
        {/* Left Card (Previous) */}
        <div
          className="stage-card side-card left-card"
          onClick={handlePrev}
          role="button"
          tabIndex={0}
          aria-label={`View previous car: ${items[prevIdx].name}`}
        >
          <div className="card-media">
            <Image
              src={items[prevIdx].image}
              alt={items[prevIdx].name}
              fill
              sizes="180px"
              className="card-car-img"
            />
          </div>
          <div className="card-info">
            <h3 className="card-name">{items[prevIdx].name}</h3>
            <span className="card-price">{items[prevIdx].price}</span>
          </div>
        </div>

        {/* Center Card (Active, Larger, Featured) */}
        <div className="stage-card center-card active-card">
          <div className="card-media center-media">
            <Image
              src={items[activeIndex].image}
              alt={items[activeIndex].name}
              fill
              priority
              sizes="320px"
              className="card-car-img"
            />
            <span className="badge-featured">Featured</span>
          </div>

          <div className="card-info center-info">
            <div className="text-row">
              <h3 className="card-name center-name">{items[activeIndex].name}</h3>
              <p className="card-tagline">{items[activeIndex].tagline}</p>
            </div>
            <div className="price-cta-row">
              <span className="card-price center-price">{items[activeIndex].price}</span>
              <Link href={items[activeIndex].href} className="btn-view-featured">
                <span>View Car</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Card (Next) */}
        <div
          className="stage-card side-card right-card"
          onClick={handleNext}
          role="button"
          tabIndex={0}
          aria-label={`View next car: ${items[nextIdx].name}`}
        >
          <div className="card-media">
            <Image
              src={items[nextIdx].image}
              alt={items[nextIdx].name}
              fill
              sizes="180px"
              className="card-car-img"
            />
          </div>
          <div className="card-info">
            <h3 className="card-name">{items[nextIdx].name}</h3>
            <span className="card-price">{items[nextIdx].price}</span>
          </div>
        </div>
      </div>

      {/* Controls: Prev / Next Buttons & Pagination Dots */}
      <div className="carousel-controls-bar">
        <button
          type="button"
          onClick={handlePrev}
          className="ctrl-btn prev-btn"
          aria-label="Previous featured car"
        >
          &larr;
        </button>

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

        <button
          type="button"
          onClick={handleNext}
          className="ctrl-btn next-btn"
          aria-label="Next featured car"
        >
          &rarr;
        </button>
      </div>

      <style jsx>{`
        .hero-carousel-container {
          position: relative;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .carousel-stage {
          position: relative;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          perspective: 1000px;
        }

        .stage-card {
          background: rgba(14, 24, 20, 0.78);
          border: 1px solid rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(28px) saturate(180%);
          -webkit-backdrop-filter: blur(28px) saturate(180%);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.15);
          border-radius: 24px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transition: all 300ms cubic-bezier(0.25, 1, 0.5, 1);
          box-sizing: border-box;
          user-select: none;
        }

        /* Center Active Card (Dominant, Larger) */
        .center-card {
          width: 270px;
          min-height: 240px;
          border-color: rgba(0, 232, 135, 0.45);
          background: linear-gradient(
            165deg,
            rgba(18, 38, 30, 0.88) 0%,
            rgba(10, 22, 18, 0.92) 100%
          );
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), 0 0 24px rgba(0, 232, 135, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2);
          z-index: 5;
          transform: scale(1);
        }

        @media (min-width: 768px) {
          .center-card {
            width: 340px;
            min-height: 270px;
          }
        }

        /* Side Cards (Partially visible, clickable) */
        .side-card {
          width: 130px;
          min-height: 180px;
          opacity: 0.55;
          transform: scale(0.88);
          cursor: pointer;
          z-index: 2;
        }

        @media (min-width: 440px) {
          .side-card {
            width: 170px;
            min-height: 200px;
            opacity: 0.65;
          }
        }

        @media (min-width: 768px) {
          .side-card {
            width: 220px;
            min-height: 230px;
            opacity: 0.75;
          }
        }

        .side-card:hover {
          opacity: 0.85;
          transform: scale(0.92);
        }

        .left-card {
          margin-right: -24px;
        }

        .right-card {
          margin-left: -24px;
        }

        @media (min-width: 440px) {
          .left-card {
            margin-right: -12px;
          }
          .right-card {
            margin-left: -12px;
          }
        }

        .card-media {
          position: relative;
          width: 100%;
          height: 100px;
          background: rgba(0, 0, 0, 0.25);
          overflow: hidden;
        }

        .center-media {
          height: 140px;
        }

        @media (min-width: 768px) {
          .center-media {
            height: 170px;
          }
        }

        :global(.card-car-img) {
          object-fit: cover;
          object-position: center;
          transition: transform 300ms ease;
        }

        .center-card:hover :global(.card-car-img) {
          transform: scale(1.05);
        }

        .badge-featured {
          position: absolute;
          top: 10px;
          left: 10px;
          background: rgba(0, 232, 135, 0.18);
          border: 1px solid rgba(0, 232, 135, 0.45);
          color: #00E887;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 3px 8px;
          border-radius: 9999px;
          backdrop-filter: blur(8px);
        }

        .card-info {
          padding: 12px 14px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .center-info {
          padding: 14px 16px;
          gap: 10px;
        }

        .card-name {
          font-size: 13px;
          font-weight: 750;
          color: #FFFFFF;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .center-name {
          font-size: 17px;
          font-weight: 850;
          letter-spacing: -0.02em;
        }

        .card-tagline {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.65);
          margin: 0;
        }

        .card-price {
          font-size: 12px;
          font-weight: 700;
          color: #00E887;
        }

        .center-price {
          font-size: 14.5px;
          font-weight: 800;
        }

        .price-cta-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          margin-top: 4px;
        }

        .btn-view-featured {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #00E887;
          color: #050A09 !important;
          font-size: 13px;
          font-weight: 800;
          padding: 0 16px;
          min-height: 44px;
          border-radius: 9999px;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(0, 232, 135, 0.35);
          transition: all 150ms ease;
          white-space: nowrap;
        }

        .btn-view-featured:hover {
          background: #00FF95;
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(0, 232, 135, 0.5);
        }

        /* Controls bar */
        .carousel-controls-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-top: 4px;
        }

        .ctrl-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.14);
          color: #FFFFFF;
          display: grid;
          place-items: center;
          font-size: 15px;
          cursor: pointer;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          transition: all 150ms ease;
        }

        .ctrl-btn:hover {
          background: rgba(255, 255, 255, 0.16);
          border-color: rgba(0, 232, 135, 0.4);
          color: #00E887;
        }

        .carousel-indicators {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .indicator-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.25);
          border: none;
          padding: 0;
          cursor: pointer;
          transition: all 200ms ease;
        }

        .indicator-dot.active-pill {
          width: 20px;
          border-radius: 9999px;
          background: #00E887;
          box-shadow: 0 0 10px rgba(0, 232, 135, 0.6);
        }
      `}</style>
    </div>
  );
}
