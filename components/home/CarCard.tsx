'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CarModel, Make } from '../../types/vehicle';
import { useWishlist } from '../../hooks/useWishlist';

export interface CarCardProps {
  model: CarModel;
  make?: Make;
  priority?: boolean;
}

export default function CarCard({ model, make, priority = false }: CarCardProps) {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const saved = isWishlisted(model.id);

  const brandName = make?.name || 'Automobile';
  const carHref = `/cars/${make?.slug || 'cars'}/${model.slug}`;
  const compareHref = `/compare?cars=${model.slug}`;

  // Format price: e.g. "₹11.11L – ₹20.50L"
  const minLakh = (model.priceRangeMin / 100000).toFixed(2);
  const maxLakh = (model.priceRangeMax / 100000).toFixed(2);
  const formattedPrice = `₹${minLakh} – ${maxLakh} Lakh`;

  // Concise key spec summary: e.g. "Petrol / Diesel • MT / DCT"
  const transmissionSummary = model.transmissions.includes('Automatic') || model.transmissions.some((t) => t !== 'Manual')
    ? 'Manual / Auto'
    : 'Manual';
  const fuelSummary = model.isEV ? 'Pure Electric' : model.fuelTypes.slice(0, 2).join(' / ');
  const keySpec = `${model.bodyType} • ${fuelSummary} • ${transmissionSummary}`;

  // Concise value proposition (1 sentence)
  const valueProp = model.kerbVerdict || (model.pros && model.pros[0]) || 'Balanced performance and practical comfort';

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(model.id);
  };

  return (
    <article className="kerb-standard-car-card">
      {/* 1. Image Container (16:10 aspect ratio, object-fit: contain) */}
      <div className="card-image-wrap">
        <Link href={carHref} className="card-image-link" tabIndex={-1} aria-hidden="true">
          <Image
            src={model.heroImage}
            alt={`${brandName} ${model.name}`}
            fill
            priority={priority}
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 360px"
            className="card-image"
          />
        </Link>

        {/* Badges / Rating */}
        <div className="card-badge-row">
          {model.safetyRating && (
            <span className="card-safety-badge" title={`${model.safetyRating.stars} Stars ${model.safetyRating.agency}`}>
              {model.safetyRating.stars}★ NCAP
            </span>
          )}
          {model.isEV && <span className="card-ev-badge">100% EV</span>}
          {model.isHybrid && <span className="card-hybrid-badge">Strong Hybrid</span>}
        </div>

        {/* Wishlist button */}
        <button
          type="button"
          onClick={handleSave}
          aria-label={saved ? `Remove ${brandName} ${model.name} from saved` : `Save ${brandName} ${model.name}`}
          className={`card-wishlist-btn ${saved ? 'is-saved' : ''}`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      {/* 2. Content Details */}
      <div className="card-content">
        <div className="card-header">
          <span className="card-brand">{brandName}</span>
          <h3 className="card-name">
            <Link href={carHref}>{model.name}</Link>
          </h3>
        </div>

        {/* 3. Price */}
        <div className="card-price-row">
          <span className="card-price">{formattedPrice}</span>
          <span className="card-price-label">Ex-showroom</span>
        </div>

        {/* 4. Key Information */}
        <div className="card-spec-row">{keySpec}</div>

        {/* Value Proposition */}
        <p className="card-value-prop" title={valueProp}>
          &ldquo;{valueProp}&rdquo;
        </p>

        {/* 5. CTAs */}
        <div className="card-actions">
          <Link href={carHref} className="kerb-btn kerb-btn-secondary kerb-btn-sm card-action-main">
            View Car
          </Link>
          <Link href={compareHref} className="kerb-btn kerb-btn-ghost kerb-btn-sm card-action-compare">
            Compare
          </Link>
        </div>
      </div>

      <style jsx>{`
        .kerb-standard-car-card {
          background-color: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 100%;
          transition: border-color var(--transition-hover), transform var(--transition-hover), box-shadow var(--transition-hover);
        }

        .kerb-standard-car-card:hover {
          border-color: var(--border-hover);
          box-shadow: var(--shadow-md);
        }

        .card-image-wrap {
          position: relative;
          aspect-ratio: 16 / 10;
          width: 100%;
          background: var(--surface-elevated);
          overflow: hidden;
          border-bottom: 1px solid var(--border-subtle);
        }

        .card-image-link {
          position: absolute;
          inset: 0;
          display: block;
        }

        :global(.card-image) {
          object-fit: contain !important;
          padding: 12px;
          transition: transform 250ms ease;
        }

        .kerb-standard-car-card:hover :global(.card-image) {
          transform: scale(1.03);
        }

        .card-badge-row {
          position: absolute;
          top: 10px;
          left: 10px;
          display: flex;
          gap: 6px;
          z-index: 2;
        }

        .card-safety-badge,
        .card-ev-badge,
        .card-hybrid-badge {
          font-size: 11px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: var(--radius-sm);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          letter-spacing: 0.02em;
        }

        .card-safety-badge {
          background: rgba(16, 22, 21, 0.85);
          color: #F7F8F6;
          border: 1px solid var(--border);
        }

        .card-ev-badge {
          background: var(--accent-dim);
          color: var(--accent);
          border: 1px solid var(--accent-border);
        }

        .card-hybrid-badge {
          background: rgba(147, 51, 234, 0.15);
          color: #A855F7;
          border: 1px solid rgba(147, 51, 234, 0.3);
        }

        .card-wishlist-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 32px;
          height: 32px;
          border-radius: var(--radius-pill);
          background: var(--surface);
          border: 1px solid var(--border);
          color: var(--text-muted);
          cursor: pointer;
          display: grid;
          place-items: center;
          z-index: 2;
          transition: all var(--transition-hover);
        }

        .card-wishlist-btn:hover {
          color: var(--accent);
          border-color: var(--accent);
        }

        .card-wishlist-btn.is-saved {
          color: var(--accent);
          border-color: var(--accent);
        }

        .card-content {
          padding: 16px 18px 18px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .card-header {
          display: flex;
          flex-direction: column;
          gap: 2px;
          margin-bottom: 8px;
        }

        .card-brand {
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
        }

        .card-name {
          font-size: 18px;
          font-weight: 700;
          margin: 0;
          color: var(--text-primary);
          letter-spacing: -0.015em;
        }

        .card-name a {
          color: inherit;
          text-decoration: none;
        }

        .card-name a:hover {
          color: var(--accent);
        }

        .card-price-row {
          display: flex;
          align-items: baseline;
          gap: 6px;
          margin-bottom: 8px;
        }

        .card-price {
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
          font-variant-numeric: tabular-nums;
        }

        .card-price-label {
          font-size: 11px;
          color: var(--text-muted);
        }

        .card-spec-row {
          font-size: 12px;
          color: var(--text-secondary);
          margin-bottom: 8px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .card-value-prop {
          font-size: 12px;
          line-height: 1.45;
          color: var(--text-muted);
          margin: 0 0 16px 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: 35px;
        }

        .card-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-top: auto;
          padding-top: 12px;
          border-top: 1px solid var(--border-subtle);
        }

        .card-action-main,
        .card-action-compare {
          width: 100%;
          text-align: center;
        }
      `}</style>
    </article>
  );
}
