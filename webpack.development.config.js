var webpack = require('webpack');
var _ = require('lodash');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var WebpackNotifierPlugin = require('webpack-notifier');


var config = require('./webpack.common.config.js');


_.merge(config, {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch'
  ].concat(config.entry),
  stats: {
    errorDetails: true
  },
  output: {
    pathinfo: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({ debug: true }),
    new WebpackNotifierPlugin({ alwaysNotify: true }),
    //new webpack.optimize.CommonsChunkPlugin('common', 'common-bundle.js'),
    new ExtractTextPlugin("[name].css"),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ].concat(config.plugins)
});

config.module.rules.forEach(function(rule) {
  if (rule.use && 'babel-loader' === rule.use.loader) {
    rule.use.options.plugins.push("react-hot-loader/babel")
  }
});


module.exports = config;