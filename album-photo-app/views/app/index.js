import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, defineMessages } from 'react-intl'
import { connect } from 'react-redux'

import { loadBpoom } from './Actions'
import { deleteFlash } from '../../components/flash/Actions'

import CSSVariableApplicator from '../../components/css-var'
import THEMES from './themes'

import Page from '../../components/page'
import NotFound from '../not-found'
import Cover from '../../pages/cover'
import Intro from '../../pages/intro'
import Arrival from '../../pages/arrival'
import Trip from '../../pages/trip'
import Guestbook from '../../pages/guestbook'
import ParentsAndStats from '../../pages/parents-and-stats'
import BackCover from '../../pages/back-cover'

import i18n from '../../i18n/i18n'

import Turn from '../../../lib/turn'
import Fullscreen from '../../../lib/fullscreen'

// i18n
import t from '../../i18n/i18n'
// import '../../../lib/fix-ios-orientation-change'

import './styles.scss'

let UNIQ = 0

function getThemeName(bpoom) {
  let hack = (('undefined' !== typeof window && window.location.hash) || '').substr(1)
  return hack && hack in THEMES ? hack : bpoom.gender ? ('M' === bpoom.gender ? 'boy' : 'girl') : 'default'
}

function debounce(func, wait) {
  let timeout
  let later = function() {
    timeout = null
    func()
  }
  return function() {
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Fix height on Safari/iOs
function setWindowHeight(container) {
  if (!(/iPhone|iPad|iPod/.test(navigator.platform) && navigator.userAgent.indexOf('AppleWebKit') > -1)) return
  if (window.matchMedia && matchMedia('(orientation: landscape)')) {
    let change = container.style.height
    container.style.height = ''
    if (window.innerHeight !== container.getBoundingClientRect().height) {
      container.style.height = `${window.innerHeight}px`
      window.scrollTo(0, 0)
    }
    return
  }
  container.style.height = ''
}

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
    if (!this.props.bpoom.uuid) {
      this.props
        .loadBpoom(this.props.match.params.uuid)
        .then(() => this.domLoaded())
        .catch(() => {})
    } else {
      this.domLoaded()
    }
  }

  componentDidUpdate(prevProps) {
    let props = this.props

    // On route update
    if (props.location.pathname !== prevProps.location.pathname) {
      props.deleteFlash()
    }
  }

  updatePreviewScale(css, container) {
    let transformProp =
      't WebkitT MozT OT msT KhtmlT'.split(' ').find(p => null != document.body.style[`${p}ransform`]) + 'ransform'
    transformProp = transformProp.replace(/([A-Z])/g, '-$1').toLowerCase()

    let width = 1124 * 2
    let height = 794

    let w = window.innerWidth - 20
    let h = (parseFloat(container.style.height) || window.innerHeight) - 80
    let scale = w < width || h < height ? Math.min(w / width, h / height) : 1

    let styles = `.pdf-page{${transformProp}:scale(${scale})}`
    if (css.styleSheet) {
      css.styleSheet.cssText = styles
    } else {
      css.innerHTML = styles = styles
    }

    return {
      width: 1124 * 2 * scale,
      height: 794 * scale,
      elevation: 160 * scale,
    }
  }

  domLoaded() {
    if ('print' === this.props.media) return
    let uuid = this.props.bpoom.uuid

    let container = document.querySelector('.preview')
    let flipbook = container.querySelector('.flipbook')
    let controls = container.querySelector('.preview-controls')
    let page = controls.querySelector('.page')
    let warning = container.querySelector('.limited-preview')
    let close = warning.querySelector('.close')
    let storage = window.sessionStorage || {}

    let closeWarning = () => {
      if (warning) {
        warning.parentNode.removeChild(warning)
        warning = null
        storage[uuid] = +(storage[uuid] || 0) + 1
      }
    }
    if (+storage[uuid] > 1) {
      closeWarning()
    } else {
      warning.style.display = 'flex'
    }

    let css = document.createElement('style')
    document.body.appendChild(css)

    setWindowHeight(container)

    let turn = new Turn(
      flipbook,
      Object.assign(this.updatePreviewScale(css, container), {
        duration: 1300,
        gradients: true,
        autoCenter: true,
        when: {
          turning: closeWarning,
        },
      }),
    )
    turn.peel('br')

    container.querySelector('.loading-preview').style.display = 'none'
    flipbook.style.visibility = 'visible'
    window.addEventListener(
      'resize',
      debounce(() => {
        setWindowHeight(container)
        flipbook.classList.remove('flipbook-transition')
        turn.options(this.updatePreviewScale(css, container))
        setTimeout(() => flipbook.classList.add('flipbook-transition'), 50)
      }, 300),
    )

    let totalPages = turn.pages()
    let update = () => (page.value = turn.page())

    update()
    controls.querySelector('.first').addEventListener('click', () => {
      turn.page(1)
      update()
    })
    controls.querySelector('.previous').addEventListener('click', () => {
      turn.previous()
      update()
    })
    controls.querySelector('.next').addEventListener('click', () => {
      turn.next()
      update()
    })
    controls.querySelector('.last').addEventListener('click', () => {
      turn.page(totalPages)
      update()
    })
    close.addEventListener('click', closeWarning)
    if (Fullscreen.support)
      controls.querySelector('.fullscreen').addEventListener('click', () => {
        Fullscreen.toggle(document.body)
      })
    controls.querySelector('.total').innerText = `/ ${totalPages}`
    page.setAttribute('max', totalPages)
    page.addEventListener('change', e => {
      turn.page(Math.max(1, Math.min(+page.value || 1, totalPages)))
    })

    setTimeout(() => flipbook.classList.add('flipbook-transition'), 50)
  }

  renderFlash(msg) {
    let { flash, location } = this.props
    if (!flash || !flash.message) {
      flash = (location.state || {}).flash
    }
    if (!flash || !flash.message) {
      return ''
    }
    return (
      <div styleName={`alert alert-${flash.color}`} key={`alert-${++UNIQ}`}>
        {i18n(flash.message)}
      </div>
    )
  }

  render() {
    let { bpoom, media } = this.props
    if (bpoom.not_found) {
      return <NotFound />
    }

    let {
      bpoom: { bp_visitorbook: { bp_visitorbook_msgs = [] } = {}, bp_trip: { bp_trip_events = [] } = {} },
    } = this.props

    let totalPages =
      1 /* Cover */ +
      2 /* Intro */ +
      2 /* Arrival */ +
      Trip.cntPages(bp_trip_events) /* Trip */ +
      Guestbook.cntPages(bp_visitorbook_msgs) /* Guest-book */ +
      2 /* Parents & stats */ +
      1 /* Back Cover */

    let blankPages = 'print' === media ? Math.max(0, 26 - totalPages) : 0
    // Pages need to be pair in any case scenario
    if ((totalPages + blankPages) % 2) ++blankPages

    let missingPages = []
    for (let i = 0; i < blankPages; ++i) missingPages.push(<Page key={`missing-${i}`} />)

    return (
      <CSSVariableApplicator data-variables={THEMES[this.state.theme]}>
        {this.renderFlash()}
        <div className={'print' !== media ? 'preview' : 'hd'}>
          <div className="flipbook">
            <Cover />
            <Intro />
            <Arrival />
            <Trip />
            <Guestbook />
            <ParentsAndStats />
            {missingPages}
            <BackCover />
          </div>
          {'print' !== media && (
            <div>
              <div className="loading-preview" styleName="loading-preview">
                <div />
              </div>
              <div className="limited-preview">
                <div>
                  {t(MSG.preview_limit)}
                  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
              </div>
              <div styleName="rotate-device">
                <svg viewBox="0 0 26.1 22.6">
                  <path
                    d="M14.2,1.1c0.8-0.8,2.1-0.8,3,0l6.1,6.1c0.8,0.8,0.8,2.1,0,3L11.9,21.5c-0.8,0.8-2.1,0.8-3,0l-6.1-6.1c-0.8-0.8-0.8-2.1,0-3
  L14.2,1.1z M14.4,2.6l-10,10l7.4,7.4l10-10L14.4,2.6z M6.4,18.2c0.4,0.4,1,0.4,1.4,0s0.4-1,0-1.4c-0.4-0.4-1-0.4-1.4,0
  C6,17.2,6,17.8,6.4,18.2z M1.8,5.7H0.9C0.6,5.7,0.4,5.9,0.6,6l2.7,2.7L5.9,6c0.1-0.1,0-0.3-0.3-0.3H4.8c-0.4-1.7,1.4-3,4-2.8
  c0.5,0,0.5-0.2,0.3-0.3C5.9,0.7,1.8,1.9,1.8,5.7z M24.3,16.8h0.9c0.3,0,0.4-0.1,0.3-0.3l-2.7-2.7l-2.7,2.7c-0.1,0.1,0,0.3,0.3,0.3
  h0.9c0.4,1.7-1.4,3-4,2.8c-0.5,0-0.5,0.2-0.3,0.3C20.1,21.8,24.3,20.6,24.3,16.8z"
                  />
                </svg>
                {t(MSG.rotate_device)}
              </div>
              <div className="preview-controls">
                <button className="first">◂◂</button>
                <button className="previous">◂</button>
                <input className="page" type="number" step="1" min="1" />
                <span className="total">/ </span>
                <button className="next">▸</button>
                <button className="last">▸▸</button>
                {Fullscreen.support && (
                  <button className="fullscreen">
                    <svg viewBox="0 0 20 20">
                      <path d="M1,1v6h2V3h4V1H1z M3,13H1v6h6v-2H3V13z M17,17h-4v2h6v-6h-2V17z M17,1h-4v2h4v4h2V1H17z" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </CSSVariableApplicator>
    )
  }
}

export default injectIntl(
  connect(
    mapStateToProps,
    { loadBpoom, deleteFlash },
  )(App),
)

function mapStateToProps(state) {
  const {
    app: { bpoom, media },
    flash,
  } = state
  return { bpoom, media, flash }
}

const MSG = defineMessages({
  preview_limit: {
    id: 'app.preview_limit',
    defaultMessage: `Attention : cet affichage est un aperçu et ne présente qu’un extrait de votre album final`,
  },
  rotate_device: {
    id: 'app.rotate_device',
    defaultMessage: `Tournez votre appareil pour un meilleur rendu`,
  },
})
