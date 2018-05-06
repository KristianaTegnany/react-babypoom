var path = require('path');
var glob = require('glob');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var StringReplacePlugin = require("string-replace-webpack-plugin");
var availableLocales = require('./available-locales');

module.exports = {
  devtool: 'source-map',
  entry: [
    'bootstrap-loader/lib/bootstrap.loader!bootstrap-loader/no-op.js',
    path.join(__dirname, 'app/index.js')
  ],
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '/public/'),
    publicPath: '/',
    devtoolModuleFilenameTemplate: '[resourcePath]',
    devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]'
  },
  plugins: [
    new StringReplacePlugin(),
    new HtmlWebpackPlugin({
      template: 'app/index.tpl.html',
      inject: 'body',
      filename: 'index.html',
      locales: availableLocales
    }),
    new webpack.optimize.OccurrenceOrderPlugin()
  ],
  resolve: {
    // tell webpack which extensions to auto search when it resolves modules. With this,
    // you'll be able to do `require('./utils')` instead of `require('./utils.js')`
    extensions: ['.js', '.es6', '.css', '.png', '.gif'],
    // by default, webpack will search in `web_modules` and `node_modules`. Because we're using
    // Bower, we want it to look in there too
    modules: [
      'node_modules',
      'vendor/assets/components'
    ]
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
              pattern: /\/\/\s*replace\:(.*?)\:end/ig,
              replacement: function(match, p1, offset, string) {
                if (p1.indexOf('${loc}') > 0) {
                  return availableLocales.map(loc => p1.replace(/\$\{loc\}/g, loc)).join("\n");
                }
                if (p1.indexOf('${all}') > 0) {
                  return p1.replace(/\$\{all\}/g, availableLocales.join(', '));
                }
                if (p1.indexOf('${allData}') > 0) {
                  return p1.replace(/\$\{allData\}/g, availableLocales.map(l => l + 'Data').join(', '));
                }
              }
            }
          ]
        })
      },

      // Fonts
      { test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/, use: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.[ot]tf(\?v=\d+\.\d+\.\d+)?$/,   use: "url-loader?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,      use: "file-loader" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,      use: "url-loader?limit=10000&mimetype=image/svg+xml" },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?modules&sourceMap',
            'postcss-loader',
            'resolve-url-loader'
          ]
        })
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
            'postcss-loader',
            'resolve-url-loader',
            'sass-loader?sourceMap&sourceMapContents'
          ]
        })
      },
      // Images
      {
        test: /\.(jpe?g|png|gif)$/i,
        loader: ['url-loader?limit=10000', 'img-loader?progressive=true']
      },
      // es6 files
      {
        test: /\.(es6|js|jsx)$/,
        exclude: /(node_modules|vendor)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["react", ["es2015", { "modules": false }], "stage-2"],
            plugins: [
              ["react-intl", {
                "messagesDir": "./config/locales/extracted",
                "enforceDescriptions": false,
                "languages": ["en", "fr"]
              }],
              "transform-decorators-legacy",
              "transform-function-bind",
              "transform-runtime"
            ]
          }
        }
      },
      // JSON
      {
        test: /\.json?$/,
        loader: 'json-loader'
      }
    ]
  }
};
