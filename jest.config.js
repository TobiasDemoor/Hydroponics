const ignorePaths = [
  "build/",
  "client/",
  "config/",
  "node_modules/",
  "testFiles/"
];

module.exports = {
  testEnvironment: "node",
  globalSetup: "./src/setupTests.js",
  coveragePathIgnorePatterns: ignorePaths,
  modulePathIgnorePatterns: ignorePaths
}