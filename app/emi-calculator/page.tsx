import React from 'react';
import { Metadata } from 'next';
import StickyNav from '../../components/StickyNav';
import Footer from '../../components/Footer';
import { StandaloneEMICalculator } from '../../components/calculator/StandaloneEMICalculator';

export const metadata: Metadata = {
  title: 'Car Loan EMI Calculator India 2026: Calculate Monthly EMI & Interest | KERB',
  description: 'Plan your new car financing with the KERB car loan EMI calculator. Calculate monthly payments, total interest payable, down payment requirements, and view complete amortization schedules.',
  alternates: {
    canonical: 'https://kerb.com/emi-calculator'
  }
};

export default function EMICalculatorPage({
  searchParams
}: {
  searchParams?: { price?: string };
}) {
  const price = searchParams?.price ? Number(searchParams.price) : 1250000;

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#0B0F12' }}>
      <StickyNav />
      <StandaloneEMICalculator initialPrice={price} />
      <Footer />
    </main>
  );
}
