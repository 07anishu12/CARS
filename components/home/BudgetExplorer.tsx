'use client';

import React from 'react';
import Link from 'next/link';
import { CarModel } from '../../types/vehicle';

export interface BudgetExplorerProps {
  models?: CarModel[];
}

export default function BudgetExplorer({ models = [] }: BudgetExplorerProps) {
  const budgetCards = [
    {
      id: 'under-8l',
      label: 'Under ₹8L',
      count: '42 cars',
      href: '/cars?budget=UNDER_10L',
      bgColor: '#C6F6D5',
      textColor: '#064E3B',
      countColor: '#047857'
    },
    {
      id: '8-12l',
      label: '₹8L – 12L',
      count: '68 cars',
      href: '/cars?budget=10L_15L',
      bgColor: '#BAE6FD',
      textColor: '#0369A1',
      countColor: '#0284C7'
    },
    {
      id: '12-20l',
      label: '₹12L – 20L',
      count: '86 cars',
      href: '/cars?budget=15L_20L',
      bgColor: '#FEF08A',
      textColor: '#854D0E',
      countColor: '#A16207'
    },
    {
      id: '20-30l',
      label: '₹20L – 30L',
      count: '54 cars',
      href: '/cars?budget=ABOVE_20L',
      bgColor: '#FECDD3',
      textColor: '#9F1239',
      countColor: '#BE123C'
    },
    {
      id: '30l-plus',
      label: '₹30L+',
      count: '38 cars',
      href: '/cars?budget=ABOVE_20L',
      bgColor: '#DDD6FE',
      textColor: '#5B21B6',
      countColor: '#6D28D9'
    }
  ];

  return (
    <section className="budget-explorer-section" aria-labelledby="budget-explorer-title">
      <div className="kerb-page-container">
        {/* Section Header with Eyebrow, Title, Description, and Link */}
        <div className="kerb-section-header">
          <span className="kerb-section-eyebrow">BUDGET GUIDE</span>
          <div className="kerb-section-header-row">
            <div>
              <h2 id="budget-explorer-title" className="kerb-section-title">
                Explore by budget
              </h2>
              <p className="kerb-section-desc">
                Find the highest value vehicles that match your target price range.
              </p>
            </div>
            <Link href="/cars" className="kerb-view-all-link">
              <span>View all</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>

        {/* 5 Pastel Tinted Glass Cards */}
        <div className="budget-cards-track no-scrollbar">
          {budgetCards.map((card) => (
            <Link
              key={card.id}
              href={card.href}
              className="budget-glass-card"
              style={{
                backgroundColor: card.bgColor,
                borderColor: 'transparent'
              }}
            >
              <span className="budget-label" style={{ color: card.textColor }}>
                {card.label}
              </span>
              <span className="budget-count" style={{ color: card.countColor }}>
                {card.count}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        .budget-explorer-section {
          width: 100%;
          padding-top: 24px;
          padding-bottom: 32px;
        }

        .budget-cards-track {
          display: flex;
          align-items: stretch;
          gap: 12px;
          overflow-x: auto;
          padding-bottom: 8px;
          padding-inline: 2px;
          -webkit-overflow-scrolling: touch;
        }

        @media (min-width: 768px) {
          .budget-cards-track {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 14px;
            overflow: visible;
          }
        }

        .budget-glass-card {
          flex: 1 1 0;
          min-width: 80px;
          min-height: 94px;
          border-radius: 20px;
          padding: 14px 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          text-decoration: none;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.28);
          transition: transform 180ms ease, box-shadow 180ms ease, opacity 180ms ease;
          box-sizing: border-box;
        }

        .budget-glass-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 28px -4px rgba(0, 0, 0, 0.4);
          opacity: 0.95;
        }

        .budget-label {
          font-size: 13.5px;
          font-weight: 850;
          letter-spacing: -0.015em;
          margin-bottom: 4px;
          line-height: 1.2;
          text-align: center;
        }

        .budget-count {
          font-size: 11.5px;
          font-weight: 700;
          line-height: 1;
        }
      `}</style>
    </section>
  );
}
