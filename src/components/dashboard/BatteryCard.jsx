import React from 'react';
import { Battery, BatteryCharging, BatteryWarning, Zap } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';

export default function BatteryCard({
  percentage = 86,
  voltage = 3.92,
  status = "GOOD"
}) {
  const isLow = percentage < 20;

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">
          <Battery size={18} color="var(--accent-primary)" />
          <span>ESP32 Node Power Telemetry</span>
        </div>
        <StatusBadge status={isLow ? "CRITICAL" : "SAFE"} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
            Battery Level
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: isLow ? '#DC2626' : 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
            {percentage}%
          </div>
        </div>

        <div style={{
          width: 54,
          height: 28,
          border: `2px solid ${isLow ? '#EF4444' : '#0F2537'}`,
          borderRadius: 4,
          padding: 2,
          position: 'relative',
          display: 'flex',
          alignItems: 'center'
        }}>
          <div style={{
            width: `${percentage}%`,
            height: '100%',
            backgroundColor: isLow ? '#EF4444' : percentage < 50 ? '#F59E0B' : '#10B981',
            borderRadius: 2,
            transition: 'width 0.3s ease'
          }}></div>
          {/* Positive terminal nub */}
          <div style={{
            position: 'absolute',
            right: -6,
            top: 6,
            width: 3,
            height: 12,
            backgroundColor: isLow ? '#EF4444' : '#0F2537',
            borderRadius: '0 2px 2px 0'
          }}></div>
        </div>
      </div>

      {isLow && (
        <div style={{
          padding: '8px 10px',
          backgroundColor: 'var(--status-critical-bg)',
          border: '1px solid var(--status-critical-border)',
          borderRadius: 'var(--radius-sm)',
          color: 'var(--status-critical-text)',
          fontSize: '0.75rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          marginBottom: 10
        }}>
          <BatteryWarning size={15} />
          <span>Low battery may affect temperature monitoring reliability.</span>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
        <div style={{ backgroundColor: 'var(--bg-primary)', padding: '6px 8px', borderRadius: 'var(--radius-sm)' }}>
          <span style={{ color: 'var(--text-muted)' }}>Cell Voltage: </span>
          <span style={{ fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{voltage.toFixed(2)}V</span>
        </div>
        <div style={{ backgroundColor: 'var(--bg-primary)', padding: '6px 8px', borderRadius: 'var(--radius-sm)' }}>
          <span style={{ color: 'var(--text-muted)' }}>Est. Runtime: </span>
          <span style={{ fontWeight: 600, fontFamily: 'var(--font-mono)' }}>~{Math.round(percentage * 0.5)} Hours</span>
        </div>
      </div>

      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 10 }}>
        *Powers only the low-power ESP32 & DS18B20 sensor. Milk chilling is 100% passive (zero continuous power).
      </div>
    </div>
  );
}
