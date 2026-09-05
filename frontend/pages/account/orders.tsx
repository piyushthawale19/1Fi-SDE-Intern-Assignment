import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { AppBar } from '@/components/layout/AppBar';
import { useAuthStore } from '@/store/authStore';
import { marketplaceService } from '@/services/marketplaceService';
import { formatCurrency } from '@/lib/emiUtils';
import { ProductCardSkeleton, EmptyState } from '@/components/ui/States';

interface UserOrder {
  id: string;
  createdAt: string;
  monthlyEMI: number;
  totalAmount: number;
  status: string;
  product: {
    id: string;
    name: string;
    brand: string;
    images: string[];
    discountedPrice: number;
  };
  variant?: {
    id: string;
    label: string;
  };
  emiPlan: {
    tenureMonths: number;
    interestRate: number;
    processingFee: number;
  };
}

export default function MyOrdersPage() {
  const { token } = useAuthStore();
  const [orders, setOrders] = useState<UserOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<UserOrder | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    marketplaceService.getUserOrders()
      .then((data) => setOrders(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [token]);

  if (!mounted) {
    return (
      <MobileLayout>
        <AppBar title="My Orders" showBack />
        <div style={{ padding: '32px 16px', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading...</div>
      </MobileLayout>
    );
  }

  return (
    <>
      <Head>
        <title>My Orders — 1Fi</title>
        <meta name="description" content="View your order history and active EMI plans." />
      </Head>
      <MobileLayout>
        <AppBar title="My Orders" showBack />

        {!token ? (
          <div style={{ padding: '32px 16px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>
              Sign in to view your orders
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              Track all purchases made via 1Fi Marketplace.
            </p>
            <Link href="/auth/login" className="btn btn-primary" style={{ padding: '10px 24px' }}>
              Sign In
            </Link>
          </div>
        ) : loading ? (
          <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </div>
        ) : orders.length === 0 ? (
          <div style={{ padding: '16px' }}>
            <EmptyState
              title="No orders yet"
              description="You haven't placed any EMI orders on 1Fi Marketplace."
              icon={
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
              }
            />
            <div style={{ textAlign: 'center', marginTop: '16px', display: 'flex', justifyContent: 'center' }}>
              <Link href="/shop/marketplace" className="btn btn-primary" style={{ padding: '12px 28px' }}>
                Browse Marketplace
              </Link>
            </div>
          </div>
        ) : (
          <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>
              Tap any order card to view digital invoice & EMI contract details.
            </p>

            {orders.map((order) => {
              const dateStr = new Date(order.createdAt).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              });

              const imageUrl = order.product?.images?.[0] || 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400';

              return (
                <div
                  key={order.id}
                  className="card"
                  onClick={() => setSelectedOrder(order)}
                  style={{
                    padding: '16px',
                    borderLeft: '4px solid var(--primary)',
                    cursor: 'pointer',
                    transition: 'transform 0.15s, box-shadow 0.15s',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
                      Order #{order.id.slice(-8).toUpperCase()} • {dateStr}
                    </span>
                    <span className="badge badge-success" style={{ fontSize: '11px' }}>
                      {order.status}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '14px' }}>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '12px',
                      background: 'var(--surface-muted)',
                      overflow: 'hidden',
                      flexShrink: 0,
                      border: '1px solid var(--border)',
                    }}>
                      <img src={imageUrl} alt={order.product?.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>

                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--primary)', textTransform: 'uppercase' }}>
                        {order.product?.brand}
                      </span>
                      <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                        {order.product?.name}
                      </h3>
                      {order.variant && (
                        <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                          {order.variant.label}
                        </span>
                      )}
                    </div>
                  </div>

                  <div style={{
                    background: '#F4F0FD',
                    borderRadius: '12px',
                    padding: '10px 14px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '12px',
                  }}>
                    <div>
                      <span style={{ color: 'var(--text-secondary)', display: 'block' }}>Monthly EMI</span>
                      <strong style={{ fontSize: '14px', color: 'var(--primary)' }}>{formatCurrency(order.monthlyEMI)}/mo</strong>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ color: 'var(--text-secondary)', display: 'block' }}>Tenure</span>
                      <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>{order.emiPlan?.tenureMonths} Months</strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Digital Invoice & Order Details Drawer Modal */}
        {selectedOrder && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 100,
              background: 'rgba(15, 23, 42, 0.65)',
              backdropFilter: 'blur(4px)',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}
            onClick={() => setSelectedOrder(null)}
          >
            <div
              style={{
                width: '100%',
                maxWidth: '480px',
                background: 'white',
                borderTopLeftRadius: '24px',
                borderTopRightRadius: '24px',
                padding: '20px 20px 32px',
                maxHeight: '85vh',
                overflowY: 'auto',
                boxShadow: '0 -10px 30px rgba(0,0,0,0.2)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ width: '40px', height: '5px', background: '#E2E8F0', borderRadius: '4px', margin: '0 auto 16px' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                  <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                    Order & EMI Invoice
                  </h2>
                  <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
                    #{selectedOrder.id.toUpperCase()}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  style={{
                    background: '#F1F5F9',
                    border: 'none',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    cursor: 'pointer',
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Delivery Tracker */}
              <div className="card" style={{ padding: '14px', marginBottom: '16px', background: '#F4F0FD', border: '1px solid #E4DCF9' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                    🚚
                  </div>
                  <div>
                    <h4 style={{ fontSize: '13px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                      Delivery In Progress
                    </h4>
                    <span style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: 600 }}>
                      Estimated Arrival: Tomorrow by 8 PM
                    </span>
                  </div>
                </div>
              </div>

              {/* Financial Breakdown Table */}
              <div className="card" style={{ padding: '16px', marginBottom: '16px' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px', textTransform: 'uppercase' }}>
                  EMI Financial Breakdown
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Item Price</span>
                    <strong>{formatCurrency(selectedOrder.product?.discountedPrice || 0)}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Interest Rate</span>
                    <strong>{selectedOrder.emiPlan?.interestRate}% p.a.</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Processing Fee</span>
                    <strong>{formatCurrency(selectedOrder.emiPlan?.processingFee || 0)}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: '8px', fontSize: '14px' }}>
                    <span>Monthly EMI</span>
                    <strong style={{ color: 'var(--primary)' }}>{formatCurrency(selectedOrder.monthlyEMI)}/mo × {selectedOrder.emiPlan?.tenureMonths} mos</strong>
                  </div>
                </div>
              </div>

              <button
                onClick={() => alert('Digital Invoice & EMI Mandate Receipt downloaded to device.')}
                className="btn btn-primary btn-full"
                style={{ padding: '12px' }}
              >
                📄 Download Official PDF Receipt
              </button>
            </div>
          </div>
        )}
      </MobileLayout>
    </>
  );
}
