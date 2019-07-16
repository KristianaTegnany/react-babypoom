import { MOVE, GAME_OVER } from './types'

let defaultState = {
  pieces: [],
  moves: 0,
  win: false,
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case MOVE:
      return {
        ...state,
        ...action,
      }
    case GAME_OVER:
      return {
        ...state,
        win: true,
      }
  }
  return state
}
