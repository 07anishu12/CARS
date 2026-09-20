import React from 'react';
import { Metadata } from 'next';
import StickyNav from '../../components/StickyNav';
import Footer from '../../components/Footer';
import { AIAdvisorInterface } from '../../components/ai/AIAdvisorInterface';

export const metadata: Metadata = {
  title: 'AI Automotive Decision Advisor | KERB',
  description: 'Ask natural car buying questions grounded in verified Indian car prices, NCAP safety scores, and real-world fuel economy. Unbiased automotive intelligence without dealer push.',
  alternates: {
    canonical: 'https://kerb.com/ai-advisor'
  }
};

export default function AIAdvisorPage() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#0B0F12' }}>
      <StickyNav />
      <AIAdvisorInterface />
      <Footer />
    </main>
  );
}
