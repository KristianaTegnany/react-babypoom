import { LOCALE_UPDATE } from './types'

export const updateLocale = data => dispatch => dispatch({ type: LOCALE_UPDATE, ...data })
