import React from 'react';
import { ProductVariant } from '@/services/marketplaceService';

interface VariantSelectorProps {
  variants: ProductVariant[];
  selected: ProductVariant | null;
  onSelect: (variant: ProductVariant) => void;
}

export function VariantSelector({ variants, selected, onSelect }: VariantSelectorProps) {
  if (variants.length === 0) return null;

  // Determine the label to show based on the first variant's type
  const typeLabel: Record<string, string> = {
    storage: 'Storage & Colour',
    color: 'Colour',
    size: 'Size',
    config: 'Configuration',
  };

  const label = typeLabel[variants[0]?.type] || 'Variant';

  return (
    <div className="variant-selector">
      <div className="variant-selector-label">
        {label}
        {selected && (
          <span style={{ color: 'var(--primary)', marginLeft: '8px', fontWeight: 700 }}>
            — {selected.label}
          </span>
        )}
      </div>
      <div className="variant-options">
        {variants.map((variant) => (
          <button
            key={variant.id}
            className={`variant-option ${selected?.id === variant.id ? 'selected' : ''}`}
            onClick={() => onSelect(variant)}
            disabled={!variant.available}
            aria-pressed={selected?.id === variant.id}
          >
            {variant.label}
          </button>
        ))}
      </div>
    </div>
  );
}
