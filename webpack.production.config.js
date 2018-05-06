var webpack = require('webpack');
// var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
// var StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var _ = require('lodash');
var path = require('path');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;



var config = require('./webpack.common.config.js');

_.merge(config.output, {
  filename: '[name]-[chunkhash].js'
});

config.plugins = [
  new ExtractTextPlugin('[name]-[hash].min.css'),
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
    comments: false,
    compressor: {
      warnings: false,
      screw_ie8: true
    }
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  }),
  // new BundleAnalyzerPlugin({
  //   analyzerMode: 'static',
  //   reportFilename: 'report.html',
  //   openAnalyzer: true,
  //   statsFilename: 'stats.json',
  //   // See more options here: https://github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
  //   statsOptions: null,
  //   // Log level. Can be 'info', 'warn', 'error' or 'silent'.
  //   logLevel: 'info'
  // })
].concat(config.plugins);

module.exports = config;