
import { addLocaleData } from 'react-intl'
import frData from 'react-intl/locale-data/fr'

import enData from 'react-intl/locale-data/en'
import enMessages from '../en.json'


addLocaleData(frData)
addLocaleData(enData)

export const data = {
  fr: frData,
  en: enData
}
export const messages = {
  en: enMessages
}
