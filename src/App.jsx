import React, { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import TopHeader from './components/layout/TopHeader';
import DashboardView from './views/DashboardView';
import TemperatureView from './views/TemperatureView';
import BatchesView from './views/BatchesView';
import CoolingView from './views/CoolingView';
import TransportView from './views/TransportView';
import ReportsView from './views/ReportsView';
import SettingsView from './views/SettingsView';
import ErrorBoundary from './components/common/ErrorBoundary';

import {
  RECENT_BATCHES,
  formatDuration
} from './services/demoDataService';

// Standard distinct curves for each scenario
const SCENARIO_DATA = {
  NORMAL: {
    selectedScenario: "Normal Safe",
    scenarioKey: "NORMAL",
    temperature: 6.2,
    minTemperature: 5.1,
    maxTemperature: 7.4,
    temperatureStatus: "SAFE",
    coolingStatus: "ACTIVE",
    coolingCondition: "GOOD",
    coolingMethod: "PCM / Ice Pack",
    coolingDuration: "06h 26m",
    durationSeconds: 6 * 3600 + 26 * 60,
    battery: 86,
    batteryVoltage: 3.92,
    batteryStatus: "GOOD",
    coldChainStatus: "MAINTAINED",
    alertMessage: "Temperature is within the safe range.",
    temperatureHistory: [
      { time: "08:30 AM", milkTemp: 7.0 },
      { time: "09:30 AM", milkTemp: 6.4 },
      { time: "10:30 AM", milkTemp: 5.8 },
      { time: "11:30 AM", milkTemp: 5.4 },
      { time: "12:30 PM", milkTemp: 5.6 },
      { time: "01:30 PM", milkTemp: 5.9 },
      { time: "02:30 PM", milkTemp: 6.1 },
      { time: "02:56 PM", milkTemp: 6.2 }
    ]
  },
  WARNING: {
    selectedScenario: "Warning",
    scenarioKey: "WARNING",
    temperature: 7.8,
    minTemperature: 5.2,
    maxTemperature: 7.8,
    temperatureStatus: "WARNING",
    coolingStatus: "MONITOR",
    coolingCondition: "ATTENTION",
    coolingMethod: "PCM / Ice Pack",
    coolingDuration: "06h 26m",
    durationSeconds: 6 * 3600 + 26 * 60,
    battery: 86,
    batteryVoltage: 3.92,
    batteryStatus: "GOOD",
    coldChainStatus: "AT RISK",
    alertMessage: "Temperature is approaching the upper safe limit.",
    temperatureHistory: [
      { time: "08:30 AM", milkTemp: 5.2 },
      { time: "09:30 AM", milkTemp: 5.8 },
      { time: "10:30 AM", milkTemp: 6.4 },
      { time: "11:30 AM", milkTemp: 6.9 },
      { time: "12:30 PM", milkTemp: 7.3 },
      { time: "01:30 PM", milkTemp: 7.5 },
      { time: "02:30 PM", milkTemp: 7.7 },
      { time: "02:56 PM", milkTemp: 7.8 }
    ]
  },
  CRITICAL: {
    selectedScenario: "Critical Spike",
    scenarioKey: "CRITICAL",
    temperature: 8.9,
    minTemperature: 5.5,
    maxTemperature: 8.9,
    temperatureStatus: "CRITICAL",
    coolingStatus: "ATTENTION REQUIRED",
    coolingCondition: "CRITICAL",
    coolingMethod: "PCM / Ice Pack",
    coolingDuration: "06h 26m",
    durationSeconds: 6 * 3600 + 26 * 60,
    battery: 86,
    batteryVoltage: 3.92,
    batteryStatus: "GOOD",
    coldChainStatus: "BREACH",
    alertMessage: "Temperature has exceeded the safe range.",
    temperatureHistory: [
      { time: "08:30 AM", milkTemp: 5.5 },
      { time: "09:30 AM", milkTemp: 6.2 },
      { time: "10:30 AM", milkTemp: 7.0 },
      { time: "11:30 AM", milkTemp: 7.8 },
      { time: "12:30 PM", milkTemp: 8.2 },
      { time: "01:30 PM", milkTemp: 8.5 },
      { time: "02:30 PM", milkTemp: 8.7 },
      { time: "02:56 PM", milkTemp: 8.9 }
    ]
  },
  LOW_BATTERY: {
    selectedScenario: "Low Battery",
    scenarioKey: "LOW_BATTERY",
    temperature: 6.3,
    minTemperature: 5.1,
    maxTemperature: 7.4,
    temperatureStatus: "SAFE",
    coolingStatus: "ACTIVE",
    coolingCondition: "GOOD",
    coolingMethod: "PCM / Ice Pack",
    coolingDuration: "06h 26m",
    durationSeconds: 6 * 3600 + 26 * 60,
    battery: 14,
    batteryVoltage: 3.25,
    batteryStatus: "LOW",
    coldChainStatus: "MAINTAINED",
    alertMessage: "Battery level is low. Recharge monitoring unit.",
    temperatureHistory: [
      { time: "08:30 AM", milkTemp: 7.0 },
      { time: "09:30 AM", milkTemp: 6.4 },
      { time: "10:30 AM", milkTemp: 5.8 },
      { time: "11:30 AM", milkTemp: 5.4 },
      { time: "12:30 PM", milkTemp: 5.6 },
      { time: "01:30 PM", milkTemp: 5.9 },
      { time: "02:30 PM", milkTemp: 6.1 },
      { time: "02:56 PM", milkTemp: 6.3 }
    ]
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);

  // CENTRAL MONITORING STATE (Drives every card, graph, alert, badge & page)
  const [monitoringState, setMonitoringState] = useState({
    ...SCENARIO_DATA.NORMAL,
    demoMode: true,
    deviceId: "TECHTORQUE-ESP32-01",
    batchId: "MC-001",
    milkVolume: 35,
    collectionTime: "08:30 AM",
    farmerName: "Rajeshwar Patil (ID: DL-884)",
    cooperativeName: "Anand Rural Dairy Cluster #04",
    lastUpdated: "Just now",
    transportStages: [
      { name: "Collection Centre", location: "Khed Milk Pool", time: "08:30 AM", status: "completed" },
      { name: "In Transit", location: "State Route 48 (Insulated Vehicle)", time: "10:15 AM - Now", status: "active" },
      { name: "Processing Centre", location: "District Chilling Plant #2", time: "Est. 03:00 PM", status: "pending" }
    ]
  });

  const [batches, setBatches] = useState(RECENT_BATCHES);

  // Clock tick: increment cooling duration when Demo Mode is ON
  useEffect(() => {
    if (!monitoringState.demoMode) return;

    const clockInterval = setInterval(() => {
      setMonitoringState((prev) => {
        const nextSeconds = prev.durationSeconds + 1;
        return {
          ...prev,
          durationSeconds: nextSeconds,
          coolingDuration: formatDuration(nextSeconds)
        };
      });
    }, 1000);

    return () => clearInterval(clockInterval);
  }, [monitoringState.demoMode]);

  // Scenario Switcher Handler (Called when user clicks any of the scenario buttons)
  const handleSelectScenario = (scenarioKey) => {
    const normalizedKey = scenarioKey === "Normal Safe" ? "NORMAL"
      : scenarioKey === "Warning" ? "WARNING"
      : scenarioKey === "Critical Spike" || scenarioKey === "CRITICAL" ? "CRITICAL"
      : scenarioKey === "Low Battery" || scenarioKey === "LOW_BATTERY" ? "LOW_BATTERY"
      : scenarioKey;

    const preset = SCENARIO_DATA[normalizedKey] || SCENARIO_DATA.NORMAL;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    setMonitoringState((prev) => ({
      ...prev,
      ...preset,
      lastUpdated: now
    }));
  };

  // Reset Handler
  const handleReset = () => {
    handleSelectScenario("NORMAL");
  };

  // Toggle Demo Mode
  const handleToggleDemoMode = () => {
    setMonitoringState((prev) => ({
      ...prev,
      demoMode: !prev.demoMode,
      lastUpdated: !prev.demoMode ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : prev.lastUpdated
    }));
  };

  const handleViewBatchFromLedger = (batch) => {
    setActiveTab('batches');
  };

  return (
    <div className="app-container">
      {/* Left Navigation Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        telemetryData={{
          deviceId: monitoringState.deviceId,
          milkVolumeLiters: monitoringState.milkVolume
        }}
      />

      {/* Main Content Area */}
      <div className="main-wrapper">
        <TopHeader
          setMobileOpen={setMobileOpen}
          monitoringState={monitoringState}
          onToggleDemoMode={handleToggleDemoMode}
        />

        <main>
          <ErrorBoundary>
            {activeTab === 'dashboard' && (
              <DashboardView
                monitoringState={monitoringState}
                batches={batches}
                onSelectScenario={handleSelectScenario}
                onReset={handleReset}
                onToggleDemoMode={handleToggleDemoMode}
                onViewBatch={handleViewBatchFromLedger}
              />
            )}

            {activeTab === 'temperature' && (
              <TemperatureView
                monitoringState={monitoringState}
              />
            )}

            {activeTab === 'batches' && (
              <BatchesView
                batches={batches}
                setBatches={setBatches}
                currentBatch={{
                  batchId: monitoringState.batchId,
                  milkVolumeLiters: monitoringState.milkVolume,
                  collectionTime: monitoringState.collectionTime,
                  currentTemp: monitoringState.temperature,
                  durationSeconds: monitoringState.durationSeconds,
                  farmerName: monitoringState.farmerName,
                  cooperativeName: monitoringState.cooperativeName
                }}
              />
            )}

            {activeTab === 'cooling' && (
              <CoolingView
                monitoringState={monitoringState}
                onToggleDemoMode={handleToggleDemoMode}
              />
            )}

            {activeTab === 'transport' && (
              <TransportView
                telemetryData={{
                  transportStages: monitoringState.transportStages
                }}
              />
            )}

            {activeTab === 'reports' && (
              <ReportsView
                telemetryData={{
                  deviceId: monitoringState.deviceId
                }}
                historyData={monitoringState.temperatureHistory}
                batches={batches}
              />
            )}

            {activeTab === 'settings' && (
              <SettingsView
                telemetryData={{
                  milkVolumeLiters: monitoringState.milkVolume,
                  coolingMethod: monitoringState.coolingMethod,
                  isLiveSensorConnected: false
                }}
                setTelemetryData={() => {}}
              />
            )}
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
}
