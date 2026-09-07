import React from 'react';
import StatusBadge from './StatusBadge';

export default function KpiCard({
  title,
  value,
  unit = "",
  icon: Icon,
  status = null,
  targetLabel = "Target",
  targetValue = null,
  secondaryText = null,
  customBadge = null,
  accentColor = null
}) {
  return (
    <div className="kpi-card" style={accentColor ? { borderTop: `3px solid ${accentColor}` } : {}}>
      <div>
        <div className="kpi-header">
          <span className="kpi-title">{title}</span>
          {Icon && (
            <div className="kpi-icon-pill">
              <Icon size={16} />
            </div>
          )}
        </div>

        <div className="kpi-value-wrap">
          <span className="kpi-value">{value}</span>
          {unit && <span className="kpi-unit">{unit}</span>}
        </div>

        {secondaryText && (
          <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginBottom: 8 }}>
            {secondaryText}
          </div>
        )}
      </div>

      <div className="kpi-footer">
        <div>
          {targetValue ? (
            <div>
              <span className="kpi-target-label">{targetLabel}: </span>
              <span className="kpi-target-value">{targetValue}</span>
            </div>
          ) : (
            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{targetLabel}</span>
          )}
        </div>

        <div>
          {customBadge ? customBadge : status ? <StatusBadge status={status} /> : null}
        </div>
      </div>
    </div>
  );
}
