// EMI calculation mirrored from backend for optimistic UI updates.
// The authoritative value always comes from the server on order creation.
export const calculateEMI = (principal: number, annualRate: number, months: number): number => {
  if (annualRate === 0) return parseFloat((principal / months).toFixed(2));
  const r = annualRate / (12 * 100);
  const emi = (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
  return parseFloat(emi.toFixed(2));
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const getDiscountPercent = (original: number, sale: number): number => {
  return Math.round(((original - sale) / original) * 100);
};
