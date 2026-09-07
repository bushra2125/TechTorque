/**
 * CHILLCAN Telemetry & Engineering Constants
 * SIH 2026 - Problem Statement: SIH26110
 */

export const SYSTEM_DEFAULTS = {
  PROJECT_NAME: "TechTorque",
  PROJECT_FULL_NAME: "Smart Passive Milk Chilling & Monitoring System",
  PROBLEM_ID: "SIH26110",
  PROBLEM_TITLE: "Development of a Low-Cost Light-weight Milk Chilling Can for Small-Scale Dairy Farmers",
  
  // Physical Can Engineering Parameters
  TARGET_TEMP_MIN: 4.0, // °C
  TARGET_TEMP_MAX: 8.0, // °C
  TARGET_COOLING_DURATION_MIN: 6, // Hours
  TARGET_COOLING_DURATION_MAX: 12, // Hours
  CAN_CAPACITY_LITERS: 35, // 30 - 40 L
  INSULATION_TYPE: "Rigid Polyurethane Foam (PUF) - 45mm Double Wall",
  COOLING_METHOD: "PCM / Reusable Ice Pack",
  INNER_VESSEL_MATERIAL: "Food-Grade Stainless Steel (SS304)",
  SENSOR_PROBE: "Waterproof Digital DS18B20 (±0.5°C accuracy)",
  IOT_CONTROLLER: "ESP32-WROOM-32 (Deep Sleep Enabled)",
  BATTERY_SPEC: "3.7V 3000mAh Li-ion 18650 Battery Pack"
};

export const STATUS_LEVELS = {
  SAFE: "SAFE",
  WARNING: "WARNING",
  CRITICAL: "CRITICAL"
};

export const COLD_CHAIN_STATUS = {
  MAINTAINED: "COLD CHAIN MAINTAINED",
  AT_RISK: "COLD CHAIN AT RISK",
  BREACH: "COLD CHAIN BREACH"
};

export const STATUS_CONFIG = {
  SAFE: {
    label: "SAFE",
    badgeClass: "badge-safe",
    alertClass: "alert-safe",
    title: "Milk temperature is within the target range.",
    description: "Cold-chain condition maintained (4–8°C). Passive PUF insulation and PCM thermal buffer are operating normally.",
    color: "#10B981"
  },
  WARNING: {
    label: "WARNING",
    badgeClass: "badge-warning",
    alertClass: "alert-warning",
    title: "Milk temperature is approaching the upper target limit.",
    description: "Temperature is near 7.8°C. Inspect can lid seal and ensure vehicle transit is completed promptly.",
    color: "#F59E0B"
  },
  CRITICAL: {
    label: "CRITICAL",
    badgeClass: "badge-critical",
    alertClass: "alert-critical",
    title: "Milk temperature has exceeded the target range.",
    description: "Temperature has risen above 8.0°C. Cold-chain condition is at risk; immediate transfer to chilling center is advised.",
    color: "#EF4444"
  }
};

export function evaluateTemperatureStatus(temp) {
  if (temp <= 7.5) {
    return STATUS_LEVELS.SAFE;
  }
  if (temp <= SYSTEM_DEFAULTS.TARGET_TEMP_MAX) {
    return STATUS_LEVELS.WARNING;
  }
  return STATUS_LEVELS.CRITICAL;
}

export function evaluateColdChainStatus(temp) {
  if (temp <= 8.0) {
    return COLD_CHAIN_STATUS.MAINTAINED;
  }
  if (temp <= 8.5) {
    return COLD_CHAIN_STATUS.AT_RISK;
  }
  return COLD_CHAIN_STATUS.BREACH;
}
