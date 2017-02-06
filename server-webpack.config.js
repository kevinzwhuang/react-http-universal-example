'use strict';
const path = require('path');

module.exports = {
  entry: {
    server: path.resolve(__dirname, 'src/server.js')
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ],
        loader: 'babel-loader'
      },
    ]
  },
  node: {
    __dirname: false
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src')
    ]
  },
  target: 'node',
  output: {
    filename: '[name]-[hash].js',
    path: path.resolve(__dirname, 'dist')
  }
}
