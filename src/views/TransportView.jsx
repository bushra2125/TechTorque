import React from 'react';
import { Truck, MapPin, CheckCircle2, Clock, AlertCircle, ShieldCheck } from 'lucide-react';
import TransportSection from '../components/dashboard/TransportSection';

export default function TransportView({ telemetryData }) {
  const checkpoints = [
    {
      id: "CP-1",
      station: "Village Collection Centre #04 (Khed)",
      action: "Milk Dispatch & Can Seal Inspection",
      timestamp: "08:30 AM",
      recordedTemp: "4.2°C",
      officer: "S. K. Verma (Coop Supervisor)",
      status: "VERIFIED"
    },
    {
      id: "CP-2",
      station: "Route 48 Transit Vehicle (MH-14-AZ-2041)",
      action: "In-Transit Telemetry Periodic Burst",
      timestamp: "10:15 AM",
      recordedTemp: "4.9°C",
      officer: "Automated ESP32 Burst",
      status: "VERIFIED"
    },
    {
      id: "CP-3",
      station: "Mid-Route Junction (Toll Checkpoint 12)",
      action: "In-Transit Telemetry Periodic Burst",
      timestamp: "12:30 PM",
      recordedTemp: "5.6°C",
      officer: "Automated ESP32 Burst",
      status: "VERIFIED"
    },
    {
      id: "CP-4",
      station: "District Chilling Plant #2 (Receiving Dock)",
      action: "Final Cold-Chain Handover & Quality Verification",
      timestamp: "Est. 03:00 PM",
      recordedTemp: "Projected 6.3°C",
      officer: "Pending Arrival",
      status: "PENDING"
    }
  ];

  return (
    <div className="content-body">
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
          Cold-Chain Logistics & Transport Route Telemetry
        </h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          Tracking milk can custody transfer and thermal stability from rural collection point to dairy processing center.
        </p>
      </div>

      <div style={{ marginBottom: 24 }}>
        <TransportSection stages={telemetryData.transportStages} />
      </div>

      {/* Checkpoint Audit Log */}
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">
              <MapPin size={18} color="var(--accent-primary)" />
              <span>Route Checkpoints & Custody Handover Log</span>
            </div>
            <div className="card-subtitle">
              Timestamped temperature verification logs recorded along transit path
            </div>
          </div>
          <span className="badge badge-safe">Cold-Chain Intact</span>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Checkpoint ID</th>
                <th>Location / Facility</th>
                <th>Operation</th>
                <th>Timestamp</th>
                <th>Milk Temp</th>
                <th>Inspector / Sync</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {checkpoints.map((cp) => (
                <tr key={cp.id}>
                  <td className="mono-cell" style={{ fontWeight: 700 }}>{cp.id}</td>
                  <td style={{ fontWeight: 600 }}>{cp.station}</td>
                  <td style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{cp.action}</td>
                  <td className="mono-cell">{cp.timestamp}</td>
                  <td className="mono-cell" style={{ fontWeight: 700, color: '#065F46' }}>{cp.recordedTemp}</td>
                  <td style={{ fontSize: '0.74rem' }}>{cp.officer}</td>
                  <td>
                    {cp.status === "VERIFIED" ? (
                      <span className="badge badge-safe">VERIFIED</span>
                    ) : (
                      <span className="badge badge-info">EN ROUTE</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
