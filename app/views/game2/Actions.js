import { MOVE, GAME_OVER } from './types'

export const move = vars => dispatch => dispatch({ ...vars, type: MOVE })
export const gameOver = () => dispatch => dispatch({ type: GAME_OVER })
