import React from 'react';
import { Metadata } from 'next';
import StickyNav from '../../components/StickyNav';
import Footer from '../../components/Footer';
import { CarListingView } from '../../components/listing/CarListingView';
import { getAllModels, getAllMakes } from '../../lib/data/cars-db';

export const metadata: Metadata = {
  title: 'All Cars in India 2026: Prices, Specs, Ratings & Comparisons | KERB',
  description: 'Search and filter all new cars in India by budget, brand, body style (SUV, Sedan, EV), fuel type, and transmission. Unbiased reviews and verified on-road pricing.',
  alternates: {
    canonical: 'https://kerb.com/cars'
  }
};

export default function CarsListingPage({
  searchParams
}: {
  searchParams?: { body?: string; budget?: string; seats?: string; fuel?: string };
}) {
  const models = getAllModels();
  const makes = getAllMakes();

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <StickyNav />
      <CarListingView
        initialModels={models}
        allMakes={makes}
        initialCategory={searchParams?.body}
        initialBudget={searchParams?.budget}
        initialSeats={searchParams?.seats ? Number(searchParams.seats) : undefined}
        initialFuel={searchParams?.fuel}
      />
      <Footer />
    </main>
  );
}
