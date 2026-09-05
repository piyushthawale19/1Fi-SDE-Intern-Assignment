/**
 * EMI is calculated using the standard reducing-balance formula:
 * EMI = P × r × (1+r)^n / ((1+r)^n - 1)
 * where r = monthly interest rate, n = tenure in months
 */
const calculateEMI = (principal, annualInterestRate, tenureMonths) => {
  if (annualInterestRate === 0) {
    return parseFloat((principal / tenureMonths).toFixed(2));
  }

  const monthlyRate = annualInterestRate / (12 * 100);
  const numerator = principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths);
  const denominator = Math.pow(1 + monthlyRate, tenureMonths) - 1;

  return parseFloat((numerator / denominator).toFixed(2));
};

const calculateTotalPayable = (emiAmount, tenureMonths, processingFee) => {
  return parseFloat((emiAmount * tenureMonths + processingFee).toFixed(2));
};

module.exports = { calculateEMI, calculateTotalPayable };
