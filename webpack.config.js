const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',    
    entry: {
        app: "./src/index.js"
    },
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
      },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Development'
        }),
      ],
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname,"dist"),
        clean: true,
    },
    
    module: {
        rules: [{
            test: /\.js$/,
            loader: "babel-loader",
            exclude: "/node-modules/"
        },
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
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