import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import config from "./config";
import DB from "./db";
import characters from "./routes/characters";
import { initialiseCharacterDb } from "./controllers/character/characterController";

const app = express();

// configure middleware
app.use(helmet()); // helmet sets security related HTTP headers
app.use(helmet.xssFilter()); // protect against cross site scripting
app.use(express.json()); // only accept json payloads

if (config.debug) {
  app.use(morgan("dev"));
}

// Configure DB events
DB.on("error", console.error.bind(console, "Connection error"));
DB.on("connected", initialiseCharacterDb);

// configure routes
app.use("/characters", characters);

app.listen(config.port, () => {
  if (config.env === "development" || config.debug) {
    console.log(`server listening on port: ${config.port}`);
  }
});
