const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const glob = require('glob');
const webpack = require('webpack');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const PATHS = {
  src: path.join(__dirname, '/src'),
  dist: path.join(__dirname, '/dist'),
};

const PAGES_DIR = `${PATHS.src}/pages`;

const PAGES = glob.sync(`${PAGES_DIR}/**/*.pug`);

module.exports = {
  target: 'web',
  context: path.resolve(__dirname, 'src'),
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'node_modules'),
    },
  },
  entry: {
    app: './index.js',
  },
  devServer: {
    liveReload: true,
    static: [
      {
        directory: path.join(__dirname, '../dist'),
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimize: !isDev,
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.pug',
      filename: 'index.html',
      minify: !isDev,
    }),
    ...PAGES.map(
      (page) =>
        new HtmlWebpackPlugin({
          template: page,
          filename: `[contenthash]${page
            .split('/')
            .slice(-1)
            .join('/')
            .replace(/\.pug/, '.html')}`,
        }),
    ),
    new FaviconsWebpackPlugin('./img/favicon.jpg'),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    // new CopyPlugin({
    //   patterns: [{ from: './img/*.ico', to: '../dist/*.ico' }],
    // }),
    new TerserPlugin(),
    new ESLintPlugin({
      extensions: ['js'],
    }),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      'window.jQuery': 'jquery',
    }),
  ],
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    charset: true,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: '/node-modules/',
        use: {
          loader: 'babel-loader',
          options: {
            sourceMap: true,
          },
        },
      },
      {
        test: /\.pug$/,
        use: ['pug-loader'],
      },
      {
        test: /\.s?[ac]ss$/i,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: '[name][ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: '[name][ext]',
        },
      },
    ],
  },
};
