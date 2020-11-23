const ignorePaths = [
  "build/",
  "client/",
  "config/",
  "node_modules/",
  "testFiles/"
];

module.exports = {
  testEnvironment: "node",
  coveragePathIgnorePatterns: ignorePaths,
  modulePathIgnorePatterns: ignorePaths
}