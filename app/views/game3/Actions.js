import { MOVE, GAME_OVER } from './types'

export function move(vars) {
  return function(dispatch) {
    dispatch({ ...vars, type: MOVE })
  }
}

export function gameOver() {
  return function(dispatch) {
    dispatch({ type: GAME_OVER })
  }
}
