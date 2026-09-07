import React, { useState } from 'react';
import { Layers, Plus, Search, Filter, CheckCircle2, AlertTriangle, Eye, X, Calendar, User, Milk } from 'lucide-react';
import StatusBadge from '../components/common/StatusBadge';

export default function BatchesView({ batches, setBatches, currentBatch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New batch form state
  const [newBatchId, setNewBatchId] = useState(`MC-00${batches.length + 1}`);
  const [newFarmer, setNewFarmer] = useState('');
  const [newVolume, setNewVolume] = useState('35');
  const [newCoolingMethod, setNewCoolingMethod] = useState('PCM Pack (0°C)');

  const filteredBatches = batches.filter(b => {
    const matchesSearch = b.batchId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.farmer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateBatch = (e) => {
    e.preventDefault();
    if (!newFarmer) return;

    const newEntry = {
      batchId: newBatchId,
      farmer: newFarmer,
      volumeL: parseFloat(newVolume) || 35,
      finalTemp: 4.3,
      avgTemp: 4.3,
      durationFormatted: "00h 05m",
      durationHours: 0.08,
      collectionTime: "Just now",
      status: "SAFE",
      coolingMethod: newCoolingMethod,
      notes: "Newly initiated rural batch collection"
    };

    setBatches([newEntry, ...batches]);
    setShowAddModal(false);
    setNewFarmer('');
  };

  return (
    <div className="content-body">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Milk Batches Management & Cold-Chain Ledger
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Traceability and temperature compliance logs for small-scale dairy farmer collections (30–40 L cans).
          </p>
        </div>

        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          <Plus size={16} />
          <span>Register New Batch</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="card" style={{ padding: 14, marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 260 }}>
            <Search size={16} color="var(--text-muted)" />
            <input
              type="text"
              className="form-input"
              placeholder="Search batch ID (e.g. MC-001) or farmer name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ border: 'none', background: 'transparent', padding: '4px 0' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Filter size={15} color="var(--text-muted)" />
            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ width: 'auto', padding: '5px 10px', fontSize: '0.8rem' }}
            >
              <option value="ALL">All Statuses</option>
              <option value="SAFE">Safe (4–8°C)</option>
              <option value="WARNING">Warning (&gt;7.5°C)</option>
              <option value="CRITICAL">Critical (&gt;8.0°C)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Batches Table */}
      <div className="card">
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Batch ID</th>
                <th>Farmer Details</th>
                <th>Can Volume</th>
                <th>Recorded Temp</th>
                <th>Cooling Duration</th>
                <th>Cooling Pack</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredBatches.map((batch) => (
                <tr key={batch.batchId}>
                  <td className="mono-cell" style={{ fontWeight: 700 }}>
                    {batch.batchId}
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{batch.farmer}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{batch.collectionTime}</div>
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
                  <td style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    {batch.coolingMethod}
                  </td>
                  <td>
                    <StatusBadge status={batch.status} />
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline"
                      onClick={() => setSelectedBatch(batch)}
                      style={{ padding: '4px 10px' }}
                    >
                      <Eye size={13} />
                      <span>Details</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Batch Details Modal */}
      {selectedBatch && (
        <div className="sidebar-backdrop" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div className="card" style={{ maxWidth: 520, width: '100%', position: 'relative' }}>
            <div className="card-header">
              <div className="card-title">
                <Layers size={18} color="var(--accent-primary)" />
                <span>Batch Telemetry Log: {selectedBatch.batchId}</span>
              </div>
              <button
                className="btn btn-sm btn-outline"
                onClick={() => setSelectedBatch(null)}
                style={{ padding: 4 }}
              >
                <X size={16} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
              <div style={{ backgroundColor: 'var(--bg-primary)', padding: 10, borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Farmer / Owner</div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{selectedBatch.farmer}</div>
              </div>
              <div style={{ backgroundColor: 'var(--bg-primary)', padding: 10, borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Can Capacity / Volume</div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{selectedBatch.volumeL} Litres</div>
              </div>
              <div style={{ backgroundColor: 'var(--bg-primary)', padding: 10, borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Recorded Temp</div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: selectedBatch.finalTemp > 8.0 ? '#DC2626' : '#065F46' }}>
                  {selectedBatch.finalTemp.toFixed(1)}°C
                </div>
              </div>
              <div style={{ backgroundColor: 'var(--bg-primary)', padding: 10, borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Cooling Duration</div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{selectedBatch.durationFormatted}</div>
              </div>
            </div>

            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: 4 }}>Cold-Chain Compliance Status</div>
              <StatusBadge status={selectedBatch.status} size="large" />
            </div>

            <div style={{ backgroundColor: 'var(--accent-secondary)', padding: 10, borderRadius: 'var(--radius-sm)', fontSize: '0.78rem', color: 'var(--text-primary)', marginBottom: 16 }}>
              <strong>Operational Log:</strong> {selectedBatch.notes}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => setSelectedBatch(null)}>
                Close Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Batch Modal */}
      {showAddModal && (
        <div className="sidebar-backdrop" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div className="card" style={{ maxWidth: 480, width: '100%' }}>
            <div className="card-header">
              <div className="card-title">
                <Plus size={18} color="var(--accent-primary)" />
                <span>Register New Milk Can Batch</span>
              </div>
              <button
                className="btn btn-sm btn-outline"
                onClick={() => setShowAddModal(false)}
                style={{ padding: 4 }}
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateBatch}>
              <div className="form-group">
                <label className="form-label">Batch Identifier</label>
                <input
                  type="text"
                  className="form-input"
                  value={newBatchId}
                  onChange={(e) => setNewBatchId(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Farmer Name / Village ID</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Anand K. Shinde (Village Khed)"
                  value={newFarmer}
                  onChange={(e) => setNewFarmer(e.target.value)}
                  required
                />
              </div>

              <div className="grid-equal-2col" style={{ marginBottom: 16 }}>
                <div>
                  <label className="form-label">Milk Volume (30–40 L)</label>
                  <input
                    type="number"
                    min="10"
                    max="45"
                    className="form-input"
                    value={newVolume}
                    onChange={(e) => setNewVolume(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Cooling Pack Type</label>
                  <select
                    className="form-select"
                    value={newCoolingMethod}
                    onChange={(e) => setNewCoolingMethod(e.target.value)}
                  >
                    <option value="PCM Pack (0°C)">PCM Pack (0°C)</option>
                    <option value="Reusable Ice Pack">Reusable Ice Pack</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                <button type="button" className="btn btn-outline" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Start Monitoring Batch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
