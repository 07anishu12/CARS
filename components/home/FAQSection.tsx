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
        {/* Header */}
        <div className="kerb-section-header-row">
          <h2 id="faq-title" className="kerb-section-title">
            Frequently asked questions
          </h2>
          <Link href="/guides" className="kerb-view-all-link">
            <span>View all</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Accordions */}
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
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
          padding-bottom: 32px;
        }

        .faq-accordion-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .faq-glass-item {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.10);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
          transition: border-color 150ms ease, box-shadow 150ms ease;
        }

        .faq-glass-item:hover,
        .faq-glass-item.is-open {
          border-color: rgba(0, 232, 135, 0.3);
          box-shadow: 0 6px 20px -4px rgba(0, 0, 0, 0.4);
        }

        .faq-toggle-btn {
          width: 100%;
          padding: 16px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          background: transparent;
          border: none;
          color: #FFFFFF;
          font-size: 14px;
          font-weight: 600;
          text-align: left;
          cursor: pointer;
          font-family: inherit;
        }

        .faq-question-text {
          flex: 1;
        }

        .faq-chevron {
          color: rgba(255, 255, 255, 0.5);
          display: flex;
          align-items: center;
          transition: transform 200ms ease, color 200ms ease;
        }

        .faq-chevron.rotate {
          transform: rotate(180deg);
          color: var(--kerb-green-primary, #00E887);
        }

        .faq-answer-panel {
          padding: 0 18px 16px;
        }

        .faq-answer-text {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.55;
          margin: 0;
        }
      `}</style>
    </section>
  );
}
