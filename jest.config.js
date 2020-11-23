const ignorePaths = [
  "build/",
  "client/",
  "config/",
  "node_modules/",
  "testFiles/"
];

module.exports = {
  testEnvironment: "node",
  globalSetup: "./src/test/setupTests.js",
  coveragePathIgnorePatterns: ignorePaths,
  modulePathIgnorePatterns: ignorePaths
}