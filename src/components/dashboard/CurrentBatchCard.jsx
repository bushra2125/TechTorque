import React from 'react';
import { Layers, Clock, Milk, Calendar } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';

export default function CurrentBatchCard({
  batchId = "MC-001",
  milkVolume = 35,
  collectionTime = "08:30 AM",
  currentTemp = 6.2,
  duration = "06h 26m",
  durationSeconds = 23160,
  temperatureStatus = "SAFE",
  farmerName = "Rajeshwar Patil (ID: DL-884)",
  cooperative = "Anand Rural Dairy Cluster #04"
}) {
  const minHoursSeconds = 6 * 3600;
  const progressPct = Math.min(100, Math.round((durationSeconds / minHoursSeconds) * 100));

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">
          <Layers size={18} color="var(--accent-primary)" />
          <span>Current Active Batch</span>
        </div>
        <StatusBadge status={temperatureStatus} size="large" />
      </div>

      {/* Batch Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        backgroundColor: 'var(--accent-secondary)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--accent-secondary-border)',
        marginBottom: 16
      }}>
        <div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
            Active Batch Identifier
          </div>
          <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
            {batchId}
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
            Milk Volume
          </div>
          <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>
            {milkVolume} <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Litres</span>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 16 }}>
        <div style={{
          padding: '10px 12px',
          backgroundColor: 'var(--bg-primary)',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-light)'
        }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 2 }}>
            <Calendar size={13} />
            <span>Collection Time</span>
          </div>
          <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
            {collectionTime}
          </div>
        </div>

        <div style={{
          padding: '10px 12px',
          backgroundColor: 'var(--bg-primary)',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-light)'
        }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 2 }}>
            <Milk size={13} />
            <span>Current Temperature</span>
          </div>
          <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
            {currentTemp.toFixed(1)}°C ({temperatureStatus})
          </div>
        </div>
      </div>

      {/* Duration Progress */}
      <div style={{
        padding: '12px 14px',
        backgroundColor: '#FAFCFE',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-light)',
        marginBottom: 14
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
          <div style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Clock size={14} color="var(--accent-primary)" />
            <span>Cooling Duration:</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', color: 'var(--accent-primary)' }}>
              {duration}
            </span>
          </div>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Target: 6–12 Hours</span>
        </div>

        <div style={{
          width: '100%',
          height: '8px',
          backgroundColor: '#E2E8F0',
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${progressPct}%`,
            height: '100%',
            backgroundColor: durationSeconds >= 21600 ? '#10B981' : '#007BFF',
            borderRadius: '4px',
            transition: 'width 0.3s ease'
          }}></div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontSize: '0.68rem', color: 'var(--text-muted)' }}>
          <span>0h (Start)</span>
          <span style={{ color: '#065F46', fontWeight: 600 }}>6h Target Reached</span>
          <span>12h Max</span>
        </div>
      </div>

      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <div><strong>Farmer:</strong> {farmerName}</div>
        <div><strong>Cooperative:</strong> {cooperative}</div>
      </div>
    </div>
  );
}
