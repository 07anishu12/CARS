import React from 'react';
import Link from 'next/link';
import StickyNav from '../../components/StickyNav';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Privacy Policy & Data Protection | KERB',
  description: 'Understand how KERB protects your personal data, enforces cookie transparency, and respects user consent under GDPR and India DPDP.',
  alternates: {
    canonical: '/privacy'
  }
};

export default function PrivacyPolicyPage() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#0B0F12', color: '#F3F4F6' }}>
      <StickyNav />

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '64px 20px 80px', width: '100%' }}>
        <nav aria-label="Breadcrumb" style={{ marginBottom: '24px', fontSize: '0.85rem', color: '#9CA3AF' }}>
          <Link href="/" style={{ color: '#22C55E', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <span>Privacy Policy</span>
        </nav>

        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '16px', color: '#FFFFFF' }}>
          KERB Privacy & Data Policy
        </h1>
        <p style={{ color: '#9CA3AF', fontSize: '0.95rem', marginBottom: '32px' }}>
          Last updated: March 15, 2026 &bull; Compliant with Digital Personal Data Protection Act (DPDP) and GDPR
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', lineHeight: 1.7, fontSize: '1rem', color: '#D1D5DB' }}>
          <section>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '12px' }}>
              1. Our Core Privacy Philosophy
            </h2>
            <p>
              KERB is designed from first principles as an honest, calm, and confidential automotive decision platform. Unlike legacy automotive portals, we do not sell your telephone number to aggressive third-party dealership networks or blast you with unsolicited telemarketing calls.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '12px' }}>
              2. Data We Collect
            </h2>
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><strong>Browsing Preferences:</strong> Selected city for accurate RTO calculations, saved vehicles in your wishlist, and comparison slots stored in your local browser session.</li>
              <li><strong>AI Query Data:</strong> Anonymized natural language queries submitted to KERB AI to continually improve vehicle match relevance.</li>
              <li><strong>Technical Logs:</strong> IP address, browser type, device width (for responsive styling), and Core Web Vitals telemetry.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '12px' }}>
              3. Cookies and Transparent Consent
            </h2>
            <p>
              We categorize cookies into <strong>Essential</strong> (Strictly Necessary for layout theme, authentication, and wishlist), <strong>Analytics</strong> (Performance & LCP measurement), and <strong>Personalization</strong> (Remembers city preferences). We do not load non-essential tracking before receiving your clear, informed consent.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '12px' }}>
              4. Your Data Subject Rights
            </h2>
            <p>
              Under international privacy frameworks and India&apos;s DPDP Act, you retain full rights to:
            </p>
            <ul style={{ paddingLeft: '20px', margin: '12px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>Request an export copy of any stored personal data.</li>
              <li>Request immediate and permanent deletion of your profile, wishlist, and usage history.</li>
              <li>Withdraw cookie consent at any moment without penalty.</li>
            </ul>
            <div style={{ marginTop: '16px' }}>
              <Link 
                href="/privacy/data-request" 
                style={{ 
                  display: 'inline-block',
                  backgroundColor: '#22C55E', 
                  color: '#0B0F12', 
                  padding: '10px 18px', 
                  borderRadius: '8px', 
                  fontWeight: 700, 
                  textDecoration: 'none' 
                }}
              >
                Access Self-Serve Privacy Rights Portal ➔
              </Link>
            </div>
          </section>

          <section>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '12px' }}>
              5. Contact Our Data Protection Officer
            </h2>
            <p>
              If you have any questions regarding how your data is handled, email our privacy compliance team at{' '}
              <a href="mailto:privacy@kerb.com" style={{ color: '#22C55E', textDecoration: 'underline' }}>
                privacy@kerb.com
              </a>.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
