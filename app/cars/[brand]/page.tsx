import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import StickyNav from '../../../components/StickyNav';
import Footer from '../../../components/Footer';
import { CategoryPageView } from '../../../components/category/CategoryPageView';
import { getMakeBySlug, filterModels, getAllMakes } from '../../../lib/data/cars-db';
import { getCategoryBySlug } from '../../../lib/data/categories';

export interface BrandOrCategoryPageProps {
  params: { brand: string };
}

export async function generateMetadata({ params }: BrandOrCategoryPageProps): Promise<Metadata> {
  const category = getCategoryBySlug(params.brand);
  if (category) {
    return {
      title: category.metaTitle,
      description: category.metaDescription,
      alternates: {
        canonical: `https://kerb.com/cars/${category.slug}`
      }
    };
  }

  const make = getMakeBySlug(params.brand);
  if (make) {
    return {
      title: `${make.name} Cars in India: Latest 2026 Price List, Models & Reviews | KERB`,
      description: `Explore all ${make.name} cars in India. Check out latest 2026 ex-showroom and on-road prices, specifications, safety NCAP scores, fuel economy, and comprehensive expert road tests.`,
      alternates: {
        canonical: `https://kerb.com/cars/${make.slug}`
      }
    };
  }

  return {
    title: 'Vehicles | KERB',
    description: 'Explore vehicles on KERB.'
  };
}

export default function BrandOrCategoryPage({ params }: BrandOrCategoryPageProps) {
  // Check if requested slug is a category or budget page
  const category = getCategoryBySlug(params.brand);
  if (category) {
    const models = filterModels(category.filter);
    const makes = getAllMakes();
    return (
      <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#0B0F12', color: '#F3F4F6' }}>
        <StickyNav />
        <CategoryPageView category={category} models={models} makes={makes} />
        <Footer />
      </main>
    );
  }

  // Otherwise check if it is an automotive Make
  const make = getMakeBySlug(params.brand);
  if (!make) {
    notFound();
  }

  const models = filterModels({ makeSlug: make.slug });
  const formatPriceLakh = (price: number) => `₹${(price / 100000).toFixed(2)} Lakh`;

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#0B0F12', color: '#F3F4F6' }}>
      <StickyNav />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 16px 80px', width: '100%' }}>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ display: 'flex', gap: '8px', fontSize: '0.85rem', color: '#9CA3AF', marginBottom: '24px' }}>
          <Link href="/" style={{ color: '#9CA3AF', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <Link href="/cars" style={{ color: '#9CA3AF', textDecoration: 'none' }}>Cars</Link>
          <span>/</span>
          <span style={{ color: '#F3F4F6', fontWeight: 600 }}>{make.name}</span>
        </nav>

        {/* Brand Header */}
        <header style={{ backgroundColor: '#10161A', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '20px', padding: '32px', marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: 0, color: '#FFFFFF' }}>
              {make.name} Cars in India
            </h1>
            <span style={{ backgroundColor: 'rgba(34, 197, 94, 0.15)', color: '#22C55E', padding: '4px 10px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700 }}>
              {make.country} &bull; Est. {make.establishedYear}
            </span>
          </div>
          <p style={{ fontSize: '1.05rem', color: '#9CA3AF', maxWidth: '800px', margin: 0, lineHeight: 1.6 }}>
            {make.description}
          </p>
        </header>

        {/* Brand Vehicle Lineup Grid */}
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '20px' }}>
          {make.name} Model Lineup ({models.length} {models.length === 1 ? 'Model' : 'Models'})
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
          {models.map((model) => (
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
                  alt={`${make.name} ${model.name}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  style={{ objectFit: 'cover' }}
                />
              </div>

              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF' }}>
                      {make.name} {model.name}
                    </h3>
                    <span style={{ fontSize: '0.82rem', color: '#9CA3AF' }}>
                      {model.bodyType} &bull; {model.fuelTypes.join(' / ')}
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
                  <div style={{ fontSize: '0.78rem', color: '#9CA3AF' }}>Ex-Showroom Price Range</div>
                </div>

                <p style={{ margin: 0, fontSize: '0.88rem', color: '#D1D5DB', lineHeight: 1.45, flex: 1 }}>
                  {model.kerbVerdict}
                </p>

                <div style={{ display: 'flex', gap: '8px', paddingTop: '8px' }}>
                  <Link
                    href={`/cars/${make.slug}/${model.slug}`}
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
                    View Showroom &amp; Prices
                  </Link>
                  <Link
                    href={`/compare?cars=${model.slug}`}
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      color: '#F3F4F6',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      fontWeight: 600,
                      fontSize: '0.88rem',
                      textDecoration: 'none'
                    }}
                  >
                    Compare
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
