import { SLIDESHOW, IS_OPEN, INDEX } from './types'

// TODO: store it in the session or localstorage or cookie, with bpoomId /!\ important
let defaultState = {
  isOpen: false,
  options: {},
  items: [],
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case SLIDESHOW:
      return { ...state, items: action.items }
    case IS_OPEN:
      return { ...state, isOpen: action.isOpen, index: action.index }
    case INDEX:
      return { ...state, index: action.index }
  }
  return state
}
