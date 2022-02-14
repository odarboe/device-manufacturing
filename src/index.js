#!/usr/bin/env node
import importManufacturingData from "./components/importManufacturingData.js";
const deviceType = process.argv[2];
const importFile = process.argv[3];
console.log(`DeviceType: ${deviceType} File: ${importFile}`);
importManufacturingData(deviceType, importFile);
