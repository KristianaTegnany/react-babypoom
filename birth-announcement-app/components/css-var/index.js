import React, { Component, useEffect } from 'react'
import * as Color from '../../../lib/color'
import poly from '../../../lib/css-var-polyfill'
import styles from '../../../config/bootstrap/bootstrap.scss'

const SPECIAL_FUNC_REG = /(?:darken|lighten|rgba)-\d+$/
const SPECIAL_CSS_VARIABLES = styles.cssvar.split(' ')

// compute special css variables (colors)
export function cssVar(dataVariables) {
  let variables = { ...dataVariables }
  SPECIAL_CSS_VARIABLES.forEach(varName => {
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
  return variables
}

export default props => {
  let variables = cssVar(props['data-variables'])

  useEffect(() => {
    // Polyfill call
    if ('undefined' !== typeof document) poly.init(variables)
  })

  return (
    <div>
      <style type="text/css">{`:root {${Object.keys(variables)
        .map(name => `${name}:${variables[name]}`)
        .join(';')}}`}</style>
      {props.children}
    </div>
  )
}
