'use client';

import React from 'react';
import { Container, Section } from './ui';

export interface BrandItem {
  name: string;
  slug: string;
}

export interface BrandsSectionProps {
  brands?: BrandItem[];
}

const BrandsSection: React.FC<BrandsSectionProps> = ({
  brands = [
    { name: 'Maruti', slug: 'maruti' },
    { name: 'Hyundai', slug: 'hyundai' },
    { name: 'Tata', slug: 'tata' },
    { name: 'Kia', slug: 'kia' },
    { name: 'Toyota', slug: 'toyota' },
    { name: 'Honda', slug: 'honda' },
    { name: 'Mahindra', slug: 'mahindra' },
    { name: 'MG', slug: 'mg' },
    { name: 'Volkswagen', slug: 'volkswagen' },
    { name: 'Skoda', slug: 'skoda' }
  ]
}) => {
  const brandsData = [
    { name: 'Maruti Suzuki', slug: 'maruti-suzuki' },
    { name: 'Hyundai', slug: 'hyundai' },
    { name: 'Tata', slug: 'tata' },
    { name: 'Mahindra', slug: 'mahindra' },
    { name: 'Kia', slug: 'kia' },
    { name: 'Toyota', slug: 'toyota' },
    { name: 'Honda', slug: 'honda' },
    { name: 'MG', slug: 'mg' }
  ];

  return (
    <Section as="section" aria-labelledby="brands-section-title" style={{ paddingBlock: '48px', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5E7EB' }}>
      <style jsx>{`
        .brands-container {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-24);
          width: 100%;
        }

        .brands-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .brands-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          width: 100%;
        }

        .brand-link {
          text-decoration: none;
          color: inherit;
          outline: none;
        }

        .brand-tile {
          height: 64px;
          background-color: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform var(--motion-base) var(--motion-ease), border-color var(--motion-base) var(--motion-ease), box-shadow var(--motion-base) var(--motion-ease);
        }

        .brand-tile:hover {
          transform: translateY(-2px);
          border-color: #10B981;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);
        }

        .brand-wordmark {
          font-size: 0.9rem;
          font-weight: 700;
          color: #374151;
          transition: color var(--motion-base);
        }

        .brand-tile:hover .brand-wordmark {
          color: #10B981;
        }

        @media (min-width: 640px) {
          .brands-row {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .brands-row {
            grid-template-columns: repeat(8, 1fr);
            gap: 16px;
          }
        }
      `}</style>

      <Container>
        <div className="brands-container">
          
          {/* Header Row */}
          <div className="brands-header">
            <h2 id="brands-section-title" style={{ fontSize: '1.75rem', fontWeight: 700, color: '#111827', margin: 0 }}>
              Explore top brands
            </h2>
            <a 
              href="/brands" 
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
              View all brands ➔
            </a>
          </div>

          {/* Logo Grid */}
          <nav aria-label="Brands Explorer Bar" style={{ width: '100%' }}>
            <div className="brands-row">
              {brandsData.map((brand) => (
                <a 
                  key={brand.slug} 
                  href={`/cars/${brand.slug}`} 
                  className="brand-link"
                  aria-label={`View all ${brand.name} cars`}
                >
                  <div className="brand-tile">
                    <span className="brand-wordmark">{brand.name}</span>
                  </div>
                </a>
              ))}
            </div>
          </nav>

        </div>
      </Container>
    </Section>
  );
};

export default BrandsSection;
