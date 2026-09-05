import React from 'react';
import { EMIPlan } from '@/services/marketplaceService';
import { formatCurrency } from '@/lib/emiUtils';

interface EMIPlanSelectorProps {
  plans: EMIPlan[];
  selected: EMIPlan | null;
  onSelect: (plan: EMIPlan) => void;
}

export function EMIPlanSelector({ plans, selected, onSelect }: EMIPlanSelectorProps) {
  if (plans.length === 0) {
    return (
      <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
        No EMI plans available for this product.
      </p>
    );
  }

  return (
    <div className="emi-plans">
      {plans.map((plan) => {
        const isSelected = selected?.id === plan.id;
        const isZeroInterest = plan.interestRate === 0;

        return (
          <button
            key={plan.id}
            className={`emi-plan-card ${isSelected ? 'selected' : ''}`}
            onClick={() => onSelect(plan)}
            aria-pressed={isSelected}
          >
            <div className="emi-plan-left">
              <h4>{plan.tenureMonths} Months</h4>
              <p style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {isZeroInterest ? (
                  <span className="badge badge-success">No Cost EMI</span>
                ) : (
                  <span style={{ color: 'var(--text-tertiary)' }}>{plan.interestRate}% p.a.</span>
                )}
                {plan.processingFee > 0 && (
                  <span style={{ color: 'var(--text-tertiary)' }}>
                    + {formatCurrency(plan.processingFee)} fee
                  </span>
                )}
              </p>
            </div>

            <div className="emi-plan-right">
              <div className="emi-plan-monthly">{formatCurrency(plan.monthlyAmount)}/mo</div>
              <div className="emi-plan-total">Total {formatCurrency(plan.totalPayable)}</div>
            </div>

            <div className="emi-plan-radio">
              <div className="emi-plan-radio-inner" />
            </div>
          </button>
        );
      })}
    </div>
  );
}
