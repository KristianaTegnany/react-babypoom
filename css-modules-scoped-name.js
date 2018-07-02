var path = require('path')

var HAS_PROP = {}.hasOwnProperty
var DICTIONNARY = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_0123456789-'
var CANT_START_WITH = '0123456789-_'
var NORMALIZE = /[^a-zA-Z0-9-]+/g
var NORM_START = /^-/g

function ShortClassNameGenerator(config) {
  this.index = 0
  this.hash = {}
  this.config = config
}

ShortClassNameGenerator.prototype.next = function(filepath, name) {
  var key = JSON.stringify(arguments)
  if (HAS_PROP.call(this.hash, key)) return this.hash[key]

  // PRODUCTION
  // Don't try to guess the env before. config.mode won't be set...
  if ((this.config.mode || '').startsWith('prod')) {
    var styleName = ''
    while (CANT_START_WITH.includes(DICTIONNARY.charAt(this.index % DICTIONNARY.length))) {
      ++this.index
    }
    var number = this.index++
    do {
      styleName += DICTIONNARY.charAt(number % DICTIONNARY.length)
      number = (number / DICTIONNARY.length) >> 0 // quick `floor`
      number -= 1
    } while (number >= 0)
    return (this.hash[key] = styleName)
  }

  // DEV
  var basename = normalize(path.basename(filepath, path.extname(filepath)))
  var dir = normalize(path.relative(__dirname, filepath).toLowerCase())

  return (this.hash[key] =
    dir +
    '___' +
    basename +
    '__' +
    name +
    '___' +
    Math.random()
      .toString(36)
      .slice(-5))
}

function normalize(str) {
  return str.replace(NORMALIZE, '-').replace(NORM_START, '')
}

module.exports = ShortClassNameGenerator
