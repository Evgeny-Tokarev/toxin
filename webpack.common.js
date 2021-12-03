const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const PATHS = {
  src: path.join(__dirname, '/src'),
  dist: path.join(__dirname, '/dist'),
};

const PAGES_DIR = `${PATHS.src}/pages`;

const getPugFiles = (dir) => {
  console.log(dir)
  const commonPartLength= dir.split('\/').length;
  const res = [];
  const iteration = (currentDir) => {
    console.log(currentDir)
    const files = fs.readdirSync(currentDir) 
    console.log(files);
    for (let file of files){
       const status = fs.statSync(`${currentDir}/${file}`);
          if(status.isDirectory()){
             iteration(`${currentDir}/${file}`); 
          }else{
            if (file.endsWith('.pug')){
              console.log(`file ${file}`);
              console.log('current dir 2 ' + currentDir);
              console.log(`что мы запишем ${currentDir.split('\/').slice(commonPartLength)}/${file}`);
            res.push(`${currentDir.split('\/').slice(commonPartLength)}/${file}`);
            }
          }
    }
  }
  iteration(dir);
  return res;
}
const PAGES = getPugFiles(PAGES_DIR);
console.log(PAGES);

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: './index.js',
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
      template: './index.html',
      minify: !isDev,
    }),
    ...PAGES.map(page => new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/${page}`,
      filename: `./${page.replace(/\.pug/,'.html')}`
    })),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new CopyPlugin({
      patterns: [{ from: './img/icons8-webpack-64.png', to: '../dist' }],
    }),
    new TerserPlugin(),
    new ESLintPlugin({
      extensions: ['js'],
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
      // {
      //   test: /\.css$/i,
      //   use: [MiniCssExtractPlugin.loader, "css-loader"],
      // },
      {
        test: /\.s[ac]ss$/i,
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
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
