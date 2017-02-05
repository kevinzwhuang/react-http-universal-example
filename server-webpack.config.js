'use strict';
const path = require('path');

module.exports = {
  entry: {
    server: path.resolve(__dirname, 'src/server.js')
  },
  node: {
    __dirname: false
  },
  target: 'node',
  output: {
    filename: '[name]-[hash].js',
    path: path.resolve(__dirname, 'dist')
  }
}
