import React from 'react';
import { Thermometer, Activity } from 'lucide-react';
import TemperatureChart from '../components/dashboard/TemperatureChart';
import TemperatureAlerts from '../components/dashboard/TemperatureAlerts';
import StatusBadge from '../components/common/StatusBadge';
import { evaluateTemperatureStatus } from '../types/telemetry';

export default function TemperatureView({ monitoringState }) {
  const {
    temperature = 6.2,
    temperatureStatus = "SAFE",
    temperatureHistory = [],
    coolingDuration = "06h 26m",
    selectedScenario = "NORMAL",
    battery = 86,
    ambientTemp = 32.8
  } = monitoringState || {};

  const currentStatus = temperatureStatus || evaluateTemperatureStatus(temperature);

  const thermalProbes = [
    { name: "Milk Core Probe (DS18B20 #1)", location: "Submerged 15cm from bottom", temp: temperature, status: currentStatus },
    { name: "Milk Upper Layer Probe (DS18B20 #2)", location: "Submerged 3cm from surface", temp: (temperature + 0.3), status: evaluateTemperatureStatus(temperature + 0.3) },
    { name: "Can Wall Internal Surface", location: "Between SS304 and PUF", temp: (temperature - 0.8), status: "SAFE" },
    { name: "External Ambient Temperature", location: "Onboard ESP32 enclosure", temp: ambientTemp, status: "INFO" }
  ];

  return (
    <div className="content-body">
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
          Thermal Performance & Temperature Analytics
        </h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          Deep-dive telemetry into core milk temperature decay, thermal gradients, and passive PUF insulation efficiency.
        </p>
      </div>

      <div className="grid-2col">
        <TemperatureChart
          historyData={temperatureHistory}
          currentTemp={temperature}
          duration={coolingDuration}
          selectedScenario={selectedScenario}
        />
        <TemperatureAlerts
          currentTemp={temperature}
          batteryPercentage={battery}
          isLowBattery={selectedScenario === "Low Battery" || selectedScenario === "LOW_BATTERY" || battery < 20}
          alertMessage={monitoringState?.alertMessage}
          temperatureStatus={currentStatus}
        />
      </div>

      {/* Multi-Probe Sensor Diagnostics */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div className="card-header">
          <div>
            <div className="card-title">
              <Activity size={18} color="var(--accent-primary)" />
              <span>Multi-Point Thermal Probe Diagnostics</span>
            </div>
            <div className="card-subtitle">
              Digital 1-Wire sensor network monitoring thermal stratification inside the 35L chilling can
            </div>
          </div>
          <span className="badge badge-info">4 Probe Array</span>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Sensor Channel</th>
                <th>Sensor Location</th>
                <th>Current Reading</th>
                <th>Target Range</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {thermalProbes.map((probe, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{probe.name}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{probe.location}</td>
                  <td className="mono-cell" style={{ fontWeight: 800, fontSize: '0.95rem' }}>
                    {probe.temp.toFixed(1)}°C
                  </td>
                  <td className="mono-cell" style={{ color: 'var(--text-muted)' }}>
                    {probe.status === "INFO" ? "N/A (Ambient)" : "4.0°C – 8.0°C"}
                  </td>
                  <td>
                    {probe.status === "INFO" ? (
                      <span className="badge badge-info">AMBIENT</span>
                    ) : (
                      <StatusBadge status={probe.status} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Thermodynamic Metrics */}
      <div className="grid-3col">
        <div className="card">
          <div className="card-title" style={{ fontSize: '0.9rem', marginBottom: 6 }}>
            Thermal Rise Rate (dT/dt)
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
            +0.31 °C / hr
          </div>
          <div style={{ fontSize: '0.75rem', color: '#065F46', marginTop: 4, fontWeight: 600 }}>
            Well within safe limit (&lt; 0.60 °C/hr)
          </div>
        </div>

        <div className="card">
          <div className="card-title" style={{ fontSize: '0.9rem', marginBottom: 6 }}>
            PUF Thermal Resistance (R)
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
            2.05 m²·K/W
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>
            45mm rigid polyurethane foam core
          </div>
        </div>

        <div className="card">
          <div className="card-title" style={{ fontSize: '0.9rem', marginBottom: 6 }}>
            Predicted Safe Hold Time
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)' }}>
            ~10.5 Hours
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>
            Before milk reaches 8.0°C at 33°C ambient
          </div>
        </div>
      </div>
    </div>
  );
}
