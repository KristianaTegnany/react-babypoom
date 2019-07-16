export const START_FETCHING = 'START_FETCHING'
export const STOP_FETCHING = 'STOP_FETCHING'

export default function(state = {}, action) {
  switch (action.type) {
    case START_FETCHING:
      return { loading: true }
    case STOP_FETCHING:
      return { loading: false }
    default:
      return state
  }
}
