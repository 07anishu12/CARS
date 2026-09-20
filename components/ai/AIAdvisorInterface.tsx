'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { consultAdvisor, AIAdviceResult } from '../../lib/ai/advisor-engine';

export const AIAdvisorInterface: React.FC = () => {
  const [query, setQuery] = useState<string>('best automatic car under 12 lakh');
  const [result, setResult] = useState<AIAdviceResult | null>(() => consultAdvisor('best automatic car under 12 lakh'));
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const sampleQueries = [
    'best automatic car under 12 lakh',
    'electric SUV under 20 lakh',
    '7 seater under 15 lakh',
    'best mileage car for city driving',
    'safest family SUV with sunroof'
  ];

  const handleSearch = (q: string) => {
    setIsSearching(true);
    setQuery(q);
    setTimeout(() => {
      setResult(consultAdvisor(q));
      setIsSearching(false);
    }, 200);
  };

  const formatPriceLakh = (price: number) => `₹${(price / 100000).toFixed(2)} Lakh`;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '24px 16px 80px', width: '100%', color: '#F3F4F6' }}>
      <style jsx>{`
        .search-box {
          background-color: #10161A;
          border: 1px solid rgba(34, 197, 94, 0.3);
          border-radius: 20px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-top: 24px;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
        }

        .input-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .advisor-input {
          flex: 1;
          min-width: 260px;
          background-color: #171C21;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 12px;
          padding: 14px 18px;
          color: #FFFFFF;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.15s;
        }
        .advisor-input:focus {
          border-color: #22C55E;
        }

        .ask-btn {
          background-color: #22C55E;
          color: #0B0F12;
          font-weight: 700;
          font-size: 1rem;
          padding: 14px 24px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          transition: background-color 0.15s;
        }
        .ask-btn:hover {
          background-color: #16A34A;
        }

        .pills-row {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          align-items: center;
        }

        .query-pill {
          background-color: rgba(255, 255, 255, 0.05);
          color: #D1D5DB;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 6px 12px;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.15s;
        }
        .query-pill:hover {
          border-color: #22C55E;
          color: #FFFFFF;
        }

        .results-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin-top: 36px;
        }

        .rec-card {
          background-color: #10161A;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 24px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media (min-width: 768px) {
          .rec-card {
            grid-template-columns: 240px 1fr;
          }
        }
      `}</style>

      {/* Header */}
      <div>
        <nav aria-label="Breadcrumb" style={{ display: 'flex', gap: '8px', fontSize: '0.85rem', color: '#9CA3AF', marginBottom: '16px' }}>
          <Link href="/" style={{ color: '#9CA3AF', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <span style={{ color: '#F3F4F6', fontWeight: 600 }}>KERB AI Advisor</span>
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '2rem' }}>⚡</span>
          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 800, margin: 0, color: '#FFFFFF' }}>
            KERB AI Automotive Advisor
          </h1>
        </div>
        <p style={{ color: '#9CA3AF', fontSize: '1rem', margin: '8px 0 0 0', maxWidth: '800px', lineHeight: 1.5 }}>
          Ask natural questions about budgets, family requirements, and transmission choices. Backed strictly by verified Indian automotive database specs with zero hallucinations.
        </p>
      </div>

      {/* Natural Query Search Box */}
      <div className="search-box">
        <div className="input-row">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
            placeholder="e.g. best automatic car under 12 lakh, electric SUV under 20 lakh..."
            className="advisor-input"
            aria-label="Natural language car query"
          />
          <button
            onClick={() => handleSearch(query)}
            disabled={isSearching}
            className="ask-btn"
          >
            {isSearching ? 'Analyzing...' : 'Ask KERB AI ➔'}
          </button>
        </div>

        <div className="pills-row">
          <span style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>Try asking:</span>
          {sampleQueries.map((sq, i) => (
            <button
              key={i}
              onClick={() => handleSearch(sq)}
              className="query-pill"
            >
              {sq}
            </button>
          ))}
        </div>
      </div>

      {/* AI Results Output */}
      {result && (
        <div className="results-container">
          <div style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.25)', borderRadius: '12px', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ fontSize: '0.9rem', color: '#D1D5DB' }}>
              💡 {result.summaryNote}
            </span>
            <span style={{ fontSize: '0.78rem', color: '#22C55E', fontWeight: 600 }}>
              Grounded in Relational Indian OEM Data
            </span>
          </div>

          {result.recommendations.map((rec) => (
            <article key={rec.model.id} className="rec-card">
              <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 10', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#070A0C' }}>
                <Image
                  src={rec.model.heroImage}
                  alt={`${rec.make.name} ${rec.model.name}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 240px"
                  style={{ objectFit: 'cover' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF' }}>
                      {rec.make.name} {rec.model.name}
                    </h2>
                    <span style={{ fontSize: '0.85rem', color: '#9CA3AF' }}>
                      {rec.model.bodyType} &bull; {rec.model.fuelTypes.join('/')} &bull; {rec.model.seatingCapacities.join(',')} Seater
                    </span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ backgroundColor: 'rgba(34, 197, 94, 0.15)', color: '#22C55E', padding: '4px 8px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700 }}>
                      Match Score: {rec.matchScore}%
                    </span>
                  </div>
                </div>

                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#22C55E' }}>
                  {formatPriceLakh(rec.model.priceRangeMin)} - {formatPriceLakh(rec.model.priceRangeMax)}
                </div>

                <p style={{ margin: 0, fontSize: '0.9rem', color: '#E5E7EB', lineHeight: 1.5 }}>
                  {rec.explanation}
                </p>

                {/* Grounded Key Reasons */}
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem', color: '#9CA3AF' }}>
                  {rec.keyReasons.map((reason, idx) => (
                    <li key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span style={{ color: '#22C55E' }}>✓</span> {reason}
                    </li>
                  ))}
                </ul>

                {rec.highlightedVariant && (
                  <div style={{ backgroundColor: '#171C21', padding: '10px 14px', borderRadius: '8px', fontSize: '0.82rem', color: '#D1D5DB' }}>
                    <strong style={{ color: '#22C55E' }}>Recommended Trim:</strong> {rec.highlightedVariant.name} ({formatPriceLakh(rec.highlightedVariant.exShowroomPrice)})
                  </div>
                )}

                <div style={{ display: 'flex', gap: '10px', marginTop: 'auto', paddingTop: '8px' }}>
                  <Link
                    href={`/cars/${rec.make.slug}/${rec.model.slug}`}
                    style={{
                      flex: 1,
                      backgroundColor: '#22C55E',
                      color: '#0B0F12',
                      padding: '10px',
                      borderRadius: '8px',
                      textAlign: 'center',
                      fontWeight: 700,
                      fontSize: '0.88rem',
                      textDecoration: 'none'
                    }}
                  >
                    View Showroom &amp; Local On-Road Price
                  </Link>
                  <Link
                    href={`/compare?cars=${rec.model.slug}`}
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      color: '#F3F4F6',
                      padding: '10px 16px',
                      borderRadius: '8px',
                      fontWeight: 600,
                      fontSize: '0.88rem',
                      textDecoration: 'none'
                    }}
                  >
                    Compare
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Transparency Guarantee */}
      <footer style={{ marginTop: '56px', backgroundColor: '#10161A', borderRadius: '16px', padding: '24px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '1rem', fontWeight: 700, color: '#FFFFFF' }}>
          🛡️ The KERB Data Integrity Promise
        </h3>
        <p style={{ margin: 0, fontSize: '0.85rem', color: '#9CA3AF', lineHeight: 1.5 }}>
          KERB AI does not guess or hallucinate vehicle data. All pricing, NCAP crash test scores, engine displacement figures, and real-world mileage benchmarks are retrieved directly from verified manufacturer gazettes and road test archives.
        </p>
      </footer>
    </div>
  );
};

export default AIAdvisorInterface;
