import React from 'react';
import { Milk, CheckCircle2, AlertTriangle, AlertOctagon, Thermometer, ShieldCheck } from 'lucide-react';
import { STORAGE_SUMMARY } from '../../services/demoDataService';
import { evaluateColdChainStatus, COLD_CHAIN_STATUS } from '../../types/telemetry';

export default function StorageSummary({
  summary = STORAGE_SUMMARY,
  currentTemp = 6.2,
  coldChainStatus = COLD_CHAIN_STATUS.MAINTAINED
}) {
  const isBreach = coldChainStatus === COLD_CHAIN_STATUS.BREACH;
  const isAtRisk = coldChainStatus === COLD_CHAIN_STATUS.AT_RISK;

  const getColdChainColor = () => {
    if (isBreach) return '#991B1B';
    if (isAtRisk) return '#92400E';
    return '#065F46';
  };

  const getColdChainBadge = () => {
    if (isBreach) return 'badge-critical';
    if (isAtRisk) return 'badge-warning';
    return 'badge-safe';
  };

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-title">
            <ShieldCheck size={18} color="var(--accent-primary)" />
            <span>Milk Storage & Cold-Chain Summary</span>
          </div>
          <div className="card-subtitle">
            Aggregate thermal compliance indicators across rural collection pool
          </div>
        </div>
        <span className={`badge ${getColdChainBadge()}`}>{coldChainStatus}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        {/* Total Milk */}
        <div style={{
          backgroundColor: 'var(--bg-primary)',
          padding: '12px 14px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-light)'
        }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
            <Milk size={13} />
            <span>Total Milk Collected</span>
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', marginTop: 4 }}>
            {summary.totalMilkCollected} <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>L</span>
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 2 }}>
            Capacity standard: 30–40 L per can
          </div>
        </div>

        {/* Number of Batches */}
        <div style={{
          backgroundColor: 'var(--bg-primary)',
          padding: '12px 14px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-light)'
        }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
            Number of Batches
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', marginTop: 4 }}>
            {summary.totalBatches} <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Batches</span>
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 2 }}>
            4 Active • 1 In-Transit
          </div>
        </div>

        {/* Average Temperature */}
        <div style={{
          backgroundColor: 'var(--bg-primary)',
          padding: '12px 14px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-light)'
        }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
            <Thermometer size={13} />
            <span>Average Temperature</span>
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#065F46', fontFamily: 'var(--font-mono)', marginTop: 4 }}>
            {summary.avgStorageTemp}°C
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 2 }}>
            Target Range: 4.0°C – 8.0°C
          </div>
        </div>

        {/* Safe Batches */}
        <div style={{
          backgroundColor: 'var(--bg-primary)',
          padding: '12px 14px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-light)'
        }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
            <CheckCircle2 size={13} color="#10B981" />
            <span>Safe Batches</span>
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#065F46', fontFamily: 'var(--font-mono)', marginTop: 4 }}>
            {summary.safeBatchesCount} <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>({Math.round((summary.safeBatchesCount / summary.totalBatches) * 100)}%)</span>
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 2 }}>
            Maintained under 7.5°C
          </div>
        </div>

        {/* Warning Batches */}
        <div style={{
          backgroundColor: 'var(--bg-primary)',
          padding: '12px 14px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-light)'
        }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
            <AlertTriangle size={13} color="#F59E0B" />
            <span>Warning Batches</span>
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#92400E', fontFamily: 'var(--font-mono)', marginTop: 4 }}>
            {summary.warningBatchesCount} <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>({Math.round((summary.warningBatchesCount / summary.totalBatches) * 100)}%)</span>
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 2 }}>
            Near 7.8°C upper threshold
          </div>
        </div>

        {/* Cold-Chain Status */}
        <div style={{
          backgroundColor: 'var(--bg-primary)',
          padding: '12px 14px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-light)'
        }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
            Cold-Chain Status
          </div>
          <div style={{ fontSize: '1.15rem', fontWeight: 800, color: getColdChainColor(), marginTop: 4, lineHeight: 1.2 }}>
            {coldChainStatus}
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 2 }}>
            Thermal compliance indicator
          </div>
        </div>
      </div>
    </div>
  );
}
