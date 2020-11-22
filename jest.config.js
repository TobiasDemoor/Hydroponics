module.exports = {
    verbose: true,
    testEnvironment: "node",
    setupFilesAfterEnv: [
      "./src/test/setupTests.js"
    ],
    coveragePathIgnorePatterns: [
      "node_modules/",
      "client/",
      "config/",
      "build/",
    ],
    modulePathIgnorePatterns: [
      "client/",
      "config/",
      "build/",
    ]
  }