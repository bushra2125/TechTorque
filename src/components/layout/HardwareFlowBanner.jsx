import React from 'react';
import { Milk, ShieldAlert, Snowflake, Thermometer, Cpu, Monitor, ChevronRight } from 'lucide-react';

export default function HardwareFlowBanner() {
  const steps = [
    {
      id: 'milk',
      icon: Milk,
      title: '1. Fresh Milk',
      subtext: 'Raw milk collected at 35–37°C from farmer',
      badge: 'Input'
    },
    {
      id: 'can',
      icon: ShieldAlert,
      title: '2. Chilling Can',
      subtext: '30–40L SS304 + 45mm PUF Double Wall',
      badge: 'Physical Body'
    },
    {
      id: 'cooling',
      icon: Snowflake,
      title: '3. Passive Cooling',
      subtext: 'PCM / Ice packs (0°C phase change)',
      badge: 'Zero Continuous Power'
    },
    {
      id: 'sensor',
      icon: Thermometer,
      title: '4. Temp Sensor',
      subtext: 'Food-grade DS18B20 digital probe (±0.5°C)',
      badge: 'Direct Contact'
    },
    {
      id: 'esp32',
      icon: Cpu,
      title: '5. ESP32 Node',
      subtext: 'Low-power telemetry & battery management',
      badge: 'IoT Gateway'
    },
    {
      id: 'dashboard',
      icon: Monitor,
      title: '6. Dashboard',
      subtext: 'Cold-chain visualization & farmer alerts',
      badge: 'Current Layer',
      isCurrent: true
    }
  ];

  return (
    <div className="hardware-pipeline-card">
      <div className="pipeline-header">
        <div className="pipeline-title">
          <Cpu size={16} color="var(--accent-primary)" />
          <span>Physical Solution & Monitoring Architecture</span>
        </div>
        <div className="hardware-notice-pill">
          Physical Milk Chilling Can is the Core Product • Dashboard is the Telemetry Layer
        </div>
      </div>

      <div className="pipeline-flow">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <React.Fragment key={step.id}>
              <div className={`pipeline-node ${step.isCurrent ? 'active-layer' : ''}`}>
                <div className="node-icon-wrap" style={step.isCurrent ? { background: '#007BFF', color: '#FFFFFF' } : {}}>
                  <Icon size={16} />
                </div>
                <div className="node-label">{step.title}</div>
                <div className="node-subtext">{step.subtext}</div>
              </div>
              {idx < steps.length - 1 && (
                <div className="pipeline-arrow">
                  <ChevronRight size={18} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
