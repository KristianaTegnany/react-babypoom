import { GUESSED, GAME_OVER } from './types'

let pixelGridSize = 5

let defaultState = {
  pixelGridSize,
  pixels: [17, 3, 11, 13, 1, 15, 9, 21, 5, 19, 7, 24, 4, 22, 18, 8, 12, 20, 10, 14, 2, 23, 0, 16, 6], // pixelGridSize * pixelGridSize length
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
        pixels: action.present ? updatePixels(state.pixels, action.letters, state.guessedOkCount) : state.pixels,
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

function updatePixels(pixels, letters, guessedOkCount) {
  let pixelRemoved = pixelGridSize * pixelGridSize - pixels.length
  let toRemove = Math.round((pixelGridSize * pixelGridSize * (guessedOkCount + 1)) / letters) - pixelRemoved
  return pixels.slice(0, -toRemove)
}
