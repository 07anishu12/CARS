import React from 'react';
import { Metadata } from 'next';
import StickyNav from '../../components/StickyNav';
import Footer from '../../components/Footer';
import { VehicleCompareView } from '../../components/compare/VehicleCompareView';
import { getAllModels, getAllMakes } from '../../lib/data/cars-db';

export const metadata: Metadata = {
  title: 'Car Comparison Tool India 2026: Compare Specs, Prices & Safety | KERB',
  description: 'Compare cars in India side by side. Head-to-head analysis of ex-showroom prices, Bharat NCAP crash safety ratings, real mileage, boot space, and dimensions.',
  alternates: {
    canonical: 'https://kerb.com/compare'
  }
};

export default function ComparePage({
  searchParams
}: {
  searchParams?: { cars?: string; carA?: string; carB?: string };
}) {
  const allModels = getAllModels();
  const allMakes = getAllMakes();

  let initialSlugs: string[] = [];
  if (searchParams?.cars) {
    initialSlugs = searchParams.cars.split(',').map((s) => s.trim());
  } else {
    if (searchParams?.carA) initialSlugs.push(searchParams.carA);
    if (searchParams?.carB) initialSlugs.push(searchParams.carB);
  }

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#0B0F12' }}>
      <StickyNav />
      <VehicleCompareView
        allModels={allModels}
        allMakes={allMakes}
        initialSelectedSlugs={initialSlugs}
      />
      <Footer />
    </main>
  );
}
