import { evaluateTemperatureStatus, evaluateColdChainStatus, STATUS_LEVELS, COLD_CHAIN_STATUS } from '../types/telemetry';

export const JURY_PRESETS = {
  NORMAL: {
    id: "NORMAL",
    name: "Normal Safe (6.2°C)",
    currentTemp: 6.2,
    minTemp: 5.1,
    maxTemp: 7.2,
    durationSeconds: 6 * 3600 + 26 * 60, // 06h 26m
    batteryPercentage: 86,
    batteryVoltage: 3.92,
    batteryStatus: "GOOD",
    coolingStatus: "ACTIVE / GOOD",
    coolingCondition: "GOOD",
    coolingMethod: "PCM / Reusable Ice Pack",
    temperatureStatus: "SAFE",
    coldChainStatus: COLD_CHAIN_STATUS.MAINTAINED,
    alertTitle: "Milk temperature is within the target range.",
    alertDescription: "Cold-chain condition maintained (4–8°C). Passive PUF insulation and PCM thermal buffer are operating normally.",
    history: [
      { time: "08:30 AM", elapsedHours: "0.0h", milkTemp: 7.2, ambientTemp: 27.5 },
      { time: "09:30 AM", elapsedHours: "1.0h", milkTemp: 6.5, ambientTemp: 29.0 },
      { time: "10:30 AM", elapsedHours: "2.0h", milkTemp: 5.8, ambientTemp: 30.5 },
      { time: "11:30 AM", elapsedHours: "3.0h", milkTemp: 5.4, ambientTemp: 32.0 },
      { time: "12:30 PM", elapsedHours: "4.0h", milkTemp: 5.6, ambientTemp: 33.8 },
      { time: "01:30 PM", elapsedHours: "5.0h", milkTemp: 5.9, ambientTemp: 34.2 },
      { time: "02:30 PM", elapsedHours: "6.0h", milkTemp: 6.1, ambientTemp: 33.5 },
      { time: "02:56 PM", elapsedHours: "6.4h", milkTemp: 6.2, ambientTemp: 32.8 }
    ]
  },
  WARNING: {
    id: "WARNING",
    name: "Warning (7.8°C)",
    currentTemp: 7.8,
    minTemp: 5.2,
    maxTemp: 7.8,
    durationSeconds: 6 * 3600 + 26 * 60, // 06h 26m
    batteryPercentage: 86,
    batteryVoltage: 3.92,
    batteryStatus: "GOOD",
    coolingStatus: "MONITOR",
    coolingCondition: "ATTENTION",
    coolingMethod: "PCM / Reusable Ice Pack",
    temperatureStatus: "WARNING",
    coldChainStatus: COLD_CHAIN_STATUS.AT_RISK,
    alertTitle: "Milk temperature is approaching the upper target limit.",
    alertDescription: "Current reading is 7.8°C. Cold-chain condition at risk. Verify lid seal and expedite transfer to chilling center.",
    history: [
      { time: "08:30 AM", elapsedHours: "0.0h", milkTemp: 5.2, ambientTemp: 28.0 },
      { time: "09:30 AM", elapsedHours: "1.0h", milkTemp: 5.8, ambientTemp: 30.0 },
      { time: "10:30 AM", elapsedHours: "2.0h", milkTemp: 6.4, ambientTemp: 32.0 },
      { time: "11:30 AM", elapsedHours: "3.0h", milkTemp: 6.9, ambientTemp: 33.5 },
      { time: "12:30 PM", elapsedHours: "4.0h", milkTemp: 7.3, ambientTemp: 35.0 },
      { time: "01:30 PM", elapsedHours: "5.0h", milkTemp: 7.5, ambientTemp: 35.8 },
      { time: "02:30 PM", elapsedHours: "6.0h", milkTemp: 7.7, ambientTemp: 34.5 },
      { time: "02:56 PM", elapsedHours: "6.4h", milkTemp: 7.8, ambientTemp: 33.8 }
    ]
  },
  CRITICAL: {
    id: "CRITICAL",
    name: "Critical Spike (8.9°C)",
    currentTemp: 8.9,
    minTemp: 5.5,
    maxTemp: 8.9,
    durationSeconds: 6 * 3600 + 26 * 60, // 06h 26m
    batteryPercentage: 86,
    batteryVoltage: 3.92,
    batteryStatus: "GOOD",
    coolingStatus: "ATTENTION REQUIRED",
    coolingCondition: "ATTENTION REQUIRED",
    coolingMethod: "PCM / Reusable Ice Pack",
    temperatureStatus: "CRITICAL",
    coldChainStatus: COLD_CHAIN_STATUS.BREACH,
    alertTitle: "Milk temperature has exceeded the target range.",
    alertDescription: "Milk temperature has spiked to 8.9°C (exceeding 8.0°C limit). Storage condition compromised; immediate chilling required.",
    history: [
      { time: "08:30 AM", elapsedHours: "0.0h", milkTemp: 5.5, ambientTemp: 29.0 },
      { time: "09:30 AM", elapsedHours: "1.0h", milkTemp: 6.2, ambientTemp: 31.0 },
      { time: "10:30 AM", elapsedHours: "2.0h", milkTemp: 7.0, ambientTemp: 33.0 },
      { time: "11:30 AM", elapsedHours: "3.0h", milkTemp: 7.8, ambientTemp: 34.5 },
      { time: "12:30 PM", elapsedHours: "4.0h", milkTemp: 8.2, ambientTemp: 36.0 },
      { time: "01:30 PM", elapsedHours: "5.0h", milkTemp: 8.5, ambientTemp: 36.5 },
      { time: "02:30 PM", elapsedHours: "6.0h", milkTemp: 8.7, ambientTemp: 35.5 },
      { time: "02:56 PM", elapsedHours: "6.4h", milkTemp: 8.9, ambientTemp: 34.8 }
    ]
  },
  LOW_BATTERY: {
    id: "LOW_BATTERY",
    name: "Low Battery (14%)",
    currentTemp: 6.2, // Temperature remains at safe value
    minTemp: 5.1,
    maxTemp: 7.2,
    durationSeconds: 6 * 3600 + 26 * 60, // 06h 26m
    batteryPercentage: 14,
    batteryVoltage: 3.25,
    batteryStatus: "LOW",
    coolingStatus: "ACTIVE / GOOD",
    coolingCondition: "GOOD",
    coolingMethod: "PCM / Reusable Ice Pack",
    temperatureStatus: "SAFE",
    coldChainStatus: COLD_CHAIN_STATUS.MAINTAINED,
    alertTitle: "Low battery may affect temperature monitoring.",
    alertDescription: "ESP32 battery level is at 14% (3.25V). Milk temperature remains safely chilled at 6.2°C, but sensor telemetry reliability may degrade.",
    history: [
      { time: "08:30 AM", elapsedHours: "0.0h", milkTemp: 7.2, ambientTemp: 27.5 },
      { time: "09:30 AM", elapsedHours: "1.0h", milkTemp: 6.5, ambientTemp: 29.0 },
      { time: "10:30 AM", elapsedHours: "2.0h", milkTemp: 5.8, ambientTemp: 30.5 },
      { time: "11:30 AM", elapsedHours: "3.0h", milkTemp: 5.4, ambientTemp: 32.0 },
      { time: "12:30 PM", elapsedHours: "4.0h", milkTemp: 5.6, ambientTemp: 33.8 },
      { time: "01:30 PM", elapsedHours: "5.0h", milkTemp: 5.9, ambientTemp: 34.2 },
      { time: "02:30 PM", elapsedHours: "6.0h", milkTemp: 6.1, ambientTemp: 33.5 },
      { time: "02:56 PM", elapsedHours: "6.4h", milkTemp: 6.2, ambientTemp: 32.8 }
    ]
  }
};

