import { GUESSED, GAME_OVER } from './types'

export function updateGuessed(vars) {
  return function(dispatch) {
    dispatch({ ...vars, type: GUESSED })
  }
}

export function gameOver() {
  return function(dispatch) {
    dispatch({ type: GAME_OVER })
  }
}
