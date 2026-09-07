import React from 'react';
import { Thermometer, Snowflake, Clock, Battery } from 'lucide-react';
import HardwareFlowBanner from '../components/layout/HardwareFlowBanner';
import SimulationControls from '../components/simulation/SimulationControls';
import KpiCard from '../components/common/KpiCard';
import TemperatureChart from '../components/dashboard/TemperatureChart';
import TemperatureAlerts from '../components/dashboard/TemperatureAlerts';
import CoolingStatusCard from '../components/dashboard/CoolingStatusCard';
import CurrentBatchCard from '../components/dashboard/CurrentBatchCard';
import BatteryCard from '../components/dashboard/BatteryCard';
import TransportSection from '../components/dashboard/TransportSection';
import RecentBatchesTable from '../components/dashboard/RecentBatchesTable';
import StorageSummary from '../components/dashboard/StorageSummary';
import { STATUS_LEVELS } from '../types/telemetry';

export default function DashboardView({
  monitoringState,
  batches = [],
  onSelectScenario,
  onReset,
  onToggleDemoMode,
  onViewBatch
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
    batteryVoltage = 3.92,
    batteryStatus = "GOOD",
    coldChainStatus = "COLD CHAIN MAINTAINED",
    temperatureHistory = [],
    selectedScenario = "Normal Safe",
    alertMessage = "Temperature is within the safe range.",
    batchId = "MC-001",
    milkVolume = 35,
    collectionTime = "08:30 AM",
    farmerName = "Rajeshwar Patil (ID: DL-884)",
    cooperativeName = "Anand Rural Dairy Cluster #04",
    transportStages = [
      { name: "Collection Centre", location: "Khed Milk Pool", time: "08:30 AM", status: "completed" },
      { name: "In Transit", location: "State Route 48 (Insulated Vehicle)", time: "10:15 AM - Now", status: "active" },
      { name: "Processing Centre", location: "District Chilling Plant #2", time: "Est. 03:00 PM", status: "pending" }
    ]
  } = monitoringState || {};

  const getStatusColor = () => {
    if (temperatureStatus === STATUS_LEVELS.CRITICAL) return "#EF4444";
    if (temperatureStatus === STATUS_LEVELS.WARNING) return "#F59E0B";
    return "#007BFF";
  };

  const getCoolingBadgeClass = () => {
    if (temperatureStatus === STATUS_LEVELS.CRITICAL) return "badge-critical";
    if (temperatureStatus === STATUS_LEVELS.WARNING) return "badge-warning";
    return "badge-safe";
  };

  return (
    <div className="content-body">
      {/* 1. Visual Hardware Pipeline Banner */}
      <HardwareFlowBanner />

      {/* 2. SIH 2026 Interactive Scenario Controls */}
      <SimulationControls
        monitoringState={monitoringState}
        onSelectScenario={onSelectScenario}
        onReset={onReset}
        onToggleDemoMode={onToggleDemoMode}
      />

      {/* 3. TOP KPI CARDS (Driven 100% by Central Monitoring State) */}
      <div className="kpi-grid">
        {/* KPI 1: Milk Temperature */}
        <KpiCard
          title="Milk Temperature"
          value={temperature.toFixed(1)}
          unit="°C"
          icon={Thermometer}
          status={temperatureStatus}
          targetLabel="Target Range"
          targetValue="4–8°C"
          secondaryText={`Min: ${minTemperature.toFixed(1)}°C • Max: ${maxTemperature.toFixed(1)}°C`}
          accentColor={getStatusColor()}
        />

        {/* KPI 2: Cooling Status */}
        <KpiCard
          title="Cooling Status"
          value={coolingStatus}
          icon={Snowflake}
          targetLabel="Condition"
          targetValue={coolingCondition}
          customBadge={<span className={`badge ${getCoolingBadgeClass()}`}>{coolingCondition}</span>}
          secondaryText="100% Passive PUF + PCM Chilling"
          accentColor="#10B981"
        />

        {/* KPI 3: Cooling Duration */}
        <KpiCard
          title="Cooling Duration"
          value={coolingDuration}
          icon={Clock}
          targetLabel="Target"
          targetValue="6–12 Hours"
          customBadge={<span className="badge badge-safe">ON TRACK</span>}
          secondaryText="Batch collected at 08:30 AM"
          accentColor="#007BFF"
        />

        {/* KPI 4: Battery (ESP32) */}
        <KpiCard
          title="ESP32 Battery"
          value={battery}
          unit="%"
          icon={Battery}
          targetLabel="Voltage"
          targetValue={`${batteryVoltage.toFixed(2)}V`}
          status={battery < 20 ? "CRITICAL" : "SAFE"}
          secondaryText="Sensor & telemetry node power"
          accentColor={battery < 20 ? "#EF4444" : "#10B981"}
        />
      </div>

      {/* 4. MAIN CHARTS & ALERTS SECTION */}
      <div className="grid-2col">
        {/* Left: Temperature Line Chart */}
        <TemperatureChart
          historyData={temperatureHistory}
          currentTemp={temperature}
          duration={coolingDuration}
          selectedScenario={selectedScenario}
        />

        {/* Right: Temperature Alerts Monitor */}
        <TemperatureAlerts
          currentTemp={temperature}
          batteryPercentage={battery}
          isLowBattery={selectedScenario === "Low Battery" || selectedScenario === "LOW_BATTERY" || battery < 20}
          alertMessage={alertMessage}
          temperatureStatus={temperatureStatus}
        />
      </div>

      {/* 5. COOLING STATUS & ACTIVE BATCH SECTION */}
      <div className="grid-equal-2col">
        <CoolingStatusCard
          coolingMethod={coolingMethod}
          targetRange="4–8°C"
          currentTemp={temperature}
          coolingStatus={coolingStatus}
          coolingCondition={coolingCondition}
        />

        <CurrentBatchCard
          batchId={batchId}
          milkVolume={milkVolume}
          collectionTime={collectionTime}
          currentTemp={temperature}
          duration={coolingDuration}
          durationSeconds={durationSeconds}
          temperatureStatus={temperatureStatus}
          farmerName={farmerName}
          cooperative={cooperativeName}
        />
      </div>

      {/* 6. TRANSPORT & BATTERY MONITORING */}
      <div className="grid-2col">
        <TransportSection stages={transportStages} />
        <BatteryCard
          percentage={battery}
          voltage={batteryVoltage}
          status={batteryStatus}
        />
      </div>

      {/* 7. RECENT BATCHES LEDGER */}
      <div style={{ marginBottom: 24 }}>
        <RecentBatchesTable batches={batches} onViewBatch={onViewBatch} />
      </div>

      {/* 8. MILK STORAGE & COLD-CHAIN SUMMARY */}
      <StorageSummary
        currentTemp={temperature}
        coldChainStatus={coldChainStatus}
      />
    </div>
  );
}
