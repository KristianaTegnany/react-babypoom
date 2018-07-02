const DEFAULT_STATE = {}
const DESKTOP_SCREENS = ['md', 'lg', 'xl']

export default function(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case 'MEDIA_QUERIES':
      return { ...state, breakpoint: action.breakpoint, desktop: DESKTOP_SCREENS.includes(action.breakpoint) }
    default:
      return state
  }
}
