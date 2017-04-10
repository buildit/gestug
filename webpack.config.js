const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname, './src/es6'),
  entry: {
    achewood: './achewood.js',
  },
  output: {
    path: path.resolve(__dirname, './scripts'),
    filename: '[name]-es6.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
        }],
      },
    ],
  },
};
