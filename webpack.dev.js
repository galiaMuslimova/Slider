const webpack = require('webpack'); 
const { merge } = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js')
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(common, {  
  mode: 'development',
  context: path.resolve(__dirname, 'src'),
  entry: './demo.ts',
  output: {
    filename: 'index.[contenthash].js',
    path: path.resolve(__dirname, 'docs')
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './docs',
    port: 4000,
    open: true
  },
  plugins: [ 
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.$': 'jquery',
      'window.jQuery': 'jquery',
    }),
    new HTMLWebpackPlugin({
      template: './demo.pug',
      filename: 'index.html'
    }),
    new CleanWebpackPlugin(),
  ] 
})