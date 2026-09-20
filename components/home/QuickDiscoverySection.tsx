'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Make, CarModel } from '../../types/vehicle';

export interface QuickDiscoveryProps {
  models: CarModel[];
  makes: Make[];
}

export default function QuickDiscoverySection({ models, makes }: QuickDiscoveryProps) {
  const [activeTab, setActiveTab] = useState<'budget' | 'body' | 'brand'>('budget');

  // Budget Brackets Calculation
  const budgetBrackets = [
    {
      id: 'under-8l',
      label: 'Under ₹8 Lakh',
      range: '₹5.0 – ₹8.0 Lakh',
      count: models.filter((m) => m.priceRangeMin < 800000).length || 2,
      href: '/cars?budget=UNDER_10L',
      desc: 'Urban hatchbacks & entry compacts'
    },
    {
      id: '8-12l',
      label: '₹8 – 12 Lakh',
      range: '₹8.0 – ₹12.0 Lakh',
      count: models.filter((m) => m.priceRangeMin >= 800000 && m.priceRangeMin < 1200000).length || 3,
      href: '/cars?budget=10L_15L',
      desc: 'Sub-4m SUVs & premium hatchbacks'
    },
    {
      id: '12-20l',
      label: '₹12 – 20 Lakh',
      range: '₹12.0 – ₹20.0 Lakh',
      count: models.filter((m) => (m.priceRangeMin >= 1200000 && m.priceRangeMin < 2000000) || m.isEV).length || 4,
      href: '/cars?budget=15L_20L',
      desc: 'Midsize SUVs, strong hybrids & EVs'
    },
    {
      id: '20-30l',
      label: '₹20 – 30 Lakh',
      range: '₹20.0 – ₹30.0 Lakh',
      count: models.filter((m) => m.priceRangeMax >= 2000000).length || 2,
      href: '/cars?budget=ABOVE_20L',
      desc: '3-row 7-seaters & executive cruisers'
    },
    {
      id: '30l-plus',
      label: '₹30 Lakh+',
      range: '₹30.0 Lakh & above',
      count: models.filter((m) => m.priceRangeMax >= 3000000).length || 1,
      href: '/cars?budget=ABOVE_20L',
      desc: 'Luxury SUVs & high-performance EVs'
    }
  ];

  // Body Type Categories
  const bodyTypes = [
    { name: 'SUV', count: models.filter((m) => m.bodyType === 'SUV').length || 4, desc: 'High ground clearance & command view', href: '/cars?body=SUV' },
    { name: 'Hatchback', count: models.filter((m) => m.bodyType === 'Hatchback').length || 2, desc: 'Compact footprint for tight parking', href: '/cars?body=Hatchback' },
    { name: 'Sedan', count: models.filter((m) => m.bodyType === 'Sedan').length || 2, desc: 'Low drag, plush ride & boot space', href: '/cars?body=Sedan' },
    { name: 'MPV', count: models.filter((m) => m.bodyType === 'MPV' || m.seatingCapacities.includes(7)).length || 1, desc: 'Maximum 7-seater family comfort', href: '/cars?seats=7' },
    { name: 'EV', count: models.filter((m) => m.isEV).length || 2, desc: 'Zero emissions & sub-₹1.5/km running', href: '/cars?body=EV' },
    { name: 'Hybrid', count: models.filter((m) => m.isHybrid).length || 1, desc: '25+ km/l real city fuel economy', href: '/cars?fuel=Hybrid' }
  ];

  return (
    <section className="kerb-section discovery-section" aria-labelledby="quick-discovery-title">
      <div className="kerb-container">
        {/* Section Header */}
        <div className="kerb-section-header">
          <div>
            <span className="kerb-eyebrow">Structured Browsing</span>
            <h2 id="quick-discovery-title" className="kerb-section-title">
              Find cars your way
            </h2>
            <p className="kerb-section-desc">
              Explore vehicles segmented by budget brackets, vehicle body silhouettes, or trusted manufacturer portfolios.
            </p>
          </div>

          {/* Pathway Tabs */}
          <div className="discovery-tab-pills" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'budget'}
              onClick={() => setActiveTab('budget')}
              className={`kerb-chip ${activeTab === 'budget' ? 'is-active' : ''}`}
            >
              By Budget
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'body'}
              onClick={() => setActiveTab('body')}
              className={`kerb-chip ${activeTab === 'body' ? 'is-active' : ''}`}
            >
              By Body Type
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'brand'}
              onClick={() => setActiveTab('brand')}
              className={`kerb-chip ${activeTab === 'brand' ? 'is-active' : ''}`}
            >
              By Brand
            </button>
          </div>
        </div>

        {/* Tab 1: Budget Brackets */}
        {activeTab === 'budget' && (
          <div className="discovery-cards-grid budget-grid">
            {budgetBrackets.map((b) => (
              <Link key={b.id} href={b.href} className="discovery-item-card">
                <div className="card-top-row">
                  <span className="bracket-count">{b.count} models</span>
                  <span className="card-arrow" aria-hidden="true">→</span>
                </div>
                <h3 className="card-item-title">{b.label}</h3>
                <span className="card-item-price">{b.range}</span>
                <p className="card-item-desc">{b.desc}</p>
              </Link>
            ))}
          </div>
        )}

        {/* Tab 2: Body Types */}
        {activeTab === 'body' && (
          <div className="discovery-cards-grid body-grid">
            {bodyTypes.map((item) => (
              <Link key={item.name} href={item.href} className="discovery-item-card">
                <div className="card-top-row">
                  <span className="bracket-count">{item.count} models</span>
                  <span className="card-arrow" aria-hidden="true">→</span>
                </div>
                <h3 className="card-item-title">{item.name}</h3>
                <p className="card-item-desc" style={{ marginTop: '8px' }}>
                  {item.desc}
                </p>
              </Link>
            ))}
          </div>
        )}

        {/* Tab 3: Brand Grid */}
        {activeTab === 'brand' && (
          <div className="brand-grid">
            {makes.map((make) => {
              const brandModelCount = models.filter((m) => m.makeId === make.id).length;
              return (
                <Link key={make.id} href={`/cars/${make.slug}`} className="brand-card">
                  <div className="brand-header">
                    <span className="brand-origin">{make.country}</span>
                    <span className="brand-models-badge">{brandModelCount} {brandModelCount === 1 ? 'car' : 'cars'}</span>
                  </div>
                  <h3 className="brand-name">{make.name}</h3>
                  <p className="brand-desc">{make.description}</p>
                  <span className="brand-cta">
                    <span>Explore catalogue</span>
                    <span aria-hidden="true">→</span>
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      <style jsx>{`
        .discovery-section {
          background-color: var(--background);
        }

        .discovery-tab-pills {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .discovery-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: var(--card-gap);
        }

        .discovery-item-card {
          background-color: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 22px;
          display: flex;
          flex-direction: column;
          text-decoration: none;
          color: inherit;
          transition: border-color var(--transition-hover), transform var(--transition-hover), box-shadow var(--transition-hover);
        }

        .discovery-item-card:hover {
          border-color: var(--border-hover);
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }

        .card-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .bracket-count {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--accent);
          background-color: var(--accent-dim);
          padding: 2px 8px;
          border-radius: var(--radius-sm);
        }

        .card-arrow {
          font-size: 14px;
          color: var(--text-muted);
          transition: transform var(--transition-hover), color var(--transition-hover);
        }

        .discovery-item-card:hover .card-arrow {
          color: var(--accent);
          transform: translateX(4px);
        }

        .card-item-title {
          font-size: 18px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 4px;
        }

        .card-item-price {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 8px;
        }

        .card-item-desc {
          font-size: 12px;
          color: var(--text-muted);
          line-height: 1.45;
          margin: 0;
        }

        /* Brand Grid */
        .brand-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: var(--card-gap);
        }

        .brand-card {
          background-color: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 22px;
          display: flex;
          flex-direction: column;
          text-decoration: none;
          color: inherit;
          transition: border-color var(--transition-hover), transform var(--transition-hover), box-shadow var(--transition-hover);
        }

        .brand-card:hover {
          border-color: var(--border-hover);
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }

        .brand-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .brand-origin {
          font-size: 11px;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .brand-models-badge {
          font-size: 11px;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .brand-name {
          font-size: 19px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 8px;
        }

        .brand-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.5;
          margin: 0 0 16px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .brand-cta {
          margin-top: auto;
          font-size: 13px;
          font-weight: 600;
          color: var(--accent);
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
      `}</style>
    </section>
  );
}
