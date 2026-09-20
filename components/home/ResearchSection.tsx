'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Article } from '../../types';

export interface ResearchSectionProps {
  articles?: Article[];
}

export default function ResearchSection({ articles = [] }: ResearchSectionProps) {
  const editorialGuides = [
    {
      slug: 'how-to-choose-the-right-car-for-your-city',
      category: 'Buying Guide',
      readTime: '6 min read',
      title: 'How to choose the right car for your city',
      image: '/hero-creta.jpg'
    },
    {
      slug: 'petrol-vs-hybrid-which-is-better-for-you',
      category: 'Comparison',
      readTime: '7 min read',
      title: 'Petrol vs Hybrid: Which is better for you?',
      image: '/hero-journey.jpg'
    },
    {
      slug: 'true-cost-of-car-ownership-in-india',
      category: 'Ownership',
      readTime: '8 min read',
      title: 'True cost of car ownership in India',
      image: '/creta.jpg'
    }
  ];

  return (
    <section className="research-section" aria-labelledby="research-title">
      <div className="kerb-page-container">
        {/* Header */}
        <div className="kerb-section-header-row">
          <h2 id="research-title" className="kerb-section-title">
            Latest from our research
          </h2>
          <Link href="/guides" className="kerb-view-all-link">
            <span>View all</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Horizontal Scroll Track */}
        <div className="research-cards-track no-scrollbar">
          {editorialGuides.map((guide) => (
            <article key={guide.slug} className="editorial-glass-card">
              <Link href={`/guides/${guide.slug}`} className="editorial-thumb-link">
                <div className="editorial-thumb-wrap">
                  <Image
                    src={guide.image}
                    alt={guide.title}
                    fill
                    sizes="(max-width: 640px) 240px, 360px"
                    className="editorial-img"
                  />
                  <div className="editorial-overlay" />
                </div>
              </Link>

              <div className="editorial-body">
                <div className="editorial-meta-row">
                  <span className="editorial-category">{guide.category}</span>
                  <span className="meta-sep">•</span>
                  <span className="editorial-time">{guide.readTime}</span>
                </div>

                <h3 className="editorial-title">
                  <Link href={`/guides/${guide.slug}`}>{guide.title}</Link>
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style jsx>{`
        .research-section {
          width: 100%;
          padding-top: 24px;
          padding-bottom: 32px;
        }

        .research-cards-track {
          display: flex;
          align-items: stretch;
          gap: 14px;
          overflow-x: auto;
          padding-bottom: 6px;
          padding-inline: 2px;
          -webkit-overflow-scrolling: touch;
        }

        @media (min-width: 768px) {
          .research-cards-track {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
            overflow: visible;
          }
        }

        .editorial-glass-card {
          flex: 1 0 220px;
          min-width: 210px;
          max-width: 280px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.10);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.3);
          transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
        }

        @media (min-width: 768px) {
          .editorial-glass-card {
            max-width: 100%;
          }
        }

        .editorial-glass-card:hover {
          transform: translateY(-2px);
          border-color: rgba(0, 232, 135, 0.35);
          box-shadow: 0 10px 26px -4px rgba(0, 0, 0, 0.45);
        }

        .editorial-thumb-link {
          text-decoration: none;
          display: block;
        }

        .editorial-thumb-wrap {
          position: relative;
          width: 100%;
          height: 125px;
          background: rgba(0, 0, 0, 0.4);
          overflow: hidden;
        }

        :global(.editorial-img) {
          object-fit: cover;
          object-position: center;
          transition: transform 300ms ease;
        }

        .editorial-glass-card:hover :global(.editorial-img) {
          transform: scale(1.05);
        }

        .editorial-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 40%, rgba(5, 10, 9, 0.6) 100%);
        }

        .editorial-body {
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex: 1;
        }

        .editorial-meta-row {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.6);
        }

        .editorial-category {
          color: var(--kerb-green-primary, #00E887);
          font-weight: 700;
        }

        .meta-sep {
          color: rgba(255, 255, 255, 0.4);
        }

        .editorial-time {
          font-weight: 500;
        }

        .editorial-title {
          font-size: 14px;
          font-weight: 700;
          line-height: 1.35;
          color: #FFFFFF;
          margin: 0;
        }

        .editorial-title a {
          color: inherit;
          text-decoration: none;
          transition: color 150ms ease;
        }

        .editorial-title a:hover {
          color: var(--kerb-green-primary, #00E887);
        }
      `}</style>
    </section>
  );
}
