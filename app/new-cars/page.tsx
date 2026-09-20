import React from 'react';
import { Metadata } from 'next';
import StickyNav from '../../components/StickyNav';
import Footer from '../../components/Footer';
import { NewCarsView } from '../../components/new-cars/NewCarsView';
import { getAllModels, getAllMakes, getAllCities } from '../../lib/data/cars-db';

export const metadata: Metadata = {
  title: 'New Cars in India 2026: Latest Launches, Upcoming Models & On-Road Prices | KERB',
  description: 'Explore all new cars launched in India in 2026. Compare on-road prices across cities, check upcoming EV and hybrid models, verified waiting periods, and Bharat NCAP safety ratings.',
  alternates: {
    canonical: 'https://kerb.com/new-cars'
  },
  openGraph: {
    title: 'New Cars in India 2026 - Latest Launches, Prices & Waiting Times',
    description: 'Comprehensive 2026 new car buyer hub with verified on-road pricing, waiting periods, Bharat NCAP ratings, and expert road test verdicts.',
    images: [
      {
        url: 'https://kerb.com/hero-creta.jpg',
        width: 1920,
        height: 1080,
        alt: 'New Cars 2026 on KERB'
      }
    ]
  }
};

export default function NewCarsPage() {
  const models = getAllModels();
  const makes = getAllMakes();
  const cities = getAllCities();

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <StickyNav />
      <NewCarsView models={models} makes={makes} cities={cities} />
      <Footer />
    </main>
  );
}
