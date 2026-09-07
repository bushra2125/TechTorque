import React from 'react';
import { Menu } from 'lucide-react';
import LiveBadge from '../common/LiveBadge';

export default function TopHeader({
  setMobileOpen,
  monitoringState = {},
  onToggleDemoMode
}) {
  const demoMode = monitoringState?.demoMode ?? true;
  const lastUpdated = monitoringState?.lastUpdated || "Just now";

  return (
    <header className="top-navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <button 
          className="mobile-menu-btn" 
          onClick={() => setMobileOpen && setMobileOpen(true)}
          aria-label="Open Navigation Menu"
        >
          <Menu size={20} />
        </button>

        <div className="header-meta">
          <h1 className="page-title">Milk Chilling Dashboard</h1>
          <p className="page-subtitle">
            Monitor milk temperature, cooling performance and storage conditions.
          </p>
        </div>
      </div>

      <div className="top-actions">
        <LiveBadge 
          demoMode={demoMode}
          onToggleDemoMode={onToggleDemoMode}
          lastUpdated={lastUpdated}
        />
      </div>
    </header>
  );
}
