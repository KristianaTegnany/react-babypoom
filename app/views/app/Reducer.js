import { BPOOM, STEPS, NO_NAV, SAVE_VISITORBOOK_MSG, DELETE_VISITORBOOK_MSG } from './types'

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
      return { ...state, bpoom: action.bpoom }
    case SAVE_VISITORBOOK_MSG:
      bpoom = { ...state.bpoom }
      let msg = action.visitorbookMsg
      ;(bpoom.bp_visitorbook.bp_visitorbook_msgs = bpoom.bp_visitorbook.bp_visitorbook_msgs.slice(0)).push(msg)
      return { ...state, bpoom }
    case DELETE_VISITORBOOK_MSG:
      bpoom = { ...state.bpoom }
      bpoom.bp_visitorbook.bp_visitorbook_msgs = bpoom.bp_visitorbook.bp_visitorbook_msgs.filter(
        msg => !action.id.includes(msg.id)
      )
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
