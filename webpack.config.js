const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
    context: path.resolve(__dirname,'src'),
    entry: {
        app: "./index.js"
    },
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
      },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Development',
            template: "./index.html"
        }),
        new MiniCssExtractPlugin({
          filename: "[name].[contenthash].css",

        })

      ],
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname,"dist"),
        clean: true,
        charset: true
    },
    
    module: {
        rules: [
          {
            test: /\.js$/,
            loader: "babel-loader",
            exclude: "/node-modules/"
          },
          // {
          //   test: /\.css$/i,
          //   use: [MiniCssExtractPlugin.loader, "css-loader"],
          // },
          {
            test: /\.s[ac]ss$/i,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: "css-loader",
                options: {
                  sourceMap: true,
                },
              },
              {
                loader: "postcss-loader",
              },
              {
                loader: "sass-loader",
                options: {
                  sourceMap: true,
                },
              },
            ]
          },
          {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
          },
          {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
          },
        
        ]
    },
}