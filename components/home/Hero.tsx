'use client';

import React from 'react';
import Image from 'next/image';
import HeroCarousel from './HeroCarousel';
import { CarModel, Make, City } from '../../types/vehicle';

export interface HeroProps {
  models: CarModel[];
  makes: Make[];
  cities?: City[];
  onOpenLeadModal?: () => void;
  onSelectCategory?: (category: string) => void;
}

export default function Hero({
  models,
  makes,
  cities = [],
  onOpenLeadModal,
  onSelectCategory
}: HeroProps) {
  return (
    <section className="kerb-hero-experience" aria-label="Automotive Research Hero">
      {/* 1. Cinematic Full-Bleed Automotive Background */}
      <div className="hero-bg-media" aria-hidden="true">
        <Image
          src="/hero-creta.jpg"
          alt="Cinematic automotive mountain landscape"
          fill
          priority
          sizes="100vw"
          className="hero-backdrop-img"
        />
        {/* Layered Atmospheric Dark Overlays */}
        <div className="hero-gradient-overlay" />
        <div className="hero-radial-glow" />
        <div className="hero-bottom-fade" />
      </div>

      {/* 2. Hero Content Container */}
      <div className="hero-content-wrapper">
        <div className="hero-copy-block">
          <span className="hero-eyebrow">DISCOVER &bull; COMPARE &bull; DECIDE</span>
          <h1 className="hero-title">
            Find the right <br />
            car for you.
          </h1>
          <p className="hero-tagline">
            Unbiased specifications, verified on-road pricing and side-by-side comparisons.
          </p>
        </div>

        {/* 3. Hero Visual Carousel (Centerpiece) */}
        <div className="hero-carousel-slot">
          <HeroCarousel models={models} makes={makes} />
        </div>
      </div>

      <style jsx>{`
        .kerb-hero-experience {
          position: relative;
          min-height: 82vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          padding-top: 24px;
          padding-bottom: 24px;
          overflow: hidden;
          background-color: #050A09;
          box-sizing: border-box;
        }

        @media (min-width: 768px) {
          .kerb-hero-experience {
            min-height: 86vh;
            padding-top: 40px;
            padding-bottom: 36px;
          }
        }

        .hero-bg-media {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
        }

        :global(.hero-backdrop-img) {
          object-fit: cover;
          object-position: center 30%;
          transform: scale(1.02);
        }

        .hero-gradient-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(5, 10, 9, 0.45) 0%,
            rgba(5, 10, 9, 0.15) 35%,
            rgba(5, 10, 9, 0.65) 65%,
            #050A09 100%
          );
        }

        .hero-radial-glow {
          position: absolute;
          top: 15%;
          left: 50%;
          transform: translateX(-50%);
          width: 140%;
          height: 80%;
          background: radial-gradient(
            ellipse at center,
            rgba(0, 232, 135, 0.12) 0%,
            rgba(5, 10, 9, 0) 70%
          );
        }

        .hero-bottom-fade {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 120px;
          background: linear-gradient(180deg, transparent 0%, #050A09 100%);
        }

        .hero-content-wrapper {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1100px;
          margin-inline: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          padding-inline: 16px;
          box-sizing: border-box;
        }

        .hero-copy-block {
          text-align: center;
          max-width: 580px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }

        .hero-eyebrow {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.14em;
          color: var(--kerb-green-primary, #00E887);
          text-transform: uppercase;
          background: rgba(0, 232, 135, 0.1);
          border: 1px solid rgba(0, 232, 135, 0.25);
          padding: 4px 12px;
          border-radius: 9999px;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .hero-title {
          font-size: clamp(34px, 8vw, 44px);
          font-weight: 900;
          line-height: 1.12;
          letter-spacing: -0.035em;
          color: #FFFFFF;
          margin: 0;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
        }

        .hero-tagline {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.75);
          margin: 0;
          line-height: 1.45;
          max-width: 440px;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        }

        @media (min-width: 768px) {
          .hero-tagline {
            font-size: 16px;
          }
        }

        .hero-carousel-slot {
          width: 100%;
          margin-top: 10px;
        }
      `}</style>
    </section>
  );
}
