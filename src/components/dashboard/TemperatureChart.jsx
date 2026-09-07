import React, { useState } from 'react';
import { Thermometer, Info } from 'lucide-react';

export default function TemperatureChart({
  historyData = [],
  currentTemp = 6.2,
  duration = "06h 26m",
  selectedScenario = "NORMAL"
}) {
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const data = Array.isArray(historyData) && historyData.length > 0 ? historyData : [
    { time: "08:30 AM", elapsedHours: "0.0h", milkTemp: 7.0, ambientTemp: 27.5 },
    { time: "09:30 AM", elapsedHours: "1.0h", milkTemp: 6.4, ambientTemp: 29.0 },
    { time: "10:30 AM", elapsedHours: "2.0h", milkTemp: 5.8, ambientTemp: 30.5 },
    { time: "11:30 AM", elapsedHours: "3.0h", milkTemp: 5.4, ambientTemp: 32.0 },
    { time: "12:30 PM", elapsedHours: "4.0h", milkTemp: 5.6, ambientTemp: 33.8 },
    { time: "01:30 PM", elapsedHours: "5.0h", milkTemp: 5.9, ambientTemp: 34.2 },
    { time: "02:30 PM", elapsedHours: "6.0h", milkTemp: 6.1, ambientTemp: 33.5 },
    { time: "02:56 PM", elapsedHours: "6.4h", milkTemp: currentTemp, ambientTemp: 32.8 }
  ];

  // Chart dimensions & scaling
  const chartWidth = 700;
  const chartHeight = 260;
  const padding = { top: 30, right: 35, bottom: 45, left: 45 };

  const plotWidth = chartWidth - padding.left - padding.right;
  const plotHeight = chartHeight - padding.top - padding.bottom;

  // Y-axis range: 2°C to 11°C to comfortably show 8.9°C critical spike
  const yMin = 2.0;
  const yMax = 11.0;

  const getY = (temp) => {
    const val = typeof temp === 'number' ? temp : 6.0;
    const clamped = Math.min(Math.max(val, yMin), yMax);
    return padding.top + plotHeight - ((clamped - yMin) / (yMax - yMin)) * plotHeight;
  };

  const getX = (index) => {
    if (data.length <= 1) return padding.left + plotWidth / 2;
    return padding.left + (index / (data.length - 1)) * plotWidth;
  };

  // Safe range band (4°C to 8°C)
  const safeTopY = getY(8.0);
  const safeBottomY = getY(4.0);
  const safeHeight = safeBottomY - safeTopY;

  // Build SVG Path for milk temperature
  const points = data.map((d, i) => `${getX(i)},${getY(d.milkTemp)}`).join(' ');
  const areaPath = `${points} L${getX(data.length - 1)},${padding.top + plotHeight} L${getX(0)},${padding.top + plotHeight} Z`;

  const lineColor = currentTemp > 8.0 ? '#EF4444' : currentTemp > 7.5 ? '#F59E0B' : '#007BFF';
  const areaFill = currentTemp > 8.0 ? 'rgba(239, 68, 68, 0.1)' : currentTemp > 7.5 ? 'rgba(245, 158, 11, 0.1)' : 'rgba(0, 123, 255, 0.08)';

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-title">
            <Thermometer size={18} color="var(--accent-primary)" />
            <span>Milk Temperature History</span>
          </div>
          <div className="card-subtitle">
            Thermal trajectory driven by passive PUF + PCM chilling
          </div>
        </div>

        <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem' }}>
            <span style={{ width: 12, height: 12, borderRadius: 2, background: '#ECFDF5', border: '1px solid #10B981' }}></span>
            <span style={{ color: 'var(--text-secondary)' }}>Target Safe Zone (4–8°C)</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem' }}>
            <span style={{ width: 14, height: 3, background: lineColor, borderRadius: 2 }}></span>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Milk Core Temperature</span>
          </div>
        </div>
      </div>

      {/* Metric Indicators Bar */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 12,
        padding: '10px 14px',
        backgroundColor: 'var(--bg-primary)',
        borderRadius: 'var(--radius-md)',
        marginBottom: 16,
        border: '1px solid var(--border-light)'
      }}>
        <div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
            Current Temperature
          </div>
          <div style={{ fontSize: '1.35rem', fontWeight: 800, color: lineColor, fontFamily: 'var(--font-mono)' }}>
            {currentTemp.toFixed(1)}°C
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
            Target Safe Range
          </div>
          <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#065F46', fontFamily: 'var(--font-mono)' }}>
            4.0°C – 8.0°C
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
            Monitoring Duration
          </div>
          <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
            {duration}
          </div>
        </div>
      </div>

      {/* SVG Line Chart */}
      <div style={{ position: 'relative', width: '100%', overflowX: 'auto' }}>
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          style={{ width: '100%', height: 'auto', display: 'block', minWidth: 460 }}
        >
          {/* Target Safe Range Shaded Band (4 - 8°C) */}
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

          {/* Grid lines (2, 4, 6, 8, 10°C) */}
          {[2, 4, 6, 8, 10].map((temp) => {
            const y = getY(temp);
            const isTargetLine = temp === 4 || temp === 8;
            return (
              <g key={temp}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={padding.left + plotWidth}
                  y2={y}
                  stroke={isTargetLine ? (temp === 8 ? '#F59E0B' : '#10B981') : '#E2E8F0'}
                  strokeDasharray={isTargetLine ? '2 2' : 'none'}
                  strokeWidth={isTargetLine ? '1.2' : '0.8'}
                />
                <text
                  x={padding.left - 8}
                  y={y + 4}
                  textAnchor="end"
                  fontSize="10"
                  fill="var(--text-muted)"
                  fontFamily="var(--font-mono)"
                >
                  {temp}°C
                </text>
              </g>
            );
          })}

          {/* Upper Threshold Label (8°C) */}
          <text
            x={padding.left + plotWidth - 4}
            y={safeTopY - 6}
            textAnchor="end"
            fontSize="9.5"
            fill="#D97706"
            fontWeight="600"
          >
            Upper Limit (8.0°C)
          </text>

          {/* Lower Safe Label (4°C) */}
          <text
            x={padding.left + plotWidth - 4}
            y={safeBottomY + 12}
            textAnchor="end"
            fontSize="9.5"
            fill="#059669"
            fontWeight="600"
          >
            Lower Target (4.0°C)
          </text>

          {/* Shaded Area */}
          <polygon points={areaPath} fill={areaFill} />

          {/* Milk Temperature Line */}
          <polyline
            fill="none"
            stroke={lineColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points}
          />

          {/* X Axis Points & Hover Interaction */}
          {data.map((d, i) => {
            const cx = getX(i);
            const cy = getY(d.milkTemp);
            const isLast = i === data.length - 1;
            const isHovered = hoveredPoint === i;

            return (
              <g key={i}>
                {/* Vertical tick line */}
                <line
                  x1={cx}
                  y1={padding.top + plotHeight}
                  x2={cx}
                  y2={padding.top + plotHeight + 5}
                  stroke="#CBD5E0"
                  strokeWidth="1"
                />

                {/* X axis timestamp */}
                <text
                  x={cx}
                  y={padding.top + plotHeight + 18}
                  textAnchor="middle"
                  fontSize="9.5"
                  fill="var(--text-secondary)"
                  fontFamily="var(--font-mono)"
                >
                  {d.time}
                </text>

                {/* Data point circle */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isLast ? 5 : isHovered ? 5 : 3.5}
                  fill={isLast ? lineColor : '#FFFFFF'}
                  stroke={lineColor}
                  strokeWidth={isLast ? 2.5 : 2}
                  style={{ cursor: 'pointer', transition: 'all 0.15s ease' }}
                  onMouseEnter={() => setHoveredPoint(i)}
                  onMouseLeave={() => setHoveredPoint(null)}
                />

                {/* Value tooltip callout on last point */}
                {isLast && (
                  <g>
                    <rect
                      x={cx - 24}
                      y={cy - 24}
                      width="48"
                      height="18"
                      rx="4"
                      fill={lineColor}
                    />
                    <text
                      x={cx}
                      y={cy - 11}
                      textAnchor="middle"
                      fontSize="9.5"
                      fill="#FFFFFF"
                      fontWeight="700"
                      fontFamily="var(--font-mono)"
                    >
                      {d.milkTemp.toFixed(1)}°C
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredPoint !== null && data[hoveredPoint] && (
          <div style={{
            position: 'absolute',
            top: 20,
            right: 20,
            background: '#FFFFFF',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-md)',
            padding: '8px 12px',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.78rem',
            pointerEvents: 'none',
            zIndex: 10
          }}>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>
              Time: {data[hoveredPoint].time}
            </div>
            <div style={{ color: lineColor, fontWeight: 600 }}>
              Milk Temp: {data[hoveredPoint].milkTemp.toFixed(1)}°C
            </div>
            <div style={{
              color: data[hoveredPoint].milkTemp <= 8.0 ? '#059669' : '#DC2626',
              fontWeight: 700,
              marginTop: 3
            }}>
              Status: {data[hoveredPoint].milkTemp <= 7.5 ? 'SAFE' : data[hoveredPoint].milkTemp <= 8.0 ? 'WARNING' : 'CRITICAL'}
            </div>
          </div>
        )}
      </div>

      <div style={{
        marginTop: 14,
        padding: '8px 12px',
        backgroundColor: '#FAFCFE',
        border: '1px dashed var(--border-light)',
        borderRadius: 'var(--radius-sm)',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        fontSize: '0.74rem',
        color: 'var(--text-muted)'
      }}>
        <Info size={14} color="var(--accent-primary)" style={{ flexShrink: 0 }} />
        <span>
          <strong>Telemetry Mode:</strong> Values shown in Demo Mode are simulated for system demonstration. Live values will be received from the ESP32 temperature sensor when hardware integration is enabled.
        </span>
      </div>
    </div>
  );
}
