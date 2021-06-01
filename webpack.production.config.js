var webpack = require('webpack')
var _ = require('lodash')
var path = require('path')
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')
var CompressionPlugin = require('compression-webpack-plugin')
var BrotliPlugin = require('brotli-webpack-plugin')
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
  cssLoaders: [MiniCssExtractPlugin.loader],
  scssLoaders: [MiniCssExtractPlugin.loader],
  getLocalIdent: (loaderContext, localIdentName, name, options) => {
    return shortClassName.next(loaderContext.resourcePath, name)
  },
  generateScopedName: function (name, filename, css) {
    return shortClassName.next(filename, name)
  },
  prependPlugins: [
    {
      apply: function (compiler) {
        // We generate classNames for the client & server build and need to ensure they're synced
        compiler.hooks.afterEnvironment.tap('ShortClassNameGenerator', function (compilation) {
          shortClassName.importData(path.join(__dirname, 'public'))
        })
        compiler.hooks.afterEmit.tap('ShortClassNameGenerator', function (compilation) {
          shortClassName.exportData(path.join(__dirname, 'public'))
        })
      },
    },
  ],
  appendPlugins: [
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.7,
    }),
    new BrotliPlugin({
      asset: '[path].br[query]',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.7,
    }),
    new MiniCssExtractPlugin({ filename: `theme-${process.env.BP_ALBUM_THEME || '1'}-[hash].min.css` }),
    new OptimizeCssAssetsPlugin({
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
    }),
  ],
})

module.exports = config
