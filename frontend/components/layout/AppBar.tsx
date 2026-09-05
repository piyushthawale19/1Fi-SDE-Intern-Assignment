import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface AppBarProps {
  title?: string;
  showBack?: boolean;
  showLogo?: boolean;
  rightAction?: React.ReactNode;
}

export function AppBar({ title, showBack, showLogo, rightAction }: AppBarProps) {
  const router = useRouter();

  return (
    <div className="app-bar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
        {showBack && (
          <button className="app-bar-back" onClick={() => router.back()} aria-label="Go back">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          </button>
        )}
        {showLogo && (
          <Link href="/shop" className="app-bar-logo">1Fi</Link>
        )}
        {title && <span className="app-bar-title">{title}</span>}
      </div>
      {rightAction && <div>{rightAction}</div>}
    </div>
  );
}
