import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import StickyNav from '../../components/StickyNav';
import Footer from '../../components/Footer';
import { mockArticles } from '../../lib/mock-data/articles';

export const metadata: Metadata = {
  title: 'Car Buying Guides, Road Tests & Technical Deep Dives | KERB',
  description: 'Expert automotive advice on safety ratings, EV running costs, automatic gearboxes, and on-road price tax breakdowns from KERB editorial road testers.',
  alternates: {
    canonical: 'https://kerb.com/guides'
  }
};

const guideDetails = [
  {
    slug: 'bharat-ncap-safety-guide',
    title: 'The Complete Guide to Bharat NCAP 5-Star Safety Standards',
    excerpt: 'What adult and child crash safety scores mean for real-world crash protection on Indian expressways.',
    category: 'Safety & Engineering',
    readingTime: '6 min read',
    author: 'KERB Technical Bureau',
    date: 'March 2026',
    image: '/nexon.jpg',
    keyTakeaway: 'Always verify whether 6 airbags, electronic stability control, and side curtain coverage are standard across all variants.'
  },
  {
    slug: 'strong-hybrid-vs-ev-running-costs',
    title: 'Strong Hybrid vs EV: Real-World Economics for Indian City Driving',
    excerpt: 'Comparing the Grand Vitara Hybrid against the Windsor EV over 5 years and 75,000 kilometers of urban commuting.',
    category: 'Economics & Energy',
    readingTime: '8 min read',
    author: 'KERB Road Test Team',
    date: 'February 2026',
    image: '/vitara.jpg',
    keyTakeaway: 'Electric cars win on total cost if charging at home; strong hybrids win for drivers frequently traveling remote routes without charging infrastructure.'
  },
  {
    slug: 'automatic-transmissions-explained-dct-cvt-tc-amt',
    title: 'Automatic Gearboxes Compared: DCT vs CVT vs Torque Converter vs AMT',
    excerpt: 'The technical mechanics of dual-clutch, continuously variable, and hydraulic torque converter gearboxes.',
    category: 'Powertrain Guide',
    readingTime: '7 min read',
    author: 'KERB Road Test Team',
    date: 'January 2026',
    image: '/luxury-interior.jpg',
    keyTakeaway: 'For pure stop-and-go bumper traffic, CVT and torque converters provide supreme reliability without dual-clutch overheating.'
  },
  {
    slug: 'understanding-on-road-car-price-taxes',
    title: 'How On-Road Car Prices Work: State RTO Taxes, Insurance & Hidden Fees',
    excerpt: 'Why the same car costs ₹2.5 lakh more in Bangalore than in Delhi, and how to avoid unwanted dealer charges.',
    category: 'Financing & Taxes',
    readingTime: '5 min read',
    author: 'KERB Advisory',
    date: 'March 2026',
    image: '/hero-creta.jpg',
    keyTakeaway: 'Handling and logistic charges are prohibited by Supreme Court directives; dealers cannot force proprietary insurance.'
  }
];

export default function GuidesPage() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#0B0F12', color: '#F3F4F6' }}>
      <StickyNav />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 16px 80px', width: '100%' }}>
        <nav aria-label="Breadcrumb" style={{ display: 'flex', gap: '8px', fontSize: '0.85rem', color: '#9CA3AF', marginBottom: '24px' }}>
          <Link href="/" style={{ color: '#9CA3AF', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <span style={{ color: '#F3F4F6', fontWeight: 600 }}>Automotive Guides &amp; Insights</span>
        </nav>

        <header style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 800, margin: '0 0 12px 0', color: '#FFFFFF' }}>
            Automotive Decision Guides
          </h1>
          <p style={{ color: '#9CA3AF', fontSize: '1.05rem', margin: 0, maxWidth: '800px', lineHeight: 1.6 }}>
            Technical deep dives, ownership financial analysis, and safety breakdowns written by professional road test engineers to guide your purchase decision.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '28px' }}>
          {guideDetails.map((guide) => (
            <article
              key={guide.slug}
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
                  src={guide.image}
                  alt={guide.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  style={{ objectFit: 'cover' }}
                />
              </div>

              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', color: '#9CA3AF' }}>
                  <span style={{ color: '#22C55E', fontWeight: 700, textTransform: 'uppercase' }}>{guide.category}</span>
                  <span>{guide.readingTime}</span>
                </div>

                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', margin: 0, lineHeight: 1.35 }}>
                  {guide.title}
                </h2>

                <p style={{ fontSize: '0.88rem', color: '#D1D5DB', margin: 0, lineHeight: 1.5, flex: 1 }}>
                  {guide.excerpt}
                </p>

                <div style={{ backgroundColor: '#171C21', padding: '12px 14px', borderRadius: '8px', fontSize: '0.8rem', color: '#E5E7EB', lineHeight: 1.4 }}>
                  <strong style={{ color: '#22C55E' }}>Takeaway:</strong> {guide.keyTakeaway}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.06)', fontSize: '0.8rem', color: '#9CA3AF' }}>
                  <span>By {guide.author} &bull; {guide.date}</span>
                  <span style={{ color: '#22C55E', fontWeight: 700 }}>Read Article ➔</span>
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
