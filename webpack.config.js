const webpack = require('webpack');
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

var config = {
  context: path.resolve(__dirname, 'src'),
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },  
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            "presets": [
              "@babel/preset-env",
              "@babel/preset-typescript"
            ]
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            "presets": ["@babel/preset-env"]
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

/*module.exports = {
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: "metaslider",
    libraryTarget: "umd"
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new CleanWebpackPlugin(),    
  ],
  context: path.resolve(__dirname, 'src'),
  mode: 'production',
  resolve: {
    extensions: ['', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              "@babel/preset-typescript",
              "@babel/preset-env"
            ]
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
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
}*/

var docs = Object.assign({}, config, {
  name: "docs",
  mode: "development",
  entry: './demo.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'docs')
  },
  devServer: {
    port: 4000
  }, 
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html',
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.$': 'jquery',
      'window.jQuery': 'jquery',
    }),
  ],
});

var dist = Object.assign({}, config, {
  name: "dist",
  entry: './index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'index.css'
    }),
    new CleanWebpackPlugin(),
  ], 
});


module.exports = [docs, dist];