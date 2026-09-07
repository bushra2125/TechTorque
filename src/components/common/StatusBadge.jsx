import React from 'react';
import { STATUS_CONFIG } from '../../types/telemetry';

export default function StatusBadge({ status = "SAFE", size = "normal" }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.SAFE;
  
  return (
    <span className={`badge ${config.badgeClass}`} style={size === "large" ? { padding: '5px 12px', fontSize: '0.8rem' } : {}}>
      <span style={{ 
        width: 6, 
        height: 6, 
        borderRadius: '50%', 
        backgroundColor: config.color,
        display: 'inline-block' 
      }}></span>
      {config.label}
    </span>
  );
}
