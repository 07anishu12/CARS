'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Car } from '../types';
import { useWishlist } from '../hooks/useWishlist';
import { Container, Section, Button, CarImage } from './ui';
import { springHeart } from '../lib/motion/tokens';

export interface TrendingProps {
  cars?: Car[];
  categories?: string[];
}

const Trending: React.FC<TrendingProps> = () => {
  const trendingData = [
    {
      id: 'trending-1',
      fullName: 'Tata Nexon',
      brand: 'Tata',
      make: 'tata',
      model: 'nexon',
      image: '/nexon.jpg',
      price: '₹8.10 - 15.60 Lakh',
      rating: 4.6,
      reviews: '3,840'
    },
    {
      id: 'trending-2',
      fullName: 'Hyundai Creta',
      brand: 'Hyundai',
      make: 'hyundai',
      model: 'creta',
      image: '/creta.jpg',
      price: '₹11.00 - 20.15 Lakh',
      rating: 4.7,
      reviews: '5,120'
    },
    {
      id: 'trending-3',
      fullName: 'Kia Seltos',
      brand: 'Kia',
      make: 'kia',
      model: 'seltos',
      image: '/seltos.jpg',
      price: '₹10.90 - 20.35 Lakh',
      rating: 4.5,
      reviews: '2,980'
    },
    {
      id: 'trending-4',
      fullName: 'Maruti Suzuki Grand Vitara',
      brand: 'Maruti Suzuki',
      make: 'maruti-suzuki',
      model: 'grand-vitara',
      image: '/vitara.jpg',
      price: '₹10.80 - 20.09 Lakh',
      rating: 4.6,
      reviews: '3,100'
    },
    {
      id: 'trending-5',
      fullName: 'Mahindra XUV700',
      brand: 'Mahindra',
      make: 'mahindra',
      model: 'xuv700',
      image: '/xuv700.jpg',
      price: '₹13.99 - 26.99 Lakh',
      rating: 4.8,
      reviews: '4,230'
    }
  ];

  return (
    <Section as="section" aria-labelledby="trending-title" style={{ backgroundColor: '#F9FAFB', paddingBlock: '48px', borderBottom: '1px solid #E5E7EB' }}>
      <style jsx>{`
        .trending-container {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-32);
          width: 100%;
          position: relative;
        }

        .trending-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .carousel-wrapper {
          position: relative;
          width: 100%;
          display: flex;
          align-items: center;
        }

        .trending-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: var(--spacing-16);
          width: 100%;
        }

        .trending-card {
          background-color: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);
          display: flex;
          flex-direction: column;
          transition: transform var(--motion-base) var(--motion-ease), box-shadow var(--motion-base) var(--motion-ease);
        }

        .trending-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.06);
        }

        .image-container {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          background-color: #F3F4F6;
        }

        .trending-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform var(--motion-slow) var(--motion-ease);
        }

        .trending-card:hover .trending-image {
          transform: scale(1.04);
        }

        .badge-trending {
          position: absolute;
          top: 12px;
          left: 12px;
          z-index: 10;
          background-color: rgba(16, 185, 129, 0.9);
          color: #FFFFFF;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 0.65rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 3px;
        }

        .content-container {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex: 1;
        }

        .card-details-left {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .card-title {
          font-size: 1rem;
          fontWeight: 700;
          color: #111827;
          margin: 0;
        }

        .price-tag {
          font-size: 1.05rem;
          font-weight: 700;
          color: #111827;
        }

        .rating-row {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.8rem;
          color: #4B5563;
        }

        .star-icon {
          color: #FBBF24;
          font-size: 0.9rem;
        }

        .details-link {
          color: #10B981;
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 4px;
          margin-top: auto;
          padding-top: 8px;
        }

        .next-btn {
          position: absolute;
          right: -20px;
          top: 50%;
          transform: translateY(-50%);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #FFFFFF;
          border: 1px solid #E5E7EB;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
          cursor: pointer;
          z-index: 10;
          transition: background-color var(--motion-base);
        }

        .next-btn:hover {
          background-color: #F9FAFB;
        }

        @media (min-width: 640px) {
          .trending-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .trending-grid {
            grid-template-columns: repeat(5, 1fr);
            gap: 20px;
          }
        }
      `}</style>

      <Container>
        <div className="trending-container">
          
          {/* Header */}
          <div className="trending-header">
            <h2 id="trending-title" style={{ fontSize: '1.75rem', fontWeight: 700, color: '#111827', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              🔥 Trending cars this week
            </h2>
            <a 
              href="/cars" 
              style={{ 
                color: '#9CA3AF', 
                textDecoration: 'none', 
                fontSize: '0.9rem', 
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              View all cars ➔
            </a>
          </div>

          {/* Carousel Cards Grid */}
          <div className="carousel-wrapper">
            <div className="trending-grid">
              {trendingData.map((car) => (
                <div key={car.id} className="trending-card" role="article" aria-labelledby={`trending-car-${car.id}`}>
                  
                  {/* Car Image Cover */}
                  <div className="image-container" style={{ position: 'relative' }}>
                    <Image 
                      src={car.image} 
                      alt={`Studio shot of ${car.fullName}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 320px"
                      style={{ objectFit: 'cover' }}
                    />

                    {/* Trending Badge */}
                    <div className="badge-trending">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                      Trending
                    </div>
                  </div>

                  {/* Content Details */}
                  <div className="content-container">
                    <div className="card-details-left">
                      <h3 id={`trending-car-${car.id}`} className="card-title">
                        {car.fullName}
                      </h3>
                      <span className="price-tag">
                        {car.price}
                      </span>
                      <div className="rating-row">
                        <span className="star-icon">★</span>
                        <span>{car.rating}</span>
                        <span style={{ color: '#9CA3AF' }}>({car.reviews})</span>
                      </div>
                    </div>

                    <a href={`/cars/${car.make}/${car.model}`} className="details-link">
                      View details ➔
                    </a>
                  </div>

                </div>
              ))}
            </div>

            {/* Slider Next Button */}
            <button className="next-btn" aria-label="Next slide">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>

        </div>
      </Container>
    </Section>
  );
};

export default Trending;
