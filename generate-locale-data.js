var path = require('path')
var fs = require('fs')
var Terser = require('terser')
var availableLocales = require('./available-locales')
var toSource = require('tosource-polyfill')

// es6 template
const template = (strings, ...keys) => obj =>
  keys.reduce((acc, key, i) => (acc.push(obj[key], strings[i + 1]), acc), [strings[0]]).join('')

var LOCALE_DIR = path.join(__dirname, 'config', 'locales')
var LOCALE_DATA_DIR = path.join(LOCALE_DIR, 'data')
var REACT_INTL_DATA_DIR = path.join(__dirname, 'node_modules', 'react-intl', 'locale-data')

var ALL_LOCALES = [availableLocales.defaultLocale].concat(availableLocales)

var minifyOptions = { compress: { expression: true } }
var ALL_LOCALE_DATA = ALL_LOCALES.reduce((h, locale) => {
  h[locale] =
    '`' +
    Terser.minify(toSource(require(`react-intl/locale-data/${locale}`)).replace(/\$\{/g, '\\${'), minifyOptions).code +
    '`'
  return h
}, {})

var dataAndMessageImport = template`
import ${'locale'}Messages from '../${'locale'}.json'
const ${'locale'}Data = ${'data'}
`

var dataAndMessageExport = template`export const data = ${'locale'}Data
export const messages = ${'locale'}Messages\n`

var dataImport = template`const ${'locale'}Data = ${'data'}\n`

var dataExport = template`export const data = ${'locale'}Data\n`

// Remove all files in DIR
fs.readdirSync(LOCALE_DATA_DIR).forEach(file => fs.unlinkSync(path.join(LOCALE_DATA_DIR, file)))

// Create default locale file
var locale = availableLocales.defaultLocale
fs.writeFileSync(
  path.join(LOCALE_DATA_DIR, `${locale}.js`),
  dataImport({ locale, data: ALL_LOCALE_DATA[locale] }) + dataExport({ locale }),
  'utf8',
)

// Create all locale data files
availableLocales.forEach(locale => {
  let content = dataAndMessageImport({ locale, data: ALL_LOCALE_DATA[locale] }) + dataAndMessageExport({ locale })
  fs.writeFileSync(path.join(LOCALE_DATA_DIR, `${locale}.js`), content, 'utf8')
})

// Create all locale data file (server-side)
var content = `
import { addLocaleData } from 'react-intl'
${dataImport({ locale, data: ALL_LOCALE_DATA[locale] })}
${availableLocales.map(locale => dataAndMessageImport({ locale, data: ALL_LOCALE_DATA[locale] }))}

${ALL_LOCALES.map(locale => `addLocaleData(new Function('return ' + ${locale}Data)())`).join('\n')}

export const data = {
  ${ALL_LOCALES.map(locale => `${locale}: ${locale}Data`).join(',\n  ')}
}
export const messages = {
  ${availableLocales.map(locale => `${locale}: ${locale}Messages`).join(',\n  ')}
}
`
fs.writeFileSync(path.join(LOCALE_DATA_DIR, `all-data.js`), content, 'utf8')

// Create data loader
content = `const LOADERS = {
  ${ALL_LOCALES.map(locale => `${locale}: () => import('./data/${locale}')`).join(',\n  ')}
}
export default locale => LOADERS[locale]()
`
fs.writeFileSync(path.join(LOCALE_DIR, `data-loader.js`), content, 'utf8')
