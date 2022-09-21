/* eslint-disable import/no-extraneous-dependencies */
const { default: merge } = require('webpack-merge');
const common = require('./webpack.common');

/** @type {import('webpack').Configuration} */
const devConfig = {
  mode: 'development',
  devServer: {
    port: 3000,
    // open: true,
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        use: ['style-loader', 'css-loader', 'sass-loader'],
        test: /.(css|sass|scss)$/,
      },
    ],
  },
};
module.exports = merge(common, devConfig);
