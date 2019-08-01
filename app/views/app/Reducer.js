import { BPOOM, PARAMS } from './types'

// TODO: store it in the session or localstorage or cookie, with bpoomId /!\ important
let defaultState = {
  bpoom: {},
  params: {},
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case BPOOM:
      return { ...state, bpoom: limitBpoomPages(action.bpoom, state) }
    case PARAMS:
      return { ...state, params: action.params }
  }
  return state
}

// Limit number of pages if we're not printing
function limitBpoomPages(bpoom, state) {
  if (!state.params.hd && !state.params.full) {
    let { trip_events = [], guest_book_msgs = [] } = bpoom
    if (trip_events.length) {
      bpoom.trip_events = trip_events.slice(0, 9)
    }
    if (guest_book_msgs.length) {
      bpoom.guest_book_msgs = guest_book_msgs.slice(0, 10)
    }
  }
  return bpoom
}
