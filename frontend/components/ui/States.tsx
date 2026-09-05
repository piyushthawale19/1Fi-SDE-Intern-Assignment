import React from 'react';

export function ProductCardSkeleton() {
  return (
    <div className="card" style={{ overflow: 'hidden' }}>
      <div className="skeleton" style={{ width: '100%', aspectRatio: '1' }} />
      <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div className="skeleton" style={{ height: '10px', width: '40%', borderRadius: '4px' }} />
        <div className="skeleton" style={{ height: '13px', width: '90%', borderRadius: '4px' }} />
        <div className="skeleton" style={{ height: '13px', width: '70%', borderRadius: '4px' }} />
        <div className="skeleton" style={{ height: '16px', width: '55%', borderRadius: '4px', marginTop: '4px' }} />
        <div className="skeleton" style={{ height: '11px', width: '65%', borderRadius: '4px' }} />
      </div>
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div>
      <div className="skeleton" style={{ width: '100%', aspectRatio: '1' }} />
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div className="skeleton" style={{ height: '12px', width: '30%' }} />
        <div className="skeleton" style={{ height: '24px', width: '85%' }} />
        <div className="skeleton" style={{ height: '24px', width: '60%' }} />
        <div className="skeleton" style={{ height: '32px', width: '45%' }} />
      </div>
    </div>
  );
}

export function EmptyState({ title, description, icon }: { title: string; description?: string; icon?: React.ReactNode }) {
  return (
    <div className="empty-state">
      {icon && <div className="empty-state-icon">{icon}</div>}
      <p className="empty-state-title">{title}</p>
      {description && <p className="empty-state-desc">{description}</p>}
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message?: string; onRetry?: () => void }) {
  return (
    <div className="error-state">
      <div style={{ color: 'var(--error)', marginBottom: '8px' }}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <p className="error-state-title">Something went wrong</p>
      <p className="error-state-desc">{message || 'Unable to load data. Please try again.'}</p>
      {onRetry && (
        <button className="btn btn-secondary btn-sm" onClick={onRetry} style={{ marginTop: '16px' }}>
          Try Again
        </button>
      )}
    </div>
  );
}
