var webpack = require('webpack')
var path = require('path')
var _ = require('lodash')
var WebpackNotifierPlugin = require('webpack-notifier')

var config = require('./webpack.common.config.js')

_.merge(config, {
  mode: 'development',
  entry: [
    'webpack-dev-server/client?http://localhost:8181',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
  ].concat(config.entry),
  stats: {
    errorDetails: true,
    modules: true,
    reasons: true,
  },
  output: {
    pathinfo: true,
  },
  plugins: config.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({ debug: true }),
    new WebpackNotifierPlugin({ alwaysNotify: true }),
    //new webpack.optimize.CommonsChunkPlugin('common', 'common-bundle.js'),
  ]),
})

// Put it back when ms-uploader is imported through npm
config.module.rules.forEach(function(rule) {
  if (rule.use && 'babel-loader' === rule.use.loader) {
    rule.use.query.plugins.push('react-hot-loader/babel')
  }
})

module.exports = config
