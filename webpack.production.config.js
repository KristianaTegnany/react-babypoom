var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var _ = require('lodash')
var path = require('path')
var UglifyJsPlugin = require('uglifyjs-webpack-plugin')

var config = require('./webpack.common.config.js')

config.mode = 'production'

// config.optimization = { minimize: false }

config.optimization = {
  minimizer: [
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: true, // set to true if you want JS source maps
      uglifyOptions: {
        output: {
          comments: false,
        },
      },
    }),
  ],
}

module.exports = config
