import React from 'react';
import { BottomNav } from './BottomNav';

interface MobileLayoutProps {
  children: React.ReactNode;
  showBottomNav?: boolean;
}

export function MobileLayout({ children, showBottomNav = true }: MobileLayoutProps) {
  return (
    <div className="app-shell">
      <div className="mobile-frame">
        <div className="page-content">
          {children}
        </div>
        {showBottomNav && <BottomNav />}
      </div>
    </div>
  );
}
