const os = require("os");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  entry: {
    game: [
      "@iro/wechat-adapter", 
      path.resolve(__dirname, "src/game/app.ts")
    ],
  },

  output: {
    path: path.resolve(__dirname, "dist/root"),
    filename: "[name].js",
  },

  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      "@": path.resolve("."),
    },
  },

  devtool: isProd ? false : "source-map",

  stats: "errors-only",

  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto",
      },
      {
        test: /\.(vert|frag)$/,
        use: ["raw-loader"],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      dayjs: "dayjs",
      PIXI: "pixi.js",
    }),
    new CopyWebpackPlugin([
      { from: "src/cloud", to: "../cloud" },
      { from: "src/project.config.json", to: "../project.config.json" },
      { from: "src/game.json", to: "game.json" },
      { from: "src/static/dist", to: "static" },
    ]),
    new ProgressBarPlugin(),
  ],

  mode: isProd ? "production" : "development",
};
