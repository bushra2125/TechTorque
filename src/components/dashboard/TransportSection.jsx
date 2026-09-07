import React from 'react';
import { Truck, MapPin, CheckCircle2, Clock, Info } from 'lucide-react';

export default function TransportSection({
  stages = [
    { name: "Collection Centre", location: "Khed Milk Pool", time: "08:30 AM", status: "completed" },
    { name: "In Transit", location: "State Route 48 (Insulated Carrier)", time: "10:15 AM - Now", status: "active" },
    { name: "Processing Centre", location: "District Chilling Plant #2", time: "Est. 03:00 PM", status: "pending" }
  ]
}) {
  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-title">
            <Truck size={18} color="var(--accent-primary)" />
            <span>Milk Transport & Route Monitoring</span>
          </div>
          <div className="card-subtitle">
            Checkpoint-based cold-chain transit tracking
          </div>
        </div>
        <span className="badge badge-info">IN TRANSIT</span>
      </div>

      {/* 3-Stage Progress Flow */}
      <div className="transport-flow">
        <div className="transport-line"></div>

        {stages.map((stage, idx) => {
          const isCompleted = stage.status === "completed";
          const isActive = stage.status === "active";

          return (
            <div
              key={idx}
              className={`transport-step ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}
            >
              <div className="step-node">
                {isCompleted ? (
                  <CheckCircle2 size={18} />
                ) : (
                  <span>{idx + 1}</span>
                )}
              </div>
              <div className="step-label">{stage.name}</div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: 2 }}>
                {stage.location}
              </div>
              <div className="step-time">{stage.time}</div>
            </div>
          );
        })}
      </div>

      {/* Transit Technical Note */}
      <div style={{
        marginTop: 14,
        padding: '10px 12px',
        backgroundColor: 'var(--bg-primary)',
        border: '1px solid var(--border-light)',
        borderRadius: 'var(--radius-sm)',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        fontSize: '0.74rem',
        color: 'var(--text-muted)'
      }}>
        <Info size={14} color="var(--accent-primary)" style={{ flexShrink: 0 }} />
        <span>
          <strong>Checkpoint Telemetry:</strong> Status updates sync at collection checkpoints and transit cellular bursts via the ESP32 node. Full live satellite GPS tracking is optional and unverified unless the external Neo-6M GPS module is installed.
        </span>
      </div>
    </div>
  );
}
