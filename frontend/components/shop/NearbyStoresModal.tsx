import React, { useState } from 'react';

export interface StoreItem {
  id: string;
  name: string;
  distance: string;
  rating: string;
  address: string;
  phone: string;
  hours: string;
  lat: number;
  lng: number;
}

export const STORES_DATA: StoreItem[] = [
  {
    id: '1',
    name: 'Croma — Andheri East',
    distance: '0.8 km',
    rating: '4.3',
    address: 'Next to Metro Station, SV Road, Andheri East, Mumbai',
    phone: '+91 98200 12345',
    hours: '10:00 AM – 9:30 PM',
    lat: 19.1197,
    lng: 72.8464,
  },
  {
    id: '2',
    name: 'Reliance Digital — BKC',
    distance: '2.1 km',
    rating: '4.1',
    address: 'G-Block, Bandra Kurla Complex, Bandra East, Mumbai',
    phone: '+91 98200 67890',
    hours: '10:30 AM – 9:00 PM',
    lat: 19.0657,
    lng: 72.8686,
  },
  {
    id: '3',
    name: 'Mi Store — Malad West',
    distance: '3.4 km',
    rating: '4.5',
    address: 'Inorbit Mall 2nd Floor, Link Road, Malad West, Mumbai',
    phone: '+91 98200 54321',
    hours: '11:00 AM – 10:00 PM',
    lat: 19.1873,
    lng: 72.8364,
  },
  {
    id: '4',
    name: 'Apple Premium Reseller — Powai',
    distance: '4.2 km',
    rating: '4.6',
    address: 'Galleria Shopping Center, Hiranandani Gardens, Powai, Mumbai',
    phone: '+91 98200 99887',
    hours: '10:00 AM – 9:00 PM',
    lat: 19.1176,
    lng: 72.9060,
  },
];

interface NearbyStoresModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedStoreId?: string;
}

export function NearbyStoresModal({ isOpen, onClose, selectedStoreId }: NearbyStoresModalProps) {
  const [activeStore, setActiveStore] = useState<StoreItem>(
    STORES_DATA.find((s) => s.id === selectedStoreId) || STORES_DATA[0]
  );
  const [selectedPickup, setSelectedPickup] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'rgba(15, 23, 42, 0.65)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
    }} onClick={onClose}>
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
        {/* Handle */}
        <div style={{ width: '40px', height: '5px', background: '#E2E8F0', borderRadius: '4px', margin: '0 auto 16px' }} />

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
              Nearby 1Fi Partner Stores
            </h2>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0' }}>
              Pickup or test devices at verified 1Fi store locations
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: '#F1F5F9',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748B',
            }}
          >
            ✕
          </button>
        </div>

        {/* Stylized Map View Box */}
        <div style={{
          height: '160px',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #E0E7FF 0%, #EDE9FE 100%)',
          border: '1px solid var(--border)',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {/* Map Grid Pattern */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(#7C3AED 1px, transparent 1px)',
            backgroundSize: '16px 16px',
            opacity: 0.15,
          }} />

          {/* Location Pins */}
          {STORES_DATA.map((store) => (
            <button
              key={store.id}
              onClick={() => setActiveStore(store)}
              style={{
                position: 'absolute',
                top: store.id === '1' ? '30%' : store.id === '2' ? '60%' : store.id === '3' ? '40%' : '75%',
                left: store.id === '1' ? '25%' : store.id === '2' ? '65%' : store.id === '3' ? '80%' : '40%',
                background: activeStore.id === store.id ? 'var(--primary)' : 'white',
                color: activeStore.id === store.id ? 'white' : 'var(--primary)',
                border: '2px solid var(--primary)',
                borderRadius: '20px',
                padding: '4px 10px',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                transform: activeStore.id === store.id ? 'scale(1.1)' : 'scale(1)',
                transition: 'all 0.2s ease',
              }}
            >
              📍 {store.distance}
            </button>
          ))}

          <div style={{
            position: 'absolute',
            bottom: '8px',
            right: '12px',
            background: 'rgba(255,255,255,0.9)',
            padding: '4px 10px',
            borderRadius: '12px',
            fontSize: '10px',
            fontWeight: 600,
            color: 'var(--text-secondary)',
          }}>
            📍 Mumbai Area Map
          </div>
        </div>

        {/* Selected Store Detail Card */}
        <div className="card" style={{ padding: '16px', marginBottom: '16px', borderLeft: '4px solid var(--primary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
              {activeStore.name}
            </h3>
            <span className="badge badge-success" style={{ fontSize: '11px' }}>⭐ {activeStore.rating}</span>
          </div>

          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '6px 0 10px' }}>
            {activeStore.address}
          </p>

          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', gap: '16px', marginBottom: '14px' }}>
            <span>🕒 {activeStore.hours}</span>
            <span>📞 {activeStore.phone}</span>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => setSelectedPickup(activeStore.id)}
              className="btn btn-primary"
              style={{ flex: 1, padding: '10px', fontSize: '13px' }}
            >
              {selectedPickup === activeStore.id ? '✓ Preferred Pickup Store' : 'Select for Pickup'}
            </button>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(activeStore.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ padding: '10px 14px', fontSize: '13px', textDecoration: 'none' }}
            >
              Directions ↗
            </a>
          </div>
        </div>

        {/* Store List */}
        <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '10px' }}>
          All Partner Locations
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {STORES_DATA.map((store) => (
            <div
              key={store.id}
              onClick={() => setActiveStore(store)}
              style={{
                padding: '12px 14px',
                borderRadius: '12px',
                border: activeStore.id === store.id ? '2px solid var(--primary)' : '1px solid var(--border)',
                background: activeStore.id === store.id ? 'var(--primary-light)' : 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{store.name}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{store.distance} • ⭐ {store.rating} rating</div>
              </div>
              {activeStore.id === store.id && <span style={{ color: 'var(--primary)', fontWeight: 700 }}>✓</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
