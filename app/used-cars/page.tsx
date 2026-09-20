import React from 'react';
import StickyNav from '../../components/StickyNav';
import Footer from '../../components/Footer';
import Link from 'next/link';

export default function UsedCarsPage() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <StickyNav />
      <div className="kerb-shell" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '4rem 1rem' }}>
        <h1 className="page-heading">Used Cars</h1>
        <p className="chapter" style={{ marginTop: '1rem', marginBottom: '2rem' }}>
          Coming soon. We&apos;re building a verified used car marketplace.
        </p>
        <Link href="/cars" style={{ color: 'var(--financial)', textDecoration: 'underline' }}>
          Back to all cars
        </Link>
      </div>
      <Footer />
    </main>
  );
}
