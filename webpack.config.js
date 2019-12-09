"use strict";

var path = require("path");
var WebpackNotifierPlugin = require("webpack-notifier");
//var polyfill = require("@babel/polyfill");
//var BrowserSyncPlugin = require("browser-sync-webpack-plugin");

module.exports = {
  entry: "./Scripts/app.js",
  output: {
    path: path.resolve(__dirname, "./Content"),
    filename: "webpack-bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  devtool: "inline-source-map",
  plugins: [new WebpackNotifierPlugin()]

};