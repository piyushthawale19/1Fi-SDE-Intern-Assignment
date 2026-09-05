import React, { useState } from 'react';
import Head from 'next/head';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { AppBar } from '@/components/layout/AppBar';

export default function TermsPage() {
  const [activeTab, setActiveTab] = useState<'terms' | 'credit' | 'privacy'>('terms');

  return (
    <>
      <Head>
        <title>Terms & Privacy — 1Fi</title>
        <meta name="description" content="1Fi Terms of Service, Credit Agreement, and Privacy Policy." />
      </Head>
      <MobileLayout>
        <AppBar title="Terms & Privacy" showBack />

        <div style={{ padding: '16px' }}>
          {/* Tabs */}
          <div style={{
            display: 'flex',
            background: '#F4F0FD',
            borderRadius: '12px',
            padding: '4px',
            marginBottom: '16px',
          }}>
            <button
              onClick={() => setActiveTab('terms')}
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'terms' ? 'white' : 'transparent',
                color: activeTab === 'terms' ? 'var(--primary)' : 'var(--text-secondary)',
                fontWeight: activeTab === 'terms' ? 700 : 500,
                fontSize: '12px',
                boxShadow: activeTab === 'terms' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
              }}
            >
              Terms of Service
            </button>
            <button
              onClick={() => setActiveTab('credit')}
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'credit' ? 'white' : 'transparent',
                color: activeTab === 'credit' ? 'var(--primary)' : 'var(--text-secondary)',
                fontWeight: activeTab === 'credit' ? 700 : 500,
                fontSize: '12px',
                boxShadow: activeTab === 'credit' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
              }}
            >
              Credit Agreement
            </button>
            <button
              onClick={() => setActiveTab('privacy')}
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'privacy' ? 'white' : 'transparent',
                color: activeTab === 'privacy' ? 'var(--primary)' : 'var(--text-secondary)',
                fontWeight: activeTab === 'privacy' ? 700 : 500,
                fontSize: '12px',
                boxShadow: activeTab === 'privacy' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
              }}
            >
              Privacy Policy
            </button>
          </div>

          {/* Content Document Card */}
          <div className="card" style={{ padding: '20px', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.7, border: '1px solid #E4DCF9' }}>
            {activeTab === 'terms' && (
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
                  1Fi Platform Terms of Service
                </h3>
                <p style={{ marginBottom: '12px' }}>
                  Welcome to 1Fi. By accessing or using our mobile application and marketplace services, you agree to be bound by these Terms of Service.
                </p>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '14px', marginBottom: '6px' }}>
                  1. Eligibility & Verification
                </h4>
                <p style={{ marginBottom: '12px' }}>
                  To access 1Fi Credit Line and purchase products on EMI, you must be a resident of India aged 21 or above, and undergo mandatory KYC verification in compliance with RBI guidelines.
                </p>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '14px', marginBottom: '6px' }}>
                  2. Orders & EMI Repayments
                </h4>
                <p style={{ marginBottom: '12px' }}>
                  All purchases made on the 1Fi Marketplace are processed under an instant digital EMI agreement. You authorize 1Fi and its partner RBI-registered NBFCs to debit monthly EMI amounts on your due date via e-NACH/Autopay.
                </p>
              </div>
            )}

            {activeTab === 'credit' && (
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
                  1Fi Pre-Approved Credit Line Agreement
                </h3>
                <p style={{ marginBottom: '12px' }}>
                  This Credit Line Facility Agreement is entered into between you (the Borrower) and 1Fi Lender Partners (RBI Regulated Financial Institutions).
                </p>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '14px', marginBottom: '6px' }}>
                  1. Sanctioned Limit & Tenure
                </h4>
                <p style={{ marginBottom: '12px' }}>
                  Your pre-approved credit limit is determined based on credit bureau assessment and income verification. No interest is charged during 0% No-Cost EMI promotions.
                </p>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '14px', marginBottom: '6px' }}>
                  2. Foreclosure & Zero Charges
                </h4>
                <p style={{ marginBottom: '12px' }}>
                  Borrowers have the right to foreclose any active EMI plan early with 0% foreclosure penalties or hidden cancellation fees.
                </p>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
                  1Fi Privacy Policy & Data Security
                </h3>
                <p style={{ marginBottom: '12px' }}>
                  1Fi is committed to protecting your financial and personal data using bank-grade 256-bit SSL encryption.
                </p>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '14px', marginBottom: '6px' }}>
                  1. Information We Collect
                </h4>
                <p style={{ marginBottom: '12px' }}>
                  We collect basic profile information (Name, Email, Phone), KYC identifiers (PAN/Aadhaar for credit processing), and transaction history solely for servicing your account.
                </p>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '14px', marginBottom: '6px' }}>
                  2. Data Protection
                </h4>
                <p style={{ marginBottom: '12px' }}>
                  We never sell or share your personal information to third-party telemarketers. All credit processing complies with RBI Fair Practices Code.
                </p>
              </div>
            )}
          </div>
        </div>
      </MobileLayout>
    </>
  );
}
