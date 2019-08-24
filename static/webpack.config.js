const webpack = require('webpack');
const resolve = require('path').resolve;const config = {
 entry: __dirname + '/js/Index.jsx',
 output:{
      path: resolve('../public'),
      filename: 'bundle.js',
      publicPath: resolve('../public')},
 resolve: {
  extensions: ['.js','.jsx','.css']
 },
 module: {
     rules: [
     {
      test: /\.jsx?/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query:{
     presets: ["@babel/env", "@babel/react"]
   }
     }]
    }
};module.exports = config;
