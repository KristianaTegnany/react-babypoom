var webpack = require('webpack')
var path = require('path')
var fs = require('fs')
var glob = require('glob')
var WebpackDevServer = require('webpack-dev-server')
var config = require('./webpack.development.config')


new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  // It suppress error shown in console, so it has to be set to false.
  quiet: false,
  // It suppress everything except error, so it has to be set to false as well
  // to see success build.
  noInfo: false,
  stats: {
    // Config for minimal console.log mess.
    assets: false,
    colors: true,
    version: false,
    hash: false,
    timings: false,
    chunks: false,
    chunkModules: false,
  },
  before: function(app, server, compiler) {
    var cache = []
    compiler.hooks.done.tap('ThemeGenerator', function (compilation) {
      cache.shift()()
    })
    let assignTheme = false;
    app.get('*', function(req, res, next) {
      var theme = (req.url.match(/[\?&]theme=(\d+)(?:&|$)/) || [])[1] || null;

      if(!req.url.match(/[\?&]theme=*/) && !assignTheme){
        assignTheme = true;
        process.env.BP_ALBUM_THEME = 1

        server.sockWrite(server.sockets, "content-changed")
        var files = glob.sync(__dirname + '/app/**/*.js', { ignore: "**/node_modules/**" })
        files.forEach(file => {
          var content = fs.readFileSync(file)
          if (content.includes('BP_ALBUM_THEME')) {
            var time = new Date()
            try {
              fs.utimesSync(file, time, time)
            } catch (err) {
              fs.closeSync(fs.openSync(file, 'w'))
            }
          }
        })
        return cache.push(next)

      }else if (theme && theme !== process.env.BP_ALBUM_THEME) {
        assignTheme = false
        console.log('assignation ato')
        process.env.BP_ALBUM_THEME = theme

        server.sockWrite(server.sockets, "content-changed")
        var files = glob.sync(__dirname + '/app/**/*.js', { ignore: "**/node_modules/**" })
        files.forEach(file => {
          var content = fs.readFileSync(file)
          if (content.includes('BP_ALBUM_THEME')) {
            var time = new Date()
            try {
              fs.utimesSync(file, time, time)
            } catch (err) {
              fs.closeSync(fs.openSync(file, 'w'))
            }
          }
        })
        return cache.push(next)
      }
      next()
    });
  }
}).listen(8383, 'localhost', function(err) {
  if (err) {
    console.log(err)
  }
  console.log('Listening at localhost:8383')
})
