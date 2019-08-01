var fs = require('fs')
var path = require('path')
var _ = require('lodash')
var webpack = require('webpack')

var ShortClassNameGenerator = require('./css-modules-scoped-name')
var shortClassName = new ShortClassNameGenerator()

var config = require('./webpack.common.config.js')({
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
})

module.exports = _.merge(config, {
  devtool: false,
  mode: 'production',
  // optimization: { minimize: false },

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
})
