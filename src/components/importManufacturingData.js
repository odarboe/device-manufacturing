import fs from "fs";
import path from "path";
import { parse } from "csv-parse";
import deviceConfigurations from "../configuration/deviceConfigurations.json";
import { insertDevice, startDatabase } from "../database/mongo";

let headerFlag = true;

function importManufacturingData(deviceType, importFile) {
  try {
    console.log(
      `Searching for Device type <<${deviceType}>> in configurations?`
    );
    const device = deviceConfigurations.devices.find((device) => {
      return device.device === deviceType;
    });

    if (!device)
      throw `Device Error:- Cannot import device [${deviceType}]. Configuration headers does not exist!`;
    else console.log(`Device type <<${deviceType}>> configurations FOUND`);

    console.log(`Reading File <<${importFile}>> data file?`);
    fs.createReadStream(path.resolve(process.cwd() + "/src", importFile))
      .pipe(parse({ delimiter: "," }))
      .on("data", (newDevice) => {
        console.log(`->>>>>> Collecting List of Headers from configuration?`);
        const configHeaders = [];
        const deviceConfiguration = device.headers;
        device.headers.find((header) => {
          if (device.device === deviceType) configHeaders.push(header.header);
        });

        console.log("->>> Import new device");
        importDevice(deviceConfiguration, newDevice, configHeaders);
      })
      .on("error", function (err) {
        throw `Read File Error:- File [${importFile}] cannot be read!`;
      });
  } catch (error) {
    console.log(error);
  }
}

function importDevice(deviceConfigurations, device, listOfHeaders) {
  if (headerFlag) {
    console.log("->>> Header Validation");
    var validHeaders = isHeadersValid(listOfHeaders, device);
    if (!validHeaders)
      throw `Missing Column Header Error:- Device [${device}] has a missing header from ${listOfHeaders}!`;
    headerFlag = false;
  } else {
    console.log("->>> Data Validation");
    var validData = isValidData(device);
    if (!validData)
      throw `Invalid Data Error:- Device [${device}] has a invalid data that matches ${deviceConfigurations}!`;
    headerFlag = true;

    console.log("Insert Valid Device into Database?\n");
    for (let deviceConfig of deviceConfigurations) {
      console.log(">> START");
      console.log(">>> Device Config header:-", deviceConfig.header);
      console.log(">>> Device Config Ignore:-", deviceConfig.Ignore);
      console.log(">>> Device Config dbName:-", deviceConfig.dbName);
      console.log(">>> Device Config criteria:-", deviceConfig.criteria);
      console.log(">> END");
    }

    console.log("New Device data:- ", JSON.stringify(device));

    // if all validation are successfull store device in db
    // startDatabase().then(async () => {
    //   insertStatus = insertDevice(device);
    //   if (!insertStatus)
    //     throw `Insert Device Error:- Device [${header}] was not inserted in db!`;
    //   else console.log("Device Successfully inserted to db!");
    // });
    console.log("MOCKUP:->>> New Device imported into the db!");
  }
}

function isHeadersValid(configHeaders, deviceHeaders) {
  if (configHeaders.length != deviceHeaders.length) return false;
  else {
    for (var i = 0; i < configHeaders.length; i++)
      if (configHeaders[i] != deviceHeaders[i]) return false;
    return true;
  }
}

function isValidData(device) {
  // Check for all specific invalid device data
  //Validation1: SerialNumber
  let reSerialNumber = new RegExp("^([0-9A-Z]{10})$");
  let serialNumber = device[1];
  if (!reSerialNumber.test(serialNumber)) return false;

  //Validation2: skuNumber...
  //ValidationN: n
  return true;
}

export default importManufacturingData;
