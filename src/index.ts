import express from "express";
import helmet from "helmet";
import config from "./config";
import DB from "./db";
import routes from "./routes/routes";
import { initialiseCharacterDb } from "./controllers/characterController";

const app = express();

// configure middleware
app.use(helmet()); // helmet sets security related HTTP headers
app.use(express.json()); // only accept json payloads

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
