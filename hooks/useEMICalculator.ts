'use client';

import { useState, useMemo } from 'react';
import { calculateEMIDetails, EMIDetails } from '../lib/calculations/emi';

export interface EMIValidationError {
  price?: string;
  downPayment?: string;
  interestRate?: string;
  tenure?: string;
}

export const useEMICalculator = (
  initialPrice = 1000000,
  initialInterestRate = 8.5,
  initialTenureMonths = 60
) => {
  const [price, setPrice] = useState<number>(initialPrice);
  const [downPayment, setDownPayment] = useState<number>(initialPrice * 0.2);
  const [interestRate, setInterestRate] = useState<number>(initialInterestRate);
  const [tenure, setTenure] = useState<number>(initialTenureMonths);

  // Inline Validation Checks
  const errors = useMemo((): EMIValidationError => {
    const errs: EMIValidationError = {};
    if (price < 0) {
      errs.price = 'Vehicle price cannot be negative';
    }
    if (downPayment < 0) {
      errs.downPayment = 'Down payment cannot be negative';
    }
    if (downPayment > price) {
      errs.downPayment = 'Down payment cannot exceed vehicle price';
    }
    if (interestRate <= 0) {
      errs.interestRate = 'Interest rate must be greater than 0%';
    }
    if (tenure <= 0) {
      errs.tenure = 'Loan tenure must be greater than 0 months';
    }
    return errs;
  }, [price, downPayment, interestRate, tenure]);

  const isValid = useMemo(() => Object.keys(errors).length === 0, [errors]);

  // Live Results Calculation
  const results = useMemo((): EMIDetails => {
    if (!isValid) {
      return {
        loanAmount: 0,
        monthlyEmi: 0,
        totalInterest: 0,
        totalPayment: 0
      };
    }
    return calculateEMIDetails(price, downPayment, interestRate, tenure);
  }, [price, downPayment, interestRate, tenure, isValid]);

  return {
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
  };
};

export default useEMICalculator;
