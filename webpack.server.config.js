var fs = require('fs')
var path = require('path')
var webpack = require('webpack')

var config = require('./webpack.common.config.js')

module.exports = {
  mode: 'production',

  entry: path.resolve(__dirname, 'server.js'),

  output: {
    filename: 'server.bundle.js',
    path: __dirname,
  },

  target: 'node',

  // keep node_module paths out of the bundle
  externals: fs
    .readdirSync(path.resolve(__dirname, 'node_modules'))
    .concat(['react-dom/server', 'react/addons'])
    .reduce(function(ext, mod) {
      ext[mod] = 'commonjs ' + mod
      return ext
    }, {}),

  node: {
    __filename: true,
    __dirname: true,
  },

  plugins: config.plugins,

  module: config.module,
}
