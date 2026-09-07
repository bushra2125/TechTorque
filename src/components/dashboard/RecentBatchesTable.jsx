import React from 'react';
import { Layers, FileSpreadsheet, Eye } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';

export default function RecentBatchesTable({ batches = [], onViewBatch }) {
  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-title">
            <Layers size={18} color="var(--accent-primary)" />
            <span>Recent Batches Ledger</span>
          </div>
          <div className="card-subtitle">
            Historical passive chilling records across dairy farmer collections
          </div>
        </div>
        <span className="badge badge-info">Sample Records</span>
      </div>

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Batch ID</th>
              <th>Farmer / Cluster</th>
              <th>Milk Volume</th>
              <th>Current/Final Temp</th>
              <th>Cooling Duration</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {batches.map((batch) => (
              <tr key={batch.batchId}>
                <td className="mono-cell" style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                  {batch.batchId}
                </td>
                <td>
                  <div style={{ fontWeight: 600 }}>{batch.farmer}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{batch.collectionTime}</div>
                </td>
                <td className="mono-cell" style={{ fontWeight: 600 }}>
                  {batch.volumeL} L
                </td>
                <td className="mono-cell" style={{ fontWeight: 700, color: batch.finalTemp > 7.5 ? (batch.finalTemp > 8.0 ? '#DC2626' : '#D97706') : '#059669' }}>
                  {batch.finalTemp.toFixed(1)}°C
                </td>
                <td className="mono-cell">
                  {batch.durationFormatted}
                </td>
                <td>
                  <StatusBadge status={batch.status} />
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-outline"
                    onClick={() => onViewBatch && onViewBatch(batch)}
                    title="View batch telemetry log"
                    style={{ padding: '3px 8px', fontSize: '0.74rem' }}
                  >
                    <Eye size={12} />
                    <span>Details</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{
        marginTop: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '0.74rem',
        color: 'var(--text-muted)'
      }}>
        <span>Showing 5 most recent rural collection batches</span>
        <span>Standard 30–40L Insulated Cans</span>
      </div>
    </div>
  );
}
