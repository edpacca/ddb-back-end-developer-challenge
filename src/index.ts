import express from "express";
import helmet from "helmet";
import config from "./config";
import routes from "./routes/routes";

const app = express();

// configure middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// configure routes
routes(app);

app.listen(config.port, () => {
  if (config.env === "development") {
    console.log(`server listening on port: ${config.port}`);
  }
});
