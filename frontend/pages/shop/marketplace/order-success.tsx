import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { marketplaceService } from '@/services/marketplaceService';
import { formatCurrency } from '@/lib/emiUtils';

export default function OrderSuccessPage() {
  const router = useRouter();
  const { orderId } = router.query;
  const [order, setOrder] = useState<null | {
    id: string;
    totalAmount: number;
    monthlyEMI: number | null;
    status: string;
    product: { name: string; brand: string };
    variant: { label: string } | null;
    emiPlan: { tenureMonths: number } | null;
  }>(null);

  useEffect(() => {
    if (!orderId || typeof orderId !== 'string') return;
    marketplaceService.getOrder(orderId).then(setOrder).catch(() => {});
  }, [orderId]);

  return (
    <>
      <Head>
        <title>Order Confirmed — 1Fi</title>
      </Head>
      <div className="app-shell">
        <div className="mobile-frame">
          <div className="success-page">
            <div className="success-icon">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <h1 className="success-title">Order Confirmed!</h1>
            <p className="success-subtitle">
              Your purchase has been placed successfully. We&apos;ll send you updates via email.
            </p>

            {order && (
              <div className="card" style={{ marginTop: '24px', width: '100%', padding: '20px', textAlign: 'left' }}>
                <div style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                  {order.product.brand}
                </div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                  {order.product.name}
                </div>
                {order.variant && (
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                    {order.variant.label}
                  </div>
                )}

                <div className="divider" />

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Total Amount</span>
                  <span style={{ fontSize: '14px', fontWeight: 700 }}>{formatCurrency(order.totalAmount)}</span>
                </div>

                {order.monthlyEMI && order.emiPlan && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Monthly EMI</span>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary)' }}>
                      {formatCurrency(order.monthlyEMI)} × {order.emiPlan.tenureMonths} months
                    </span>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Order ID</span>
                  <span style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontFamily: 'monospace' }}>
                    {order.id.slice(0, 8)}...
                  </span>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '24px', width: '100%' }}>
              <Link href="/shop/marketplace" className="btn btn-primary btn-full">
                Continue Shopping
              </Link>
              <Link href="/shop" className="btn btn-ghost btn-full">
                Back to Shop
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
