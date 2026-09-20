import React from 'react';
import Link from 'next/link';
import StickyNav from '../../components/StickyNav';
import Footer from '../../components/Footer';

export interface CatchAllPageProps {
  params: { catchAll: string[] };
}

export default function CatchAllPage({ params }: CatchAllPageProps) {
  const catchAll = params?.catchAll || [];
  const path = '/' + catchAll.join('/');
  const lastSegment = catchAll[catchAll.length - 1] || '';
  const pageTitle = lastSegment
    ? lastSegment
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : 'Page Not Found';

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#0B0F12', color: '#F3F4F6' }}>
      <StickyNav />

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '64px 20px 80px', width: '100%', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🚗</div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '12px' }}>
          {pageTitle}
        </h1>
        <p style={{ color: '#9CA3AF', fontSize: '1.05rem', maxWidth: '500px', margin: '0 auto 32px', lineHeight: 1.5 }}>
          The requested page <code>{path}</code> may have moved or is not yet indexed. Explore verified Indian car models, comparisons, or launch the AI advisor.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/cars"
            style={{
              backgroundColor: '#22C55E',
              color: '#0B0F12',
              padding: '12px 24px',
              borderRadius: '10px',
              fontWeight: 700,
              textDecoration: 'none'
            }}
          >
            Browse All Cars
          </Link>
          <Link
            href="/ai-advisor"
            style={{
              backgroundColor: '#171C21',
              color: '#F3F4F6',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              padding: '12px 24px',
              borderRadius: '10px',
              fontWeight: 600,
              textDecoration: 'none'
            }}
          >
            Ask KERB AI
          </Link>
          <Link
            href="/"
            style={{
              backgroundColor: 'transparent',
              color: '#9CA3AF',
              padding: '12px 20px',
              borderRadius: '10px',
              fontWeight: 600,
              textDecoration: 'underline'
            }}
          >
            Back to Home
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
