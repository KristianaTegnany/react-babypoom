import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, defineMessages, addLocaleData } from 'react-intl'
import localeDataLoader from '../../../config/locales/data-loader'
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
import Guestbook from '../../pages/guest-book'
import ParentsAndStats from '../../pages/parents-and-stats'
import BackCover from '../../pages/back-cover'
import i18n from '../../i18n/i18n'
import Turn from '../../../lib/turn'
import Fullscreen from '../../../lib/fullscreen'
import config from '../../../config'
import t from '../../i18n/i18n'
import flipSound from '../../sounds/flip-sound.mp3'
import { RotateDeviceIcon, FullscreenIcon, VolumeOnIcon, VolumeOffIcon } from '../../icons'
import loadIntl from '../../../lib/intl-detection'
import { updateLocale } from '../../i18n/hot-intl-provider/HotIntlProviderActions'
import './styles.scss'

let UNIQ = 0

function setLocaleData(localeData) {
  addLocaleData(new Function(`return ${localeData}`)())
}

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

function iOsSafari() {
  let ua = navigator.userAgent
  return /iPhone|iPad/i.test(ua) && /WebKit/i.test(ua) && !/CriOS/i.test(ua)
}
// Fix height on iOs
function setWindowHeight(container) {
  if (!iOsSafari()) return
  if (window.matchMedia && matchMedia('(orientation: landscape)')) {
    let change = container.style.height
    container.style.height = ''
    container.offsetHeight
    if (window.innerHeight !== container.getBoundingClientRect().height) {
      container.style.height = `${window.innerHeight}px`
      window.scrollTo(0, 0)
    }
    return
  }
  container.style.height = ''
}

