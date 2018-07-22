import { SLIDESHOW, IS_OPEN, INDEX } from './types'

export function loadSlideshow(obj, callback) {
  return function(dispatch) {
    dispatch({ ...obj, type: SLIDESHOW })
    callback && callback(dispatch)
  }
}

export function openSlideshow(index) {
  return toggleSlideshow(true, isNaN(index) ? 0 : index)
}

export function changeSlideshowIndex(index) {
  return function(dispatch) {
    dispatch({ type: INDEX, index: index || 0 })
  }
}

export function closeSlideshow() {
  return toggleSlideshow(false)
}

function toggleSlideshow(isOpen, index, callback) {
  return function(dispatch) {
    dispatch({ type: IS_OPEN, isOpen, index: index || 0 })
  }
}
