import { GUESSED, GAME_OVER } from './types'

export const updateGuessed = vars => dispatch => dispatch({ ...vars, type: GUESSED })
export const gameOver = () => dispatch => dispatch({ type: GAME_OVER })
