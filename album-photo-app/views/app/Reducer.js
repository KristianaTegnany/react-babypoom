import { BPOOM, MEDIA } from './types'

// TODO: store it in the session or localstorage or cookie, with bpoomId /!\ important
let defaultState = {
  bpoom: {
    photo: {},
    photo_mum: {},
    photo_dad: {},
  },
  media: 'screen',
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case BPOOM:
      return { ...state, bpoom: action.bpoom }
    case MEDIA:
      return { ...state, media: action.media }
  }
  return state
}
