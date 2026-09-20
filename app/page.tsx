import React from 'react';
import { Metadata } from 'next';
import HomePageClient from '../components/home/HomePageClient';

import { getAllModels, getAllMakes, getAllCities } from '../lib/data/cars-db';
import { mockArticles } from '../lib/mock-data/articles';

export const metadata: Metadata = {
  title: 'KERB — Automotive Research, Comparison & Decision Platform',
  description:
    'Research cars. Compare them. Understand them. Then take action. Compare prices, specifications, ownership costs, and real-world reviews across cars sold in India.',
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: 'KERB — Automotive Research, Comparison & Decision Platform',
    description:
      'Research cars. Compare them. Understand them. Then take action. Verified specifications and city on-road pricing across India.',
    url: 'https://kerb.com',
    siteName: 'KERB',
    type: 'website'
  }
};

export default function HomePage() {
  const models = getAllModels();
  const makes = getAllMakes();
  const cities = getAllCities();

  // JSON-LD Structured Data for Search Engines & AI Crawlers (AEO / GEO)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://kerb.com/#website',
        url: 'https://kerb.com',
        name: 'KERB Automotive Research',
        description: 'Automotive research, comparison, and price discovery platform for Indian car buyers.',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://kerb.com/search?q={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      },
      {
        '@type': 'Organization',
        '@id': 'https://kerb.com/#organization',
        name: 'KERB Automotive Technologies',
        url: 'https://kerb.com',
        logo: 'https://kerb.com/logo.png',
        description: 'Independent automotive research, comparison, and verified on-road pricing platform in India.',
        areaServed: 'IN'
      },
      {
        '@type': 'ItemList',
        name: 'Passenger Cars in India 2026',
        description: 'Curated list of passenger cars sold in India with verified specifications and pricing.',
        numberOfItems: models.length,
        itemListElement: models.map((model, idx) => {
          const make = makes.find((mk) => mk.id === model.makeId);
          return {
            '@type': 'ListItem',
            position: idx + 1,
            item: {
              '@type': 'Car',
              name: `${make?.name} ${model.name}`,
              brand: {
                '@type': 'Brand',
                name: make?.name
              },
              model: model.name,
              bodyType: model.bodyType,
              offers: {
                '@type': 'AggregateOffer',
                priceCurrency: 'INR',
                lowPrice: model.priceRangeMin,
                highPrice: model.priceRangeMax,
                priceSpecification: {
                  '@type': 'PriceSpecification',
                  priceCurrency: 'INR',
                  valueAddedTaxIncluded: true
                }
              }
            }
          };
        })
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How does KERB calculate on-road price?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'KERB applies state-specific RTO taxation slabs, mandatory third-party + 1-year comprehensive insurance formulas based on engine displacement/kW, and statutory municipal levies without dealer markups.'
            }
          },
          {
            '@type': 'Question',
            name: 'What affects car ownership cost?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Car ownership cost comprises scheduled maintenance intervals, real-world fuel economy, insurance renewal depreciation, and statutory state taxation.'
            }
          },
          {
            '@type': 'Question',
            name: 'How does KERB compare cars?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'KERB compares cars across normalized engineering metrics: verified ex-showroom price, tested real-world fuel consumption, power, torque, safety ratings, boot volume, and ground clearance.'
            }
          },
          {
            '@type': 'Question',
            name: 'Can I compare different fuel types?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. You can compare petrol, diesel, strong hybrid, and electric cars side by side to evaluate running costs per kilometre and payback periods.'
            }
          },
          {
            '@type': 'Question',
            name: 'Can I find cars by budget?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. You can filter cars across precise budget thresholds ranging from under ₹8 Lakh to ₹30 Lakh+ with city-specific on-road estimates.'
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main id="main-content">
        <HomePageClient
          models={models}
          makes={makes}
          cities={cities}
          articles={mockArticles}
        />
      </main>
    </>
  );
}

export const revalidate = 3600;
