'use client';

import React from 'react';
import { Container, Section } from './ui';

export interface CategoryTile {
  slug: string;
  label: string;
  icon: string;
  description: string;
  image: string;
}

export interface ShopByNeedProps {
  categories?: CategoryTile[];
  chips?: any[];
}

const ShopByNeed: React.FC<ShopByNeedProps> = ({
  categories = [
    {
      slug: 'family-cars',
      label: 'Family Cars',
      icon: '👨‍👩‍👧‍👦',
      description: 'Spacious, safe, and comfortable for everyone.',
      image: '/suv-electric.jpg'
    },
    {
      slug: 'suvs',
      label: 'SUVs',
      icon: '🚙',
      description: 'Commanding views, ground clearance, and versatility.',
      image: '/suv-electric.jpg'
    },
    {
      slug: 'electric',
      label: 'Electric',
      icon: '⚡',
      description: 'Zero emissions, instant torque, and advanced tech.',
      image: '/suv-electric.jpg'
    },
    {
      slug: 'fuel-efficient',
      label: 'Fuel Efficient',
      icon: '🍃',
      description: 'Maximum range and minimum fuel expenses.',
      image: '/hero-car.jpg'
    },
    {
      slug: 'luxury',
      label: 'Luxury',
      icon: '👑',
      description: 'Exquisite details, supreme comfort, and status.',
      image: '/luxury-interior.jpg'
    },
    {
      slug: 'under-10l',
      label: 'Under 10L',
      icon: '🏷️',
      description: 'Premium features at highly accessible price points.',
      image: '/hero-car.jpg'
    },
    {
      slug: 'first-cars',
      label: 'First Cars',
      icon: '🏁',
      description: 'Easy to drive, reliable, and beginner-friendly.',
      image: '/hero-car.jpg'
    },
    {
      slug: 'automatic',
      label: 'Automatic',
      icon: '⚙️',
      description: 'Smooth, clutchless driving in city traffic.',
      image: '/luxury-interior.jpg'
    },
    {
      slug: '7-seaters',
      label: '7-Seaters',
      icon: '👥',
      description: 'Three rows of seating for large families and groups.',
      image: '/suv-electric.jpg'
    }
  ]
}) => {
  return (
    <Section as="section" aria-labelledby="category-explorer-title" style={{ backgroundColor: '#0B0F12', paddingBlock: '48px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
      <style jsx>{`
        .categories-container {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-32);
          width: 100%;
        }

        .categories-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--spacing-24);
          justify-items: center;
          width: 100%;
        }

        .category-tile-link {
          text-decoration: none;
          outline: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: transform var(--motion-base) var(--motion-ease);
        }

        .category-tile-link:hover {
          transform: translateY(-4px);
        }

        .circle-wrapper {
          width: clamp(64px, 8vw, 84px);
          height: clamp(64px, 8vw, 84px);
          border-radius: 50%;
          background-color: #FFFFFF;
          border: 1px solid #E5E7EB;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(1.5rem, 2.5vw, 2.25rem);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          margin-bottom: 8px;
          transition: border-color var(--motion-base);
        }

        .category-tile-link:hover .circle-wrapper {
          border-color: #22C55E;
        }

        .category-label {
          font-size: clamp(0.75rem, 1.5vw, 0.85rem);
          color: #E5E7EB;
          font-weight: 600;
          text-align: center;
        }

        @media (min-width: 640px) {
          .categories-grid {
            grid-template-columns: repeat(5, 1fr);
          }
        }

        @media (min-width: 1200px) {
          .categories-grid {
            grid-template-columns: repeat(9, 1fr);
            gap: 12px;
          }
        }
      `}</style>

      <Container>
        <div className="categories-container">
          
          {/* Header Row */}
          <div className="categories-header">
            <h2 id="category-explorer-title" style={{ fontSize: '1.75rem', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>
              Explore cars by your needs
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
              View all needs ➔
            </a>
          </div>

          {/* Grid of Circular Cards */}
          <nav aria-label="Car Category Explorer Grid" style={{ width: '100%' }}>
            <div className="categories-grid">
              {categories.map((category) => (
                <a 
                  key={category.slug} 
                  href={`/category/${category.slug}`} 
                  className="category-tile-link"
                  aria-label={`Explore category: ${category.label}`}
                >
                  <div className="circle-wrapper">
                    {category.icon}
                  </div>
                  <span className="category-label">
                    {category.label}
                  </span>
                </a>
              ))}
            </div>
          </nav>

        </div>
      </Container>
    </Section>
  );
};

export default ShopByNeed;
