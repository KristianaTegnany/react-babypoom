var webpack = require('webpack')
var _ = require('lodash')
var path = require('path')
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

var ShortClassNameGenerator = require('./css-modules-scoped-name')
var shortClassName = new ShortClassNameGenerator()

var config = require('./webpack.common.config.js')({
  mode: 'production',
  optimization: {
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
  },
  getLocalIdent: (loaderContext, localIdentName, name, options) => {
    return shortClassName.next(loaderContext.resourcePath, name)
  },
  generateScopedName: function(name, filename, css) {
    return shortClassName.next(filename, name)
  },
  prependPlugins: [
    {
      apply: function(compiler) {
        // We generate classNames for the client & server build and need to ensure they're synced
        compiler.hooks.afterEnvironment.tap('ShortClassNameGenerator', function(compilation) {
          shortClassName.importData(path.join(__dirname, 'public'))
        })
        compiler.hooks.afterEmit.tap('ShortClassNameGenerator', function(compilation) {
          shortClassName.exportData(path.join(__dirname, 'public'))
        })
      },
    },
  ],
  appendPlugins: [
    new OptimizeCssAssetsPlugin({
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
    }),
  ],
})

module.exports = config
