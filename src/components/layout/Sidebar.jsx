import React from 'react';
import {
  LayoutDashboard,
  Thermometer,
  Layers,
  Snowflake,
  Truck,
  FileText,
  Settings,
  Cpu,
  ShieldCheck,
  X
} from 'lucide-react';
import { SYSTEM_DEFAULTS } from '../../types/telemetry';

export default function Sidebar({
  activeTab,
  setActiveTab,
  mobileOpen,
  setMobileOpen,
  telemetryData
}) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'temperature', label: 'Temperature', icon: Thermometer },
    { id: 'batches', label: 'Batches', icon: Layers },
    { id: 'cooling', label: 'Cooling', icon: Snowflake },
    { id: 'transport', label: 'Transport', icon: Truck },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    if (setMobileOpen) setMobileOpen(false);
  };

  return (
    <>
      {mobileOpen && (
        <div className="sidebar-backdrop" onClick={() => setMobileOpen(false)} />
      )}
      
      <aside className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div className="brand-logo-wrap">
              <div className="brand-icon">
                <Snowflake size={22} strokeWidth={2.4} />
              </div>
              <div>
                <div className="brand-title">{SYSTEM_DEFAULTS.PROJECT_NAME}</div>
                <div className="brand-slogan">Passive Milk Chilling</div>
              </div>
            </div>
            {setMobileOpen && (
              <button 
                className="mobile-menu-btn" 
                onClick={() => setMobileOpen(false)}
                style={{ display: mobileOpen ? 'block' : 'none' }}
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-label">Monitoring Views</div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => handleNavClick(item.id)}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="hardware-pill-widget">
            <div className="hw-widget-header">
              <span className="hw-widget-title">Physical Can Unit</span>
              <span className="pulse-dot" title="ESP32 Telemetry Synchronized"></span>
            </div>
            <div className="hw-widget-detail" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Cpu size={14} color="var(--accent-primary)" />
              <span>{telemetryData.deviceId}</span>
            </div>
            <div className="hw-widget-sub" style={{ marginTop: 2 }}>
              Cap: {telemetryData.milkVolumeLiters}L / 40L • PUF Insulated
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
