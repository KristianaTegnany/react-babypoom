import { LOCALE_UPDATE } from './types'

export function updateLocale(locale) {
  return function(dispatch) {
    dispatch({ type: LOCALE_UPDATE, locale })
  }
}
