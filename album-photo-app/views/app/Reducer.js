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
    let { bp_trip: { bp_trip_events = [] } = {}, bp_visitorbook: { bp_visitorbook_msgs = [] } = {} } = bpoom
    if (bp_trip_events.length) {
      bpoom.bp_trip.bp_trip_events = bp_trip_events.slice(0, 9)
    }
    if (bp_visitorbook_msgs.length) {
      bpoom.bp_visitorbook.bp_visitorbook_msgs = bp_visitorbook_msgs.slice(0, 10)
    }
  }
  return bpoom
}
