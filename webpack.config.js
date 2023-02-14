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
      // path.resolve(__dirname, 'src/game/libs/weapp-adapter'),
      path.resolve(__dirname, "src/game/app.ts")
    ],
    'openDataContext/index': [
      path.resolve(__dirname, 'src/openDataContext/index')
    ]
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
        test: /\.ts$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        },
        exclude: /node_modules/
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
      PIXI: "pixi.js",
    }),
    new CopyWebpackPlugin([
      { from: "src/cloud", to: "../cloud" },
      { from: "src/project.config.json", to: "../project.config.json" },
      { from: "src/game.json", to: "game.json" },
      { from: "src/static", to: "static" },
    ]),
    new ProgressBarPlugin(),
  ],

  mode: isProd ? "production" : "development",
};
