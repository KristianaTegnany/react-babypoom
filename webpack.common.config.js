var path = require('path')
var glob = require('glob')
var _ = require('lodash')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var StringReplacePlugin = require('string-replace-webpack-plugin')
var availableLocales = require('./available-locales')

var config = {}

var ShortClassNameGenerator = require('./css-modules-scoped-name')
var shortClassName = new ShortClassNameGenerator(config)

var scssOptions = {
  fallback: 'style-loader',
  use: [
    {
      loader: 'css-loader',
      query: {
        modules: true,
        minimize: true,
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
}

var bootstrapCss = new ExtractTextPlugin('bootstrap-[hash].min.css')
var appCss = new ExtractTextPlugin('app-[hash].min.css')

module.exports = _.merge(config, {
  devtool: 'source-map',
  entry: [path.join(__dirname, 'app/index.js')],
  output: {
    filename: '[name]-[hash].js',
    path: path.join(__dirname, '/public/'),
    publicPath: '/',
    devtoolModuleFilenameTemplate: '[resourcePath]',
    devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]',
  },
  plugins: [
    bootstrapCss,
    appCss,
    new StringReplacePlugin(),
    new HtmlWebpackPlugin({
      inject: false,
      template: 'app/index.tpl.html',
      filename: 'index.html',
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
    modules: ['node_modules', 'vendor/assets/components'],
  },
  module: {
    // preLoaders: [
    //   {
    //     test: /\.js$/,
    //     exclude: /node_modules/,
    //     use: {
    //       loader: 'eslint',
    //       options: {
    //         configFile: '.eslintrc',
    //         failOnWarning: false,
    //         failOnError: false
    //       }
    //     }
    //   }
    // ],
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
        use: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.[ot]tf(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000&mimetype=application/octet-stream',
      },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: 'file-loader' },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file-loader',
        exclude: /\/images\//,
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?modules&minimize&sourceMap', 'postcss-loader?sourceMap', 'resolve-url-loader'],
        }),
      },
      {
        test: /\.scss$/,
        include: /bootstrap/,
        loader: bootstrapCss.extract(scssOptions),
      },
      {
        test: /\.scss$/,
        exclude: /bootstrap/,
        loader: appCss.extract(scssOptions),
      },
      // Images
      {
        test: /\.(jpe?g|png|gif)$/i,
        loader: ['url-loader?limit=10000', 'img-loader?progressive=true'],
      },
      // Pdf
      {
        test: /\.pdf$/i,
        loader: 'file-loader',
      },
      // es6 files
      {
        test: /\.(es6|js|jsx)$/,
        exclude: /(node_modules|vendor)/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['react', ['es2015', { modules: false }], 'stage-2'],
            plugins: [
              [
                'react-intl',
                {
                  messagesDir: './config/locales/extracted',
                  enforceDescriptions: false,
                  languages: availableLocales,
                },
              ],
              'transform-decorators-legacy',
              'transform-function-bind',
              'transform-runtime',
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
