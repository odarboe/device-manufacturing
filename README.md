# Import Manufacturing Data

Import a manufacturing device data from a csv file, validate information before inserting the new device into a mongodb database.

## Getting Started

Go to the project directory
`cd device-manufacturing`

Syntax concept:

`<deviceType> = (connect|doorbell)`

`>> node src/index.js <deviceType> <data/deviceType-device.csv>`.

Actual Example to run the application:-

`>> node --es-module-specifier-resolution=node src/index.js connect data/connect-device.csv`

Note:- Due to time constrainst I did not fix some nodejs module warnings, that is why I added the --es-module flag to proceed.

## Task Status

- [x] Read deviceType and Device data file
- [x] Setup Device Configuration using `deviceConfigurations.json`.
- [x] Setup a Mongodb database connection using `mongodb-memory-server` located at `src/database/mongo.js`
- [x] Create device data files to read from located at `src/data/connect-device.csv`
- [x] Do few validation checks on Headers and Data formats.
- [x]

### Uncompleted Task

- [ ] Final insert into db. I am getting some database errors.
- [ ] Validating each data content based on the device configuration
- [ ] Data cleanup
