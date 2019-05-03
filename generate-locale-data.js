var path = require('path')
var fs = require('fs')
var availableLocales = require('./available-locales')

// es6 template
const template = (strings, ...keys) => obj =>
  keys.reduce((acc, key, i) => (acc.push(obj[key], strings[i + 1]), acc), [strings[0]]).join('')

var LOCALE_DIR = path.join(__dirname, 'config', 'locales')
var LOCALE_DATA_DIR = path.join(LOCALE_DIR, 'data')

var ALL_LOCALES = [availableLocales.defaultLocale].concat(availableLocales)

var dataAndMessageImport = template`import ${'locale'}Data from 'react-intl/locale-data/${'locale'}'
import ${'locale'}Messages from '../${'locale'}.json'
`

var dataAndMessageExport = template`export const data = ${'locale'}Data
export const messages = ${'locale'}Messages\n`

var dataImport = template`import ${'locale'}Data from 'react-intl/locale-data/${'locale'}'\n`

var dataExport = template`export const data = ${'locale'}Data\n`

// Remove all files in DIR
fs.readdirSync(LOCALE_DATA_DIR).forEach(file => fs.unlinkSync(path.join(LOCALE_DATA_DIR, file)))

// Create default locale file
var locale = availableLocales.defaultLocale
fs.writeFileSync(path.join(LOCALE_DATA_DIR, `${locale}.js`), dataImport({ locale }) + dataExport({ locale }), 'utf8')

// Create all locale data files
availableLocales.forEach(locale => {
  let content = dataAndMessageImport({ locale }) + dataAndMessageExport({ locale })
  fs.writeFileSync(path.join(LOCALE_DATA_DIR, `${locale}.js`), content, 'utf8')
})

// Create all locale data file (server-side)
var content = `
import { addLocaleData } from 'react-intl'
${dataImport({ locale })}
${availableLocales.map(locale => dataAndMessageImport({ locale }))}

${ALL_LOCALES.map(locale => `addLocaleData(${locale}Data)`).join('\n')}

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
