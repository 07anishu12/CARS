'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FAQItem } from '../types';
import { Container, Section } from './ui';
import { transitionBase } from '../lib/motion/tokens';

export interface FAQBlockProps {
  faqs?: FAQItem[];
}

const FAQBlock: React.FC<FAQBlockProps> = ({ faqs = [] }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleToggle = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const nextIndex = (index + 1) % faqs.length;
      buttonRefs.current[nextIndex]?.focus();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      const prevIndex = (index - 1 + faqs.length) % faqs.length;
      buttonRefs.current[prevIndex]?.focus();
    }
  };

  return (
    <Section as="section" aria-labelledby="faq-title" style={{ backgroundColor: 'var(--surface)', borderBlock: 'var(--elevation-flat)' }}>
      <Container className="stack stack-lg" style={{ maxWidth: '800px' }}>
        <div className="stack stack-xs">
          <span className="text-label">Customer Support</span>
          <h2 id="faq-title" className="text-section-title">Frequently Asked Questions</h2>
          <p className="text-body-large" style={{ color: 'var(--muted)' }}>
            Quick answers to common questions about purchasing, financing, and researching cars.
          </p>
        </div>

        <div className="stack" style={{ marginTop: 'var(--spacing-16)' }}>
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div 
                key={`faq-${index}`} 
                style={{ 
                  borderBottom: '1px solid var(--border)', 
                  paddingBlock: 'var(--spacing-16)' 
                }}
              >
                <button 
                  ref={(el) => { buttonRefs.current[index] = el; }}
                  onClick={() => handleToggle(index)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-summary-${index}`}
                  className="cluster cluster-sm" 
                  style={{ 
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    textAlign: 'left',
                    justifyContent: 'space-between', 
                    cursor: 'pointer', 
                    outline: 'none',
                    color: 'inherit'
                  }}
                >
                  <h3 className="text-card-title" style={{ fontSize: '1.125rem', margin: 0 }}>{faq.question}</h3>
                  <span role="img" aria-hidden="true" style={{ color: 'var(--muted)' }}>{isOpen ? '▴' : '▾'}</span>
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div 
                      id={`faq-answer-${index}`} 
                      role="region" 
                      aria-labelledby={`faq-summary-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ 
                        height: shouldReduceMotion ? 'auto' : 'auto', 
                        opacity: 1 
                      }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={transitionBase}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ marginTop: 'var(--spacing-12)' }}>
                        <p className="text-body" style={{ color: 'var(--muted)', margin: 0 }}>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
};

export default FAQBlock;
