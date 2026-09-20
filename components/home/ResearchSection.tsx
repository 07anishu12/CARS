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
      readTime: '5 min read',
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
        {/* Section Header with Eyebrow, Title, Description, and Link */}
        <div className="kerb-section-header">
          <span className="kerb-section-eyebrow">EXPERT GUIDES</span>
          <div className="kerb-section-header-row">
            <div>
              <h2 id="research-title" className="kerb-section-title">
                Latest from our research
              </h2>
              <p className="kerb-section-desc">
                In-depth buying guides, technical comparisons, and long-term ownership tips.
              </p>
            </div>
            <Link href="/guides" className="kerb-view-all-link">
              <span>View all</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>

        {/* Horizontal Track of Generous Editorial Cards (2-3 on mobile) */}
        <div className="research-cards-track no-scrollbar">
          {editorialGuides.map((guide) => (
            <article key={guide.slug} className="editorial-glass-card">
              <Link href={`/guides/${guide.slug}`} className="editorial-thumb-link" tabIndex={-1} aria-hidden="true">
                <div className="editorial-thumb-wrap">
                  <Image
                    src={guide.image}
                    alt={guide.title}
                    fill
                    sizes="(max-width: 640px) 260px, 360px"
                    className="editorial-img"
                  />
                  <div className="editorial-overlay" />
                </div>
              </Link>

              <div className="editorial-body">
                <div className="editorial-meta-row">
                  <span className="editorial-category">{guide.category}</span>
                  <span className="meta-sep">&bull;</span>
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
          padding-bottom: 36px;
        }

        .research-cards-track {
          display: flex;
          align-items: stretch;
          gap: 16px;
          overflow-x: auto;
          padding-bottom: 8px;
          padding-inline: 2px;
          -webkit-overflow-scrolling: touch;
        }

        @media (min-width: 1024px) {
          .research-cards-track {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            overflow: visible;
          }
        }

        .editorial-glass-card {
          flex: 0 0 260px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          border-radius: 22px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 8px 26px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.12);
          transition: transform 200ms ease, border-color 200ms ease, box-shadow 200ms ease;
          box-sizing: border-box;
        }

        @media (min-width: 440px) {
          .editorial-glass-card {
            flex: 0 0 280px;
          }
        }

        .editorial-glass-card:hover {
          transform: translateY(-3px);
          border-color: rgba(0, 232, 135, 0.45);
          box-shadow: 0 14px 36px rgba(0, 0, 0, 0.45);
        }

        .editorial-thumb-link {
          display: block;
          text-decoration: none;
        }

        .editorial-thumb-wrap {
          position: relative;
          width: 100%;
          height: 140px;
          background: rgba(0, 0, 0, 0.35);
          overflow: hidden;
        }

        @media (min-width: 440px) {
          .editorial-thumb-wrap {
            height: 155px;
          }
        }

        :global(.editorial-img) {
          object-fit: cover;
          object-position: center;
          transition: transform 250ms ease;
        }

        .editorial-glass-card:hover :global(.editorial-img) {
          transform: scale(1.05);
        }

        .editorial-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0) 40%, rgba(5, 10, 9, 0.75) 100%);
        }

        .editorial-body {
          padding: 14px 16px 16px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex: 1;
        }

        .editorial-meta-row {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
        }

        .editorial-category {
          color: var(--kerb-green-primary, #00E887);
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .meta-sep {
          color: rgba(255, 255, 255, 0.35);
        }

        .editorial-time {
          color: rgba(255, 255, 255, 0.6);
          font-weight: 500;
        }

        .editorial-title {
          font-size: 15px;
          font-weight: 800;
          line-height: 1.35;
          letter-spacing: -0.015em;
          margin: 0;
        }

        .editorial-title a {
          color: #FFFFFF;
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
