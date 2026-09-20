'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Car } from '../types';
import { useWishlist } from '../hooks/useWishlist';
import { Container, Section, Grid, Card, Button, CarImage } from './ui';
import { springHeart } from '../lib/motion/tokens';

export interface NewLaunchesProps {
  cars?: Car[];
}

const NewLaunches: React.FC<NewLaunchesProps> = ({ cars = [] }) => {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [subscribedIds, setSubscribedIds] = useState<string[]>([]);

  const handleNotifyToggle = (carId: string) => {
    setSubscribedIds((prev) => {
      if (prev.includes(carId)) {
        return prev.filter((id) => id !== carId);
      } else {
        return [...prev, carId];
      }
    });
  };

  return (
    <Section as="section" aria-labelledby="new-launches-title">
      <Container className="stack stack-lg">
        <div className="stack stack-xs">
          <span className="text-label">Market Freshness</span>
          <h2 id="new-launches-title" className="text-section-title">New &amp; Upcoming Launches</h2>
        </div>
        
        <Grid variant="cards">
          {cars.map((car) => {
            const saved = isWishlisted(car.id);
            const isSubscribed = subscribedIds.includes(car.id);
            return (
              <Card key={car.id} as="article" aria-labelledby={`launch-car-${car.id}`} className="stack stack-md">
                {/* Image Wrapper */}
                <div style={{ position: 'relative' }}>
                  <CarImage src={car.imagePlaceholder} alt={`Studio shot of ${car.fullName}`} />
                  
                  {/* Wishlist Heart Toggle */}
                  <Button
                    variant="ghost"
                    onClick={() => toggleWishlist(car.id)}
                    aria-label={`${saved ? 'Remove from' : 'Add to'} wishlist: ${car.fullName}`}
                    aria-pressed={saved}
                    style={{
                      position: 'absolute',
                      top: 'var(--spacing-12)',
                      right: 'var(--spacing-12)',
                      padding: 'var(--spacing-8)',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'var(--surface)',
                      border: 'var(--elevation-flat)',
                      zIndex: 10,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <motion.span
                      key={saved ? 'saved' : 'unsaved'}
                      initial={{ scale: 1 }}
                      animate={{ scale: saved ? [1, 1.25, 1] : 1 }}
                      transition={springHeart}
                      style={{ display: 'inline-block' }}
                    >
                      {saved ? '❤️' : '🤍'}
                    </motion.span>
                  </Button>
                  
                  {/* Launch Status Badge */}
                  <span 
                    role="status" 
                    aria-label="Launch Status"
                    style={{
                      position: 'absolute',
                      top: 'var(--spacing-12)',
                      left: 'var(--spacing-12)',
                      backgroundColor: 'var(--accent)',
                      color: '#FFFFFF',
                      padding: 'var(--spacing-4) var(--spacing-8)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: 'var(--fs-label)',
                      fontWeight: 'var(--fw-semibold)',
                      textTransform: 'uppercase',
                      zIndex: 10
                    }}
                  >
                    New Launch
                  </span>
                </div>

                <div className="stack stack-sm" style={{ flex: 1 }}>
                  <h3 id={`launch-car-${car.id}`} className="text-card-title">{car.fullName}</h3>
                  <p className="text-body-large numeric" style={{ fontWeight: 'var(--fw-semibold)', color: 'var(--accent)', marginTop: 'var(--spacing-8)' }}>
                    {car.priceRange}
                  </p>
                  <p className="text-caption">
                    Ex-showroom pricing updates daily
                  </p>
                </div>

                <div className="split" style={{ gap: 'var(--spacing-8)', marginTop: 'var(--spacing-16)' }}>
                  <Button
                    variant={isSubscribed ? 'secondary' : 'ghost'}
                    onClick={() => handleNotifyToggle(car.id)}
                    aria-label={isSubscribed ? `Cancel subscription alerts for ${car.fullName}` : `Subscribe to alerts for ${car.fullName}`}
                    aria-pressed={isSubscribed}
                    style={{ flex: 1 }}
                  >
                    {isSubscribed ? 'Subscribed' : 'Notify Me'}
                  </Button>
                  
                  <a href={`/cars/${car.brand.toLowerCase()}/${car.slug}`} role="button" aria-label={`View detail specifications for ${car.fullName}`} style={{ flex: 1, textDecoration: 'none' }}>
                    <Button variant="secondary" style={{ width: '100%' }}>
                      Details
                    </Button>
                  </a>
                </div>
              </Card>
            );
          })}
        </Grid>
      </Container>
    </Section>
  );
};

export default NewLaunches;
