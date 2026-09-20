'use client';

import React from 'react';
import { useEMICalculator } from '../hooks/useEMICalculator';
import { Container, Section, Input } from './ui';

export interface EMICalculatorProps {
  defaultPrice?: number;
  defaultInterestRate?: number;
  defaultTenureMonths?: number;
}

// Magnetic Snapping helper
function snapValue(value: number, step: number, tolerance: number): number {
  const remainder = value % step;
  if (remainder < tolerance) {
    return value - remainder;
  }
  if (step - remainder < tolerance) {
    return value + (step - remainder);
  }
  return value;
}

const EMICalculator: React.FC<EMICalculatorProps> = ({
  defaultPrice = 1000000,
  defaultInterestRate = 8.5,
  defaultTenureMonths = 60
}) => {
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
    errors,
    isValid
  } = useEMICalculator(defaultPrice, defaultInterestRate, defaultTenureMonths);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <Section as="section" aria-labelledby="emi-calculator-title">
      <Container className="stack stack-lg" style={{ maxWidth: '960px' }}>
        <div className="stack stack-xs">
          <span className="text-label">Finance Calculator</span>
          <h2 id="emi-calculator-title" className="text-section-title">EMI Calculator</h2>
          <p className="text-body-large" style={{ color: 'var(--muted)' }}>
            Estimate your monthly loan installments based on price, interest rates, and loan tenure.
          </p>
        </div>

        <form 
          onSubmit={(e) => e.preventDefault()} 
          aria-label="Vehicle EMI Estimator Form"
          className="stack stack-lg card-ui"
        >
          <div className="grid-cards" style={{ gap: 'var(--spacing-24)' }}>
            
            {/* Vehicle Price Input */}
            <div className="stack stack-xs">
              <label id="label-vehicle-price" htmlFor="emi-vehicle-price" className="text-label">Vehicle Price (₹)</label>
              <Input
                type="number"
                id="emi-vehicle-price"
                name="vehiclePrice"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                min={100000}
                step={10000}
                required
                aria-required="true"
              />
              <input
                type="range"
                aria-label="Vehicle Price Slider"
                aria-valuemin={100000}
                aria-valuemax={5000000}
                aria-valuenow={price}
                aria-labelledby="label-vehicle-price"
                value={price}
                min={100000}
                max={5000000}
                step={10000}
                onChange={(e) => setPrice(snapValue(Number(e.target.value), 500000, 50000))}
              />
              {errors.price && (
                <span role="alert" style={{ color: 'var(--accent)', fontSize: 'var(--fs-caption)' }}>
                  {errors.price}
                </span>
              )}
            </div>

            {/* Down Payment Input */}
            <div className="stack stack-xs">
              <label id="label-down-payment" htmlFor="emi-down-payment" className="text-label">Down Payment (₹)</label>
              <Input
                type="number"
                id="emi-down-payment"
                name="downPayment"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                min={0}
                step={10000}
                required
                aria-required="true"
              />
              <input
                type="range"
                aria-label="Down Payment Slider"
                aria-valuemin={0}
                aria-valuemax={price || 100000}
                aria-valuenow={downPayment}
                aria-labelledby="label-down-payment"
                value={downPayment}
                min={0}
                max={price || 100000}
                step={10000}
                onChange={(e) => setDownPayment(snapValue(Number(e.target.value), 100000, 10000))}
              />
              {errors.downPayment && (
                <span role="alert" style={{ color: 'var(--accent)', fontSize: 'var(--fs-caption)' }}>
                  {errors.downPayment}
                </span>
              )}
            </div>

            {/* Interest Rate Input */}
            <div className="stack stack-xs">
              <label id="label-interest-rate" htmlFor="emi-interest-rate" className="text-label">Interest Rate (% p.a.)</label>
              <Input
                type="number"
                id="emi-interest-rate"
                name="interestRate"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                min={1}
                max={30}
                step={0.1}
                required
                aria-required="true"
              />
              <input
                type="range"
                aria-label="Interest Rate Slider"
                aria-valuemin={1}
                aria-valuemax={25}
                aria-valuenow={interestRate}
                aria-labelledby="label-interest-rate"
                value={interestRate}
                min={1}
                max={25}
                step={0.1}
                onChange={(e) => setInterestRate(snapValue(Number(e.target.value), 1, 0.1))}
              />
              {errors.interestRate && (
                <span role="alert" style={{ color: 'var(--accent)', fontSize: 'var(--fs-caption)' }}>
                  {errors.interestRate}
                </span>
              )}
            </div>

            {/* Loan Tenure Input */}
            <div className="stack stack-xs">
              <label id="label-loan-tenure" htmlFor="emi-loan-tenure" className="text-label">Loan Tenure (Months)</label>
              <Input
                type="number"
                id="emi-loan-tenure"
                name="loanTenure"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                min={12}
                max={84}
                step={12}
                required
                aria-required="true"
              />
              <input
                type="range"
                aria-label="Loan Tenure Slider"
                aria-valuemin={12}
                aria-valuemax={84}
                aria-valuenow={tenure}
                aria-labelledby="label-loan-tenure"
                value={tenure}
                min={12}
                max={84}
                step={12}
                onChange={(e) => setTenure(snapValue(Number(e.target.value), 12, 2))}
              />
              {errors.tenure && (
                <span role="alert" style={{ color: 'var(--accent)', fontSize: 'var(--fs-caption)' }}>
                  {errors.tenure}
                </span>
              )}
            </div>

          </div>
        </form>

        {/* Results Area (Auto-updates) */}
        <div 
          aria-live="polite" 
          aria-label="Calculation Results Container" 
          className="card-ui stack stack-md" 
          style={{ backgroundColor: 'var(--background)' }}
        >
          <h3 className="text-card-title">Your Loan Estimation Details</h3>
          
          {isValid ? (
            <div className="grid-cards" style={{ marginTop: 'var(--spacing-16)' }}>
              <div className="stack stack-xs">
                <span className="text-label">Loan Amount</span>
                <strong className="numeric" style={{ fontSize: '1.5rem', color: 'var(--primary)' }}>
                  {formatCurrency(results.loanAmount)}
                </strong>
              </div>
              
              <div className="stack stack-xs">
                <span className="text-label">Monthly EMI</span>
                <strong className="numeric" style={{ fontSize: '1.5rem', color: 'var(--accent)' }}>
                  {formatCurrency(results.monthlyEmi)}
                </strong>
              </div>
              
              <div className="stack stack-xs">
                <span className="text-label">Total Interest</span>
                <strong className="numeric" style={{ fontSize: '1.5rem', color: 'var(--primary)' }}>
                  {formatCurrency(results.totalInterest)}
                </strong>
              </div>
              
              <div className="stack stack-xs">
                <span className="text-label">Total Payment</span>
                <strong className="numeric" style={{ fontSize: '1.5rem', color: 'var(--primary)' }}>
                  {formatCurrency(results.totalPayment)}
                </strong>
              </div>
            </div>
          ) : (
            <p style={{ color: 'var(--accent)', marginTop: 'var(--spacing-8)' }}>
              Please correct the input errors above to view estimated calculations.
            </p>
          )}
        </div>
      </Container>
    </Section>
  );
};

export default EMICalculator;
