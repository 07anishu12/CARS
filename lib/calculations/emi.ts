/**
 * Standard EMI Calculation Utilities
 */

export interface EMIDetails {
  loanAmount: number;
  monthlyEmi: number;
  totalInterest: number;
  totalPayment: number;
}

/**
 * Calculates the monthly EMI based on the standard amortization formula:
 * E = P * r * (1 + r)^n / ((1 + r)^n - 1)
 */
export function calculateEMI(principal: number, annualInterestRate: number, tenureMonths: number): number {
  if (principal <= 0 || tenureMonths <= 0) return 0;
  
  // If interest rate is 0, it's a simple division
  if (annualInterestRate <= 0) {
    return Math.round(principal / tenureMonths);
  }

  const monthlyRate = annualInterestRate / 12 / 100;
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / 
              (Math.pow(1 + monthlyRate, tenureMonths) - 1);
              
  return Math.round(emi);
}

/**
 * Calculates comprehensive loan details
 */
export function calculateEMIDetails(
  price: number,
  downPayment: number,
  annualInterestRate: number,
  tenureMonths: number
): EMIDetails {
  const loanAmount = Math.max(0, price - downPayment);
  
  if (loanAmount <= 0 || tenureMonths <= 0) {
    return {
      loanAmount: 0,
      monthlyEmi: 0,
      totalInterest: 0,
      totalPayment: 0
    };
  }

  const monthlyEmi = calculateEMI(loanAmount, annualInterestRate, tenureMonths);
  // At zero interest the final instalment absorbs rupee rounding.
  const totalPayment = annualInterestRate <= 0 ? loanAmount : monthlyEmi * tenureMonths;
  const totalInterest = Math.max(0, totalPayment - loanAmount);

  return {
    loanAmount,
    monthlyEmi,
    totalInterest,
    totalPayment
  };
}

export interface AmortizationYear {
  year: number;
  principalPaid: number;
  interestPaid: number;
  totalPaid: number;
  remainingBalance: number;
}

/**
 * Generates year-by-year amortization breakdown
 */
export function calculateAmortizationSchedule(
  loanAmount: number,
  annualInterestRate: number,
  tenureMonths: number
): AmortizationYear[] {
  if (loanAmount <= 0 || tenureMonths <= 0) return [];

  const monthlyRate = annualInterestRate / 12 / 100;
  const monthlyEmi = calculateEMI(loanAmount, annualInterestRate, tenureMonths);
  const years = Math.ceil(tenureMonths / 12);
  const schedule: AmortizationYear[] = [];

  let balance = loanAmount;

  for (let y = 1; y <= years; y++) {
    let yearPrincipal = 0;
    let yearInterest = 0;
    const monthsInThisYear = Math.min(12, tenureMonths - (y - 1) * 12);

    for (let m = 0; m < monthsInThisYear; m++) {
      const interestForMonth = balance * monthlyRate;
      const principalForMonth = Math.min(balance, monthlyEmi - interestForMonth);

      yearInterest += interestForMonth;
      yearPrincipal += principalForMonth;
      balance = Math.max(0, balance - principalForMonth);
    }

    schedule.push({
      year: y,
      principalPaid: Math.round(yearPrincipal),
      interestPaid: Math.round(yearInterest),
      totalPaid: Math.round(yearPrincipal + yearInterest),
      remainingBalance: Math.round(balance)
    });
  }

  return schedule;
}

