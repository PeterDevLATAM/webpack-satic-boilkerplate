/* eslint-disable import/no-extraneous-dependencies */
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: './src/js/script.js',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '',
  },

  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
      },
      {
        test: /\.html$/i,
        use: 'html-loader',
      },
      {
        test: /\.(png|jpg|svg)$/i,
        type: 'asset',
        use: [
          {
            loader: 'image-webpack-loader',
            // options: {
            //   pngquant: {
            //     quality: [0.9, 0.95],
            //   },
            // },
          },
        ],
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 10kb
          },
        },
        generator: {
          filename: 'images/[name]-[hash][ext]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/html/index.html',
      filename: 'index.html',
    }),
  ],
};
