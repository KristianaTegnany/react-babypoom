var webpack = require('webpack')
// var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
// var StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var _ = require('lodash')
var path = require('path')
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

var config = require('./webpack.common.config.js')

config.mode = 'production'

// config.optimization = { minimize: false }

// config.optimization = {
//   minimizer: [
//     new TerserPlugin({
//       parallel: true,
//       terserOptions: {
//         ecma: 6,
//       },
//     }),
//   ],
// }
config.plugins = config.plugins.concat([new OptimizeCssAssetsPlugin({})])

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
// ])

module.exports = config
