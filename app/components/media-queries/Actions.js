export function updateBreakpoint(breakpoint) {
	return function(dispatch) {
		return dispatch({
			type: 'MEDIA_QUERIES',
			breakpoint,
		})
	}
}
