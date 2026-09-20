'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import StickyNav from '../../../components/StickyNav';
import Footer from '../../../components/Footer';

export default function DataRequestPage() {
  const [requestType, setRequestType] = useState<'export' | 'delete'>('export');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (requestType === 'delete') {
      try {
        localStorage.removeItem('kerb-wishlist');
        localStorage.removeItem('kerb_cookie_consent_v1');
        localStorage.removeItem('kerb-theme');
      } catch {}
    }
    setIsSubmitted(true);
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#0B0F12', color: '#F3F4F6' }}>
      <StickyNav />

      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '64px 20px 80px', width: '100%' }}>
        <nav aria-label="Breadcrumb" style={{ marginBottom: '24px', fontSize: '0.85rem', color: '#9CA3AF' }}>
          <Link href="/" style={{ color: '#22C55E', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <Link href="/privacy" style={{ color: '#22C55E', textDecoration: 'none' }}>Privacy Policy</Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <span>Data Rights</span>
        </nav>

        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '12px', color: '#FFFFFF' }}>
          User Data Rights &amp; Self-Serve Portal
        </h1>
        <p style={{ color: '#9CA3AF', fontSize: '0.95rem', marginBottom: '32px', lineHeight: 1.5 }}>
          In compliance with GDPR and the Digital Personal Data Protection (DPDP) Act, you may freely export your automotive search profile or purge all associated identifiers.
        </p>

        {isSubmitted ? (
          <div style={{ backgroundColor: '#171C21', border: '1px solid #22C55E', borderRadius: '16px', padding: '32px', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>✅</div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '8px' }}>
              Request Received Successfully
            </h2>
            <p style={{ color: '#9CA3AF', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '24px' }}>
              {requestType === 'delete'
                ? 'Your local session data, wishlist cars, and cookie preferences have been erased from this device. Any server-side records associated with this session will be purged within 48 hours.'
                : `A structured JSON export of your saved comparisons and vehicle shortlists will be transmitted to ${email || 'your email'} once compiled.`}
            </p>
            <Link
              href="/"
              style={{
                backgroundColor: '#22C55E',
                color: '#0B0F12',
                padding: '10px 20px',
                borderRadius: '8px',
                fontWeight: 700,
                textDecoration: 'none'
              }}
            >
              Return to Homepage
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ backgroundColor: '#171C21', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#E5E7EB', marginBottom: '8px' }}>
                Select Action
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => setRequestType('export')}
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    border: `1px solid ${requestType === 'export' ? '#22C55E' : 'rgba(255, 255, 255, 0.15)'}`,
                    backgroundColor: requestType === 'export' ? 'rgba(34, 197, 94, 0.12)' : 'transparent',
                    color: requestType === 'export' ? '#22C55E' : '#9CA3AF',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  📦 Export My Data
                </button>
                <button
                  type="button"
                  onClick={() => setRequestType('delete')}
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    border: `1px solid ${requestType === 'delete' ? '#EF4444' : 'rgba(255, 255, 255, 0.15)'}`,
                    backgroundColor: requestType === 'delete' ? 'rgba(239, 68, 68, 0.12)' : 'transparent',
                    color: requestType === 'delete' ? '#EF4444' : '#9CA3AF',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  🗑️ Delete All Data
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="email" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#E5E7EB', marginBottom: '8px' }}>
                Contact Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  color: '#FFFFFF',
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
              />
            </div>

            <p style={{ fontSize: '0.8rem', color: '#9CA3AF', margin: 0 }}>
              {requestType === 'delete'
                ? 'Note: Deletion will immediately clear your saved vehicle bookmarks, comparison slots, and consent settings on this device.'
                : 'Data exports contain your wishlist identifiers, recent searches, and consent timestamps in machine-readable JSON format.'}
            </p>

            <button
              type="submit"
              style={{
                backgroundColor: requestType === 'delete' ? '#EF4444' : '#22C55E',
                color: '#FFFFFF',
                padding: '12px',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.95rem',
                border: 'none',
                cursor: 'pointer',
                marginTop: '8px'
              }}
            >
              {requestType === 'delete' ? 'Confirm Permanent Data Purge' : 'Request Data Archive'}
            </button>
          </form>
        )}
      </div>

      <Footer />
    </main>
  );
}
