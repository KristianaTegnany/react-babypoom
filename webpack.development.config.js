var webpack = require('webpack')
var WebpackNotifierPlugin = require('webpack-notifier')
var config = require('./webpack.common.config.js')

module.exports = config({
  mode: 'development',
  entry: ['webpack-dev-server/client?http://localhost:8282', 'webpack/hot/only-dev-server', 'react-hot-loader/patch'],
  pathinfo: true,
  stats: {
    errorDetails: true,
    modules: true,
    reasons: true,
  },
  localIdentName: '[path]___[name]__[local]___[hash:base64:5]',
  generateScopedName: '[path]___[name]__[local]___[hash:base64:5]',
  appendPlugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({ debug: true }),
    new WebpackNotifierPlugin({ alwaysNotify: true }),
  ],
  appendBabelPlugins: ['react-hot-loader/babel'],
})
