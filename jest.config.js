module.exports = {
    verbose: true,
    testEnvironment: "node",
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