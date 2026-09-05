import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { AppBar } from '@/components/layout/AppBar';
import { useAuthStore } from '@/store/authStore';
import { formatCurrency } from '@/lib/emiUtils';

export default function AccountPage() {
  const router = useRouter();
  const { user, token, logout } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <MobileLayout>
        <AppBar title="My Account" showLogo />
        <div style={{ padding: '32px 16px', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading...</div>
      </MobileLayout>
    );
  }

  return (
    <>
      <Head>
        <title>My Account — 1Fi</title>
        <meta name="description" content="Manage your 1Fi account, active EMIs, and personal settings." />
      </Head>
      <MobileLayout>
        <AppBar title="My Account" showLogo />

        {!token || !user ? (
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
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>
              Sign in to access your Account
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
              Track your orders, manage your 1Fi credit limit, and view active EMI plans.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <Link href="/auth/login" className="btn btn-primary" style={{ padding: '12px 28px' }}>
                Sign In
              </Link>
              <Link href="/auth/register" className="btn btn-secondary" style={{ padding: '12px 28px' }}>
                Register
              </Link>
            </div>
          </div>
        ) : (
          <div style={{ padding: '16px' }}>
            {/* User Profile Header */}
            <div className="card" style={{ padding: '20px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid #E4DCF9' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'var(--primary)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '22px',
                boxShadow: '0 4px 12px rgba(124, 58, 237, 0.25)',
              }}>
                {user.name ? user.name[0].toUpperCase() : 'U'}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                    {user.name || '1Fi User'}
                  </h2>
                  <span className="badge badge-success" style={{ fontSize: '11px' }}>✓ Verified</span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '2px 0 0' }}>
                  {user.email}
                </p>
              </div>
            </div>

            {/* Pre-Approved Credit Line Banner */}
            <div style={{
              background: 'linear-gradient(135deg, #7C3AED 0%, #4C1D95 100%)',
              borderRadius: '16px',
              padding: '20px',
              color: 'white',
              marginBottom: '20px',
              boxShadow: '0 8px 24px rgba(124, 58, 237, 0.25)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '12px', opacity: 0.9, fontWeight: 500, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                  1Fi Pre-Approved Credit Line
                </span>
                <span className="badge" style={{ background: 'rgba(255, 255, 255, 0.2)', color: 'white', border: 'none' }}>
                  Active
                </span>
              </div>
              <div style={{ fontSize: '28px', fontWeight: 800, marginBottom: '6px' }}>
                {formatCurrency(150000)}
              </div>
              <div style={{ fontSize: '12px', opacity: 0.85, display: 'flex', justifyContent: 'space-between' }}>
                <span>Available Limit: {formatCurrency(125000)}</span>
                <span>0% Interest EMI eligible</span>
              </div>
            </div>

            {/* Quick Menu Sections */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                My Activity
              </h3>
              <div className="card" style={{ overflow: 'hidden', border: '1px solid #E4DCF9' }}>
                <Link href="/account/orders" style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', borderBottom: '1px solid var(--border)', textDecoration: 'none', color: 'var(--text-primary)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '12px' }}>
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 01-8 0" />
                  </svg>
                  <span style={{ flex: 1, fontWeight: 600, fontSize: '14px' }}>My Orders</span>
                  <span style={{ color: 'var(--text-secondary)' }}>›</span>
                </Link>

                <Link href="/wallet" style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', textDecoration: 'none', color: 'var(--text-primary)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '12px' }}>
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                    <line x1="1" y1="10" x2="23" y2="10" />
                  </svg>
                  <span style={{ flex: 1, fontWeight: 600, fontSize: '14px' }}>My 1Fi Wallet & EMIs</span>
                  <span style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: 600, marginRight: '8px' }}>₹1.25L</span>
                  <span style={{ color: 'var(--text-secondary)' }}>›</span>
                </Link>
              </div>
            </div>

            {/* Account Settings */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Settings & Support
              </h3>
              <div className="card" style={{ overflow: 'hidden', border: '1px solid #E4DCF9' }}>
                <div style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', borderBottom: '1px solid var(--border)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '12px' }}>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <span style={{ flex: 1, fontWeight: 500, fontSize: '14px' }}>KYC & Verification</span>
                  <span className="badge badge-success" style={{ fontSize: '11px' }}>Completed</span>
                </div>

                <Link href="/help" style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', borderBottom: '1px solid var(--border)', textDecoration: 'none', color: 'var(--text-primary)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '12px' }}>
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                  <span style={{ flex: 1, fontWeight: 500, fontSize: '14px' }}>Help & Support</span>
                  <span style={{ color: 'var(--text-secondary)' }}>›</span>
                </Link>

                <Link href="/terms" style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', textDecoration: 'none', color: 'var(--text-primary)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '12px' }}>
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  <span style={{ flex: 1, fontWeight: 500, fontSize: '14px' }}>Terms & Privacy</span>
                  <span style={{ color: 'var(--text-secondary)' }}>›</span>
                </Link>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={() => {
                logout();
                router.push('/shop');
              }}
              className="btn"
              style={{
                width: '100%',
                padding: '14px',
                background: '#FEE2E2',
                color: '#DC2626',
                fontWeight: 600,
                border: '1px solid #FCA5A5',
              }}
            >
              Sign Out
            </button>
          </div>
        )}
      </MobileLayout>
    </>
  );
}
