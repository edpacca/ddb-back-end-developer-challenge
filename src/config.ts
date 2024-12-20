import "dotenv/config";

const config = {
  env: process.env.NODE_ENV || "development",
  debug: process.env.DEBUG === "true",
  port: parseInt(process.env.PORT || "3000"),
  getDatabaseConfig: () => ({
    database: process.env.DB_NAME,
    uri: process.env.DOCKER ? process.env.MONGO_DOCKER_URI : process.env.MONGO_LOCAL_URI,
  }),
};

export default config;
