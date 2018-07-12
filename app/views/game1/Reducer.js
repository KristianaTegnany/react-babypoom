import { GUESSED, GAME_OVER } from './types'

let defaultState = {
  guessed: {},
  guessedOkCount: 0,
  guessedKoCount: 0,
  win: false,
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case GUESSED:
      return {
        ...state,
        guessed: { ...state.guessed, [action.char]: action.present },
        guessedOkCount: state.guessedOkCount + (action.present ? 1 : 0),
        guessedKoCount: state.guessedKoCount + (action.present ? 0 : 1),
      }
    case GAME_OVER:
      return {
        ...state,
        win: true,
      }
  }
  return state
}
