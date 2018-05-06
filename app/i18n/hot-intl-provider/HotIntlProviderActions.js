import { LOCALE_UPDATE } from './const';

export function updateLocale(locale) {
  return function(dispatch) {
    dispatch({ type: LOCALE_UPDATE, locale });
  }
}
