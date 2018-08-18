import React, { Component } from 'react'
import * as Color from '../../../lib/color'
import poly from '../../../lib/css-var-polyfill'

const SPECIAL_FUNC_REG = /(?:darken|lighten|rgba)-\d+$/

export default class extends Component {
  constructor(props) {
    super(props)
    if ('undefined' === typeof document) return // Node
    this.root = document.documentElement
    this.specialCssVariables = getComputedStyle(this.root)
      .getPropertyValue('content')
      .slice(1, -1)
      .split(' ')
  }

  componentDidMount() {
    this.updateCSSVariables(this.props['data-variables'])
  }

  // TODO: not here. static getDerivedStateFromProps(nextProps, prevState)
  componentDidUpdate(prevProps) {
    if (this.props['data-variables'] !== prevProps['data-variables']) {
      this.updateCSSVariables(this.props['data-variables'])
    }
  }

  updateCSSVariables(variables) {
    variables = { ...variables }
    let style = this.root.style
    this.computeSpecialCssVariables(variables)
    Object.keys(variables).forEach(name => {
      style.setProperty(name, variables[name])
    })
    poly.init(variables)
  }

  computeSpecialCssVariables(variables) {
    this.specialCssVariables.forEach(varName => {
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
  }

  render() {
    return <div {...this.props}>{this.props.children}</div>
  }
}
