import { MongoMemoryServer } from "mongodb-memory-server";
import mongodb from "mongodb";
const MongoClient = mongodb.MongoClient;

let database = null;
const collectionName = "devices";

async function insertDevice(device) {
  const database = await getDatabase();
  const { insertedId } = await database
    .collection(collectionName)
    .insertOne(device);
  return insertedId;
}

async function getDevices() {
  const database = await getDatabase();
  return await database.collection(collectionName).find({}).toArray();
}

async function startDatabase() {
  const mongo = await MongoMemoryServer.create();
  const mongoDBURL = await mongo.getConnectionString();
  const connection = await MongoClient.connect(mongoDBURL.cat, {
    useNewUrlParser: true,
  });
  database = connection.db();
}

async function getDatabase() {
  if (!database) await startDatabase();
  return database;
}

export { insertDevice, getDevices, startDatabase, getDatabase };
