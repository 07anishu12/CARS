'use client';

import React, { useState } from 'react';

export interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: 'How does KERB calculate the on-road price across different Indian cities?',
      answer: 'KERB applies real state-specific RTO taxation slabs (ranging from 8.5% in Delhi to 14% in Karnataka), mandatory third-party + 1-year comprehensive insurance rates based on engine displacement/kW, and statutory municipal fees. We exclude mandatory dealer handling markups and optional accessories to present the true baseline purchase cost.'
    },
    {
      question: 'What is the financial payback period of a Strong Hybrid vs a Standard Petrol car?',
      answer: 'At an average city fuel efficiency of 25+ km/l compared to 12 km/l for standard petrol vehicles, a driver covering 1,200 to 1,500 km monthly recovers the ₹1.8 - 2.2 Lakh hybrid premium in approximately 3.5 to 4 years through reduced fuel expenses alone.'
    },
    {
      question: 'Which automatic gearbox is most durable for dense stop-and-go Indian traffic?',
      answer: 'Torque Converter (AT) and Continuously Variable (CVT/IVT) transmissions offer the highest thermal resilience and silky smoothness in crawling traffic. Dual-Clutch transmissions (DCT/DCA) provide lightning-fast highway overtakes and paddle shifts, while AMTs offer lowest maintenance cost.'
    },
    {
      question: 'What is the difference between Bharat NCAP and Global NCAP safety ratings?',
      answer: 'Bharat NCAP is India’s sovereign crash safety testing protocol (AIS-197), aligned with updated Global NCAP standards. It evaluates adult occupant protection (frontal offset at 64 km/h, side barrier at 50 km/h, side pole), child occupant protection, and mandates electronic stability control (ESC) and side curtain airbags for 5-star ratings.'
    },
    {
      question: 'Are electric vehicles (EVs) practical for intercity expressway road trips in 2026?',
      answer: 'Yes. With modern EVs offering 330 to 450 km of tested real-world highway range, and 50 kW to 120 kW CCS2 DC fast chargers installed at 45 km intervals along major Indian expressways, a 20-to-30 minute charging break coincides naturally with a standard highway coffee or meal rest.'
    },
    {
      question: 'Can I compare cars across different segments and fuel types on KERB?',
      answer: 'Absolutely. The KERB comparison desk allows you to line up any models—such as a Turbo Petrol SUV against a Strong Hybrid or pure EV—comparing real dimensions, ground clearance, power, torque, warranty, and tested ownership running costs.'
    }
  ];

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="section-graphite" aria-labelledby="faq-section-title">
      <div className="home-section-shell">
        <div className="section-header-block">
          <span className="section-eyebrow">16 / Frequent Inquiries</span>
          <h2 id="faq-section-title" className="section-title">
            Frequently asked car buying questions.
          </h2>
          <p className="section-subtitle">
            Clear, authoritative answers to taxation, safety standards, and transmission choices.
          </p>
        </div>

        <div style={{ maxWidth: '840px', marginInline: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                style={{
                  background: 'var(--obsidian-850)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '14px',
                  overflow: 'hidden'
                }}
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  id={`faq-question-${idx}`}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--ivory-50)',
                    fontSize: '16px',
                    fontWeight: 650,
                    textAlign: 'left',
                    cursor: 'pointer',
                    gap: '16px'
                  }}
                >
                  <span>{faq.question}</span>
                  <span
                    style={{
                      color: 'var(--champagne)',
                      fontSize: '20px',
                      transform: isOpen ? 'rotate(45deg)' : 'none',
                      transition: 'transform 200ms ease',
                      flexShrink: 0
                    }}
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${idx}`}
                    role="region"
                    aria-labelledby={`faq-question-${idx}`}
                    style={{
                      padding: '0 24px 20px',
                      fontSize: '14px',
                      color: 'rgba(245, 241, 232, 0.8)',
                      lineHeight: '1.65'
                    }}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
