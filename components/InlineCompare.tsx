'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Car } from '../types';
import { useCompare } from '../hooks/useCompare';
import { Container, Section, Button, Input } from './ui';
import { transitionBase } from '../lib/motion/tokens';

export interface InlineCompareProps {
  cars?: Car[];
}

const InlineCompare: React.FC<InlineCompareProps> = ({ cars = [] }) => {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const {
    carASlug,
    carBSlug,
    carA,
    carB,
    setCarA,
    setCarB,
    canCompare,
    resetCompare
  } = useCompare(cars);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (canCompare && carA && carB) {
      router.push(`/compare?carA=${encodeURIComponent(carA.slug)}&carB=${encodeURIComponent(carB.slug)}`);
    }
  };

  return (
    <Section as="section" aria-labelledby="inline-compare-title">
      <Container className="stack stack-lg" style={{ maxWidth: '960px' }}>
        <div className="stack stack-xs">
          <span className="text-label">Instant Side-by-Side</span>
          <h2 id="inline-compare-title" className="text-section-title">Compare Two Cars Instantly</h2>
          <p className="text-body-large" style={{ color: 'var(--muted)' }}>
            Select any two vehicles to compare their prices, specs, and safety ratings side-by-side.
          </p>
        </div>

        <form 
          onSubmit={handleSubmit} 
          aria-label="Quick Compare Cars Form"
          className="stack stack-lg card-ui"
          role="region"
        >
          <div className="split" style={{ gap: 'var(--spacing-24)' }}>
            <div className="stack stack-xs" style={{ flex: 1 }}>
              <label htmlFor="compare-vehicle-a" className="text-label">Select Vehicle A</label>
              <Input
                as="select"
                id="compare-vehicle-a"
                name="carA"
                value={carASlug}
                onChange={(e) => setCarA(e.target.value)}
                required
                aria-required="true"
                options={[
                  { label: '-- Choose Car A --', value: '' },
                  ...cars.map(car => ({ label: car.fullName, value: car.slug }))
                ]}
              />
            </div>

            <div className="stack stack-xs" style={{ flex: 1 }}>
              <label htmlFor="compare-vehicle-b" className="text-label">Select Vehicle B</label>
              <Input
                as="select"
                id="compare-vehicle-b"
                name="carB"
                value={carBSlug}
                onChange={(e) => setCarB(e.target.value)}
                required
                aria-required="true"
                options={[
                  { label: '-- Choose Car B --', value: '' },
                  ...cars.map(car => ({ label: car.fullName, value: car.slug }))
                ]}
              />
            </div>
          </div>

          {/* Selected Vehicles Quick Comparison Specs Display / Bottom Sheet */}
          <AnimatePresence>
            {canCompare && carA && carB && (
              <motion.div 
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
                transition={transitionBase}
                className="split mobile-bottom-sheet" 
                style={{ 
                  gap: 'var(--spacing-24)', 
                  borderTop: 'var(--elevation-flat)', 
                  paddingTop: 'var(--spacing-24)', 
                  marginTop: 'var(--spacing-8)' 
                }}
              >
                <div style={{ flex: 1 }}>
                  <div className="stack stack-xs">
                    <span className="text-label" style={{ color: 'var(--accent)' }}>Vehicle A</span>
                    <strong>{carA.fullName}</strong>
                    <span className="numeric">{carA.priceRange}</span>
                    <span className="numeric" style={{ fontSize: 'var(--fs-caption)', color: 'var(--muted)' }}>
                      Rating: {carA.rating} / 5
                    </span>
                  </div>
                </div>
                
                <div style={{ flex: 1 }}>
                  <div className="stack stack-xs">
                    <span className="text-label" style={{ color: 'var(--accent)' }}>Vehicle B</span>
                    <strong>{carB.fullName}</strong>
                    <span className="numeric">{carB.priceRange}</span>
                    <span className="numeric" style={{ fontSize: 'var(--fs-caption)', color: 'var(--muted)' }}>
                      Rating: {carB.rating} / 5
                    </span>
                  </div>
                </div>

                {/* Dismiss Actions for Mobile Viewports */}
                <div className="stack stack-xs" style={{ minWidth: '120px', gap: 'var(--spacing-8)' }}>
                  <Button 
                    type="submit" 
                    variant="primary"
                    aria-label="Confirm Compare"
                    style={{ width: '100%' }}
                  >
                    Go
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={resetCompare}
                    aria-label="Dismiss Comparison Selection"
                    style={{ width: '100%' }}
                  >
                    Clear
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="desktop-only">
            <Button 
              type="submit" 
              variant="primary" 
              disabled={!canCompare} 
              aria-label="Compare Selected Vehicles"
            >
              Compare Cars
            </Button>
          </div>
        </form>
      </Container>
    </Section>
  );
};

export default InlineCompare;
