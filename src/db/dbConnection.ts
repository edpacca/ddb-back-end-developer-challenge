import mongoose from "mongoose";
import config from "../config";
import Character from "../models/schema/CharacterSchema";
import defaultCharacterData from "./data/briv.json";

// only intended for internal use to load in the test data
export async function initialiseCharacterDb() {
  try {
    await Character.deleteMany({}); // Clear characters
    const newCharacter = await Character.create({
      ...defaultCharacterData,
      _id: "briv",
      currentHitPoints: defaultCharacterData.hitPoints,
    });
    console.log(`Created new character: ${newCharacter.name}`);
  } catch (error) {
    console.error("error creating character", error);
  }
}

const dbConfig = config.getDatabaseConfig();
const mongo_uri = `${dbConfig.uri}/${dbConfig.database}`;
mongoose.set("strictQuery", false);

export async function connectDB(): Promise<mongoose.Connection | undefined> {
  try {
    await mongoose.connect(mongo_uri);
    return mongoose.connection;
  } catch (e) {
    if (config.debug) {
      console.error("Connection error", (e as Error).message);
    }
  }
}