const FLIP_SOUND = 'undefined' !== typeof Audio ? new Audio(flipSound) : null

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: getThemeName(props.bpoom),
      audioSupport: FLIP_SOUND && ['off', '0'].indexOf((props.params.sound || '').toLowerCase()) < 0,
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
        .then(bpoom => {
          loadIntl([bpoom.locale], () => {
            localeDataLoader(bpoom.locale).then(json => {
              this.props.updateLocale({ locale: bpoom.locale, localeData: json.data, messages: json.messages })
              this.domLoaded()
            })
          })
        })
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
    let cs = getComputedStyle(container)
    let paddingV = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom)
    let h = (parseFloat(container.style.height) || window.innerHeight) - paddingV
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
    if (this.props.params.hd) return

    let uuid = this.props.bpoom.uuid
    let container = document.querySelector('.preview')
    let flipbook = container.querySelector('.flipbook')
    let controls = container.querySelector('.preview-controls')
    let page = controls.querySelector('.page')
    let current = controls.querySelector('.current')
    let volumeOn = controls.querySelector('.volume-on')
    let volumeOff = controls.querySelector('.volume-off')
    let warning = container.querySelector('.limited-preview')
    let close = warning && warning.querySelector('.close')
    let storage = window.sessionStorage || {}
    let soundActive = true

    let closeWarning = () => {
      if (warning) {
        warning.parentNode.removeChild(warning)
        warning = null
        storage[uuid] = +(storage[uuid] || 0) + 1
      }
    }

    let css = document.createElement('style')
    document.body.appendChild(css)

    let turn = new Turn(
      flipbook,
      Object.assign(this.updatePreviewScale(css, container), {
        duration: 1300,
        gradients: true,
        autoCenter: true,
        when: {
          turning: () => {
            if (this.state.audioSupport && soundActive) FLIP_SOUND.play()
            closeWarning()
          },
        },
      }),
    )

    let resizeWrapper = () => {
      setTimeout(resize, 0)
      setTimeout(resize, 100)
    }

    let resize = () => {
      setWindowHeight(container)
      flipbook.classList.remove('flipbook-transition')
      turn.options(this.updatePreviewScale(css, container))
      setTimeout(() => flipbook.classList.add('flipbook-transition'), 50)
    }
    window.addEventListener('resize', debounce(resizeWrapper, 300))

    let totalPages = turn.pages()
    let update = () => {
      let p = turn.page()
      page.value = p
      current.innerHTML = `${p} `
    }

    update()

    let lastClick
    // Avoid triggering zoom on mobile
    controls.addEventListener('touchstart', e => {
      if (lastClick && Date.now() - lastClick < 500) {
        e.preventDefault()
      } else {
        lastClick = Date.now()
      }
    })
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
    if (close) close.addEventListener('click', closeWarning)
    if (Fullscreen.support)
      controls.querySelector('.fullscreen').addEventListener('click', () => {
        Fullscreen.toggle(document.body)
      })
    controls.querySelector('.total').innerText = `/ ${totalPages}`
    page.setAttribute('max', totalPages)
    page.addEventListener('change', e => {
      turn.page(Math.max(1, Math.min(+page.value || 1, totalPages)))
    })
    if (volumeOn && volumeOff) {
      let volume = mute => {
        soundActive = !mute
        volumeOn.hidden = mute
        volumeOff.hidden = !mute
      }
      volumeOn.addEventListener('click', e => volume(true))
      volumeOff.addEventListener('click', e => volume(false))
    }

    container.querySelector('.loading-preview').style.display = 'none'
    flipbook.style.visibility = 'visible'
    controls.style.display = 'flex'
    if (+storage[uuid] > 1) {
      closeWarning()
    } else if (warning) {
      warning.style.display = 'flex'
    }
    turn.peel('br')
    setTimeout(() => flipbook.classList.add('flipbook-transition'), 50)
    if (iOsSafari())
      setTimeout(() => {
        resizeWrapper()
        turn.peel('br')
      }, 750)
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
    let { bpoom, params } = this.props
    if (bpoom.not_found) {
      return <NotFound />
    }

    let { bpoom: { guest_book_msgs = [], trip_events = [] } = {} } = this.props

    let totalPages =
      1 /* Cover */ +
      2 /* Intro */ +
      2 /* Arrival */ +
      Trip.cntPages(trip_events) /* Trip */ +
      Guestbook.cntPages(guest_book_msgs) /* Guest-book */ +
      2 /* Parents & stats */ +
      1 /* Back Cover */

    let blankPages = params.hd ? Math.max(0, 26 - totalPages) : 0
    // Pages need to be pair in any case scenario
    if ((totalPages + blankPages) % 2) ++blankPages

    let missingPages = []
    for (let i = 0; i < blankPages; ++i) missingPages.push(<Page key={`missing-${i}`} />)

    return (
      <CSSVariableApplicator data-variables={THEMES[this.state.theme]}>
        {this.renderFlash()}
        <div className={params.hd ? 'hd' : 'preview'}>
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
          {!params.hd && (
            <div>
              <div className="loading-preview" styleName="loading-preview">
                <div />
              </div>
              {!params.full && (
                <div className="limited-preview">
                  <div>
                    {t(MSG.preview_limit)}
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                </div>
              )}
              <div className="order">
                <a href={config.orderLink.replace('{{uuid}}', bpoom.uuid)}>{t(MSG.order)}</a>
              </div>
              <div styleName="rotate-device">
                <RotateDeviceIcon />
                {t(MSG.rotate_device)}
              </div>
              <div className="preview-controls">
                <div>
                  {this.state.audioSupport && (
                    <span>
                      <button className="volume-on svg">
                        <VolumeOnIcon />
                      </button>
                      <button hidden className="volume-off svg">
                        <VolumeOffIcon />
                      </button>
                    </span>
                  )}
                  <button className="first">◂◂</button>
                  <button className="previous">◂</button>
                  <input className="page" type="number" step="1" min="1" />
                  <span className="current" />
                  <span className="total">/ </span>
                  <button className="next">▸</button>
                  <button className="last">▸▸</button>
                  {Fullscreen.support && (
                    <button className="fullscreen svg">
                      <FullscreenIcon />
                    </button>
                  )}
                </div>
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
    { loadBpoom, updateLocale, deleteFlash },
  )(App),
)

function mapStateToProps(state) {
  const {
    app: { bpoom, params },
    flash,
  } = state
  return { bpoom, params, flash }
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
  order: {
    id: 'app.order',
    defaultMessage: `Commander`,
  },
})
