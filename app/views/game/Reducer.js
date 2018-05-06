import { GUESSED } from './types';

let defaultState = {
  guessed: {},
  guessedOkCount: 0,
  guessedKoCount: 0
};


export default function(state=defaultState, action) {
  switch (action.type) {
    case GUESSED:
      return {
        ...state,
        guessed: { ...state.guessed, [action.char]: action.present },
        guessedOkCount: state.guessedOkCount + (action.present ? 1 : 0),
        guessedKoCount: state.guessedKoCount + (action.present ? 0 : 1)
      };
  }
  return state;
}