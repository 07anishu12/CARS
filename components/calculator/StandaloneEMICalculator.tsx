'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { calculateEMIDetails, calculateAmortizationSchedule } from '../../lib/calculations/emi';
import { SectionHeader, InteractiveSlider } from '../design/Primitives';
import { getAllModels } from '../../lib/data/cars-db';

export interface StandaloneEMICalculatorProps {
  initialPrice?: number;
}

export const StandaloneEMICalculator: React.FC<StandaloneEMICalculatorProps> = ({ initialPrice = 1250000 }) => {
  const models = getAllModels();

  const [carPrice, setCarPrice] = useState<number>(Number.isFinite(initialPrice) && initialPrice > 0 ? initialPrice : 1250000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(9.5);
  const [tenureYears, setTenureYears] = useState<number>(5);

  const downPaymentAmount = Math.round(carPrice * (downPaymentPercent / 100));
  const tenureMonths = tenureYears * 12;

  const emiDetails = useMemo(() => {
    return calculateEMIDetails(carPrice, downPaymentAmount, interestRate, tenureMonths);
  }, [carPrice, downPaymentAmount, interestRate, tenureMonths]);

  const amortizationSchedule = useMemo(() => {
    return calculateAmortizationSchedule(emiDetails.loanAmount, interestRate, tenureMonths);
  }, [emiDetails.loanAmount, interestRate, tenureMonths]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
  };

  const principalPercent = emiDetails.totalPayment > 0
    ? Math.round((emiDetails.loanAmount / emiDetails.totalPayment) * 100)
    : 100;
  const interestPercent = 100 - principalPercent;

  return <div className="kerb-shell standalone-finance" data-tone="financial"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>EMI calculator</span></nav><header className="page-heading"><span className="eyebrow">The finance desk</span><h1>Your next car.<br/>Your monthly number.</h1><p>Adjust the price, deposit and loan terms to see how the payments add up.</p></header><section className="chapter"><div className="filter-options">{models.slice(0,5).map(model=><button key={model.id} className="filter-option" aria-pressed={carPrice===model.priceRangeMin} onClick={()=>setCarPrice(model.priceRangeMin)}>{model.name} · ₹{(model.priceRangeMin/100000).toFixed(1)}L</button>)}</div><p className="data-note">Model presets use starting ex-showroom prices. Adjust the price to include your on-road quote.</p><div className="split-analysis tool-space"><div><InteractiveSlider id="carPriceInput" label="Vehicle price" value={carPrice} display={formatCurrency(carPrice)} min={200000} max={10000000} step={10000} onChange={setCarPrice}/><InteractiveSlider id="downPaymentInput" label={`Down payment · ${downPaymentPercent}%`} value={downPaymentPercent} display={formatCurrency(downPaymentAmount)} min={0} max={90} step={5} onChange={setDownPaymentPercent}/><InteractiveSlider id="interestRateInput" label="Annual interest rate" value={interestRate} display={`${interestRate}% p.a.`} min={0} max={20} step={.25} onChange={setInterestRate}/><InteractiveSlider id="tenureInput" label="Loan tenure" value={tenureYears} display={`${tenureYears} years`} min={1} max={7} onChange={setTenureYears}/></div><div className="finance-result"><span className="eyebrow">Estimated monthly EMI</span><div className="big-number" aria-live="polite">{formatCurrency(emiDetails.monthlyEmi)}<small> / month</small></div><dl className="finance-lines"><div><dt>Principal</dt><dd>{formatCurrency(emiDetails.loanAmount)}</dd></div><div><dt>Total interest</dt><dd>{formatCurrency(emiDetails.totalInterest)}</dd></div><div><dt>Total repayment</dt><dd>{formatCurrency(emiDetails.totalPayment)}</dd></div></dl><div className="repayment-chart" role="img" aria-label={`Principal ${principalPercent}%, interest ${interestPercent}%`}><span style={{width:`${principalPercent}%`}}/><span style={{width:`${interestPercent}%`}}/></div><p className="data-note">Principal {principalPercent}% · Interest {interestPercent}%</p><Link href={`/cars?budget=${carPrice<=1000000?'UNDER_10L':carPrice<=1500000?'10L_15L':carPrice<=2000000?'15L_20L':'ABOVE_20L'}`} className="text-link">Find cars within this budget →</Link></div></div></section><section className="chapter"><SectionHeader label="Repayment schedule" title="See the balance come down." tone="financial" description="Annual principal and interest totals over the full loan term. Estimates exclude lender fees."/><div className="table-scroll" role="region" aria-label="Yearly amortization" tabIndex={0}><table className="data-table"><thead><tr><th>Year</th><th>Principal paid</th><th>Interest paid</th><th>Annual outflow</th><th>Closing balance</th></tr></thead><tbody>{amortizationSchedule.map(row=><tr key={row.year}><th scope="row">{row.year}</th><td>{formatCurrency(row.principalPaid)}</td><td>{formatCurrency(row.interestPaid)}</td><td>{formatCurrency(row.totalPaid)}</td><td>{formatCurrency(row.remainingBalance)}</td></tr>)}</tbody></table></div></section></div>;
};
export default StandaloneEMICalculator;
