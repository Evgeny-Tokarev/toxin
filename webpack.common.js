const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";
const PATHS = {
  src: path.join(__dirname, "/src"),
  dist: path.join(__dirname, "/dist"),
};
const isDir = (dirPath) => {
  return fs.existsSync(dirPath) && fs.lstatSync(dirPath).isDirectory();
};

const PAGES_DIR = `${PATHS.src}/pages/`;

const PAGES = fs
  .readdirSync(PAGES_DIR)
  .map((dirName) => {
    return path.join(PAGES_DIR, dirName);
  })
  .filter(isDir);
console.log(PAGES);
// const pugs = PAGES.map(page => {
//   fs.readdirSync(page).filter(fileName => fileName.endsWith('.pug'))
// }

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: {
    app: "./index.js",
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    minimize: !isDev,
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      minify: !isDev,
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new CopyPlugin({
      patterns: [{ from: "./img/icons8-webpack-64.png", to: "../dist" }],
    }),
    new TerserPlugin(),
    new ESLintPlugin({
      extensions: ["js"],
    }),
  ],
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    charset: true,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: "/node-modules/",
        use: {
          loader: "babel-loader",
          options: {
            sourceMap: true,
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
};
