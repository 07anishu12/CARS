'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Car } from '../types';
import { useCompare } from '../hooks/useCompare';
import { useEMICalculator } from '../hooks/useEMICalculator';
import { Container, Button, Input } from './ui';
import { transitionBase } from '../lib/motion/tokens';

export interface DashboardProps {
  cars?: Car[];
}

const Dashboard: React.FC<DashboardProps> = ({ cars = [] }) => {
  const router = useRouter();
  
  // 1. Compare State
  const {
    carASlug,
    carBSlug,
    carA,
    carB,
    setCarA,
    setCarB,
    canCompare
  } = useCompare(cars);

  const handleCompareSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canCompare && carA && carB) {
      router.push(`/compare?carA=${encodeURIComponent(carA.slug)}&carB=${encodeURIComponent(carB.slug)}`);
    }
  };

  // 2. EMI Amortization State
  const {
    price,
    setPrice,
    downPayment,
    setDownPayment,
    interestRate,
    setInterestRate,
    tenure,
    setTenure,
    results,
    isValid
  } = useEMICalculator(1200000, 8.75, 60);

  // Math helper for visual SVG dial representation
  const interestRatio = results.totalPayment > 0 
    ? (results.totalInterest / results.totalPayment) 
    : 0;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <section 
      aria-label="Dashboard Utilities" 
      style={{ 
        backgroundColor: '#F9FAFB', 
        paddingBlock: '64px',
        borderBottom: '1px solid #E5E7EB'
      }}
    >
      <style jsx>{`
        .dashboard-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          width: 100%;
        }

        @media (min-width: 1024px) {
          .dashboard-grid {
            grid-template-columns: 1.25fr 0.85fr 0.9fr;
            align-items: stretch;
          }
        }

        .dashboard-card {
          box-sizing: border-box;
          max-width: 100%;
          border-radius: 16px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);
          position: relative;
          overflow: hidden;
        }

        @media (min-width: 640px) {
          .dashboard-card {
            padding: 24px;
          }
        }

        .ai-card {
          background-color: #0B0F12;
          color: #FFFFFF;
          border: 1px solid rgba(255, 255, 255, 0.06);
        }

        .white-card {
          background-color: #FFFFFF;
          color: #1F2937;
          border: 1px solid #E5E7EB;
        }

        .ai-badge {
          background-color: rgba(255, 255, 255, 0.08);
          color: #FFFFFF;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 4px;
          width: fit-content;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .chat-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-top: 16px;
        }

        .chat-bubble {
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }

        .avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: #1F2937;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 0.8rem;
          flex-shrink: 0;
        }

        .avatar-ai {
          background-color: rgba(34, 197, 94, 0.15);
          color: #22C55E;
        }

        .bubble-text {
          background-color: #171C21;
          border-radius: 12px;
          padding: 12px 16px;
          font-size: 0.85rem;
          line-height: 1.4;
          max-width: 85%;
        }

        .ai-bubble-content {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
        }

        .car-thumbnail-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          margin-top: 4px;
          width: 100%;
        }

        .car-thumb-card {
          background-color: #0B0F12;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          padding: 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          text-align: center;
        }

        .thumb-img {
          width: 100%;
          aspect-ratio: 16 / 9;
          object-fit: cover;
          border-radius: 4px;
        }

        .thumb-name {
          font-size: 0.7rem;
          color: #D1D5DB;
          font-weight: 600;
        }

        .typing-dots {
          display: inline-flex;
          gap: 4px;
          align-items: center;
        }

        .dot {
          width: 6px;
          height: 6px;
          background-color: #22C55E;
          border-radius: 50%;
          animation: blink 1.4s infinite both;
        }

        .dot:nth-child(2) { animation-delay: .2s; }
        .dot:nth-child(3) { animation-delay: .4s; }

        @keyframes blink {
          0% { opacity: .2; }
          20% { opacity: 1; }
          100% { opacity: .2; }
        }

        .compare-icon {
          position: absolute;
          top: 24px;
          right: 24px;
          color: #10B981;
          background-color: rgba(16, 185, 129, 0.08);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .emi-slider-thumb::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #10B981;
          cursor: pointer;
          border: 2px solid #FFFFFF;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .emi-slider {
          -webkit-appearance: none;
          width: 100%;
          height: 6px;
          border-radius: 3px;
          background: #E5E7EB;
          outline: none;
        }
      `}</style>

      <Container>
        <div className="dashboard-grid">
          
          {/* Column 1: AI Advisor (Dark Card) */}
          <div className="dashboard-card ai-card">
            <div className="ai-badge">AI Advisor</div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBlock: '12px 6px', lineHeight: 1.2 }}>
              Still confused?
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#9CA3AF', margin: 0 }}>
              Let Kerb AI help you find your perfect car.
            </p>

            {/* Chat Simulator */}
            <div className="chat-container">
              {/* User message */}
              <div className="chat-bubble">
                <div className="avatar">U</div>
                <div className="bubble-text" style={{ backgroundColor: '#171C21', color: '#F9FAFB' }}>
                  I need a 7 seater SUV under 20 lakh with good mileage
                </div>
              </div>

              {/* AI message */}
              <div className="chat-bubble">
                <div className="avatar avatar-ai">AI</div>
                <div className="ai-bubble-content">
                  <div className="bubble-text" style={{ backgroundColor: '#171C21', color: '#F9FAFB', width: '100%', maxWidth: '100%' }}>
                    Here are the best options for you:
                    
                    {/* Car Thumbnails Grid */}
                    <div className="car-thumbnail-grid">
                      <div className="car-thumb-card">
                        <Image src="/creta.jpg" alt="Alcazar" width={60} height={40} style={{ objectFit: 'cover', borderRadius: '4px' }} />
                        <span className="thumb-name">Hyundai Alcazar</span>
                      </div>
                      <div className="car-thumb-card">
                        <Image src="/seltos.jpg" alt="Safari" width={60} height={40} style={{ objectFit: 'cover', borderRadius: '4px' }} />
                        <span className="thumb-name">Tata Safari</span>
                      </div>
                      <div className="car-thumb-card">
                        <Image src="/xuv700.jpg" alt="XUV700" width={60} height={40} style={{ objectFit: 'cover', borderRadius: '4px' }} />
                        <span className="thumb-name">Mahindra XUV700</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI is typing */}
              <div className="chat-bubble">
                <div className="avatar avatar-ai">AI</div>
                <div className="bubble-text" style={{ backgroundColor: '#171C21', color: '#9CA3AF', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>AI is typing...</span>
                  <span className="typing-dots">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </span>
                </div>
              </div>
            </div>

            {/* AI Advisor Button CTA */}
            <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
              <a href="/ai-advisor" style={{ textDecoration: 'none' }}>
                <button 
                  style={{ 
                    width: '100%', 
                    backgroundColor: '#10B981', 
                    color: '#FFFFFF', 
                    border: 'none', 
                    borderRadius: '8px', 
                    padding: '12px', 
                    fontWeight: 700, 
                    fontSize: '0.9rem', 
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                  aria-label="Get recommendations"
                >
                  Get recommendations ➔
                </button>
              </a>
            </div>
          </div>

          {/* Column 2: Compare Cars (White Card) */}
          <div className="dashboard-card white-card">
            <div className="compare-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="2" x2="12" y2="22" />
                <line x1="5" y1="7" x2="19" y2="7" />
                <path d="M5 7l-2 5h4l-2-5" />
                <path d="M19 7l-2 5h4l-2-5" />
                <path d="M4 22h16" />
              </svg>
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBlock: '0 6px', color: '#111827' }}>
              Compare cars
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#6B7280', margin: 0, maxWidth: '80%' }}>
              Find the right car by comparing side-by-side.
            </p>

            <form onSubmit={handleCompareSubmit} className="stack stack-md" style={{ flex: 1, marginTop: '24px' }}>
              <div className="stack stack-xs">
                <select
                  id="dash-compare-a"
                  name="carA"
                  value={carASlug}
                  onChange={(e) => setCarA(e.target.value)}
                  required
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E5E7EB', backgroundColor: '#F9FAFB', color: '#374151', fontSize: '0.9rem', outline: 'none' }}
                >
                  <option value="">Select first car</option>
                  {cars.map(c => (
                    <option key={c.slug} value={c.slug}>{c.fullName}</option>
                  ))}
                </select>
              </div>

              <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#9CA3AF', fontWeight: 600 }}>vs</div>

              <div className="stack stack-xs">
                <select
                  id="dash-compare-b"
                  name="carB"
                  value={carBSlug}
                  onChange={(e) => setCarB(e.target.value)}
                  required
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E5E7EB', backgroundColor: '#F9FAFB', color: '#374151', fontSize: '0.9rem', outline: 'none' }}
                >
                  <option value="">Select second car</option>
                  {cars.map(c => (
                    <option key={c.slug} value={c.slug}>{c.fullName}</option>
                  ))}
                </select>
              </div>

              <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
                <button 
                  type="submit" 
                  disabled={!canCompare}
                  style={{ 
                    width: '100%', 
                    backgroundColor: '#111827', 
                    color: '#FFFFFF', 
                    border: 'none', 
                    borderRadius: '8px', 
                    padding: '12px', 
                    fontWeight: 700, 
                    fontSize: '0.9rem', 
                    cursor: canCompare ? 'pointer' : 'not-allowed',
                    opacity: canCompare ? 1 : 0.6
                  }}
                >
                  Compare now
                </button>
              </div>
            </form>
          </div>

          {/* Column 3: EMI Calculator (White Card) */}
          <div className="dashboard-card white-card" style={{ paddingBottom: '20px' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBlock: '0 6px', color: '#111827' }}>
              EMI Calculator
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#6B7280', margin: 0 }}>
              Plan your budget better with our live EMI calculator.
            </p>

            <div className="stack stack-lg" style={{ flex: 1, marginTop: '24px' }}>
              {/* Car Price */}
              <div className="stack stack-xs">
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: '#4B5563', fontWeight: 500 }}>Car Price</span>
                  <strong style={{ color: '#111827', fontWeight: 700 }}>₹15,00,000</strong>
                </div>
              </div>

              {/* Down Payment */}
              <div className="stack stack-xs">
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: '#4B5563', fontWeight: 500 }}>Down Payment</span>
                  <strong style={{ color: '#111827', fontWeight: 700 }}>₹3,00,000 <span style={{ color: '#6B7280', fontWeight: 500 }}>(20%)</span></strong>
                </div>
              </div>

              {/* Slider */}
              <div style={{ position: 'relative', marginTop: '6px' }}>
                <input
                  type="range"
                  min={100000}
                  max={5000000}
                  step={50000}
                  value={1500000}
                  disabled
                  className="emi-slider"
                  style={{ width: '100%' }}
                />
                <div style={{ position: 'absolute', top: '-1px', left: '30%', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10B981', transform: 'translate(-50%, -25%)' }}></div>
              </div>

              {/* Result output and Calculator graphic */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '0.75rem', color: '#6B7280', fontWeight: 500 }}>Monthly EMI</span>
                  <strong className="numeric" style={{ fontSize: '1.8rem', color: '#10B981', fontWeight: 800 }}>
                    ₹21,512
                  </strong>
                  <a href="/calculators/emi" style={{ color: '#10B981', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '3px', marginTop: '4px' }}>
                    View details ➔
                  </a>
                </div>

                {/* Calculator vector graphic */}
                <div style={{ width: '90px', height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px', backgroundColor: '#F3F4F6', borderRadius: '12px' }}>
                  <svg width="70" height="70" viewBox="0 0 100 100" fill="none">
                    <rect x="25" y="15" width="50" height="70" rx="8" fill="#3B82F6" opacity="0.85" />
                    <rect x="32" y="22" width="36" height="15" rx="3" fill="#1E3A8A" />
                    <rect x="35" y="45" width="8" height="8" rx="2" fill="#FFFFFF" />
                    <rect x="46" y="45" width="8" height="8" rx="2" fill="#FFFFFF" />
                    <rect x="57" y="45" width="8" height="8" rx="2" fill="#FFFFFF" />
                    <rect x="35" y="57" width="8" height="8" rx="2" fill="#FFFFFF" />
                    <rect x="46" y="57" width="8" height="8" rx="2" fill="#FFFFFF" />
                    <rect x="57" y="57" width="8" height="8" rx="2" fill="#FFFFFF" />
                    <rect x="35" y="69" width="8" height="8" rx="2" fill="#FFFFFF" />
                    <rect x="46" y="69" width="19" height="8" rx="2" fill="#10B981" />
                    <circle cx="85" cy="85" r="15" fill="#F59E0B" />
                    <path d="M81 85h8M85 81v8" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};

export default Dashboard;
