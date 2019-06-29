var path = require('path')
var glob = require('glob')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyPlugin = require('copy-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var availableLocales = require('./available-locales')

var NODE_ENV = process.env.NODE_ENV || 'development'

var bootstrapCss = new ExtractTextPlugin('bootstrap-[hash].min.css')
var appCss = new ExtractTextPlugin('app-[hash].min.css')

var scssOptions = ({ localIdentName, getLocalIdent }) => ({
  fallback: 'style-loader',
  use: [
    {
      loader: 'css-loader',
      query: {
        modules: true,
        importLoaders: 1,
        localIdentName,
        getLocalIdent,
      },
    },
    'postcss-loader?sourceMap',
    'resolve-url-loader',
    'sass-loader?sourceMap&sourceMapContents',
  ],
})

var cleanUpObj = obj => {
  Object.keys(obj).forEach(key => obj[key] == null && delete obj[key])
  return obj
}

module.exports = function({
  mode,
  optimization,
  stats,
  pathinfo,
  entry,
  prependPlugins,
  appendPlugins,
  prependBabelPlugins,
  appendBabelPlugins,
  localIdentName,
  getLocalIdent,
  generateScopedName,
}) {
  return {
    mode,
    optimization,
    stats,
    devtool: 'source-map',
    entry: (entry || []).concat([path.join(__dirname, 'app', 'index.js')]),
    output: {
      filename: '[name]-[hash].js',
      path: path.join(__dirname, 'public'),
      publicPath: '/',
      devtoolModuleFilenameTemplate: '[resourcePath]',
      devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]',
      pathinfo: pathinfo || false,
    },
    plugins: (prependPlugins || []).concat(
      [
        bootstrapCss,
        appCss,
        new CopyPlugin([{ from: 'app/favicon.ico', to: path.join(__dirname, '/public/') }]),
        new webpack.NormalModuleReplacementPlugin(/\.NODE_ENV\.js(?:on)?$/, function(resource) {
          resource.request = resource.request.replace(/\.NODE_ENV(\.js(?:on)?)$/, `.${NODE_ENV}$1`) //`.development$1`) //
        }),
        new HtmlWebpackPlugin({
          inject: false,
          template: './app/index.tpl',
          filename: process.env.NODE_ENV === 'production' ? 'index.tpl' : 'index.html',
          locales: availableLocales,
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
      ],
      appendPlugins || [],
    ),
    resolve: {
      // tell webpack which extensions to auto search when it resolves modules. With this,
      // you'll be able to do `require('./utils')` instead of `require('./utils.js')`
      extensions: ['.js', '.es6', '.css', '.png', '.gif'],
    },
    module: {
      rules: [
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
          exclude: /\/images\//, // Specific react-babypoom
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
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
          }),
        },
        {
          test: /\.scss$/,
          include: /bootstrap/,
          loader: bootstrapCss.extract(scssOptions({ localIdentName, getLocalIdent })),
        },
        {
          test: /\.scss$/,
          exclude: /bootstrap/,
          loader: appCss.extract(scssOptions({ localIdentName, getLocalIdent })),
        },
        // Images
        {
          test: /\.(jpe?g|png|gif)$/i,
          use: ['url-loader?limit=10000', 'img-loader?progressive=true'],
        },
        // Sounds
        {
          test: /\.mp3$/,
          loader: 'file-loader',
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
              presets: [
                '@babel/preset-react',
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'usage',
                    corejs: '2',
                  },
                ],
              ],
              plugins: (prependBabelPlugins || []).concat(
                [
                  [
                    'react-intl',
                    {
                      messagesDir: './config/locales/extracted',
                      enforceDescriptions: false,
                      languages: availableLocales,
                    },
                  ],
                  '@babel/plugin-syntax-dynamic-import',
                  ['@babel/plugin-proposal-class-properties', { loose: true }],
                  '@babel/plugin-proposal-function-bind',
                  '@babel/plugin-transform-runtime',
                  [
                    'react-css-modules',
                    {
                      generateScopedName,
                      handleMissingStyleName: 'ignore',
                      filetypes: {
                        '.scss': {
                          syntax: 'postcss-scss',
                        },
                      },
                    },
                  ],
                ],
                appendBabelPlugins || [],
              ),
            },
          },
        },
      ],
    },
  }
}
