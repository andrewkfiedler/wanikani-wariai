'use strict'
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const SassLoader = require('sass-loader')

module.exports = () => ({
  node: {
    fs: 'empty'
  },
  devtool: 'sourcemap',
  entry: {
    index: './source/index'
  },
  output: {
    path: path.join(__dirname, 'distribution'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            'react',
            ['latest', { modules: false }],
            'stage-0',
            'stage-3'
          ]
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS
        ]
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: '*',
        context: 'source',
        ignore: '*.js'
      }
    ])
],
  optimization: {
    // Without this, function names will be garbled and enableFeature won't work
    concatenateModules: true,
    minimize: false
  }
})
