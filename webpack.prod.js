const webpack = require('webpack');
const { merge } = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js')
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  context: path.resolve(__dirname, 'src'),
  devtool: 'source-map',
  entry: './index.ts',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: "MetaSlider",
    libraryTarget: "umd"
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'index.css'
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: { singleton: true }
        },
        'style-loader', 'css-loader',
      ]
    },
    {
      test: /\.s[ac]ss$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
      },
        'css-loader', 'postcss-loader', 'sass-loader'
      ]
    }]
  }
})