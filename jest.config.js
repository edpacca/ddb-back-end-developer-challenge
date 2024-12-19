module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/tests"],

  // use ts-jest for file transformation
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  testRegex: "((\\.|/)(test))\\.tsx?$",
  moduleFileExtensions: ["ts", "js", "json", "node"],
};
