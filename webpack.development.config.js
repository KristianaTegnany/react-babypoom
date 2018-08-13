var webpack = require('webpack')
var _ = require('lodash')
var WebpackNotifierPlugin = require('webpack-notifier')

var config = require('./webpack.common.config.js')

_.merge(config, {
  mode: 'development',
  entry: ['webpack-dev-server/client?http://localhost:8181', 'webpack/hot/only-dev-server'].concat(config.entry),
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

module.exports = config
