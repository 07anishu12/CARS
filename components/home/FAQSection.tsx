'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: 'How does KERB calculate on-road price?',
      answer:
        'KERB applies state-specific RTO taxation slabs, mandatory third-party + 1-year comprehensive insurance formulas based on engine displacement/kW, and statutory municipal levies without dealer handling markups or mandatory accessories.'
    },
    {
      question: 'What affects car ownership cost?',
      answer:
        'Car ownership cost (TCO) comprises scheduled manufacturer maintenance intervals, real-world fuel economy (which differs from lab ARAI figures), insurance renewal depreciation, and state road taxation amortized across your planned ownership tenure.'
    },
    {
      question: 'Can I compare cars of different fuel types?',
      answer:
        'Yes. You can compare any petrol, diesel, strong hybrid, or pure electric car side by side to evaluate running costs per kilometre and payback periods.'
    },
    {
      question: 'Are electric vehicles practical for Indian cities?',
      answer:
        'Yes. With real-world ranges between 250–450 km for most modern EVs and rapid expansion of highway fast-chargers, EVs offer substantial running cost savings under ₹1.50/km in daily urban traffic.'
    },
    {
      question: 'How often is the data updated?',
      answer:
        'KERB updates ex-showroom pricing, city RTO changes, and manufacturer specification updates on a weekly basis directly from official manufacturer bulletins and state transport departments.'
    }
  ];

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="faq-section" aria-labelledby="faq-title">
      <div className="kerb-page-container">
        {/* Section Header with Eyebrow, Title, Description, and Link */}
        <div className="kerb-section-header">
          <span className="kerb-section-eyebrow">QUESTIONS &amp; ANSWERS</span>
          <div className="kerb-section-header-row">
            <div>
              <h2 id="faq-title" className="kerb-section-title">
                Frequently asked questions
              </h2>
              <p className="kerb-section-desc">
                Clear, transparent answers about on-road pricing, RTO taxes, and comparisons.
              </p>
            </div>
            <Link href="/guides" className="kerb-view-all-link">
              <span>View all</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>

        {/* Accordions (Min 56px per row) */}
        <div className="faq-accordion-list">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={faq.question} className={`faq-glass-item ${isOpen ? 'is-open' : ''}`}>
                <button
                  type="button"
                  onClick={() => toggleIndex(idx)}
                  aria-expanded={isOpen}
                  className="faq-toggle-btn"
                >
                  <span className="faq-question-text">{faq.question}</span>
                  <span className={`faq-chevron ${isOpen ? 'rotate' : ''}`} aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>

                {isOpen && (
                  <div className="faq-answer-panel">
                    <p className="faq-answer-text">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .faq-section {
          width: 100%;
          padding-top: 24px;
          padding-bottom: 36px;
        }

        .faq-accordion-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .faq-glass-item {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.1);
          transition: border-color 180ms ease, box-shadow 180ms ease;
        }

        .faq-glass-item:hover,
        .faq-glass-item.is-open {
          border-color: rgba(0, 232, 135, 0.35);
          box-shadow: 0 10px 28px -4px rgba(0, 0, 0, 0.45);
        }

        .faq-toggle-btn {
          width: 100%;
          min-height: 56px;
          padding: 18px 22px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          background: transparent;
          border: none;
          color: #FFFFFF;
          font-size: 15px;
          font-weight: 750;
          text-align: left;
          cursor: pointer;
          font-family: inherit;
          box-sizing: border-box;
        }

        .faq-question-text {
          flex: 1;
        }

        .faq-chevron {
          color: rgba(255, 255, 255, 0.55);
          display: flex;
          align-items: center;
          transition: transform 200ms ease, color 200ms ease;
          flex-shrink: 0;
        }

        .faq-chevron.rotate {
          transform: rotate(180deg);
          color: var(--kerb-green-primary, #00E887);
        }

        .faq-answer-panel {
          padding: 0 22px 20px;
        }

        .faq-answer-text {
          font-size: 13.5px;
          color: rgba(255, 255, 255, 0.75);
          line-height: 1.6;
          margin: 0;
        }
      `}</style>
    </section>
  );
}
