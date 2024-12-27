import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import config from "./config";
import setupDatabase from "./db/index";
import characters from "./routes/characterRouter";

const app = express();

// configure middleware
app.use(helmet()); // helmet sets security related HTTP headers
app.use(helmet.xssFilter()); // protect against cross site scripting
app.use(express.json()); // only accept json payloads

if (config.debug) {
  app.use(morgan("dev"));
}

// connect database
// run this way to dynamically infer whether environment is prod or dev
// if dev we use a local in-memory storage system
// if prod we use mongoDB
(async () => {
  await setupDatabase();
})();

// configure routes
app.use("/characters", characters);

app.listen(config.port, () => {
  if (config.env === "development" || config.debug) {
    console.log(`server listening on port: ${config.port}`);
  }
});
