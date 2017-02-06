'use strict';
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    client: path.resolve(__dirname, 'src/client.jsx'),
    vendor: [
      'react',
      'react-dom'
    ]
  },
  target: 'web',
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
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src')
    ]
  },
  output: {
    filename: '[name]-[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    })
  ]
}
