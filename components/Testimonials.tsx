'use client';

import React from 'react';
import { Container, Section } from './ui';

export interface TestimonialItem {
  name: string;
  avatarLetter: string;
  avatarBg: string;
  rating: number;
  date: string;
  text: string;
}

export interface TestimonialsProps {
  testimonials?: TestimonialItem[];
  overallRating?: number;
  totalReviews?: string;
}

const Testimonials: React.FC<TestimonialsProps> = ({
  testimonials = [
    {
      name: 'Aditya Sharma',
      avatarLetter: 'A',
      avatarBg: 'linear-gradient(135deg, #10B981, #059669)',
      rating: 5,
      date: 'June 12, 2026',
      text: 'Kerb helped me find the perfect Harrier. The comparison tool and direct dealership pricing saved me over 45k on on-road price. Best of all, zero spam calls!'
    },
    {
      name: 'Kriti Verma',
      avatarLetter: 'K',
      avatarBg: 'linear-gradient(135deg, #3B82F6, #2563EB)',
      rating: 5,
      date: 'May 28, 2026',
      text: 'Unbiased reviews that actually map to safety and resale value. The AI advisor suggested a Nexon EV based on my daily commute, and the calculations were spot on.'
    },
    {
      name: 'Rahul Mehta',
      avatarLetter: 'R',
      avatarBg: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
      rating: 5,
      date: 'April 15, 2026',
      text: 'Calculating EMI and locking down quotes was incredibly straightforward. No hidden brokerage charges, just plain amortized calculations. Strongly recommended!'
    },
    {
      name: 'Siddharth Sen',
      avatarLetter: 'S',
      avatarBg: 'linear-gradient(135deg, #EC4899, #DB2777)',
      rating: 5,
      date: 'March 22, 2026',
      text: 'Quiet, clean, and no advertising clutter. Found the exact automatic Safari model I was looking for. The booking to test-drive pipeline was completely seamless.'
    }
  ],
  overallRating = 4.8,
  totalReviews = '12,450+'
}) => {
  const testimonialsData = [
    {
      name: 'Amit Sharma',
      avatarLetter: 'A',
      avatarBg: 'linear-gradient(135deg, #10B981, #059669)',
      rating: 5,
      date: '2 days ago',
      text: 'Great platform! Helped me compare cars and save money.'
    },
    {
      name: 'Neha Verma',
      avatarLetter: 'N',
      avatarBg: 'linear-gradient(135deg, #3B82F6, #2563EB)',
      rating: 5,
      date: '1 week ago',
      text: 'Very useful EMI calculator and AI recommendations.'
    },
    {
      name: 'Rohan Mehta',
      avatarLetter: 'R',
      avatarBg: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
      rating: 5,
      date: '2 weeks ago',
      text: 'Unbiased reviews and best price insights. Highly recommended!'
    },
    {
      name: 'Priya Singh',
      avatarLetter: 'P',
      avatarBg: 'linear-gradient(135deg, #EC4899, #DB2777)',
      rating: 5,
      date: '3 weeks ago',
      text: 'Smooth experience from research to purchase.'
    }
  ];

  return (
    <Section as="section" aria-labelledby="testimonials-section-title" style={{ backgroundColor: '#F9FAFB', paddingBlock: '48px', borderBottom: '1px solid #E5E7EB' }}>
      <style jsx>{`
        .testimonials-container {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-32);
          width: 100%;
        }

        .testimonials-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .testimonials-layout-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          align-items: stretch;
          width: 100%;
        }

        .rating-summary-card {
          background-color: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);
        }

        .rating-big {
          font-size: 3rem;
          font-weight: 800;
          color: #111827;
          line-height: 1;
        }

        .overall-stars {
          color: #FBBF24;
          font-size: 1.5rem;
          margin-block: 8px;
        }

        .overall-count {
          font-size: 0.85rem;
          color: #6B7280;
          font-weight: 500;
        }

        .cards-subgrid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }

        .testimonial-card {
          background-color: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);
          transition: transform var(--motion-base) var(--motion-ease);
        }

        .testimonial-card:hover {
          transform: translateY(-2px);
        }

        .avatar-circle {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: #FFFFFF;
          font-size: 0.85rem;
        }

        .stars-row {
          color: #10B981;
          font-size: 0.9rem;
          display: flex;
          gap: 2px;
        }

        @media (min-width: 640px) {
          .cards-subgrid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .testimonials-layout-grid {
            grid-template-columns: 0.75fr 3.25fr;
            gap: 24px;
          }

          .cards-subgrid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      `}</style>

      <Container>
        <div className="testimonials-container">
          
          {/* Header Row */}
          <div className="testimonials-header">
            <h2 id="testimonials-section-title" style={{ fontSize: '1.75rem', fontWeight: 700, color: '#111827', margin: 0 }}>
              Loved by 12L+ car buyers across India
            </h2>
            <a 
              href="/reviews" 
              style={{ 
                color: '#9CA3AF', 
                textDecoration: 'none', 
                fontSize: '0.9rem', 
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              View all reviews ➔
            </a>
          </div>

          {/* Layout Grid (Rating Column + Testimonials Row) */}
          <div className="testimonials-layout-grid">
            
            {/* Left Rating Column */}
            <div className="rating-summary-card">
              <span className="rating-big">4.7<span style={{ fontSize: '1.5rem', color: '#6B7280' }}>/5</span></span>
              <div className="overall-stars">
                ★★★★★
              </div>
              <span className="overall-count">
                From 12,345 reviews
              </span>
            </div>

            {/* Right Testimonials Subgrid */}
            <div className="cards-subgrid">
              {testimonialsData.map((t, idx) => (
                <div key={`testi-${idx}`} className="testimonial-card" role="comment">
                  
                  {/* Avatar & User Details */}
                  <div className="cluster cluster-sm" style={{ alignItems: 'center', gap: '10px' }}>
                    <div 
                      className="avatar-circle" 
                      style={{ background: t.avatarBg }}
                      aria-hidden="true"
                    >
                      {t.avatarLetter}
                    </div>
                    <div className="stack stack-xs">
                      <strong style={{ fontSize: '0.9rem', color: '#111827', margin: 0 }}>{t.name}</strong>
                      <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>{t.date}</span>
                    </div>
                  </div>

                  {/* Comment Text */}
                  <p 
                    style={{ 
                      color: '#4B5563', 
                      fontSize: '0.85rem', 
                      lineHeight: 1.4, 
                      margin: 0 
                    }}
                  >
                    &quot;{t.text}&quot;
                  </p>

                  {/* Rating Stars */}
                  <div className="stars-row" aria-label={`${t.rating} stars`} style={{ marginTop: 'auto' }}>
                    {'★'.repeat(t.rating)}
                  </div>

                </div>
              ))}
            </div>

          </div>

        </div>
      </Container>
    </Section>
  );
};

export default Testimonials;
