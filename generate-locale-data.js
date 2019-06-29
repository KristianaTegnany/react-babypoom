var fs = require('fs')
var path = require('path')
var Terser = require('terser')
var availableLocales = require('./available-locales')
var toSource = require('tosource-polyfill')

// es6 template
const template = (strings, ...keys) => obj =>
  keys.reduce((acc, key, i) => (acc.push(obj[key], strings[i + 1]), acc), [strings[0]]).join('')

function lang(locale) {
  return locale.slice(0, 2)
}

function sanitize(locale) {
  return locale.replace(/[^a-z_]/gi, '')
}

var ALL_LOCALES = [availableLocales.defaultLocale].concat(availableLocales)

var ALL_LANGS = ALL_LOCALES.reduce((acc, locale) => {
  var l = lang(locale)
  if (acc.indexOf(l) < 0) acc.push(l)
  return acc
}, [])

var LOCALE_DIR = path.join(__dirname, 'config', 'locales')
var LOCALE_DATA_DIR = path.join(LOCALE_DIR, 'data')
var REACT_INTL_DATA_DIR = path.join(__dirname, 'node_modules', 'react-intl', 'locale-data')

var minifyOptions = { compress: { expression: true }, output: { quote_style: 1 } }
var ALL_LOCALE_DATA = ALL_LOCALES.reduce((h, locale) => {
  h[lang(locale)] =
    '`' +
    Terser.minify(toSource(require(`react-intl/locale-data/${lang(locale)}`)).replace(/\$\{/g, '\\${'), minifyOptions)
      .code +
    '`'
  return h
}, {})

var dataAndMessageImport = template`
import ${'sanitizedlocale'}Messages from '../${'locale'}.json'
const ${'lang'}Data = ${'data'}
`

var messageImport = template`import ${'sanitizedlocale'}Messages from '../${'locale'}.json'`

var dataAndMessageExport = template`export const data = ${'lang'}Data
export const messages = ${'sanitizedlocale'}Messages\n`

var dataImport = template`const ${'lang'}Data = ${'data'}\n`

var dataExport = template`export const data = ${'lang'}Data\n`

// Remove all files in DIR
fs.readdirSync(LOCALE_DATA_DIR).forEach(file => file !== '.gitkeep' && fs.unlinkSync(path.join(LOCALE_DATA_DIR, file)))

// Create default locale file
var locale = availableLocales.defaultLocale
fs.writeFileSync(
  path.join(LOCALE_DATA_DIR, `${locale}.js`),
  dataImport({ lang: lang(locale), data: ALL_LOCALE_DATA[lang(locale)] }) + dataExport({ lang: lang(locale) }),
  'utf8',
)

// Create all locale data files
availableLocales.forEach(locale => {
  let l = lang(locale)
  let content =
    dataAndMessageImport({ lang: l, locale, sanitizedlocale: sanitize(locale), data: ALL_LOCALE_DATA[l] }) +
    dataAndMessageExport({ lang: l, locale, sanitizedlocale: sanitize(locale) })
  fs.writeFileSync(path.join(LOCALE_DATA_DIR, `${locale}.js`), content, 'utf8')
})

// Create all locale data file (server-side)
var content = `
import { addLocaleData } from 'react-intl'
${availableLocales.map(locale => messageImport({ sanitizedlocale: sanitize(locale), locale })).join('\n')}

${ALL_LANGS.map(lang => dataImport({ lang, data: ALL_LOCALE_DATA[lang] })).join('\n')}

${ALL_LANGS.map(lang => `addLocaleData(new Function('return ' + ${lang}Data)())`).join('\n')}

export const data = {
  ${ALL_LOCALES.map(locale => `'${locale}': ${lang(locale)}Data`).join(',\n  ')}
}
export const messages = {
  ${availableLocales.map(locale => `'${locale}': ${sanitize(locale)}Messages`).join(',\n  ')}
}
`
fs.writeFileSync(path.join(LOCALE_DATA_DIR, `all-data.js`), content, 'utf8')

// Create data loader
content = `const LOADERS = {
  ${ALL_LOCALES.map(locale => `'${locale}': () => import('./data/${locale}')`).join(',\n  ')}
}
export default locale => LOADERS[locale]()
`
fs.writeFileSync(path.join(LOCALE_DIR, `data-loader.js`), content, 'utf8')
