

const DEFAULT_STATE = {};

export default function(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case 'FLASH':
      return Object.assign({}, state, {
        color:   action.color,
        message: action.message
      });
    default:
      return state
  }
}