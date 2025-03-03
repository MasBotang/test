const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, '../src/Js/index.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'Js/bundle.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, 
          'css-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/style.css',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
      filename: 'index.html', 
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/html/tambahListBuku.html'),
      filename: 'html/tambahListBuku.html', 
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/html/arsipBuku.html'),
      filename: 'html/arsipBuku.html', 
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, '../src/assets'), to: 'assets' },
      ],
    }),
  ],
};
