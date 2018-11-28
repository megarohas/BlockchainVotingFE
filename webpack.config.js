var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

const VENDOR_LIBS = [
  "ajv",
  "aws-sdk",
  "axios",
  "bootstrap",
  "circular-json",
  "classnames",
  "connect-history-api-fallback",
  "dateformat",
  "es6-promise",
  "express-session",
  "file-loader",
  "immutable",
  "jquery",
  "js-file-download",
  "lodash",
  "prop-types",
  "react",
  "react-color",
  "react-debounce-input",
  "react-dom",
  "react-redux",
  "react-router",
  "react-router-dom",
  "redux",
  "redux-thunk"
];

module.exports = {
  entry: {
    bundle: ["webpack-hot-middleware/client", "./src/index.js"],
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].[hash].js"
  },
  devServer: {
    hot: true,
    historyApiFallback: true,
    noInfo: true
    //  publicPath: webpackConfig.output.publicPath
  },
  module: {
    rules: [
      {
        use: "babel-loader",
        test: /\.(js|jsx)$/,
        exclude: /node_modules/
      },
      {
        use: ["style-loader", "css-loader"],
        test: /\.css$/
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "sass-loader" // compiles Sass to CSS
          }
        ]
      },

      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: { limit: 40000 }
          },
          "image-webpack-loader"
        ]
      },
      { test: /\.(woff|woff2|eot|ttf)$/, loader: "url-loader?limit=100000" }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ["vendor", "manifest"]
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.SourceMapDevToolPlugin({
      filename: "[file].map",
      exclude: ["vendor.js"]
    })
  ]
};
