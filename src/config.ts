const config = {
  env: process.env.NODE_ENV || "development",
  debug: process.env.DEBUG === "true",
  port: parseInt(process.env.PORT || "3000"),
};

export default config;
