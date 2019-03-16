var path = require('path')
var glob = require('glob')
var _ = require('lodash')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')
var StringReplacePlugin = require('string-replace-webpack-plugin')
var availableLocales = require('./available-locales')

var config = {}

var ShortClassNameGenerator = require('./css-modules-scoped-name')
var shortClassName = new ShortClassNameGenerator(config)

module.exports = _.merge(config, {
  devtool: 'source-map',
  entry: [path.join(__dirname, 'album-photo-app/index.js')],
  output: {
    filename: '[name]-[hash].js',
    path: path.join(__dirname, '/public/'),
    publicPath: '/',
    devtoolModuleFilenameTemplate: '[resourcePath]',
    devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]',
  },
  plugins: [
    {
      apply: function(compiler) {
        // We generate classNames for the client & server build and need to ensure they're synced
        compiler.hooks.afterEnvironment.tap('ShortClassNameGenerator', function(compilation) {
          if (config.mode.startsWith('prod')) shortClassName.importData(path.join(__dirname, '/public/'))
        })
        compiler.hooks.afterEmit.tap('ShortClassNameGenerator', function(compilation) {
          if (config.mode.startsWith('prod')) shortClassName.exportData(path.join(__dirname, '/public/'))
        })
      },
    },
    new MiniCssExtractPlugin('app-[hash].min.css'),
    new HtmlWebpackPlugin({
      inject: false,
      template: 'album-photo-app/index.tpl',
      filename: process.env.NODE_ENV === 'production' ? 'index.tpl' : 'index.html',
      locales: availableLocales,
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
  resolve: {
    // tell webpack which extensions to auto search when it resolves modules. With this,
    // you'll be able to do `require('./utils')` instead of `require('./utils.js')`
    extensions: ['.js', '.es6', '.css', '.png', '.gif'],
    // by default, webpack will search in `web_modules` and `node_modules`. Because we're using
    // Bower, we want it to look in there too
    modules: ['node_modules'],
  },
  module: {
    rules: [
      // i18n imports
      {
        test: /messages\.js$/,
        loader: StringReplacePlugin.replace({
          replacements: [
            {
              pattern: /\/\/\s*replace\:(.*?)\:end/gi,
              replacement: function(match, p1, offset, string) {
                if (p1.indexOf('${loc}') > 0) {
                  return availableLocales.map(loc => p1.replace(/\$\{loc\}/g, loc)).join('\n')
                }
                if (p1.indexOf('${defaultLoc}') > 0) {
                  p1 = p1.replace(/\$\{defaultLoc\}/g, availableLocales.defaultLocale)
                }
                if (p1.indexOf('${all}') > 0) {
                  p1 = p1.replace(/\$\{all\}/g, availableLocales.join(', '))
                }
                if (p1.indexOf('${allData}') > 0) {
                  p1 = p1.replace(/\$\{allData\}/g, availableLocales.map(l => l + 'Data').join(', '))
                }
                return p1
              },
            },
          ],
        }),
      },

      // Fonts
      {
        test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.[ot]tf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream',
      },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        // exclude: /\/images\//,
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            query: {
              modules: false,
              sourceMap: true,
            },
          },
          'postcss-loader?sourceMap',
          'resolve-url-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            query: {
              modules: true,
              importLoaders: 1,
              //localIdentName: '[path]___[name]__[local]___[hash:base64:5]',
              getLocalIdent: (loaderContext, localIdentName, name, options) => {
                // return `${loaderContext.resourcePath}___${name}`
                return shortClassName.next(loaderContext.resourcePath, name)
              },
            },
          },
          'postcss-loader?sourceMap',
          'resolve-url-loader',
          'sass-loader?sourceMap&sourceMapContents',
        ],
      },
      // Images
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: ['url-loader?limit=10000', 'img-loader?progressive=true'],
      },
      // es6 files
      {
        test: /\.(es6|js|jsx)$/,
        exclude: /(node_modules|vendor)/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['@babel/preset-react', ['@babel/preset-env', { useBuiltIns: 'usage' }]],
            plugins: [
              [
                'react-intl',
                {
                  messagesDir: './config/locales/extracted',
                  enforceDescriptions: false,
                  languages: availableLocales,
                },
              ],
              ['@babel/plugin-proposal-class-properties', { loose: true }],
              '@babel/plugin-proposal-function-bind',
              '@babel/plugin-transform-runtime',
              [
                'react-css-modules',
                {
                  //generateScopedName: '[path]___[name]__[local]___[hash:base64:5]',
                  generateScopedName: function(name, filename, css) {
                    // return `${filename}___${name}`
                    return shortClassName.next(filename, name)
                  },
                  handleMissingStyleName: 'ignore',
                  filetypes: {
                    '.scss': {
                      syntax: 'postcss-scss',
                    },
                  },
                },
              ],
            ],
          },
        },
      },
    ],
  },
})
