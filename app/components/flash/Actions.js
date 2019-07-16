export const flash = (color, message) => dispatch => dispatch({ type: 'FLASH', color, message })

export const deleteFlash = () => flash(null)
