import React, { useState } from 'react';
import { Settings, Save, Cpu, Radio, Shield, Code, CheckCircle2 } from 'lucide-react';
import { ESP32_PAYLOAD_SCHEMA, SAMPLE_ARDUINO_CODE } from '../services/esp32Config';
import { SYSTEM_DEFAULTS } from '../types/telemetry';

export default function SettingsView({ telemetryData, setTelemetryData }) {
  const [minTemp, setMinTemp] = useState(SYSTEM_DEFAULTS.TARGET_TEMP_MIN);
  const [maxTemp, setMaxTemp] = useState(SYSTEM_DEFAULTS.TARGET_TEMP_MAX);
  const [warningThreshold, setWarningThreshold] = useState(7.5);
  const [canCapacity, setCanCapacity] = useState(telemetryData.milkVolumeLiters || 35);
  const [coolingMethod, setCoolingMethod] = useState(telemetryData.coolingMethod);
  const [isLiveMode, setIsLiveMode] = useState(telemetryData.isLiveSensorConnected);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setTelemetryData(prev => ({
      ...prev,
      coolingMethod,
      milkVolumeLiters: Number(canCapacity),
      isLiveSensorConnected: isLiveMode
    }));

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(SAMPLE_ARDUINO_CODE);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="content-body">
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
          System Parameters & Hardware Configuration
        </h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          Configure cold-chain threshold rules, physical can parameters, and ESP32 telemetry endpoints.
        </p>
      </div>

      <div className="grid-equal-2col">
        {/* Left Column: Cold-Chain Rules Form */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <Settings size={18} color="var(--accent-primary)" />
              <span>Cold-Chain Threshold Rules</span>
            </div>
          </div>

          <form onSubmit={handleSave}>
            <div className="grid-equal-2col">
              <div className="form-group">
                <label className="form-label">Lower Safe Target (°C)</label>
                <input
                  type="number"
                  step="0.1"
                  className="form-input"
                  value={minTemp}
                  onChange={(e) => setMinTemp(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Upper Safe Target (°C)</label>
                <input
                  type="number"
                  step="0.1"
                  className="form-input"
                  value={maxTemp}
                  onChange={(e) => setMaxTemp(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Warning Alert Threshold (°C)</label>
              <input
                type="number"
                step="0.1"
                className="form-input"
                value={warningThreshold}
                onChange={(e) => setWarningThreshold(e.target.value)}
                required
              />
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Triggers warning alert before milk crosses the 8.0°C upper limit.
              </span>
            </div>

            <div className="grid-equal-2col">
              <div className="form-group">
                <label className="form-label">Standard Can Capacity (L)</label>
                <select
                  className="form-select"
                  value={canCapacity}
                  onChange={(e) => setCanCapacity(e.target.value)}
                >
                  <option value="30">30 Litres</option>
                  <option value="35">35 Litres (Default)</option>
                  <option value="40">40 Litres</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Cooling Method</label>
                <select
                  className="form-select"
                  value={coolingMethod}
                  onChange={(e) => setCoolingMethod(e.target.value)}
                >
                  <option value="PCM / Reusable Ice Pack">PCM / Reusable Ice Pack</option>
                  <option value="PCM Pack (0°C Transition)">PCM Pack (0°C Transition)</option>
                  <option value="Reusable Frozen Gel Pack">Reusable Frozen Gel Pack</option>
                </select>
              </div>
            </div>

            <div className="form-group" style={{ backgroundColor: 'var(--bg-primary)', padding: 12, borderRadius: 'var(--radius-md)' }}>
              <label className="form-label" style={{ marginBottom: 4 }}>Telemetry Mode</label>
              <div style={{ display: 'flex', gap: 16, marginTop: 6 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="telemetryMode"
                    checked={!isLiveMode}
                    onChange={() => setIsLiveMode(false)}
                  />
                  <span>Simulated Model (Demo Mode)</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="telemetryMode"
                    checked={isLiveMode}
                    onChange={() => setIsLiveMode(true)}
                  />
                  <span>Live ESP32 Stream (Waiting for Node)</span>
                </label>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16 }}>
              {savedSuccess ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#065F46', fontSize: '0.82rem', fontWeight: 600 }}>
                  <CheckCircle2 size={16} color="#10B981" />
                  <span>Configuration saved successfully!</span>
                </div>
              ) : <div></div>}

              <button type="submit" className="btn btn-primary">
                <Save size={15} />
                <span>Save Settings</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: ESP32 REST API Schema */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <Cpu size={18} color="var(--accent-primary)" />
              <span>ESP32 Telemetry API Contract</span>
            </div>
            <span className="badge badge-info">REST / MQTT</span>
          </div>

          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: 10 }}>
            Incoming telemetry payload contract from the physical ESP32 node:
          </div>

          <div className="code-block" style={{ marginBottom: 14 }}>
            {JSON.stringify(ESP32_PAYLOAD_SCHEMA.schema, null, 2)}
          </div>

          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
            <strong>Endpoint:</strong> <code>POST /api/v1/telemetry</code> or MQTT topic <code>chillcan/devices/&#123;device_id&#125;/telemetry</code>
          </div>
        </div>
      </div>

      {/* ESP32 Arduino C++ Code Card */}
      <div className="card" style={{ marginTop: 24 }}>
        <div className="card-header">
          <div>
            <div className="card-title">
              <Code size={18} color="var(--accent-primary)" />
              <span>ESP32 Microcontroller Firmware (DS18B20 + Deep Sleep)</span>
            </div>
            <div className="card-subtitle">
              Ready-to-flash Arduino C++ code for DS18B20 digital probe reading and low-power HTTP POST transmission
            </div>
          </div>

          <button className="btn btn-sm btn-outline" onClick={handleCopyCode}>
            <Code size={13} />
            <span>{copiedCode ? 'Code Copied!' : 'Copy Arduino Code'}</span>
          </button>
        </div>

        <div className="code-block" style={{ maxHeight: 320, overflowY: 'auto' }}>
          <pre>{SAMPLE_ARDUINO_CODE}</pre>
        </div>
      </div>
    </div>
  );
}
