import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { AppBar } from '@/components/layout/AppBar';
import { useAuthStore } from '@/store/authStore';
import { formatCurrency } from '@/lib/emiUtils';

export default function WalletPage() {
  const { user, token } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'upi' | 'netbanking' | 'card'>('upi');
  const [paid, setPaid] = useState(false);
  const [paying, setPaying] = useState(false);
  const [availableLimit, setAvailableLimit] = useState(125000);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleConfirmPay = () => {
    setPaying(true);
    setTimeout(() => {
      setPaying(false);
      setPaid(true);
      setAvailableLimit(137967);
      setIsPayModalOpen(false);
    }, 1200);
  };

  if (!mounted) {
    return (
      <MobileLayout>
        <AppBar title="1Fi Wallet" showLogo />
        <div style={{ padding: '32px 16px', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading...</div>
      </MobileLayout>
    );
  }

  return (
    <>
      <Head>
        <title>1Fi Wallet & EMIs — 1Fi</title>
        <meta name="description" content="View your pre-approved 1Fi credit limit, active EMI plans, and repayment schedule." />
      </Head>
      <MobileLayout>
        <AppBar title="1Fi Wallet" showLogo />

        {!token ? (
          <div style={{ padding: '32px 16px', textAlign: 'center' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'var(--primary-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                <line x1="1" y1="10" x2="23" y2="10" />
              </svg>
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>
              Sign in to view your 1Fi Wallet
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
              Access your pre-approved EMI credit limit and track repayment schedules.
            </p>
            <Link href="/auth/login" className="btn btn-primary" style={{ padding: '12px 32px' }}>
              Sign In
            </Link>
          </div>
        ) : (
          <div style={{ padding: '16px' }}>
            {/* Wallet Balance Hero Card */}
            <div style={{
              background: 'linear-gradient(135deg, #1E1B4B 0%, #4C1D95 60%, #7C3AED 100%)',
              borderRadius: '20px',
              padding: '24px 20px',
              color: 'white',
              marginBottom: '20px',
              boxShadow: '0 10px 30px rgba(124, 58, 237, 0.3)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', right: '-20px', top: '-20px', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.08)' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.85, fontWeight: 600 }}>
                  1Fi Credit Line
                </span>
                <span style={{ background: '#22C55E', color: 'white', fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '12px' }}>
                  ACTIVE
                </span>
              </div>

              <div style={{ fontSize: '13px', opacity: 0.8, marginBottom: '4px' }}>Available Credit Limit</div>
              <div style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: '16px' }}>
                {formatCurrency(availableLimit)}
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                paddingTop: '14px',
                borderTop: '1px solid rgba(255, 255, 255, 0.15)',
                fontSize: '12px',
              }}>
                <div>
                  <span style={{ opacity: 0.7, display: 'block' }}>Total Sanctioned</span>
                  <span style={{ fontWeight: 700, fontSize: '14px' }}>{formatCurrency(150000)}</span>
                </div>
                <div>
                  <span style={{ opacity: 0.7, display: 'block' }}>Utilized Credit</span>
                  <span style={{ fontWeight: 700, fontSize: '14px' }}>{formatCurrency(150000 - availableLimit)}</span>
                </div>
              </div>
            </div>

            {/* Upcoming Due Card */}
            <div className="card" style={{ padding: '18px', marginBottom: '20px', borderLeft: '4px solid var(--primary)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>
                    Upcoming EMI Payment
                  </span>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', margin: '4px 0 0' }}>
                    {formatCurrency(12967)}
                  </h3>
                </div>
                <span className={paid ? 'badge badge-success' : 'badge badge-warning'} style={{ fontSize: '12px' }}>
                  {paid ? '✓ PAID' : 'Due Oct 5, 2026'}
                </span>
              </div>

              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '0 0 14px' }}>
                {paid ? 'Early payment recorded. Credit limit restored!' : 'Auto-debit scheduled from HDFC Bank (•••• 4812)'}
              </p>

              <button
                onClick={() => setIsPayModalOpen(true)}
                className="btn btn-primary"
                disabled={paid}
                style={{ width: '100%', padding: '10px' }}
              >
                {paid ? '✓ Early Payment Completed' : 'Pay Now Early'}
              </button>
            </div>

            {/* Active EMIs list */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>
                Active EMI Purchases (1)
              </h3>

              <div className="card" style={{ padding: '16px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    background: 'var(--primary-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--primary)',
                    fontWeight: 700,
                  }}>
                    
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                      Apple Watch Series 9
                    </h4>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      3 Months EMI Plan (0% Interest)
                    </span>
                  </div>
                  <span className="badge badge-success">Active</span>
                </div>

                <div style={{
                  background: 'var(--bg)',
                  borderRadius: '10px',
                  padding: '10px 12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '12px',
                }}>
                  <span>Monthly EMI: <strong>{formatCurrency(12967)}/mo</strong></span>
                  <span>Tenure: <strong>{paid ? '2 of 3 Paid' : '1 of 3 Paid'}</strong></span>
                </div>
              </div>
            </div>

            {/* Auto Debit Info */}
            <div className="card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#DEF7EC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#03543F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: '13px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                  Auto-Debit Mandate Active
                </h4>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0' }}>
                  HDFC Bank ending in 4812
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Early Repayment Modal */}
        {isPayModalOpen && (
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
            onClick={() => setIsPayModalOpen(false)}
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
                    Early EMI Repayment
                  </h2>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    Pay upcoming instalment early to restore credit limit
                  </span>
                </div>
                <button
                  onClick={() => setIsPayModalOpen(false)}
                  style={{ background: '#F1F5F9', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer' }}
                >
                  ✕
                </button>
              </div>

              <div className="card" style={{ padding: '16px', marginBottom: '16px', background: '#FAF8FF', border: '1px solid #E4DCF9' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Instalment Amount Due</span>
                <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--primary)', margin: '4px 0' }}>
                  {formatCurrency(12967)}
                </div>
              </div>

              {/* Payment Methods */}
              <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '10px' }}>
                Select Payment Mode
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                <div
                  onClick={() => setSelectedMethod('upi')}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '12px',
                    border: selectedMethod === 'upi' ? '2px solid var(--primary)' : '1px solid var(--border)',
                    background: selectedMethod === 'upi' ? 'var(--primary-light)' : 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '20px' }}>⚡</span>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>UPI Autopay / GPay / PhonePe</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Instant settlement</div>
                    </div>
                  </div>
                  {selectedMethod === 'upi' && <span style={{ color: 'var(--primary)', fontWeight: 700 }}>✓</span>}
                </div>

                <div
                  onClick={() => setSelectedMethod('netbanking')}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '12px',
                    border: selectedMethod === 'netbanking' ? '2px solid var(--primary)' : '1px solid var(--border)',
                    background: selectedMethod === 'netbanking' ? 'var(--primary-light)' : 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '20px' }}>🏦</span>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>HDFC Net Banking (•••• 4812)</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Direct bank transfer</div>
                    </div>
                  </div>
                  {selectedMethod === 'netbanking' && <span style={{ color: 'var(--primary)', fontWeight: 700 }}>✓</span>}
                </div>
              </div>

              <button
                onClick={handleConfirmPay}
                className="btn btn-primary btn-full"
                disabled={paying}
                style={{ padding: '14px', fontSize: '15px' }}
              >
                {paying ? 'Processing Payment...' : `Pay ${formatCurrency(12967)} Now`}
              </button>
            </div>
          </div>
        )}
      </MobileLayout>
    </>
  );
}
