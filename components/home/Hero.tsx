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
      {/* 1. Cinematic Full-Bleed Automotive Background (Creta in Mountains) */}
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

      {/* 2. Hero Content Container with Floating 3-Card Carousel */}
      <div className="hero-content-wrapper">
        <div className="hero-carousel-slot">
          <HeroCarousel models={models} makes={makes} />
        </div>
      </div>

      <style jsx>{`
        .kerb-hero-experience {
          position: relative;
          min-height: 420px;
          height: 52vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          padding-bottom: 16px;
          overflow: hidden;
          background-color: #050A09;
        }

        @media (min-width: 768px) {
          .kerb-hero-experience {
            min-height: 520px;
            height: 60vh;
            padding-bottom: 24px;
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
          object-position: center 25%;
        }

        .hero-gradient-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(5, 10, 9, 0.4) 0%,
            rgba(5, 10, 9, 0.1) 40%,
            rgba(5, 10, 9, 0.7) 80%,
            #050A09 100%
          );
        }

        .hero-radial-glow {
          position: absolute;
          top: -20%;
          left: 50%;
          transform: translateX(-50%);
          width: 140%;
          height: 90%;
          background: radial-gradient(
            ellipse at center,
            rgba(0, 232, 135, 0.1) 0%,
            rgba(5, 10, 9, 0) 70%
          );
        }

        .hero-bottom-fade {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 100px;
          background: linear-gradient(180deg, transparent 0%, #050A09 100%);
        }

        .hero-content-wrapper {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-sizing: border-box;
        }

        .hero-carousel-slot {
          width: 100%;
        }
      `}</style>
    </section>
  );
}
