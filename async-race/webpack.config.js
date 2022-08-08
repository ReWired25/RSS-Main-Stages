const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const EslintPlugin = require('eslint-webpack-plugin');

const whatMode = process.env.NODE_ENV === 'production';
const stylesMode = whatMode ? MiniCssExtractPlugin.loader : 'style-loader';

module.exports = {
  entry: path.resolve(__dirname, './src/main.ts'),
  mode: whatMode ? 'production' : 'development',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, './dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [stylesMode, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.ts$/i,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({ filename: 'style.css' }),
    new EslintPlugin({ extensions: 'ts' }),
  ],
};
