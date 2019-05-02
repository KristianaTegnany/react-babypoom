export default function(state = {}, action) {
  switch (action.type) {
    case 'FLASH':
      return Object.assign({}, state, action)
    default:
      return state
  }
}
