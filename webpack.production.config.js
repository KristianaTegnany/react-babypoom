var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var _ = require('lodash')
var path = require('path')
var UglifyJsPlugin = require('uglifyjs-webpack-plugin')

var config = require('./webpack.common.config.js')

config.mode = 'production'

// config.optimization = { minimize: false }

config.plugins = config.plugins.concat([
  new UglifyJsPlugin({
    sourceMap: true,
    uglifyOptions: {
      output: {
        comments: false,
      },
    },
  }),
])

module.exports = config