export const INITIAL_TELEMETRY = {
  deviceId: "TECHTORQUE-ESP32-01",
  batchId: "MC-001",
  collectionTime: "08:30 AM",
  collectionDate: "Today",
  milkVolumeLiters: 35,
  currentTemp: 6.2,
  minTemp: 5.1,
  maxTemp: 7.2,
  ambientTemp: 32.8,
  coolingStatus: "ACTIVE / GOOD",
  coolingMethod: "PCM / Reusable Ice Pack",
  coolingCondition: "GOOD",
  durationSeconds: 6 * 3600 + 26 * 60, // 06h 26m
  batteryPercentage: 86,
  batteryVoltage: 3.92,
  batteryStatus: "GOOD",
  temperatureStatus: "SAFE",
  coldChainStatus: COLD_CHAIN_STATUS.MAINTAINED,
  activeScenarioId: "NORMAL",
  lastUpdated: "Just now",
  isLiveSensorConnected: false,
  isSimulationRunning: true,
  cooperativeName: "Anand Rural Dairy Cluster #04",
  farmerName: "Rajeshwar Patil (ID: DL-884)",
  transportStage: "IN_TRANSIT",
  transportStages: [
    { name: "Collection Centre", location: "Khed Milk Pool", time: "08:30 AM", status: "completed" },
    { name: "In Transit", location: "State Route 48 (Insulated Vehicle)", time: "10:15 AM - Now", status: "active" },
    { name: "Processing Centre", location: "District Chilling Plant #2", time: "Est. 03:00 PM", status: "pending" }
  ]
};

