const manageTranslations = require('react-intl-translations-manager').default
const availableLocales = require('./available-locales')

// es2015 import
// import manageTranslations from 'react-intl-translations-manager';

manageTranslations({
  messagesDirectory: 'config/locales/extracted',
  translationsDirectory: 'config/locales/',
  languages: availableLocales,
})
