const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const { ESBuildMinifyPlugin } = require("esbuild-loader");

module.exports = {
  context: __dirname,
  entry: "./examples/index.tsx",
  mode: "development",
  devtool: "eval",
  output: {
    path: path.resolve(__dirname, "docs", "js"),
    filename: "[name]-[contenthash].js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "esbuild-loader",
        options: {
          loader: "tsx",
          target: "es2015",
        },
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "template.html"),
      filename: path.join(__dirname, "docs", "index.html"),
      inject: "head",
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: "./tsconfig.json",
      },
    }),
  ],
  optimization: {
    splitChunks: { chunks: "all" },
    minimizer: [
      new ESBuildMinifyPlugin({
        target: "es2015",
      }),
    ],
  },
};
