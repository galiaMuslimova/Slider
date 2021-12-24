const webpack = require('webpack');
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

var config = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  devServer: {
    port: 5000
  },
  devtool: "source-map",
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
          options: {
            "presets": ["@babel/preset-typescript"]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          "css-loader",
        ]
      },
      {
        test: /\.s[ac]ss$/,
        use: [{
          loader: MiniCssExtractPlugin.loader
        },
          'css-loader',
          'sass-loader']
      }
    ]
  }
};

var docs = Object.assign({}, config, {
  name: "docs",
  entry: './demo.js',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'docs')
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html',
      filename: 'index.html'
    }),
  ],
});

var dist = Object.assign({}, config, {
  name: "dist",
  entry: './index.js',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  }  
});


module.exports = [docs, dist];