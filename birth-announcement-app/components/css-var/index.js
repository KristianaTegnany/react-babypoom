import React, { Component, useEffect } from 'react'
import * as Color from '../../../lib/color'
import poly from '../../../lib/css-var-polyfill'

const SPECIAL_FUNC_REG = /(?:darken|lighten|rgba)-\d+$/

export default props => {
  let root = null
  let specialCssVariables = null
  let propVariables = props['data-variables']

  if ('undefined' !== typeof document) {
    root = document.documentElement
    specialCssVariables = getComputedStyle(root)
      .getPropertyValue('content')
      .slice(1, -1)
      .split(' ')
  }

  useEffect(() => {
    if (!root) return
    let variables = { ...propVariables }
    let style = root.style
    // compute special css variables (colors)
    specialCssVariables.forEach(varName => {
      let match = varName.match(SPECIAL_FUNC_REG)
      if (match) {
        let suffix = match[0]
        let [funcName, value] = suffix.split('-')
        let parentVar = varName.slice(0, varName.length - suffix.length - 1)
        if (variables[parentVar]) {
          variables[varName] = Color[funcName](variables[parentVar], 'rgba' === funcName ? value / 100 : +value)
        }
      }
    })
    // Assign colors
    Object.keys(variables).forEach(name => style.setProperty(name, variables[name]))
    // Polyfill call
    poly.init(variables)
  })

  return <div {...props}>{props.children}</div>
}
