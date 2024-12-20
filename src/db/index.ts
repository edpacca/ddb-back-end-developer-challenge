import mongoose from "mongoose";
import config from "../config";

const dbConfig = config.getDatabaseConfig();
const mongo_uri = `${dbConfig.uri}/${dbConfig.database}`;
mongoose.set("strictQuery", false);

mongoose.connect(mongo_uri).catch((e) => {
  if (config.debug) {
    console.error("Connection error", e.message);
  }
});

export default mongoose.connection;
