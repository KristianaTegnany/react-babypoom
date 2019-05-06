var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var _ = require('lodash')
var path = require('path')
// var crypto = require('crypto')
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

var config = require('./webpack.common.config.js')

// HACK. Get same hash for the 2 bundles
// var hashCache
// var hash = crypto.createHash("md4")
// class CreateHash {
//   constructor() {
//     this.hash = crypto.createHash("md4")
//   }
//   digest() {
//     if (hashCache) return hashCache
//     return (hashCache = this.hash.digest.apply(this.hash, arguments))
//   }
//   update() {
//     return this.hash.update.apply(this.hash, arguments)
//   }
// }
// config.output.hashFunction = CreateHash

config.mode = 'production'
// config.optimization = { minimize: false }

config.optimization = {
  minimizer: [
    new TerserPlugin({
      parallel: true,
      terserOptions: {
        // ecma: 6,
        output: {
          comments: false,
        },
      },
    }),
  ],
}
config.plugins = config.plugins.concat([new OptimizeCssAssetsPlugin({})])
module.exports = config

// const moduleConfig = _.cloneDeep(config)

// moduleConfig.output.filename = config.output.filename.replace(/\.js$/, '.mjs')
// moduleConfig.module.rules.forEach(function(rule) {
//   if (rule.use && 'babel-loader' === rule.use.loader) {
//     rule.use.query.presets = [
//       '@babel/preset-react',
//       [
//         '@babel/preset-env',
//         {
//           useBuiltIns: 'usage',
//           corejs: '2',
//           targets: {
//             "esmodules": true
//           }
//         },
//       ],
//     ]
//   }
// })

// module.exports = [config, moduleConfig]
