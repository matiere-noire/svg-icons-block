const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const SVGSpritemapPlugin = require("svg-spritemap-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  ...defaultConfig,
  module: {
    ...defaultConfig.module,
    rules: [
      ...defaultConfig.module.rules,
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  },
  plugins: [
    new SVGSpritemapPlugin(`../../themes/*/resources/svg/*.svg`, {
      output: { chunk: { keep: true } },
      sprite: { prefix: "icon-" }
    }),
    new MiniCssExtractPlugin()
  ]
};
