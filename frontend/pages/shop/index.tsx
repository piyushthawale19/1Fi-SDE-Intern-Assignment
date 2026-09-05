import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { AppBar } from '@/components/layout/AppBar';
import { useAuthStore } from '@/store/authStore';
import { NearbyStoresModal, STORES_DATA } from '@/components/shop/NearbyStoresModal';
import { formatCurrency, calculateEMI } from '@/lib/emiUtils';

const BRANDS = [
  {
    name: 'Apple',
    logo: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.09c.65-.79 1.1-1.9 1-3.09-1.05.04-2.32.7-3.06 1.57-.66.77-1.14 1.92-1 3.09 1.18.09 2.37-.58 3.06-1.57z" />
      </svg>
    ),
  },
  {
    name: 'Samsung',
    logo: (
      <span style={{ fontWeight: 900, fontSize: '9px', letterSpacing: '0.2px', textTransform: 'uppercase', color: 'var(--primary)' }}>
        SAMSUNG
      </span>
    ),
  },
  {
    name: 'Sony',
    logo: (
      <span style={{ fontWeight: 900, fontSize: '11px', letterSpacing: '1px', fontFamily: 'serif', color: 'var(--primary)' }}>
        SONY
      </span>
    ),
  },
  {
    name: 'OnePlus',
    logo: (
      <span style={{ fontWeight: 800, fontSize: '12px', color: 'var(--primary)' }}>
        1+
      </span>
    ),
  },
  {
    name: 'Bose',
    logo: (
      <span style={{ fontWeight: 900, fontStyle: 'italic', fontSize: '11px', letterSpacing: '0.5px', color: 'var(--primary)' }}>
        BOSE
      </span>
    ),
  },
];

const OFFERS = [
  {
    tag: 'LIMITED TIME',
    title: '0% Interest No-Cost EMI',
    desc: 'Pay in 3 or 6 months with zero extra charges on flagship phones',
    bg: 'linear-gradient(135deg, #1E1B4B 0%, #4C1D95 100%)',
  },
  {
    tag: 'INSTANT REBATE',
    title: 'Flat ₹5,000 Off on Laptops',
    desc: 'Apply 1Fi Credit Limit at checkout for instant price reduction',
    bg: 'linear-gradient(135deg, #065F46 0%, #047857 100%)',
  },
  {
    tag: 'ZERO FEES',
    title: 'Free Express Delivery',
    desc: 'Doorstep device delivery within 24 hours in major metro areas',
    bg: 'linear-gradient(135deg, #991B1B 0%, #B91C1C 100%)',
  },
];

