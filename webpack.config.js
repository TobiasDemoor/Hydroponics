const nodeExternals = require("webpack-node-externals");
const path = require('path');

module.exports = {
  entry: "./src/index.js",
  target: "node",
  externals: [nodeExternals()],
  mode: "production",
  resolve: {
    modules: ["src"],
    extensions: [".js"],
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "build")
  }
};
