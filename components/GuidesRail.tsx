'use client';

import React from 'react';
import Image from 'next/image';
import { Article } from '../types';
import { Container, Section, ArticleImage } from './ui';

export interface GuidesRailProps {
  guides?: Article[];
}

const GuidesRail: React.FC<GuidesRailProps> = ({ guides = [] }) => {
  const articlesData = [
    {
      category: 'BUYING GUIDE',
      title: 'How to choose the right SUV for your family in 2024',
      readingTime: '6 min read',
      image: '/hero-car.jpg'
    },
    {
      category: 'NEWS',
      title: 'GST update: Why most new bikes are 349cc in 2026',
      readingTime: '5 min read',
      image: '/luxury-interior.jpg'
    },
    {
      category: 'EXPLAINED',
      title: 'Electric cars in India: State of charge infrastructure',
      readingTime: '7 min read',
      image: '/hero-car.jpg'
    },
    {
      category: 'COMPARISON',
      title: 'Top 5 family cars under 15 lakh in India',
      readingTime: '9 min read',
      image: '/hero-car.jpg'
    },
    {
      category: 'TIPS',
      title: 'Car loan vs Personal loan: Which is better?',
      readingTime: '6 min read',
      image: '/luxury-interior.jpg'
    }
  ];

  return (
    <Section as="section" aria-labelledby="guides-rail-title" style={{ backgroundColor: '#FFFFFF', paddingBlock: '48px', borderBottom: '1px solid #E5E7EB' }}>
      <style jsx>{`
        .guides-container {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-24);
          width: 100%;
        }

        .guides-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          width: 100%;
        }

        .guide-card {
          background-color: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);
          transition: transform var(--motion-base) var(--motion-ease), box-shadow var(--motion-base) var(--motion-ease);
          height: 100%;
          cursor: pointer;
        }

        .guide-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.05);
        }

        .img-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          background-color: #F3F4F6;
        }

        .guide-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform var(--motion-slow) var(--motion-ease);
        }

        .guide-card:hover .guide-img {
          transform: scale(1.04);
        }

        .category-badge {
          position: absolute;
          bottom: 12px;
          left: 12px;
          background-color: rgba(17, 24, 39, 0.75);
          backdrop-filter: blur(4px);
          color: #FFFFFF;
          font-size: 0.65rem;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 4px;
          letter-spacing: 0.05em;
        }

        .content-box {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex: 1;
        }

        .guide-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: #111827;
          line-height: 1.4;
          margin: 0;
        }

        .footer-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
          padding-top: 12px;
          border-top: 1px solid #F3F4F6;
        }

        .read-time {
          font-size: 0.8rem;
          color: #6B7280;
        }

        .circle-arrow {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 1px solid #E5E7EB;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #FFFFFF;
          color: #374151;
          transition: border-color var(--motion-base), background-color var(--motion-base);
        }

        .guide-card:hover .circle-arrow {
          border-color: #10B981;
          background-color: #10B981;
          color: #FFFFFF;
        }

        @media (min-width: 640px) {
          .guides-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .guides-grid {
            grid-template-columns: repeat(5, 1fr);
          }
        }
      `}</style>

      <Container>
        <div className="guides-container">
          
          {/* Header */}
          <h2 id="guides-rail-title" style={{ fontSize: '1.75rem', fontWeight: 700, color: '#111827', margin: 0 }}>
            Expert reviews & latest guides
          </h2>

          {/* Grid of Articles */}
          <div className="guides-grid">
            {articlesData.map((article, index) => (
              <div key={index} className="guide-card" role="article" aria-labelledby={`article-title-${index}`}>
                <div className="img-wrapper" style={{ position: 'relative' }}>
                  <Image 
                    src={article.image} 
                    alt={article.title} 
                    fill 
                    sizes="(max-width: 768px) 100vw, 360px"
                    style={{ objectFit: 'cover' }}
                  />
                  <span className="category-badge">{article.category}</span>
                </div>
                <div className="content-box">
                  <h3 id={`article-title-${index}`} className="guide-title">
                    {article.title}
                  </h3>
                  <div className="footer-row">
                    <span className="read-time">{article.readingTime}</span>
                    <div className="circle-arrow">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </Container>
    </Section>
  );
};

export default GuidesRail;
