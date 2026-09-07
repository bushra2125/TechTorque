import React from 'react';
import { Snowflake, Shield, Layers, Clock, CheckCircle2, AlertTriangle, AlertOctagon } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import { evaluateTemperatureStatus, STATUS_LEVELS } from '../../types/telemetry';

export default function CoolingStatusCard({
  coolingMethod = "PCM / Reusable Ice Pack",
  targetRange = "4–8°C",
  currentTemp = 6.2,
  coolingStatus = "ACTIVE / GOOD",
  coolingCondition = "GOOD",
  insulationSpec = "45mm Rigid PUF Double Wall"
}) {
  const status = evaluateTemperatureStatus(currentTemp);

  const getConditionColor = () => {
    if (status === STATUS_LEVELS.SAFE) return '#065F46';
    if (status === STATUS_LEVELS.WARNING) return '#92400E';
    return '#991B1B';
  };

  const getConditionIcon = () => {
    if (status === STATUS_LEVELS.SAFE) return <CheckCircle2 size={16} color="#10B981" />;
    if (status === STATUS_LEVELS.WARNING) return <AlertTriangle size={16} color="#F59E0B" />;
    return <AlertOctagon size={16} color="#EF4444" />;
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">
          <Snowflake size={18} color="var(--accent-primary)" />
          <span>Cooling System Status</span>
        </div>
        <span className="badge badge-info">Passive Chilling</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
        {/* Method */}
        <div style={{
          backgroundColor: 'var(--bg-primary)',
          padding: '12px 14px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-light)'
        }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, marginBottom: 4 }}>
            Cooling Method
          </div>
          <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Snowflake size={15} color="var(--accent-primary)" />
            <span>{coolingMethod}</span>
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>
            Latent heat absorption (0°C transition)
          </div>
        </div>

        {/* Target Range */}
        <div style={{
          backgroundColor: 'var(--bg-primary)',
          padding: '12px 14px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-light)'
        }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, marginBottom: 4 }}>
            Target Range
          </div>
          <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#065F46', fontFamily: 'var(--font-mono)' }}>
            {targetRange}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>
            Standard cold-chain storage
          </div>
        </div>

        {/* Current Temperature */}
        <div style={{
          backgroundColor: 'var(--bg-primary)',
          padding: '12px 14px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-light)'
        }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, marginBottom: 4 }}>
            Current Temperature
          </div>
          <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
            {currentTemp.toFixed(1)}°C
          </div>
          <div style={{ marginTop: 4 }}>
            <StatusBadge status={status} />
          </div>
        </div>

        {/* Cooling Condition */}
        <div style={{
          backgroundColor: 'var(--bg-primary)',
          padding: '12px 14px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-light)'
        }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, marginBottom: 4 }}>
            Cooling Condition
          </div>
          <div style={{
            fontSize: '0.95rem',
            fontWeight: 800,
            color: getConditionColor(),
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}>
            {getConditionIcon()}
            <span>{coolingCondition}</span>
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>
            Status: {coolingStatus}
          </div>
        </div>
      </div>

      {/* Insulation spec footer */}
      <div style={{
        marginTop: 14,
        padding: '10px 12px',
        backgroundColor: 'var(--accent-secondary)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--accent-secondary-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '0.78rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-primary)' }}>
          <Shield size={14} color="var(--accent-primary)" />
          <span style={{ fontWeight: 600 }}>Insulation:</span>
          <span>{insulationSpec}</span>
        </div>
        <span style={{ color: 'var(--text-secondary)', fontSize: '0.72rem' }}>k ≈ 0.022 W/m·K</span>
      </div>
    </div>
  );
}
