import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import config from "./config";
import DB from "./db";
import routes from "./routes/routes";
import { initialiseCharacterDb } from "./controllers/character/characterController";

const app = express();

// configure middleware
app.use(helmet()); // helmet sets security related HTTP headers
app.use(express.json()); // only accept json payloads

if (config.env === "development") {
  app.use(morgan("dev"));
}

// Configure DB events
DB.on("error", console.error.bind(console, "Connection error"));
DB.on("connected", initialiseCharacterDb);

// configure routes
routes(app);

app.listen(config.port, () => {
  if (config.env === "development") {
    console.log(`server listening on port: ${config.port}`);
  }
});
