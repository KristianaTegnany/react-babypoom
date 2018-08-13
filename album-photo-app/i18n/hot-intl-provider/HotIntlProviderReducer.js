import { LOCALE_UPDATE } from './types'

import availableLocales from '../../../available-locales'

const INITIAL_STATE = { locale: availableLocales.defaultLocale }

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOCALE_UPDATE:
      return { ...state, locale: action.locale }
  }
  return state
}
