import { BPOOM } from './types'

// TODO: store it in the session or localstorage or cookie, with bpoomId /!\ important
let defaultState = {
  bpoom: {},
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case BPOOM:
      return { ...state, bpoom: action.bpoom }
  }
  return state
}
