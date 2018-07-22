

export function flash(color, message) {
  return function(dispatch) {
    return dispatch({
      type: 'FLASH',
      color,
      message
    });
  };
}

export function deleteFlash() {
  return flash(null);
}