import React from 'react';
import Link from 'next/link';
import { Product } from '@/services/marketplaceService';
import { formatCurrency, getDiscountPercent } from '@/lib/emiUtils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const discount = getDiscountPercent(product.basePrice, product.discountedPrice);
  const lowestEMI = product.emiPlans.length > 0
    ? Math.min(...product.emiPlans.map((p) => p.monthlyAmount))
    : null;

  const fallbackImage = `https://placehold.co/400x400/EDE9FE/7C3AED?text=${encodeURIComponent(product.brand)}`;

  return (
    <Link href={`/shop/marketplace/${product.id}`} className="product-card">
      <div className="product-card-image">
        <img
          src={product.images[0] || fallbackImage}
          alt={product.name}
          onError={(e) => { (e.target as HTMLImageElement).src = fallbackImage; }}
          loading="lazy"
        />
        {discount > 0 && (
          <span className="product-card-discount">{discount}% off</span>
        )}
      </div>

      <div className="product-card-body">
        <span className="product-card-brand">{product.brand}</span>
        <span className="product-card-name">{product.name}</span>

        <div className="product-card-price-row">
          <span className="product-card-price">{formatCurrency(product.discountedPrice)}</span>
          {discount > 0 && (
            <span className="product-card-price-original">{formatCurrency(product.basePrice)}</span>
          )}
        </div>

        {lowestEMI && (
          <span className="product-card-emi">
            EMI from {formatCurrency(lowestEMI)}/mo
          </span>
        )}
      </div>
    </Link>
  );
}
