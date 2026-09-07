import React from 'react';
import { Sliders, CheckCircle2, AlertTriangle, AlertOctagon, Zap, RotateCcw, Power, Info } from 'lucide-react';

export default function SimulationControls({
  monitoringState,
  onSelectScenario,
  onReset,
  onToggleDemoMode
}) {
  const selected = monitoringState?.selectedScenario || "Normal Safe";
  const scenarioKey = monitoringState?.scenarioKey || "NORMAL";
  const isDemoActive = monitoringState?.demoMode ?? true;

  const isNormal = selected === "Normal Safe" || scenarioKey === "NORMAL";
  const isWarning = selected === "Warning" || scenarioKey === "WARNING";
  const isCritical = selected === "Critical Spike" || scenarioKey === "CRITICAL";
  const isLowBattery = selected === "Low Battery" || scenarioKey === "LOW_BATTERY";

  const getScenarioBadgeClass = () => {
    if (isWarning) return "badge-warning";
    if (isCritical) return "badge-critical";
    if (isLowBattery) return "badge-warning";
    return "badge-safe";
  };

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      border: `1.5px solid ${isDemoActive ? '#007BFF' : 'var(--border-light)'}`,
      borderRadius: 'var(--radius-lg)',
      padding: '16px 20px',
      marginBottom: 20,
      boxShadow: isDemoActive ? '0 4px 12px rgba(0, 123, 255, 0.08)' : 'var(--shadow-card)',
      transition: 'all 0.25s ease'
    }}>
      {/* Header with Title and Interactive DEMO / SIMULATED MODE Button */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 14,
        flexWrap: 'wrap',
        gap: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            backgroundColor: isDemoActive ? '#EBF5FF' : '#F1F5F9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isDemoActive ? '#007BFF' : '#64748B'
          }}>
            <Sliders size={18} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                DEMO / SIMULATED MODE
              </span>
              <span className={`badge ${isDemoActive ? 'badge-safe' : 'badge-warning'}`} style={{ fontSize: '0.72rem', padding: '2px 8px' }}>
                {isDemoActive ? 'ACTIVE' : 'PAUSED'}
              </span>
            </div>
            <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: 2 }}>
              Interactive SIH 2026 Judge Simulation Controls
            </div>
          </div>
        </div>

        {/* Master Toggle Button & Active Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          {isDemoActive && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.76rem' }}>
              <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Active Scenario:</span>
              <span className={`badge ${getScenarioBadgeClass()}`} style={{ fontSize: '0.76rem', padding: '3px 10px', fontWeight: 700 }}>
                {selected}
              </span>
            </div>
          )}

          <button
            type="button"
            onClick={onToggleDemoMode}
            className="btn btn-sm"
            id="demo-mode-toggle-btn"
            style={{
              backgroundColor: isDemoActive ? '#007BFF' : '#F8FAFC',
              color: isDemoActive ? '#FFFFFF' : '#475569',
              border: `1.5px solid ${isDemoActive ? '#007BFF' : '#CBD5E1'}`,
              borderRadius: '20px',
              padding: '6px 14px',
              fontWeight: 700,
              fontSize: '0.78rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              cursor: 'pointer',
              boxShadow: isDemoActive ? '0 2px 8px rgba(0, 123, 255, 0.25)' : 'none',
              transition: 'all 0.2s ease'
            }}
            title="Click to toggle Demo Mode on/off"
          >
            <Power size={14} />
            <span>{isDemoActive ? 'DEMO MODE ACTIVE' : 'ACTIVATE DEMO MODE'}</span>
          </button>
        </div>
      </div>

      {/* Scenario Action Buttons (Active when Demo Mode is ON) */}
      {isDemoActive ? (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          flexWrap: 'wrap',
          backgroundColor: '#F8FAFC',
          padding: '10px 12px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid #E2E8F0'
        }}>
          {/* 1. Normal Safe */}
          <button
            type="button"
            id="scenario-normal-btn"
            onClick={() => onSelectScenario("NORMAL")}
            className="btn btn-sm"
            style={{
              backgroundColor: isNormal ? '#10B981' : '#FFFFFF',
              borderColor: isNormal ? '#059669' : '#CBD5E1',
              color: isNormal ? '#FFFFFF' : '#0F2537',
              fontWeight: isNormal ? 800 : 600,
              boxShadow: isNormal ? '0 2px 6px rgba(16, 185, 129, 0.3)' : 'none',
              padding: '7px 14px',
              borderRadius: '6px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              cursor: 'pointer'
            }}
          >
            <CheckCircle2 size={15} color={isNormal ? "#FFFFFF" : "#10B981"} />
            <span>Normal Safe (6.2°C)</span>
          </button>

          {/* 2. Warning */}
          <button
            type="button"
            id="scenario-warning-btn"
            onClick={() => onSelectScenario("WARNING")}
            className="btn btn-sm"
            style={{
              backgroundColor: isWarning ? '#F59E0B' : '#FFFFFF',
              borderColor: isWarning ? '#D97706' : '#CBD5E1',
              color: isWarning ? '#FFFFFF' : '#0F2537',
              fontWeight: isWarning ? 800 : 600,
              boxShadow: isWarning ? '0 2px 6px rgba(245, 158, 11, 0.3)' : 'none',
              padding: '7px 14px',
              borderRadius: '6px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              cursor: 'pointer'
            }}
          >
            <AlertTriangle size={15} color={isWarning ? "#FFFFFF" : "#F59E0B"} />
            <span>Warning (7.8°C)</span>
          </button>

          {/* 3. Critical Spike */}
          <button
            type="button"
            id="scenario-critical-btn"
            onClick={() => onSelectScenario("CRITICAL")}
            className="btn btn-sm"
            style={{
              backgroundColor: isCritical ? '#EF4444' : '#FFFFFF',
              borderColor: isCritical ? '#DC2626' : '#CBD5E1',
              color: isCritical ? '#FFFFFF' : '#0F2537',
              fontWeight: isCritical ? 800 : 600,
              boxShadow: isCritical ? '0 2px 6px rgba(239, 68, 68, 0.3)' : 'none',
              padding: '7px 14px',
              borderRadius: '6px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              cursor: 'pointer'
            }}
          >
            <AlertOctagon size={15} color={isCritical ? "#FFFFFF" : "#EF4444"} />
            <span>Critical Spike (8.9°C)</span>
          </button>

          {/* 4. Low Battery */}
          <button
            type="button"
            id="scenario-lowbattery-btn"
            onClick={() => onSelectScenario("LOW_BATTERY")}
            className="btn btn-sm"
            style={{
              backgroundColor: isLowBattery ? '#991B1B' : '#FFFFFF',
              borderColor: isLowBattery ? '#7F1D1D' : '#CBD5E1',
              color: isLowBattery ? '#FFFFFF' : '#0F2537',
              fontWeight: isLowBattery ? 800 : 600,
              boxShadow: isLowBattery ? '0 2px 6px rgba(153, 27, 27, 0.3)' : 'none',
              padding: '7px 14px',
              borderRadius: '6px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              cursor: 'pointer'
            }}
          >
            <Zap size={15} color={isLowBattery ? "#FCD34D" : "#F59E0B"} />
            <span>Low Battery (14%)</span>
          </button>

          {/* 5. Reset */}
          <button
            type="button"
            id="scenario-reset-btn"
            onClick={onReset}
            className="btn btn-sm btn-secondary"
            style={{
              padding: '7px 14px',
              marginLeft: 'auto',
              borderRadius: '6px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              cursor: 'pointer'
            }}
            title="Restore default Normal Safe baseline"
          >
            <RotateCcw size={14} />
            <span>↻ Reset</span>
          </button>
        </div>
      ) : (
        <div style={{
          padding: '12px 14px',
          backgroundColor: '#F8FAFC',
          border: '1px dashed #CBD5E1',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.8rem',
          color: '#64748B',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 10
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Info size={16} color="#64748B" />
            <span>Simulation paused. Click <strong>"ACTIVATE DEMO MODE"</strong> above to test interactive judge scenarios.</span>
          </div>
          <button
            type="button"
            onClick={onToggleDemoMode}
            className="btn btn-sm btn-primary"
            style={{ padding: '4px 12px', fontSize: '0.75rem' }}
          >
            Enable Demo Mode
          </button>
        </div>
      )}

      {/* SIH Hardware Disclaimer */}
      <div style={{
        marginTop: 10,
        fontSize: '0.72rem',
        color: 'var(--text-muted)',
        display: 'flex',
        alignItems: 'center',
        gap: 6
      }}>
        <span>💡</span>
        <span>
          <strong>SIH 2026 Prototype Note:</strong> Simulated sensor values demonstrate real-time response. Physical pipeline: <code>DS18B20 → ESP32 → Dashboard</code>.
        </span>
      </div>
    </div>
  );
}

