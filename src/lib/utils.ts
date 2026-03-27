import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: string = 'USD', rates: Record<string, number> = { USD: 1 }) {
  const convertedAmount = amount * (rates[currency] || 1);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(convertedAmount);
}

export function calculateDebtPayoff(
  principal: number,
  annualInterestRate: number,
  monthlyPayment: number,
  additionalSnowball: number = 0
) {
  const totalMonthlyPayment = monthlyPayment + additionalSnowball;
  const monthlyInterestRate = annualInterestRate / 100 / 12;

  if (totalMonthlyPayment <= principal * monthlyInterestRate) {
    return { months: Infinity, totalInterest: Infinity };
  }

  let balance = principal;
  let months = 0;
  let totalInterest = 0;

  while (balance > 0) {
    const interest = balance * monthlyInterestRate;
    totalInterest += interest;
    balance = balance + interest - totalMonthlyPayment;
    months++;

    if (months > 1200) break; // 100 years limit
  }

  return { months, totalInterest };
}

export function getSpendingPrediction(transactions: any[]) {
  // Simple logic to predict end-of-month balance based on average daily spend
  const now = new Date();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const currentDay = now.getDate();

  const totalSpent = transactions
    .filter(t => t.amount < 0)
    .reduce((acc, t) => acc + Math.abs(t.amount), 0);

  const dailyAverage = totalSpent / Math.max(currentDay, 1);
  const predictedTotal = dailyAverage * daysInMonth;

  return {
    predictedTotal,
    savingsVelocity: dailyAverage * 7, // Weekly
    optimizationAlert: predictedTotal < 2500 ? "Transfer surplus to high-yield" : null
  };
}
