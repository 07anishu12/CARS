import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CategoryDefinition } from '../../lib/data/categories';
import { CarModel, Make } from '../../types/vehicle';

export interface CategoryPageViewProps {
  category: CategoryDefinition;
  models: CarModel[];
  makes: Make[];
}

export const CategoryPageView: React.FC<CategoryPageViewProps> = ({
  category,
  models,
  makes
}) => {
  const formatPriceLakh = (price: number) => `₹${(price / 100000).toFixed(2)} Lakh`;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 16px 80px', width: '100%', color: '#F3F4F6' }}>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumbs" style={{ display: 'flex', gap: '8px', fontSize: '0.85rem', color: '#9CA3AF', marginBottom: '24px', flexWrap: 'wrap' }}>
        <Link href="/" style={{ color: '#9CA3AF', textDecoration: 'none' }}>Home</Link>
        <span>/</span>
        <Link href="/cars" style={{ color: '#9CA3AF', textDecoration: 'none' }}>Cars</Link>
        <span>/</span>
        <span style={{ color: '#F3F4F6', fontWeight: 600 }}>{category.title}</span>
      </nav>

      {/* Editorial Header Banner */}
      <header style={{ backgroundColor: '#10161A', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '20px', padding: '32px', marginBottom: '40px' }}>
        <span style={{ backgroundColor: 'rgba(34, 197, 94, 0.15)', color: '#22C55E', padding: '4px 10px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {category.type === 'budget' ? 'Budget Segment' : 'Automotive Category'}
        </span>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, margin: '12px 0 8px 0', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
          {category.title}
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#22C55E', fontWeight: 600, margin: '0 0 16px 0', lineHeight: 1.4 }}>
          {category.headline}
        </p>
        <p style={{ fontSize: '0.95rem', color: '#D1D5DB', margin: 0, lineHeight: 1.65, maxWidth: '900px' }}>
          {category.editorialGuide}
        </p>

        {/* Pros & Buying Tips Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '24px', paddingTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <div>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#22C55E', margin: '0 0 8px 0', textTransform: 'uppercase' }}>
              ✓ Key Advantages
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem', color: '#9CA3AF' }}>
              {category.pros.map((pro, i) => (
                <li key={i} style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ color: '#22C55E' }}>+</span> {pro}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#F59E0B', margin: '0 0 8px 0', textTransform: 'uppercase' }}>
              💡 KERB Buyer Advice
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem', color: '#9CA3AF' }}>
              {category.buyingTips.map((tip, i) => (
                <li key={i} style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ color: '#F59E0B' }}>&bull;</span> {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      {/* Filtered Vehicle Results */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0, color: '#FFFFFF' }}>
          Top Recommended Models ({models.length})
        </h2>
        <Link
          href="/compare"
          style={{ fontSize: '0.85rem', color: '#22C55E', textDecoration: 'none', fontWeight: 600 }}
        >
          Compare Models ➔
        </Link>
      </div>

      {models.length === 0 ? (
        <div style={{ backgroundColor: '#10161A', borderRadius: '16px', padding: '40px', textAlign: 'center', border: '1px dashed rgba(255, 255, 255, 0.1)' }}>
          <p style={{ color: '#9CA3AF', margin: 0 }}>No vehicles found matching this criteria.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
          {models.map((model) => {
            const make = makes.find((m) => m.id === model.makeId);
            const makeSlug = make ? make.slug : 'cars';
            return (
              <article
                key={model.id}
                style={{
                  backgroundColor: '#10161A',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', backgroundColor: '#070A0C' }}>
                  <Image
                    src={model.heroImage}
                    alt={`${make?.name || ''} ${model.name}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 360px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>

                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF' }}>
                        {make?.name} {model.name}
                      </h3>
                      <span style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>
                        {model.bodyType} &bull; {model.fuelTypes.join('/')}
                      </span>
                    </div>
                    <span style={{ backgroundColor: 'rgba(34, 197, 94, 0.15)', color: '#22C55E', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                      ★ {model.rating}
                    </span>
                  </div>

                  <div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#22C55E' }}>
                      {formatPriceLakh(model.priceRangeMin)} - {formatPriceLakh(model.priceRangeMax)}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>Ex-Showroom Price Range</div>
                  </div>

                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#D1D5DB', lineHeight: 1.45, flex: 1 }}>
                    {model.kerbVerdict}
                  </p>

                  <div style={{ display: 'flex', gap: '8px', paddingTop: '8px' }}>
                    <Link
                      href={`/cars/${makeSlug}/${model.slug}`}
                      style={{
                        flex: 1,
                        backgroundColor: '#22C55E',
                        color: '#0B0F12',
                        padding: '10px',
                        borderRadius: '8px',
                        textAlign: 'center',
                        fontWeight: 700,
                        fontSize: '0.88rem',
                        textDecoration: 'none'
                      }}
                    >
                      Showroom &amp; On-Road Price
                    </Link>
                    <Link
                      href={`/compare?cars=${model.slug}`}
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        color: '#F3F4F6',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        textDecoration: 'none'
                      }}
                    >
                      Compare
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CategoryPageView;
