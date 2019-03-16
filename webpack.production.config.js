var webpack = require('webpack')
var _ = require('lodash')
var path = require('path')
var config = require('./webpack.common.config.js')
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

config.mode = 'production'

// config.optimization = { minimize: false }

config.plugins = config.plugins.concat([new OptimizeCssAssetsPlugin({})])

module.exports = config
