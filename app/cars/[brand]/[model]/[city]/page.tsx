import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import StickyNav from '../../../../../components/StickyNav';
import Footer from '../../../../../components/Footer';
import { CarShowroom } from '../../../../../components/showroom/CarShowroom';
import { getCarDetailAggregate, getCityBySlug, getAllCities } from '../../../../../lib/data/cars-db';

const dossierTopics: Record<string,string> = { specs:'Specifications', images:'Images', price:'Price', reviews:'Reviews', variants:'Variants', mileage:'Mileage', safety:'Safety' };

export interface CityPricingPageProps {
  params: { brand: string; model: string; city: string };
  searchParams?: { variant?: string };
}

export async function generateMetadata({ params, searchParams }: CityPricingPageProps): Promise<Metadata> {
  const topic = dossierTopics[params.city];
  const city = getCityBySlug(params.city);
  const aggregate = getCarDetailAggregate(params.brand, params.model, searchParams?.variant, params.city);
  if (!aggregate) {
    return {
      title: 'Car Not Found | KERB',
      description: 'The requested car model could not be found.'
    };
  }

  const { make, model, pricing } = aggregate;
  if (topic) return {
    title: `${make.name} ${model.name} ${topic} | KERB`,
    description: `Explore ${make.name} ${model.name} ${topic.toLowerCase()}, variant details and ownership information in the KERB vehicle dossier.`,
    alternates: { canonical: `https://kerb.com/cars/${make.slug}/${model.slug}/${params.city}` },
    openGraph: { title: `${make.name} ${model.name} ${topic}`, images:[model.heroImage] }
  };
  const priceLakh = (pricing.onRoadPrice / 100000).toFixed(2);

  return {
    title: `${make.name} ${model.name} On-Road Price in ${city.name} | From ₹${priceLakh} Lakh | KERB`,
    description: `Get exact 2026 ${make.name} ${model.name} on-road price breakdown in ${city.name} (${city.state}) including RTO road tax (${city.rtoPercentage}%), insurance, FASTag, and variant comparison.`,
    alternates: {
      canonical: `https://kerb.com/cars/${make.slug}/${model.slug}`
    },
    openGraph: {
      title: `${make.name} ${model.name} On-Road Price in ${city.name}`,
      description: `Exact on-road pricing for ${make.name} ${model.name} in ${city.name} verified from ${pricing.source}.`,
      images: [
        {
          url: model.heroImage,
          width: 1920,
          height: 1080,
          alt: `${make.name} ${model.name} in ${city.name}`
        }
      ]
    }
  };
}

export default function CityPricingPage({ params, searchParams }: CityPricingPageProps) {
  const aggregate = getCarDetailAggregate(params.brand, params.model, searchParams?.variant, params.city);

  if (!aggregate || (!dossierTopics[params.city] && !getAllCities().some(city => city.slug === params.city))) {
    notFound();
  }

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#0B0F12' }}>
      <StickyNav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context":"https://schema.org", "@type":"Car", name:`${aggregate.make.name} ${aggregate.model.name}`, brand:{"@type":"Brand",name:aggregate.make.name}, image:aggregate.model.heroImage, url:`https://kerb.com/cars/${params.brand}/${params.model}/${params.city}` }) }} />
      <CarShowroom initialData={aggregate} topic={dossierTopics[params.city] ? params.city : undefined} />
      <Footer />
    </main>
  );
}
