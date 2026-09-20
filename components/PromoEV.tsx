'use client';

import React from 'react';
import Image from 'next/image';
import { Container, Section, Button } from './ui';

export interface PromoEVProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
}

const PromoEV: React.FC<PromoEVProps> = ({
  title = 'The 2026 EV Revolution',
  subtitle = 'Instant torque. Zero emissions. Uncompromised range. Explore the vehicles redefining the engineering landscape of modern mobility.',
  ctaText = 'Explore EV Lineup'
}) => {
  return (
    <Section as="section" aria-labelledby="promo-ev-title" style={{ paddingBlock: '48px', backgroundColor: '#0B0F12' }}>
      <style jsx>{`
        .promo-banner {
          position: relative;
          min-height: 380px;
          border-radius: 16px;
          overflow: hidden;
          background: linear-gradient(135deg, #022C22, #043E30);
          border: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
        }

        .promo-bg-image {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .promo-bg-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 80% center;
          opacity: 0.15;
        }

        .promo-overlay {
          position: absolute;
          inset: 0;
          z-index: 2;
          background: radial-gradient(circle at 80% 50%, transparent, rgba(2, 44, 34, 0.8));
        }

        .promo-content {
          position: relative;
          z-index: 3;
          padding: 40px;
          max-width: 680px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .features-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .feature-icon-item {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .check-icon {
          color: #10B981;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
      `}</style>

      <Container>
        <div className="promo-banner">
          
          {/* Subtle SUV Background overlay */}
          <div className="promo-bg-image" style={{ position: 'relative' }}>
            <Image 
              src="/suv-electric.jpg" 
              alt="Electric SUV background" 
              fill
              sizes="(max-width: 1024px) 100vw, 1200px"
              style={{ objectFit: 'cover' }}
            />
            <div className="promo-overlay" />
          </div>

          {/* Immersive Text Column */}
          <div className="promo-content">
            <div className="stack stack-xs">
              <h2 
                id="promo-ev-title" 
                style={{ fontSize: '2.25rem', fontWeight: 800, color: '#FFFFFF', margin: 0, lineHeight: 1.2 }}
              >
                The 2026 EV Revolution is here!
              </h2>
              <p 
                style={{ color: '#D1D5DB', margin: 0, marginTop: '8px', fontSize: '1rem', lineHeight: 1.5 }}
              >
                Explore electric cars, calculate charging costs, and find subsidies.
              </p>
            </div>

            {/* EV specifications list */}
            <div className="features-list">
              <div className="feature-icon-item">
                <span className="check-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </span>
                <span style={{ fontSize: '0.95rem', color: '#E5E7EB', fontWeight: 500 }}>
                  10+ electric SUVs launching this year
                </span>
              </div>
              <div className="feature-icon-item">
                <span className="check-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </span>
                <span style={{ fontSize: '0.95rem', color: '#E5E7EB', fontWeight: 500 }}>
                  Up to 1.5L tax savings under Section 80EEB
                </span>
              </div>
              <div className="feature-icon-item">
                <span className="check-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </span>
                <span style={{ fontSize: '0.95rem', color: '#E5E7EB', fontWeight: 500 }}>
                  Interactive charger map now live
                </span>
              </div>
            </div>

            {/* CTA action */}
            <div>
              <a href="/category/electric" style={{ textDecoration: 'none' }}>
                <button 
                  style={{ 
                    padding: '12px 28px', 
                    borderRadius: '8px', 
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    backgroundColor: '#10B981',
                    color: '#FFFFFF',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                  aria-label="Browse the electric car catalog"
                >
                  Explore EVs ➔
                </button>
              </a>
            </div>

          </div>

        </div>
      </Container>
    </Section>
  );
};

export default PromoEV;
