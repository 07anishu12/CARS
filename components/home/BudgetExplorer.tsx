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
        {/* Section Header */}
        <div className="kerb-section-header-row">
          <h2 id="budget-explorer-title" className="kerb-section-title">
            Explore by budget
          </h2>
          <Link href="/cars" className="kerb-view-all-link">
            <span>View all</span>
            <span aria-hidden="true">→</span>
          </Link>
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
          padding-top: 20px;
          padding-bottom: 28px;
        }

        .budget-cards-track {
          display: flex;
          align-items: stretch;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 6px;
          padding-inline: 2px;
          -webkit-overflow-scrolling: touch;
        }

        @media (min-width: 768px) {
          .budget-cards-track {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 12px;
            overflow: visible;
          }
        }

        .budget-glass-card {
          flex: 1 1 0;
          min-width: 68px;
          height: 76px;
          border-radius: 16px;
          padding: 10px 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          text-decoration: none;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
          transition: transform 180ms ease, box-shadow 180ms ease, opacity 180ms ease;
          box-sizing: border-box;
        }

        .budget-glass-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.35);
          opacity: 0.92;
        }

        .budget-label {
          font-size: 11.5px;
          font-weight: 800;
          letter-spacing: -0.01em;
          margin-bottom: 3px;
          line-height: 1.15;
          text-align: center;
          word-break: break-word;
        }

        .budget-count {
          font-size: 10px;
          font-weight: 600;
          line-height: 1;
        }
      `}</style>
    </section>
  );
}
