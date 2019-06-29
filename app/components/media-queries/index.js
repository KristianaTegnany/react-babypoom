import React, { Component, useReducer, useEffect } from 'react'
import { connect } from 'react-redux'

import styles from './styles.scss'
import useToggle from '../../hooks/toggle'

const DESKTOP_SCREENS = ['md', 'lg', 'xl']

export const reducer = (state = {}, action) =>
  'MEDIA_QUERIES' === action.type
    ? { ...state, breakpoint: action.breakpoint, desktop: DESKTOP_SCREENS.includes(action.breakpoint) }
    : state

export default connect(
  null,
  { updateBreakpoint: breakpoint => dispatch => dispatch({ type: 'MEDIA_QUERIES', breakpoint }) },
)(({ updateBreakpoint }) => {
  const div = useToggle(false)

  useEffect(() => {
    if (!div.visible) div.show()
  })

  return (
    <div
      styleName="media-queries"
      style={{ display: div.visible ? '' : 'none' }}
      onAnimationStart={e => {
        e.stopPropagation()
        updateBreakpoint(e.animationName)
      }}
    />
  )
})
