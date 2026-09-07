import React from 'react';
import { CheckCircle2, AlertTriangle, AlertOctagon, BellRing, BatteryWarning } from 'lucide-react';
import { evaluateTemperatureStatus, STATUS_LEVELS, STATUS_CONFIG } from '../../types/telemetry';

export default function TemperatureAlerts({
  currentTemp = 6.2,
  batteryPercentage = 86,
  isLowBattery = false,
  alertMessage = null,
  temperatureStatus = null
}) {
  const currentStatus = temperatureStatus || evaluateTemperatureStatus(currentTemp);
  const config = STATUS_CONFIG[currentStatus] || STATUS_CONFIG.SAFE;
  const displayTitle = alertMessage || config.title;

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">
          <BellRing size={18} color="var(--accent-primary)" />
          <span>Temperature Alert Monitor</span>
        </div>
        <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
          Real-time Cold-Chain Rules
        </span>
      </div>

      {/* Primary Temperature Alert Banner */}
      <div className={`alert-card ${config.alertClass}`}>
        <div className="alert-icon-box">
          {currentStatus === STATUS_LEVELS.SAFE ? (
            <CheckCircle2 size={20} color="#10B981" />
          ) : currentStatus === STATUS_LEVELS.WARNING ? (
            <AlertTriangle size={20} color="#F59E0B" />
          ) : (
            <AlertOctagon size={20} color="#EF4444" />
          )}
        </div>
        <div className="alert-content">
          <div className="alert-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>{displayTitle}</span>
            <span className={`badge ${config.badgeClass}`}>{config.label}</span>
          </div>
          <div className="alert-desc">
            {config.description}
          </div>
        </div>
      </div>

      {/* Secondary Low Battery Alert (When Battery < 20%) */}
      {(batteryPercentage < 20 || isLowBattery) && (
        <div style={{
          padding: '10px 12px',
          backgroundColor: '#FFFBEB',
          border: '1px solid #FDE68A',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginBottom: 14,
          fontSize: '0.78rem',
          color: '#92400E'
        }}>
          <BatteryWarning size={18} color="#F59E0B" style={{ flexShrink: 0 }} />
          <div>
            <strong>Battery Telemetry Warning:</strong> Low battery may affect temperature monitoring reliability. (Milk chilling remains 100% passive and unaffected).
          </div>
        </div>
      )}

      {/* Threshold Reference Matrix */}
      <div style={{
        marginTop: 6,
        borderTop: '1px solid var(--border-subtle)',
        paddingTop: 12
      }}>
        <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 8 }}>
          Safety Threshold Reference Matrix
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '6px 10px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: currentStatus === STATUS_LEVELS.SAFE ? 'var(--status-safe-bg)' : 'var(--bg-primary)',
            border: currentStatus === STATUS_LEVELS.SAFE ? '1px solid var(--status-safe-border)' : '1px solid transparent',
            fontSize: '0.78rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#10B981' }}></span>
              <span style={{ fontWeight: 600 }}>SAFE (4.0°C – 7.5°C)</span>
            </div>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>Cold-chain condition maintained</span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '6px 10px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: currentStatus === STATUS_LEVELS.WARNING ? 'var(--status-warning-bg)' : 'var(--bg-primary)',
            border: currentStatus === STATUS_LEVELS.WARNING ? '1px solid var(--status-warning-border)' : '1px solid transparent',
            fontSize: '0.78rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#F59E0B' }}></span>
              <span style={{ fontWeight: 600 }}>WARNING (7.6°C – 8.0°C)</span>
            </div>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>Approaching upper target limit</span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '6px 10px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: currentStatus === STATUS_LEVELS.CRITICAL ? 'var(--status-critical-bg)' : 'var(--bg-primary)',
            border: currentStatus === STATUS_LEVELS.CRITICAL ? '1px solid var(--status-critical-border)' : '1px solid transparent',
            fontSize: '0.78rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#EF4444' }}></span>
              <span style={{ fontWeight: 600 }}>CRITICAL (&gt; 8.0°C)</span>
            </div>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>Cold-chain condition breach</span>
          </div>
        </div>
      </div>
    </div>
  );
}
