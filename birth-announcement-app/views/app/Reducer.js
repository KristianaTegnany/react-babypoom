import { BPOOM, STEPS, NO_NAV, GUEST_BOOK_MSG_SAVE, GUEST_BOOK_MSG_DELETE } from './types'

// TODO: store it in the session or localstorage or cookie, with bpoomId /!\ important
let defaultState = {
  bpoom: {},
  steps: {
    index: -1,
    maxIndex: 0,
  },
  noNav: null,
  cardPreRegistration: {},
}

export default function(state = defaultState, action) {
  let bpoom
  switch (action.type) {
    case BPOOM:
      if (action.bpoom.disabled) return { ...state, bpoom: { disabled: true } }
      action.bpoom.babyNameFormatted = (action.bpoom.baby_name || '')
        .toUpperCase()
        .replace(/\s+/g, ' ')
        .replace(/_+/g, '-')
        .trim()
      return { ...state, bpoom: action.bpoom }
    case GUEST_BOOK_MSG_SAVE:
      bpoom = { ...state.bpoom }
      let msg = action.guestBookMsg
      ;(bpoom.guest_book_msgs = bpoom.guest_book_msgs.slice(0)).push(msg)
      return { ...state, bpoom }
    case GUEST_BOOK_MSG_DELETE:
      bpoom = { ...state.bpoom }
      bpoom.guest_book_msgs = bpoom.guest_book_msgs.filter(msg => !action.id.includes(msg.id))
      return { ...state, bpoom }
    case STEPS:
      if (state.steps.current === action.steps.current) {
        return state
      }
      action.steps.ok = action.steps.index >= 0
      action.steps.maxIndex = Math.max(state.steps.maxIndex, action.steps.index)
      return { ...state, steps: action.steps }
    case NO_NAV:
      return { ...state, noNav: action.noNav }
  }
  return state
}
