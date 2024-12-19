import express from "express";
import helmet from "helmet";
import config from "./config";

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(config.port, () => {
  if (config.env === "development") {
    console.log(`server listening on port: ${config.port}`);
  }
});
