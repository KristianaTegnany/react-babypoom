import { LOCALE_UPDATE } from './const';

const INITIAL_STATE = { locale: 'en' };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOCALE_UPDATE:
      return { ...state, locale: action.locale };
  }
  return state;
}