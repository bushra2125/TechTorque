import React from 'react';
import {
  Snowflake,
  Clock,
  Thermometer,
  Shield,
  ZapOff,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  Layers,
  Box,
  Cpu,
  Info,
  ArrowDown
} from 'lucide-react';
import KpiCard from '../components/common/KpiCard';
import LiveBadge from '../components/common/LiveBadge';
import { STATUS_LEVELS } from '../types/telemetry';

export default function CoolingView({
  monitoringState,
  onToggleDemoMode
}) {
  const {
    temperature = 6.2,
    minTemperature = 5.1,
    maxTemperature = 7.4,
    temperatureStatus = "SAFE",
    coolingStatus = "ACTIVE",
    coolingCondition = "GOOD",
    coolingMethod = "PCM / Ice Pack",
    coolingDuration = "06h 26m",
    durationSeconds = 23160,
    battery = 86,
    coldChainStatus = "COLD CHAIN MAINTAINED",
    temperatureHistory = [],
    demoMode = true,
    lastUpdated = "Just now",
    batchId = "MC-001",
    milkVolume = 35
  } = monitoringState || {};

  const getConditionColor = () => {
    if (temperatureStatus === STATUS_LEVELS.CRITICAL) return "#EF4444";
    if (temperatureStatus === STATUS_LEVELS.WARNING) return "#F59E0B";
    return "#10B981";
  };

  const getConditionBadge = () => {
    if (temperatureStatus === STATUS_LEVELS.CRITICAL) return "badge-critical";
    if (temperatureStatus === STATUS_LEVELS.WARNING) return "badge-warning";
    return "badge-safe";
  };

  // Progress to 6h target
  const minTargetSeconds = 6 * 3600;
  const durationProgressPct = Math.min(100, Math.round((durationSeconds / minTargetSeconds) * 100));

  // Chart setup
  const chartWidth = 700;
  const chartHeight = 240;
  const padding = { top: 20, right: 30, bottom: 40, left: 45 };
  const plotWidth = chartWidth - padding.left - padding.right;
  const plotHeight = chartHeight - padding.top - padding.bottom;

  const yMin = 3.0;
  const yMax = 11.0;

  const getY = (temp) => {
    const val = typeof temp === 'number' ? temp : 6.0;
    const clamped = Math.min(Math.max(val, yMin), yMax);
    return padding.top + plotHeight - ((clamped - yMin) / (yMax - yMin)) * plotHeight;
  };

  const chartData = (Array.isArray(temperatureHistory) && temperatureHistory.length > 0) ? temperatureHistory : [
    { time: "08:30 AM", milkTemp: 7.0 },
    { time: "09:30 AM", milkTemp: 6.4 },
    { time: "10:30 AM", milkTemp: 5.8 },
    { time: "11:30 AM", milkTemp: 5.4 },
    { time: "12:30 PM", milkTemp: 5.6 },
    { time: "01:30 PM", milkTemp: 5.9 },
    { time: "02:30 PM", milkTemp: 6.1 },
    { time: "02:56 PM", milkTemp: temperature }
  ];

  const getX = (index) => {
    if (chartData.length <= 1) return padding.left + plotWidth / 2;
    return padding.left + (index / (chartData.length - 1)) * plotWidth;
  };

  const safeTopY = getY(8.0);
  const safeBottomY = getY(4.0);
  const safeHeight = safeBottomY - safeTopY;

  const points = chartData.map((d, i) => `${getX(i)},${getY(d.milkTemp)}`).join(' ');
  const areaPath = `${points} L${getX(chartData.length - 1)},${padding.top + plotHeight} L${getX(0)},${padding.top + plotHeight} Z`;

  const lineColor = temperature > 8.0 ? '#EF4444' : temperature > 7.5 ? '#F59E0B' : '#007BFF';

  // Physical Can Layers Structure
  const canLayers = [
    { title: "OUTER BODY", desc: "High-impact lightweight casing & rubberized base", badge: "Layer 1" },
    { title: "PUF INSULATION", desc: "45mm rigid polyurethane foam (k = 0.022 W/m·K)", badge: "Thermal Core" },
    { title: "COOLING PACK / PCM", desc: "Reusable phase change blocks (0°C transition)", badge: "Heat Sink" },
    { title: "FOOD-GRADE CHAMBER", desc: "Food-grade stainless steel SS304 liner (0.8mm)", badge: "Hygienic Vessel" },
    { title: "MILK VOLUME", desc: "30–40 Litres raw chilled milk batch", badge: "Payload" },
    { title: "DS18B20 SENSOR", desc: "Food-grade digital waterproof probe (±0.5°C)", badge: "Telemetry Probe" }
  ];

  return (
    <div className="content-body">
      {/* PAGE HEADER */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        flexWrap: 'wrap',
        gap: 12
      }}>
        <div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Cooling System
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            Monitor passive cooling performance and milk temperature retention.
          </p>
        </div>

        <LiveBadge demoMode={demoMode} onToggleDemoMode={onToggleDemoMode} lastUpdated={lastUpdated} />
      </div>

      {/* SECTION 1 — CURRENT COOLING STATUS */}
      <div className="card" style={{ marginBottom: 20, borderLeft: `4px solid ${getConditionColor()}` }}>
        <div className="card-header" style={{ marginBottom: 14 }}>
          <div className="card-title">
            <Snowflake size={18} color="var(--accent-primary)" />
            <span>Passive Cooling System State</span>
          </div>
          <span className={`badge ${getConditionBadge()}`} style={{ fontSize: '0.78rem', padding: '4px 10px' }}>
            {coolingCondition}
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
          <div style={{ backgroundColor: 'var(--bg-primary)', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Cooling Status</div>
            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#065F46', marginTop: 2 }}>{coolingStatus}</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: 2 }}>Zero continuous power</div>
          </div>

          <div style={{ backgroundColor: 'var(--bg-primary)', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Cooling Method</div>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: 2 }}>{coolingMethod}</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: 2 }}>0°C Latent Phase Change</div>
          </div>

          <div style={{ backgroundColor: 'var(--bg-primary)', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Current Milk Temp</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: lineColor, fontFamily: 'var(--font-mono)', marginTop: 2 }}>
              {temperature.toFixed(1)}°C
            </div>
            <div style={{ fontSize: '0.68rem', color: getConditionColor(), fontWeight: 700, marginTop: 2 }}>
              {temperatureStatus}
            </div>
          </div>

          <div style={{ backgroundColor: 'var(--bg-primary)', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Target Range</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#065F46', fontFamily: 'var(--font-mono)', marginTop: 2 }}>
              4–8°C
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: 2 }}>Dairy Cold-Chain Standard</div>
          </div>

          <div style={{ backgroundColor: 'var(--bg-primary)', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Cooling Condition</div>
            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: getConditionColor(), marginTop: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
              {temperatureStatus === "SAFE" ? <CheckCircle2 size={16} color="#10B981" /> : <AlertTriangle size={16} color="#F59E0B" />}
              <span>{coolingCondition}</span>
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: 2 }}>Thermal buffer active</div>
          </div>
        </div>
      </div>

      {/* SECTION 2 — TEMPERATURE OVERVIEW */}
      <div className="kpi-grid" style={{ marginBottom: 20 }}>
        <KpiCard
          title="Current Temperature"
          value={temperature.toFixed(1)}
          unit="°C"
          icon={Thermometer}
          status={temperatureStatus}
          targetLabel="Safe Limit"
          targetValue="4.0–8.0°C"
          accentColor={lineColor}
        />

        <KpiCard
          title="Minimum Temperature"
          value={minTemperature.toFixed(1)}
          unit="°C"
          icon={Thermometer}
          targetLabel="Lowest Recorded"
          targetValue="During Batch"
          customBadge={<span className="badge badge-safe">RECORDED</span>}
          accentColor="#10B981"
        />

        <KpiCard
          title="Maximum Temperature"
          value={maxTemperature.toFixed(1)}
          unit="°C"
          icon={Thermometer}
          targetLabel="Highest Recorded"
          targetValue="During Batch"
          customBadge={<span className="badge badge-safe">RECORDED</span>}
          accentColor="#007BFF"
        />

        <KpiCard
          title="Target Temperature Range"
          value="4.0 – 8.0"
          unit="°C"
          icon={Shield}
          targetLabel="Standard"
          targetValue="FSSAI Safe Zone"
          customBadge={<span className="badge badge-safe">TARGET</span>}
          accentColor="#10B981"
        />
      </div>

      {/* SECTION 3 & 4 — TEMPERATURE HISTORY & COOLING DURATION */}
      <div className="grid-2col" style={{ marginBottom: 20 }}>
        {/* Line Chart */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">
                <Thermometer size={18} color="var(--accent-primary)" />
                <span>Cooling Temperature History</span>
              </div>
              <div className="card-subtitle">
                Thermal retention curve maintained within target 4–8°C
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, fontSize: '0.74rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 10, height: 10, background: '#ECFDF5', border: '1px solid #10B981', borderRadius: 2 }}></span>
                <span>Target 4–8°C</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 12, height: 3, background: lineColor, borderRadius: 2 }}></span>
                <span style={{ fontWeight: 600 }}>Milk Temp</span>
              </div>
            </div>
          </div>

          <div style={{ position: 'relative', width: '100%', overflowX: 'auto' }}>
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              style={{ width: '100%', height: 'auto', display: 'block', minWidth: 460 }}
            >
              {/* Shaded 4-8°C Safe Zone */}
              <rect
                x={padding.left}
                y={safeTopY}
                width={plotWidth}
                height={safeHeight}
                fill="#ECFDF5"
                stroke="#A7F3D0"
                strokeDasharray="4 4"
                strokeWidth="1"
              />

              {/* Grid Lines */}
              {[4, 6, 8, 10].map((temp) => {
                const y = getY(temp);
                const isTarget = temp === 4 || temp === 8;
                return (
                  <g key={temp}>
                    <line
                      x1={padding.left}
                      y1={y}
                      x2={padding.left + plotWidth}
                      y2={y}
                      stroke={isTarget ? '#10B981' : '#E2E8F0'}
                      strokeDasharray={isTarget ? '2 2' : 'none'}
                      strokeWidth="1"
                    />
                    <text
                      x={padding.left - 6}
                      y={y + 4}
                      textAnchor="end"
                      fontSize="9.5"
                      fill="var(--text-muted)"
                      fontFamily="var(--font-mono)"
                    >
                      {temp}°C
                    </text>
                  </g>
                );
              })}

              <polygon points={areaPath} fill={temperature > 8 ? "rgba(239, 68, 68, 0.1)" : "rgba(0, 123, 255, 0.08)"} />

              <polyline
                fill="none"
                stroke={lineColor}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={points}
              />

              {chartData.map((d, i) => {
                const cx = getX(i);
                const cy = getY(d.milkTemp);
                const isLast = i === chartData.length - 1;
                return (
                  <g key={i}>
                    <line
                      x1={cx}
                      y1={padding.top + plotHeight}
                      x2={cx}
                      y2={padding.top + plotHeight + 4}
                      stroke="#CBD5E0"
                    />
                    <text
                      x={cx}
                      y={padding.top + plotHeight + 16}
                      textAnchor="middle"
                      fontSize="9"
                      fill="var(--text-secondary)"
                      fontFamily="var(--font-mono)"
                    >
                      {d.time}
                    </text>
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isLast ? 4.5 : 3}
                      fill={isLast ? lineColor : '#FFFFFF'}
                      stroke={lineColor}
                      strokeWidth="2"
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          <div style={{
            marginTop: 10,
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.74rem',
            color: 'var(--text-muted)',
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: 8
          }}>
            <span>Monitoring Duration: <strong>{coolingDuration}</strong></span>
            <span>Target Duration: <strong>6–12 Hours</strong></span>
          </div>
        </div>

        {/* Cooling Duration Card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="card-header">
              <div className="card-title">
                <Clock size={18} color="var(--accent-primary)" />
                <span>Cooling Duration</span>
              </div>
              <span className="badge badge-safe">ON TRACK</span>
            </div>

            <div style={{
              backgroundColor: 'var(--bg-primary)',
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-light)',
              marginBottom: 16,
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                Current Cooling Elapsed Time
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)', margin: '4px 0' }}>
                {coolingDuration}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#065F46', fontWeight: 600 }}>
                Target Window: 6–12 Hours
              </div>
            </div>

            <div style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', marginBottom: 4 }}>
                <span style={{ color: 'var(--text-muted)' }}>Progress to 6h Min Target:</span>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{durationProgressPct}%</span>
              </div>
              <div style={{
                width: '100%',
                height: 8,
                backgroundColor: '#E2E8F0',
                borderRadius: 4,
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${durationProgressPct}%`,
                  height: '100%',
                  backgroundColor: durationSeconds >= 21600 ? '#10B981' : '#007BFF',
                  borderRadius: 4
                }}></div>
              </div>
            </div>

            <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              Passive cooling maintains cold temperature across collection cycles without external continuous power.
            </div>
          </div>

          <div style={{
            padding: '8px 10px',
            backgroundColor: '#FAFCFE',
            border: '1px dashed var(--border-light)',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
            marginTop: 12
          }}>
            *Timer tracks active chilling time since can closure and PCM insertion.
          </div>
        </div>
      </div>

      {/* SECTION 5 & 7 — COOLING PACK INFORMATION & COOLING ALERTS */}
      <div className="grid-equal-2col" style={{ marginBottom: 20 }}>
        {/* Section 5: Cooling Pack Information */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <Snowflake size={18} color="var(--accent-primary)" />
              <span>Cooling Pack Information</span>
            </div>
            <span className="badge badge-safe">PASSIVE</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
            <div style={{ padding: '8px 10px', backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Cooling Method</div>
              <div style={{ fontWeight: 700, fontSize: '0.82rem' }}>{coolingMethod}</div>
            </div>
            <div style={{ padding: '8px 10px', backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Cooling Pack Status</div>
              <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#065F46' }}>IN USE (Active)</div>
            </div>
            <div style={{ padding: '8px 10px', backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Cooling Approach</div>
              <div style={{ fontWeight: 700, fontSize: '0.82rem' }}>100% Passive Chilling</div>
            </div>
            <div style={{ padding: '8px 10px', backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>External Grid Power</div>
              <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#065F46' }}>NOT REQUIRED</div>
            </div>
          </div>

          <div style={{
            padding: '10px 12px',
            backgroundColor: 'var(--accent-secondary)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--accent-secondary-border)',
            fontSize: '0.78rem',
            color: 'var(--text-primary)',
            lineHeight: 1.4
          }}>
            Cooling is provided through reusable PCM/ice packs while PUF insulation reduces heat transfer from the surroundings.
          </div>
        </div>

        {/* Section 7: Cooling Alerts */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <Shield size={18} color="var(--accent-primary)" />
              <span>Cooling Alerts & Rules</span>
            </div>
            <span className="badge badge-info">Rule Engine</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{
              padding: '8px 10px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: temperatureStatus === "SAFE" ? 'var(--status-safe-bg)' : 'var(--bg-primary)',
              border: temperatureStatus === "SAFE" ? '1px solid var(--status-safe-border)' : '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: '0.78rem'
            }}>
              <CheckCircle2 size={16} color="#10B981" style={{ flexShrink: 0 }} />
              <div>
                <strong>SAFE (4–8°C):</strong> Milk temperature is within the target 4–8°C range.
              </div>
            </div>

            <div style={{
              padding: '8px 10px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: temperatureStatus === "WARNING" ? 'var(--status-warning-bg)' : 'var(--bg-primary)',
              border: temperatureStatus === "WARNING" ? '1px solid var(--status-warning-border)' : '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: '0.78rem'
            }}>
              <AlertTriangle size={16} color="#F59E0B" style={{ flexShrink: 0 }} />
              <div>
                <strong>WARNING (&gt;8°C):</strong> Milk temperature is approaching or exceeding the upper target limit.
              </div>
            </div>

            <div style={{
              padding: '8px 10px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: temperatureStatus === "CRITICAL" ? 'var(--status-critical-bg)' : 'var(--bg-primary)',
              border: temperatureStatus === "CRITICAL" ? '1px solid var(--status-critical-border)' : '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: '0.78rem'
            }}>
              <AlertOctagon size={16} color="#EF4444" style={{ flexShrink: 0 }} />
              <div>
                <strong>CRITICAL (&gt;10°C):</strong> Milk temperature is significantly above the target range.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 6 & 8 — CAN THERMAL STRUCTURE & PERFORMANCE SUMMARY */}
      <div className="grid-equal-2col">
        {/* Section 6: Can Thermal Structure */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <Box size={18} color="var(--accent-primary)" />
              <span>Can Thermal Structure & Physical Layers</span>
            </div>
            <span className="badge badge-info">30–40 L Capacity</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
            {canLayers.map((layer, idx) => (
              <React.Fragment key={idx}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '6px 10px',
                  backgroundColor: idx % 2 === 0 ? 'var(--bg-primary)' : 'var(--accent-secondary)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-light)',
                  fontSize: '0.76rem'
                }}>
                  <div>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{layer.title}: </span>
                    <span style={{ color: 'var(--text-secondary)' }}>{layer.desc}</span>
                  </div>
                  <span style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--accent-primary)', flexShrink: 0 }}>
                    {layer.badge}
                  </span>
                </div>
                {idx < canLayers.length - 1 && (
                  <div style={{ textAlign: 'center', lineHeight: '8px', color: 'var(--accent-primary)' }}>
                    <ArrowDown size={12} style={{ display: 'inline-block' }} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 8,
            fontSize: '0.72rem',
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: 10
          }}>
            <div><strong>Capacity:</strong> 30–40 L</div>
            <div><strong>Insulation:</strong> PUF (45mm)</div>
            <div><strong>Cooling:</strong> PCM Pack</div>
            <div><strong>Power:</strong> Zero Grid</div>
          </div>
        </div>

        {/* Section 8: Performance Summary */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <Layers size={18} color="var(--accent-primary)" />
              <span>Batch Performance Summary</span>
            </div>
            <span className="badge badge-info">Demo / Sample Data</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
            <div style={{ padding: '10px', backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Current Batch</div>
              <div style={{ fontWeight: 800, fontSize: '1.1rem', fontFamily: 'var(--font-mono)' }}>{batchId}</div>
            </div>

            <div style={{ padding: '10px', backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Milk Volume</div>
              <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--accent-primary)' }}>{milkVolume} L</div>
            </div>

            <div style={{ padding: '10px', backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Current Temperature</div>
              <div style={{ fontWeight: 800, fontSize: '1.1rem', color: getConditionColor(), fontFamily: 'var(--font-mono)' }}>
                {temperature.toFixed(1)}°C
              </div>
            </div>

            <div style={{ padding: '10px', backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Cooling Duration</div>
              <div style={{ fontWeight: 800, fontSize: '1.1rem', fontFamily: 'var(--font-mono)' }}>
                {coolingDuration}
              </div>
            </div>

            <div style={{ padding: '10px', backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Cooling Method</div>
              <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{coolingMethod}</div>
            </div>

            <div style={{ padding: '10px', backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Cold-Chain Status</div>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: getConditionColor() }}>{coldChainStatus}</div>
            </div>
          </div>

          <div style={{
            padding: '10px 12px',
            backgroundColor: '#FAFCFE',
            border: '1px dashed var(--border-light)',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.73rem',
            color: 'var(--text-muted)'
          }}>
            <strong>Telemetry Note:</strong> Demonstrating realistic simulated values for SIH 2026. Data structure is formatted for live DS18B20 + ESP32 IoT ingestion.
          </div>
        </div>
      </div>
    </div>
  );
}
