module.exports = {
  presets: ["@babel/typescript", "@babel/env"],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    [
      "@babel/transform-runtime",
      {
        corejs: 3,
        helpers: true,
        regenerator: true,
        useESModules: true,
      },
    ],
  ],
};
