const ignorePaths = [
  "build/",
  "client/",
  "config/",
  "node_modules/",
  "testFiles/"
];

module.exports = {
  testEnvironment: "node",
  setupFiles: [
    "./src/test/setupTests.js",
  ],
  coveragePathIgnorePatterns: ignorePaths,
  modulePathIgnorePatterns: ignorePaths
}