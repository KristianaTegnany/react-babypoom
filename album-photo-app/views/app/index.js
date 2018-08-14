import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'

import { loadBpoom } from './Actions'
import { deleteFlash } from '../../components/flash/Actions'

import CSSVariableApplicator from '../../components/css-var'
import THEMES from './themes'

import NotFound from '../not-found'
import Cover from '../../components/cover'
import Intro from '../../components/intro'
import Arrival from '../../components/arrival'
import Trip from '../../components/trip'
import Guestbook from '../../components/guestbook'
import ParentsAndStats from '../../components/parents-and-stats'
import BackCover from '../../components/back-cover'

import i18n from '../../i18n/i18n'

import './styles.scss'
import page from '../../../config/styles/page.scss'

let UNIQ = 0

function getThemeName(bpoom) {
  let hack = (('undefined' !== typeof window && window.location.hash) || '').substr(1)
  return hack && hack in THEMES ? hack : bpoom.gender ? ('M' === bpoom.gender ? 'boy' : 'girl') : 'default'
}

@connect(
  mapStateToProps,
  { loadBpoom, deleteFlash },
)
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: getThemeName(props.bpoom),
    }
  }

  static fetchData(store, params) {
    return store.dispatch(loadBpoom(params.uuid, { flash: false }))
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      theme: getThemeName(nextProps.bpoom),
    }
  }

  componentDidMount() {
    let uuid = this.props.match.params.uuid
    if (!this.props.bpoom.uuid) {
      this.props.loadBpoom(uuid).catch(() => {})
    }
  }

  componentDidUpdate(prevProps) {
    let props = this.props

    // On route update
    if (props.location.pathname !== prevProps.location.pathname) {
      props.deleteFlash()
    }
  }

  renderFlash() {
    let { flash, location } = this.props
    if (!flash || !flash.message) {
      flash = (location.state || {}).flash
    }
    if (!flash || !flash.message) {
      return ''
    }
    return (
      <div styleName={`page.alert page.alert-${flash.color}`} key={`alert-${++UNIQ}`}>
        {i18n(flash.message)}
      </div>
    )
  }

  render() {
    let { bpoom } = this.props

    if (bpoom.not_found) {
      return <NotFound />
    }
    return (
      <CSSVariableApplicator data-variables={THEMES[this.state.theme]}>
        {this.renderFlash()}
        <Cover />
        <Intro />
        <Arrival />
        <Trip />
        <Guestbook />
        <ParentsAndStats />
        <BackCover />
      </CSSVariableApplicator>
    )
  }
}

export default injectIntl(App)

function mapStateToProps(state) {
  const {
    app: { bpoom },
    flash,
  } = state
  return { bpoom, flash }
}
