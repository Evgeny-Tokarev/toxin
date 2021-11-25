const path = require("path");
module.exports = {
    entry: {
        app: "./src/index.js"
    },

    devtool: 'inline-source-map',
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname,"../dist"),
        publicPath: "/dist"
    },
    
    module: {
        rules: [{
            test: /\.js$/,
            loader: "babel-loader",
            exclude: "/node-modules/"
        }]
    },
    devServer: {
        client: {
          overlay: true,
        },
      },
}