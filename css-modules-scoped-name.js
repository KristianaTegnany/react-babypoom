var path = require('path')
var fs = require('fs')

var CACHE_FILENAME = 'css-modules-scoped-names.cache.json'
var THEME_REG = /\.theme-\d+(\.scss)$/

var HAS_PROP = {}.hasOwnProperty
var DICTIONNARY = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_0123456789-'
var CANT_START_WITH = 'Z0123456789-_'
var PREFIX = 'Z__'

function ShortClassNameGenerator() {
  this.index = 0
  this.hash = {}
}

ShortClassNameGenerator.prototype.exportData = function(dir) {
  var filepath = path.join(dir, CACHE_FILENAME)
  if (fs.existsSync(filepath)) return
  fs.writeFileSync(filepath, JSON.stringify(this.hash), 'utf8')
}

ShortClassNameGenerator.prototype.importData = function(dir) {
  var filepath = path.join(dir, CACHE_FILENAME)
  if (!fs.existsSync(filepath)) return
  this.hash = JSON.parse(fs.readFileSync(filepath, 'utf8').toString())
}

ShortClassNameGenerator.prototype.next = function(filepath, name) {
  filepath = filepath.replace(THEME_REG, '$1')
  var key = JSON.stringify([filepath, name])
  if (HAS_PROP.call(this.hash, key)) return this.hash[key]

  // PRODUCTION
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
  return (this.hash[key] = PREFIX + styleName)
}

module.exports = ShortClassNameGenerator
