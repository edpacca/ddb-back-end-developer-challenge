import express from "express";
import helmet from "helmet";
import config from "./config";
import DB from "./db";
import routes from "./routes/routes";
import { createDefaultCharacter } from "./controllers/character/characterController";

const app = express();

// configure middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure DB events
DB.on("error", console.error.bind(console, "Connection error"));
DB.on("connected", connected);
DB.on("disconnected", DB.dropDatabase);

// configure routes
routes(app);

app.listen(config.port, () => {
  if (config.env === "development") {
    console.log(`server listening on port: ${config.port}`);
  }
});

function connected() {
  console.log("connected");
  const briv = createDefaultCharacter();
  console.log(briv);
}
