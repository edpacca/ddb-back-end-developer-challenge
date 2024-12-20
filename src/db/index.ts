import config from "../config";
import { connectDB, initialiseCharacterDb } from "./dbConnection";
import { CharacterRepository } from "./localCharacterRepository";

async function setupDatabase() {
  if (config.env === "production") {
    // Configure DB events
    const DB = await connectDB();
    if (DB) {
      DB.on("error", console.error.bind(console, "Connection error"));
      DB.on("connected", initialiseCharacterDb);
    }
  } else {
    new CharacterRepository();
    console.log("Set up local Character repository");
  }
}

export default setupDatabase;
