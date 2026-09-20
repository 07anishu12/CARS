import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import StickyNav from '../../../../components/StickyNav';
import Footer from '../../../../components/Footer';
import { CarShowroom } from '../../../../components/showroom/CarShowroom';
import { getCarDetailAggregate } from '../../../../lib/data/cars-db';

export interface CarDetailPageProps {
  params: { brand: string; model: string };
  searchParams?: { city?: string; variant?: string };
}

export async function generateMetadata({ params, searchParams }: CarDetailPageProps): Promise<Metadata> {
  const aggregate = getCarDetailAggregate(params.brand, params.model, searchParams?.variant, searchParams?.city);
  if (!aggregate) {
    return {
      title: 'Car Not Found | KERB',
      description: 'The requested car model could not be found.'
    };
  }

  const { make, model, selectedVariant, selectedCity, pricing } = aggregate;
  const priceLakh = (pricing.onRoadPrice / 100000).toFixed(2);

  return {
    title: `${make.name} ${model.name} Price in ${selectedCity.name}, Specs, Mileage & Variants | KERB`,
    description: `Check 2026 ${make.name} ${model.name} on-road price in ${selectedCity.name} (from ₹${priceLakh} Lakh), ${selectedVariant.powerBhp} bhp power, real-world mileage, NCAP safety ratings, and expert KERB review.`,
    alternates: {
      canonical: `https://kerb.com/cars/${make.slug}/${model.slug}`
    },
    openGraph: {
      title: `${make.name} ${model.name} - Price, Specs, Features & Verified Review`,
      description: `Detailed showroom breakdown of the ${make.name} ${model.name}. On-road price in ${selectedCity.name}, variant comparison, and specifications.`,
      images: [
        {
          url: model.heroImage,
          width: 1920,
          height: 1080,
          alt: `${make.name} ${model.name} on KERB`
        }
      ]
    }
  };
}

export default function CarDetailPage({ params, searchParams }: CarDetailPageProps) {
  const aggregate = getCarDetailAggregate(params.brand, params.model, searchParams?.variant, searchParams?.city);

  if (!aggregate) {
    notFound();
  }

  const { make, model, selectedVariant, selectedCity, pricing } = aggregate;

  // Schema.org Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Car',
        '@id': `https://kerb.com/cars/${make.slug}/${model.slug}#car`,
        name: `${make.name} ${model.name}`,
        brand: {
          '@type': 'Brand',
          name: make.name
        },
        model: model.name,
        bodyType: model.bodyType,
        image: `https://kerb.com${model.heroImage}`,
        offers: {
          '@type': 'Offer',
          priceCurrency: 'INR',
          price: pricing.onRoadPrice,
          priceValidUntil: '2026-12-31',
          itemCondition: 'https://schema.org/NewCondition',
          availability: 'https://schema.org/InStock',
          seller: {
            '@type': 'Organization',
            name: 'KERB Automotive'
          }
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: model.rating,
          reviewCount: model.reviewCount,
          bestRating: '5',
          worstRating: '1'
        }
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://kerb.com'
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Cars',
            item: 'https://kerb.com/cars'
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: make.name,
            item: `https://kerb.com/cars/${make.slug}`
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: model.name,
            item: `https://kerb.com/cars/${make.slug}/${model.slug}`
          }
        ]
      },
      {
        '@type': 'FAQPage',
        mainEntity: model.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        }))
      }
    ]
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <StickyNav />
      <CarShowroom initialData={aggregate} />
      <Footer />
    </main>
  );
}
