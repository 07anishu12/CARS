'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Car } from '../types';
import { useWishlist } from '../hooks/useWishlist';
import { Container, Section, Grid, Card, Button, CarImage } from './ui';
import { springHeart } from '../lib/motion/tokens';

export interface RecentlyViewedProps {
  cars?: Car[];
  onCarClick?: (carId: string) => void;
}

const RecentlyViewed: React.FC<RecentlyViewedProps> = ({ cars = [] }) => {
  const { toggleWishlist, isWishlisted } = useWishlist();

  if (cars.length === 0) {
    return null; // Don't show this section if there's no history
  }

  return (
    <Section as="section" aria-labelledby="recently-viewed-title">
      <Container className="stack stack-lg">
        <div className="stack stack-xs">
          <span className="text-label">Saved Session</span>
          <h2 id="recently-viewed-title" className="text-section-title">Continue Exploring: Recently Viewed</h2>
        </div>
        
        <Grid variant="cards">
          {cars.map((car) => {
            const saved = isWishlisted(car.id);
            return (
              <Card key={car.id} as="article" aria-labelledby={`recent-car-${car.id}`} className="stack stack-md">
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
                </div>

                <div className="stack stack-sm" style={{ flex: 1 }}>
                  <h3 id={`recent-car-${car.id}`} className="text-card-title">{car.fullName}</h3>
                  
                  <p className="text-caption">
                    <span>Rating: </span>
                    <strong className="numeric">{car.rating}</strong> / 5 ({car.reviewCount} reviews)
                  </p>

                  <p className="text-body-large numeric" style={{ fontWeight: 'var(--fw-semibold)', color: 'var(--accent)' }}>
                    {car.priceRange}
                  </p>
                </div>
                
                <div style={{ marginTop: 'var(--spacing-16)' }}>
                  <a href={`/cars/${car.brand.toLowerCase()}/${car.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                    <Button variant="ghost" style={{ width: '100%' }} aria-label={`View details for ${car.fullName}`}>
                      View Details
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

export default RecentlyViewed;
