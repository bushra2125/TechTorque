/**
 * ESP32 Hardware Integration Schema & Configuration
 * Provides strict JSON payload contracts for ESP32 HTTP POST / MQTT ingestion.
 */

export const ESP32_PAYLOAD_SCHEMA = {
  description: "Standard JSON payload sent by ESP32-WROOM-32 via HTTP POST /api/v1/telemetry or MQTT topic chillcan/devices/{device_id}/telemetry",
  schema: {
    device_id: "CHILLCAN-ESP32-01",
    firmware_version: "v1.2.0-sih26",
    batch_id: "MC-001",
    timestamp: 1788778460, // Unix epoch seconds
    milk_temp_c: 6.2,      // DS18B20 1-Wire Digital Temp Probe
    ambient_temp_c: 32.8,   // Secondary onboard NTC / DHT22
    milk_volume_l: 35.0,    // Registered batch volume (30-40L)
    battery_pct: 86,        // ADC voltage divider (Li-ion 3.0V-4.2V)
    battery_voltage: 3.92,  // Volts
    cooling_duration_s: 23040, // Seconds under passive chilling
    cooling_method: "PCM_0C", // Phase Change Material
    probe_health: "OK",     // DS18B20 CRC check status
    lid_sealed: true        // Reed magnetic switch state
  }
};

export const SAMPLE_ARDUINO_CODE = `/*
 * CHILLCAN - Smart Passive Milk Chilling Telemetry Node
 * SIH 2026 Problem ID: SIH26110
 * Hardware: ESP32-WROOM-32 + DS18B20 Food-Grade Waterproof Probe
 */

#include <WiFi.h>
#include <HTTPClient.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <ArduinoJson.h>

#define ONE_WIRE_BUS 4        // DS18B20 data pin
#define BATTERY_ADC_PIN 34    // Voltage divider
#define SLEEP_INTERVAL_US 60000000 // 1 minute deep-sleep

OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

const char* ssid = "YOUR_WIFI_OR_HOTSPOT";
const char* password = "YOUR_PASSWORD";
const char* serverUrl = "https://your-domain.com/api/v1/telemetry";

void setup() {
  Serial.begin(115200);
  sensors.begin();
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  sensors.requestTemperatures();
  float milkTemp = sensors.getTempCByIndex(0);
  
  // Read battery voltage (3.0V - 4.2V mapped to 0-100%)
  int rawAdc = analogRead(BATTERY_ADC_PIN);
  float voltage = (rawAdc / 4095.0) * 2.0 * 3.3 * 1.1;
  int batteryPct = constrain(map(voltage * 100, 320, 420, 0, 100), 0, 100);

  StaticJsonDocument<256> doc;
  doc["device_id"] = "CHILLCAN-ESP32-01";
  doc["batch_id"] = "MC-001";
  doc["milk_temp_c"] = milkTemp;
  doc["battery_pct"] = batteryPct;
  doc["battery_voltage"] = voltage;
  doc["cooling_method"] = "PCM_0C";

  String jsonPayload;
  serializeJson(doc, jsonPayload);

  HTTPClient http;
  http.begin(serverUrl);
  http.addHeader("Content-Type", "application/json");
  int httpResponseCode = http.POST(jsonPayload);
  
  Serial.printf("HTTP Response code: %d\\n", httpResponseCode);
  http.end();

  // Low power deep sleep between readings
  esp_sleep_enable_timer_wakeup(SLEEP_INTERVAL_US);
  esp_deep_sleep_start();
}

void loop() {}
`;
