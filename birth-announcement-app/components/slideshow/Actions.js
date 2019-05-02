import { SLIDESHOW, IS_OPEN, INDEX } from './types'

export const loadSlideshow = (obj, callback) => dispatch => {
  dispatch({ ...obj, type: SLIDESHOW })
  callback && callback(dispatch)
}

export const openSlideshow = index => toggleSlideshow(true, isNaN(index) ? 0 : index)

export const changeSlideshowIndex = index => dispatch => dispatch({ type: INDEX, index: index || 0 })

export const closeSlideshow = () => toggleSlideshow(false)

const toggleSlideshow = (isOpen, index, callback) => dispatch => dispatch({ type: IS_OPEN, isOpen, index: index || 0 })
