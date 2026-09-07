import React from 'react';
import { Play, Pause, Info, ToggleLeft, ToggleRight } from 'lucide-react';

export default function LiveBadge({
  demoMode = true,
  onToggleDemoMode,
  lastUpdated = "Just now"
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
      {/* Interactive Toggle Button */}
      <button
        type="button"
        onClick={onToggleDemoMode}
        className="btn btn-sm"
        id="top-demo-mode-btn"
        style={{
          backgroundColor: demoMode ? '#EBF5FF' : '#F1F5F9',
          color: demoMode ? '#007BFF' : '#64748B',
          border: `1.5px solid ${demoMode ? '#007BFF' : '#CBD5E1'}`,
          borderRadius: '20px',
          padding: '5px 12px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          fontWeight: 700,
          fontSize: '0.76rem',
          transition: 'all 0.2s ease',
          boxShadow: demoMode ? '0 0 0 2px rgba(0, 123, 255, 0.15)' : 'none'
        }}
        title="Click to toggle Demo Mode simulation ON / OFF"
      >
        <span style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: demoMode ? '#007BFF' : '#94A3B8',
          boxShadow: demoMode ? '0 0 0 2px #BCE0F0' : 'none'
        }}></span>
        <span>{demoMode ? '● DEMO / SIMULATED MODE : ACTIVE' : '○ DEMO / SIMULATED MODE : OFF'}</span>
      </button>

      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
        {demoMode ? `Telemetry: ${lastUpdated}` : 'Simulation Paused'}
      </div>
    </div>
  );
}