export default function ShopPage() {
  const { user } = useAuthStore();
  const greeting = user?.name ? `Hey, ${user.name.split(' ')[0]}!` : 'Hey there!';

  const [isMapOpen, setIsMapOpen] = useState(false);
  const [selectedStoreId, setSelectedStoreId] = useState<string | undefined>();
  const [calcAmount, setCalcAmount] = useState<number>(60000);

  const emi3 = calculateEMI(calcAmount, 0, 3);
  const emi6 = calculateEMI(calcAmount, 0, 6);
  const emi12 = calculateEMI(calcAmount, 12, 12);

  return (
    <>
      <Head>
        <title>Shop — 1Fi</title>
        <meta name="description" content="Browse top brands, nearby stores, and the 1Fi Marketplace for easy EMI purchases." />
      </Head>
      <MobileLayout>
        <AppBar showLogo rightAction={
          !user ? (
            <Link href="/auth/login" className="btn btn-secondary btn-sm">Sign In</Link>
          ) : (
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500 }}>{user.name || user.email}</span>
          )
        } />

        {/* Header */}
        <div className="shop-header">
          <p className="shop-header-greeting">{greeting}</p>
          <h1 className="shop-header-title">What are you shopping for?</h1>
        </div>

        {/* 1Fi Marketplace — Primary CTA */}
        <div style={{ padding: '20px 16px 0' }}>
          <Link href="/shop/marketplace" className="marketplace-banner">
            <div className="marketplace-banner-text">
              <h3>1Fi Marketplace</h3>
              <p>Shop thousands of products on easy EMI</p>
            </div>
            <div className="marketplace-banner-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
            </div>
          </Link>
        </div>

        {/* Top Brands */}
        <div className="shop-section">
          <div className="shop-section-header">
            <h2 className="shop-section-title">Top Brands</h2>
            <Link href="/shop/marketplace" className="shop-section-link" style={{ textDecoration: 'none' }}>
              See all
            </Link>
          </div>
          <div className="stub-section" style={{ background: '#F4F0FD', padding: '12px', borderRadius: '16px' }}>
            {BRANDS.map((brand) => (
              <Link
                key={brand.name}
                href={`/shop/marketplace?brand=${encodeURIComponent(brand.name)}`}
                className="stub-brand-card"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div className="stub-brand-logo" style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '14px',
                  background: 'white',
                  border: '1px solid #E4DCF9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  padding: '4px',
                  boxShadow: '0 2px 6px rgba(124, 58, 237, 0.08)',
                }}>
                  {brand.logo}
                </div>
                <span className="stub-brand-name" style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  {brand.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Nearby Stores */}
        <div className="shop-section" style={{ paddingTop: 0 }}>
          <div className="shop-section-header">
            <h2 className="shop-section-title">Nearby Stores</h2>
            <button
              onClick={() => {
                setSelectedStoreId(undefined);
                setIsMapOpen(true);
              }}
              className="shop-section-link"
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
            >
              View map
            </button>
          </div>
          <div className="stub-section" style={{ background: '#F4F0FD', padding: '12px', borderRadius: '16px' }}>
            {STORES_DATA.map((store) => (
              <div
                key={store.id}
                className="stub-store-card"
                onClick={() => {
                  setSelectedStoreId(store.id);
                  setIsMapOpen(true);
                }}
                style={{
                  cursor: 'pointer',
                  background: 'white',
                  border: '1px solid #E4DCF9',
                  borderRadius: '14px',
                  padding: '12px',
                  boxShadow: '0 2px 6px rgba(124, 58, 237, 0.06)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: 600 }}>{store.distance}</span>
                </div>
                <div className="stub-store-name" style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>{store.name}</div>
                <div className="stub-store-distance" style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '4px' }}>⭐ {store.rating} rating</div>
              </div>
            ))}
          </div>
        </div>

        {/* NEW SECTION 1: Trending EMI Offers & Deals */}
        <div className="shop-section" style={{ paddingTop: 0 }}>
          <div className="shop-section-header">
            <h2 className="shop-section-title">Trending EMI Offers</h2>
            <Link href="/shop/marketplace" className="shop-section-link" style={{ textDecoration: 'none' }}>
              Explore
            </Link>
          </div>
          <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: '4px' }}>
            {OFFERS.map((offer) => (
              <div
                key={offer.title}
                style={{
                  flexShrink: 0,
                  width: '240px',
                  background: offer.bg,
                  borderRadius: '16px',
                  padding: '16px',
                  color: 'white',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
              >
                <span style={{ fontSize: '10px', fontWeight: 800, background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '10px', letterSpacing: '0.5px' }}>
                  {offer.tag}
                </span>
                <h3 style={{ fontSize: '15px', fontWeight: 700, margin: '8px 0 4px', color: 'white' }}>{offer.title}</h3>
                <p style={{ fontSize: '12px', opacity: 0.85, margin: 0, lineHeight: 1.4 }}>{offer.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* NEW SECTION 2: Interactive EMI Calculator Widget */}
        <div className="shop-section" style={{ paddingTop: 0, paddingBottom: '24px' }}>
          <div className="card" style={{ padding: '18px', background: 'linear-gradient(135deg, #FAF8FF 0%, #F3EFFF 100%)', border: '1px solid #E4DCF9' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                  Quick EMI Calculator
                </h3>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0' }}>
                  Slide to estimate your monthly payment
                </p>
              </div>
              <span className="badge badge-primary" style={{ fontSize: '11px' }}>Interactive</span>
            </div>

            <div style={{ margin: '14px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
                <span>Purchase Amount:</span>
                <span style={{ color: 'var(--primary)', fontSize: '16px' }}>{formatCurrency(calcAmount)}</span>
              </div>
              <input
                type="range"
                min="10000"
                max="150000"
                step="5000"
                value={calcAmount}
                onChange={(e) => setCalcAmount(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--primary)', cursor: 'pointer' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '14px' }}>
              <div style={{ background: 'white', borderRadius: '10px', padding: '8px', textAlign: 'center', border: '1px solid #E4DCF9' }}>
                <span style={{ fontSize: '10px', color: 'var(--text-secondary)', display: 'block' }}>3 Months (0%)</span>
                <strong style={{ fontSize: '13px', color: 'var(--primary)' }}>{formatCurrency(emi3)}/mo</strong>
              </div>
              <div style={{ background: 'white', borderRadius: '10px', padding: '8px', textAlign: 'center', border: '1px solid #E4DCF9' }}>
                <span style={{ fontSize: '10px', color: 'var(--text-secondary)', display: 'block' }}>6 Months (0%)</span>
                <strong style={{ fontSize: '13px', color: 'var(--primary)' }}>{formatCurrency(emi6)}/mo</strong>
              </div>
              <div style={{ background: 'white', borderRadius: '10px', padding: '8px', textAlign: 'center', border: '1px solid #E4DCF9' }}>
                <span style={{ fontSize: '10px', color: 'var(--text-secondary)', display: 'block' }}>12 Months (12%)</span>
                <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>{formatCurrency(emi12)}/mo</strong>
              </div>
            </div>

            <Link href="/shop/marketplace" className="btn btn-primary btn-full" style={{ padding: '10px', fontSize: '13px' }}>
              Shop Eligible Products
            </Link>
          </div>
        </div>

        {/* Nearby Stores Drawer Modal */}
        <NearbyStoresModal
          isOpen={isMapOpen}
          onClose={() => setIsMapOpen(false)}
          selectedStoreId={selectedStoreId}
        />
      </MobileLayout>
    </>
  );
}
