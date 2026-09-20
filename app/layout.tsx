import React from 'react';
import { ThemeProvider } from '../providers/ThemeProvider';
import { WishlistProvider } from '../providers/WishlistProvider';
import { MobileBottomNav } from '../components/MobileBottomNav';
import { CookieConsent } from '../components/privacy/CookieConsent';
import '../styles/globals.css';
import '../styles/kerb.css';
import '../styles/discovery.css';
import '../styles/kerb-design-system.css';
import '../styles/kerb-liquid-glass.css';

export const metadata = {
  title: 'KERB — Research, Compare & Decide on Cars in India',
  description: 'Research cars. Compare them. Understand them. Then take action. Verified on-road prices, specifications, and comparisons across cars sold in India.',
  metadataBase: new URL('https://kerb.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'KERB — Automotive Research & Comparison Platform',
    description: 'Research cars. Compare them. Understand them. Then take action.',
    url: 'https://kerb.com',
    siteName: 'KERB',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'KERB - Modern Automotive Research Platform',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('kerb-theme');
                  var theme = saved || 'dark';
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })()
            `,
          }}
        />
      </head>
      <body>
        <a href="#main-content" className="kerb-skip-link skip-to-content">
          Skip to main content
        </a>
        <ThemeProvider>
          <WishlistProvider>
            <div id="main-content">
              {children}
            </div>
            <MobileBottomNav />
            <CookieConsent />
          </WishlistProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