export const INITIAL_TEMP_HISTORY = JURY_PRESETS.NORMAL.history;

export const RECENT_BATCHES = [
  {
    batchId: "MC-001",
    farmer: "Rajeshwar Patil",
    volumeL: 35,
    finalTemp: 6.2,
    avgTemp: 5.8,
    durationFormatted: "06h 26m",
    durationHours: 6.43,
    collectionTime: "08:30 AM",
    status: "SAFE",
    coolingMethod: "PCM Pack (0°C)",
    notes: "Active in-transit batch to Central Dairy"
  },
  {
    batchId: "MC-000",
    farmer: "Sunita G. Deshmukh",
    volumeL: 38,
    finalTemp: 5.4,
    avgTemp: 4.9,
    durationFormatted: "08h 15m",
    durationHours: 8.25,
    collectionTime: "Yesterday 04:00 PM",
    status: "SAFE",
    coolingMethod: "PCM Pack (0°C)",
    notes: "Delivered & verified at District Chilling Plant"
  },
  {
    batchId: "MB-099",
    farmer: "Vikas Kulkarni",
    volumeL: 32,
    finalTemp: 7.8,
    avgTemp: 6.7,
    durationFormatted: "10h 40m",
    durationHours: 10.67,
    collectionTime: "Yesterday 06:15 AM",
    status: "WARNING",
    coolingMethod: "Reusable Ice Pack",
    notes: "Approached 8°C upper limit near 10.5h transit"
  },
  {
    batchId: "MB-098",
    farmer: "Mahesh B. Rao",
    volumeL: 36,
    finalTemp: 5.1,
    avgTemp: 4.6,
    durationFormatted: "07h 05m",
    durationHours: 7.08,
    collectionTime: "05 Sep 08:00 AM",
    status: "SAFE",
    coolingMethod: "PCM Pack (0°C)",
    notes: "High thermal stability, PUF seal intact"
  },
  {
    batchId: "MB-097",
    farmer: "Kishore Chavan",
    volumeL: 34,
    finalTemp: 5.9,
    avgTemp: 5.2,
    durationFormatted: "06h 50m",
    durationHours: 6.83,
    collectionTime: "04 Sep 03:30 PM",
    status: "SAFE",
    coolingMethod: "PCM Pack (0°C)",
    notes: "Standard evening batch collection"
  }
];

export const STORAGE_SUMMARY = {
  totalMilkCollected: 175,
  totalBatches: 5,
  avgStorageTemp: 5.8,
  safeBatchesCount: 4,
  warningBatchesCount: 1,
  criticalBatchesCount: 0,
  complianceRate: 98.4,
  canCapacityRange: "30–40 L",
  targetThermalWindow: "6–12 Hours (4–8°C)"
};

export function formatDuration(seconds) {
  const s = typeof seconds === 'number' ? seconds : 23160;
  const hours = Math.floor(s / 3600);
  const minutes = Math.floor((s % 3600) / 60);
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}h ${pad(minutes)}m`;
}
