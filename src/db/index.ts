import config from "../config";
import { connectDB, initialiseCharacterDb } from "./dbConnection";

async function setupDatabase() {
  if (config.env === "production") {
    // Configure DB events
    const DB = await connectDB();
    if (DB) {
      DB.on("error", console.error.bind(console, "Connection error"));
      await initialiseCharacterDb();
    }
  }
  // If not production we use our local repository set up via the interface layer
}

export default setupDatabase;
