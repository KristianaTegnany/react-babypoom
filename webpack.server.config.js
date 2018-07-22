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

  // plugins: config.plugins,

  plugins: [
    new webpack.NormalModuleReplacementPlugin(/.*?-loader/, function(resource) {
      resource.request = resource.request.replace(/.*?-loader/, 'null-loader')
    }),
  ],

  module: {
    rules: config.module.rules.map(function(rule) {
      if (rule.test.toString().indexOf('js') < 0) {
        delete rule.loader
        rule.use = 'null-loader'
      }
      return rule
    }),
  },
}
