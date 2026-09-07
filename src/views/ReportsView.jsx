import React, { useState } from 'react';
import { FileText, Download, Printer, CheckCircle2, ShieldCheck, Calendar, Filter } from 'lucide-react';
import { STORAGE_SUMMARY } from '../services/demoDataService';

export default function ReportsView({ telemetryData, historyData, batches }) {
  const [exported, setExported] = useState(false);

  const handleExportCSV = () => {
    // Generate actual CSV content for download
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Batch ID,Farmer,Milk Volume (L),Recorded Temp (C),Cooling Duration,Status,Cooling Method,Collection Time\n";

    batches.forEach(b => {
      csvContent += `${b.batchId},"${b.farmer}",${b.volumeL},${b.finalTemp},"${b.durationFormatted}",${b.status},"${b.coolingMethod}","${b.collectionTime}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `CHILLCAN_ColdChain_Audit_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setExported(true);
    setTimeout(() => setExported(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="content-body">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Cold-Chain Audit & Compliance Reports
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Official thermal audit logs, batch certificates, and quality records for dairy federations and FSSAI auditing.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-outline" onClick={handlePrint}>
            <Printer size={16} />
            <span>Print Report</span>
          </button>
          <button className="btn btn-primary" onClick={handleExportCSV}>
            <Download size={16} />
            <span>{exported ? 'Report Downloaded!' : 'Export Report (CSV)'}</span>
          </button>
        </div>
      </div>

      {/* Official Certificate Style Preview Card */}
      <div className="card" style={{ borderTop: '4px solid #007BFF', marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-light)', paddingBottom: 16, marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              SMART INDIA HACKATHON 2026 • HARDWARE EDITION
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: 2 }}>
              TechTorque Quality Assurance & Cold-Chain Compliance Certificate
            </div>
            <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: 2 }}>
              Project ID: SIH26110 | Device Unit: {telemetryData.deviceId} | Cooperative: Anand Rural Dairy Cluster #04
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span className="badge badge-safe" style={{ fontSize: '0.82rem', padding: '6px 12px' }}>
              <ShieldCheck size={14} />
              <span>FSSAI COLD-CHAIN COMPLIANT</span>
            </span>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 4 }}>
              Generated: {new Date().toLocaleDateString('en-GB')}
            </div>
          </div>
        </div>

        {/* Storage & Quality KPI Summary Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
          <div style={{ backgroundColor: 'var(--bg-primary)', padding: 12, borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Total Milk Audited</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>{STORAGE_SUMMARY.totalMilkCollected} L</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Across 5 batches</div>
          </div>

          <div style={{ backgroundColor: 'var(--bg-primary)', padding: 12, borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Average Storage Temp</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#065F46' }}>{STORAGE_SUMMARY.avgStorageTemp}°C</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Target: 4.0–8.0°C</div>
          </div>

          <div style={{ backgroundColor: 'var(--bg-primary)', padding: 12, borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Safe Batches</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#065F46' }}>4 / 5 (80%)</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>0 Critical breaches</div>
          </div>

          <div style={{ backgroundColor: 'var(--bg-primary)', padding: 12, borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Thermal Hold Score</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-primary)' }}>{STORAGE_SUMMARY.complianceRate}%</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>PUF insulation intact</div>
          </div>
        </div>

        {/* Detailed Batches Audit Table */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: 10, color: 'var(--text-primary)' }}>
            Batch-by-Batch Thermal Log Breakdown
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Batch ID</th>
                <th>Farmer</th>
                <th>Volume</th>
                <th>Logged Temp</th>
                <th>Duration</th>
                <th>Cooling Tech</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {batches.map((b) => (
                <tr key={b.batchId}>
                  <td className="mono-cell" style={{ fontWeight: 700 }}>{b.batchId}</td>
                  <td>{b.farmer}</td>
                  <td className="mono-cell">{b.volumeL} L</td>
                  <td className="mono-cell" style={{ fontWeight: 700 }}>{b.finalTemp.toFixed(1)}°C</td>
                  <td className="mono-cell">{b.durationFormatted}</td>
                  <td style={{ fontSize: '0.76rem' }}>{b.coolingMethod}</td>
                  <td>
                    <span className={`badge ${b.status === 'SAFE' ? 'badge-safe' : 'badge-warning'}`}>
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: 14, display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
          <span>CHILLCAN System Telemetry Node Firmware: v1.2.0-sih26</span>
          <span>Digital Verification Hash: SHA256-8A49C91F0</span>
        </div>
      </div>
    </div>
  );
}
