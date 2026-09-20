'use client';

import React from 'react';
import { Container, Section } from './ui';

export interface FeatureItem {
  icon: string;
  title: string;
  subtitle: string;
}

export interface AIEntryProps {
  features?: FeatureItem[];
}

const AIEntry: React.FC<AIEntryProps> = ({
  features = [
    {
      icon: '🏷️',
      title: 'Best Price Promise',
      subtitle: 'Guaranteed match on dealership prices.'
    },
    {
      icon: '📋',
      title: 'Unbiased Reviews',
      subtitle: '100% independent expert evaluations.'
    },
    {
      icon: '🔄',
      title: 'Compare Anything',
      subtitle: 'Side-by-side specs, safety, and price maps.'
    },
    {
      icon: '✨',
      title: 'AI Advisor',
      subtitle: 'AI consultation tailored to your driving needs.'
    },
    {
      icon: '🛡️',
      title: 'Hassle-free Process',
      subtitle: 'Seamless booking to test-drive pipeline.'
    }
  ]
}) => {
  const icons = [
    // Best Price Promise
    <svg key="best-price" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 11 11 13 15 9" />
    </svg>,
    // Unbiased Reviews
    <svg key="unbiased" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <path d="M8 10h.01M12 10h.01M16 10h.01" strokeWidth="2.5" />
    </svg>,
    // Compare Anything
    <svg key="compare" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="5" y1="7" x2="19" y2="7" />
      <path d="M5 7l-2 5h4l-2-5" />
      <path d="M19 7l-2 5h4l-2-5" />
      <path d="M4 22h16" />
    </svg>,
    // AI Advisor
    <svg key="advisor" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" />
    </svg>,
    // Hassle-free Process
    <svg key="process" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
      <polyline points="9 14 11 16 15 12" />
    </svg>
  ];

  return (
    <Section as="section" aria-labelledby="features-section-title" style={{ backgroundColor: '#F9FAFB', paddingBlock: '32px', borderBottom: '1px solid #E5E7EB' }}>
      <style jsx>{`
        .features-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--spacing-16);
          width: 100%;
        }

        .feature-card {
          background-color: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
          padding: 20px 16px;
          display: flex;
          align-items: flex-start;
          gap: 16px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);
          transition: transform var(--motion-base) var(--motion-ease), box-shadow var(--motion-base) var(--motion-ease);
        }

        .feature-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.05);
        }

        .feature-icon-wrapper {
          width: 44px;
          height: 44px;
          border-radius: 8px;
          background-color: rgba(16, 185, 129, 0.08);
          color: #10B981;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        @media (min-width: 768px) {
          .features-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .features-grid {
            grid-template-columns: repeat(5, 1fr);
            gap: 20px;
          }
        }
      `}</style>

      <Container>
        <h2 id="features-section-title" className="sr-only" style={{ display: 'none' }}>
          Kerb Platform Key Features
        </h2>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={`feat-${index}`} className="feature-card" role="article" aria-labelledby={`feat-title-${index}`}>
              <div className="feature-icon-wrapper" aria-hidden="true">
                {icons[index]}
              </div>
              <div className="stack stack-xs" style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <h3 id={`feat-title-${index}`} style={{ fontSize: '0.95rem', margin: 0, fontWeight: 700, color: '#111827' }}>
                    {feature.title}
                  </h3>
                  {feature.title === 'AI Advisor' && (
                    <span style={{ backgroundColor: '#10B981', color: '#FFFFFF', fontSize: '0.6rem', padding: '1px 4px', borderRadius: '3px', fontWeight: 'bold' }}>New</span>
                  )}
                </div>
                <p style={{ color: '#4B5563', margin: 0, fontSize: '0.8rem', lineHeight: 1.4 }}>
                  {feature.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default AIEntry;
