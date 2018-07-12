import React, { Component } from 'react'

import { addClass, removeClass } from '../../../lib/css-classes'

import { defineMessages } from 'react-intl'

// i18n
import t from '../../i18n/i18n'

// Lib
import { transformProp } from '../../../lib/css-props'

// CSS
import styles from './styles.scss'

let REQUEST_FULLSCREEN_PREFIXES = ['request', 'webkitRequest', 'mozRequest', 'msRequest']
let EXIT_FULLSCREEN_PREFIXES = ['exit', 'webkitExit', 'mozCancel', 'msExit']

function getList(items) {
  if (items.length < 2) return items
  let list = items.slice(0)
  list.push(list[0])
  list.unshift(list[list.length - 2])
  return list
}

export default class extends Component {
  static isTouch = (() => {
    return (
      'undefined' !== typeof window &&
      !!('ontouchstart' in window || (window.DocumentTouch && document instanceof window.DocumentTouch))
    )
  })()
  static fullScreenSupport = (() => {
    return (
      'undefined' !== typeof document &&
      !!EXIT_FULLSCREEN_PREFIXES.find(p => document[`${p}FullScreen`] || document[`${p}Fullscreen`])
    )
  })()

  static defaultProps = {
    items: [],
    index: 0,
    open: true,
    loop: true,
    onClose: () => {},
  }

  constructor(props) {
    super(props)

    this.reinitZoom = ::this._reinitZoom
    this.images = []
    let loop = props.items.length > 1 && props.loop
    this.state = {
      listKey: 0,
      items: props.items,
      list: loop ? getList(props.items) : props.items,
      loop: loop,
      open: props.open,
      index: props.index + (loop ? 1 : 0),
      zoomMode: false,
      fullScreenMode: this.isFullScreen,
      shareMenuOpen: false,
      rangeLoad: true,
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let list = prevState.list
    let listKey = prevState.listKey
    let loop = nextProps.items.length > 1 && nextProps.loop
    let index = nextProps.index + (loop ? 1 : 0)
    let zoomMode = prevState.zoomMode
    let shareMenuOpen = prevState.shareMenuOpen

    if (prevState.items !== nextProps.items) {
      list = loop ? getList(nextProps.items) : nextProps.items
      zoomMode = false
      shareMenuOpen = false
      ++listKey
    }
    return { list, index, listKey, loop, zoomMode, shareMenuOpen, open: nextProps.open, items: nextProps.items }
  }

  get listIndex() {
    return this.calcListIndex(this.state.index)
  }

  get isFullScreen() {
    return document.fullscreen || document.webkitIsFullScreen || (this.state && this.state.fullScreenMode)
  }

  componentDidMount() {
    window.addEventListener('resize', this.reinitZoom)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.reinitZoom)
  }

  calcListIndex(index) {
    if (this.state.loop) {
      if (0 === index) return this.state.list.length - 2
      if (index === this.state.list.length - 1) return 1
    }
    return index
  }

  changeIndex(index) {
    this.setState({ index })
    this.props.onChangeIndex(index + (this.state.loop ? -1 : 0))
  }

  prevNext(dir) {
    let currentImg = this.images[this.listIndex]
    let index = this.state.index + dir
    index = this.state.loop ? this.calcListIndex(index) : Math.min(this.state.items.length - 1, Math.max(0, index))
    this.setState({ zoomMode: false })
    this.changeIndex(index)
    this.afterZoomSetup(currentImg)
  }

  fullScreen() {
    let elt = this.isFullScreen ? document : this.containerElt
    if (!elt) return
    let prefix = (this.isFullScreen ? EXIT_FULLSCREEN_PREFIXES : REQUEST_FULLSCREEN_PREFIXES).find(
      p => elt[`${p}FullScreen`] || elt[`${p}Fullscreen`]
    )
    if (prefix) {
      this.setState({ fullScreenMode: !this.isFullScreen })
      elt[prefix + (elt[`${prefix}FullScreen`] ? 'FullScreen' : 'Fullscreen')]()
    }
  }

  _reinitZoom() {
    if (this.state.zoomMode) {
      this.zoom(false)
    }
  }

  zoom(force) {
    let elt = this.images[this.listIndex]
    let zoomMode = 'boolean' === typeof force ? force : !elt.style[transformProp]
    this.setState({ zoomMode })
    if (!zoomMode) {
      this.afterZoomSetup(elt)
    } else {
      this.beforeZoomSetup(elt)
    }
  }

  beforeZoomSetup(elt, tries) {
    this.setItemDim(this.state.list[this.state.index] || {}, item => {
      let width = item.width
      let height = item.height
      let clientWidth = this.containerElt.clientWidth
      let clientHeight = this.containerElt.clientHeight

      let posX = width > clientWidth ? Math.floor((width - clientWidth) / 2) : 0
      let posY = height > clientHeight ? Math.floor((height - clientHeight) / 2) : 0
      let scale = Math.max(
        width > clientWidth ? width / clientWidth : 1,
        height > clientHeight ? height / clientHeight : 1
      )
      this.zoomInfo = {
        elt,
        style: elt.style,
        limitPosX: posX,
        limitPosY: posY,
        posX: 0,
        posY: 0,
        scale,
      }
      addClass(elt, styles['zoom-transition'])
      elt.style[transformProp] = `scale(${scale})`
      elt.offsetHeight
    })
  }

  afterZoomSetup(elt) {
    if (!this.zoomInfo) return
    this.zoomInfo = null
    this.zoomMoveEnabled = false
    addClass(elt, styles['zoom-transition'])
    elt.style[transformProp] = ''
    elt.offsetHeight
  }

  zoomDown() {
    this.zoomMoveEnabled = this.state.zoomMode
    this.mouseLastPos = null
  }

  imageDown(e) {
    if (e.touches.length > 1) return
    this.zoomDown()

    if (!this.state.zoomMode && this.state.items.length > 1) {
      this.abortTransition = true
      let elt = this.wrapperElt
      let posX = -this.listIndex * elt.clientWidth
      this.slideInfo = {
        elt,
        style: elt.style,
        originalPosX: posX,
        posX: posX,
      }

      // remove transition
      removeClass(elt, styles['slide-transition'])
      elt.offsetHeight
    }
  }

  zoomUp() {
    if (!this.zoomMoveEnabled) return false
    this.zoomMoveEnabled = false
    let changes = { x: null, y: null }
    let info = this.zoomInfo
    if (!info) return
    if (info.posX < -info.limitPosX) {
      changes.x = -info.limitPosX
    } else if (info.posX > info.limitPosX) {
      changes.x = info.limitPosX
    }
    if (info.posY < -info.limitPosY) {
      changes.y = -info.limitPosY
    } else if (info.posY > info.limitPosY) {
      changes.y = info.limitPosY
    }
    if (null !== changes.x || null !== changes.y) {
      if (null === changes.x) changes.x = info.posX
      if (null === changes.y) changes.y = info.posY
      info.posX = changes.x
      info.posY = changes.y

      addClass(info.elt, styles['zoom-transition'])
      info.style[transformProp] = `translate(${changes.x}px, ${changes.y}px) scale(${info.scale})`
      info.elt.offsetHeight
    }
    return true
  }

  effectEnd(e) {
    removeClass(e.target, styles['zoom-transition'])
    e.target.offsetHeight
  }

  imageUp() {
    if (!this.zoomUp()) {
      // End of slide
      if (!this.slideInfo) return
      let info = this.slideInfo
      let diff = info.originalPosX - info.posX
      if (Math.abs(diff) > 30) {
        addClass(info.elt, styles['slide-transition'])
        this.changeIndex(this.listIndex + (diff < 0 ? -1 : 1)) // Will re-render and call translateX
      } else if (diff) {
        addClass(info.elt, styles['slide-transition'])
        info.style[transformProp] = `translateX(${-this.state.index * 100}%)` // TODO: transform (fallback)
      }
      info.elt.offsetHeight // Force browser to apply className rules

      this.slideTransitionInfo = this.slideInfo
      this.abortTransition = false
      this.slideInfo = null
    }
  }

  checkIndex() {
    if (this.abortTransition) return
    let info = this.slideTransitionInfo
    if (info) {
      // remove transition
      removeClass(info.elt, styles['slide-transition'])
      info.elt.offsetHeight
    }
    if (!this.state.loop) return
    this.changeIndex(this.listIndex)
    info && info.elt.offsetHeight
    this.slideTransitionInfo = null
  }

  imageMove(e) {
    if (e.touches && e.touches.length > 1) return
    this.zoomMoveEnabled ? this.zoomMove(e) : this.slide(e)
  }

  slide(e) {
    if (!this.slideInfo) return
    let clientX = e.touches[0].clientX
    let lastPos = this.mouseLastPos
    if (lastPos) {
      let diffX = lastPos.x - clientX
      let info = this.slideInfo
      let newPosX = info.posX - diffX
      if (
        this.state.loop ||
        ((diffX < 0 && this.state.index > 0) || (diffX > 0 && this.state.index < this.state.list.length - 1))
      ) {
        info.style[transformProp] = `translateX(${newPosX}px)`
        info.posX = newPosX
        // deactivate double tap
        this.lastTap = null
      }
    }
    this.mouseLastPos = { x: clientX }
  }

  zoomMove(e) {
    if (!this.zoomMoveEnabled) return
    let event = e.touches ? e.touches[0] : e
    let clientX = event.clientX
    let clientY = event.clientY
    let lastPos = this.mouseLastPos
    if (lastPos) {
      let info = this.zoomInfo
      let diffX = lastPos.x - clientX
      let diffY = lastPos.y - clientY
      let newPosX = info.posX - diffX
      let newPosY = info.posY - diffY
      if ((newPosX < -info.limitPosX && lastPos.x > clientX) || (newPosX > info.limitPosX && lastPos.x < clientX)) {
        newPosX = info.posX - Math.round(diffX / 4) //Math.floor(0.75 * diffX)
      }
      if ((newPosY < -info.limitPosY && lastPos.y > clientY) || (newPosY > info.limitPosY && lastPos.y < clientY)) {
        newPosY = info.posY - Math.round(diffY / 4) // Math.floor(0.75 * diffY)
      }
      info.style[transformProp] = `translate(${newPosX}px, ${newPosY}px) scale(${info.scale})`
      info.posX = newPosX
      info.posY = newPosY
    }
    this.mouseLastPos = { x: clientX, y: clientY }
  }

  handleTouchEnd() {
    this.imageUp()
    if (this.lastTap && new Date() - this.lastTap <= 500) {
      // Double tap
      this.zoom()
      this.lastTap = null
    } else {
      this.lastTap = new Date()
    }
  }

  setItemDim(item, callback) {
    if (!item.src || item.width >= 0 || item.tries > 2) return callback(item)
    let img = new Image()
    img.onload = () => {
      item.width = img.width
      item.height = img.height
      callback(img)
    }
    img.onerror = () => {
      item.tries = (item.tries || 0) + 1
      this.setItemDim(item, callback)
    }
    img.src = item.src
  }

  setImageElement(elt, index, src, load) {
    this.images[index] = elt
    let item = this.state.list[index]

    if (load) {
      this.setItemDim(item, () => {
        if (elt && elt.firstChild && item.width) {
          let style = elt.firstChild.style
          style.maxWidth = `${item.width}px`
          style.maxHeight = `${item.height}px`
        }
      })
    }
  }

  close() {
    this.setState({ open: false })
    this.props.onClose()
  }

  closeShareMenu(e) {
    if (this.state.shareMenuOpen) {
      this.toggleShareMenu()
    }
  }

  toggleShareMenu() {
    this.setState({ shareMenuOpen: !this.state.shareMenuOpen })
  }

  openWindowPopup(e) {
    if (this.constructor.isTouch) return true
    e.preventDefault()
    let dim = window.screen ? Math.round(screen.width / 2 - 275) : 100
    window.open(
      e.currentTarget.getAttribute('href'),
      t(MSG.share),
      `scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=550,height=420,top=100,left=${dim}`
    )
  }

  inRange(index, current, length) {
    if (!this.state.rangeLoad) return true
    if (this.state.loop && (!index || index > length)) return false
    if ((current >= index && current - index <= 2) || (this.state.loop && length - index + current <= 2)) {
      return true
    }
    if ((current <= index && index - current <= 5) || (this.state.loop && length - current + index <= 5)) {
      return true
    }
    return false
  }

  render() {
    let state = this.state
    if (!state.open || !state.items.length) return ''

    let props = this.props
    let transform = `translateX(${-state.index * 100}%)`
    let currentItem = state.list[state.index]
    let currentURL = encodeURIComponent(window.location.href)
    let media = encodeURIComponent(currentItem.src || '')
    let text = encodeURIComponent(
      currentItem.title ? `${currentItem.title} - ${currentItem.description || ''}` : currentItem.description
    )

    return (
      <div
        ref={elt => (this.containerElt = elt)}
        className={[
          styles.slideshow,
          this.constructor.isTouch ? styles.touch : '',
          state.fullScreenMode ? styles['fullscreen-mode'] : '',
          state.zoomMode ? styles['zoom-mode'] : '',
          state.shareMenuOpen ? styles['share-menu-open'] : '',
        ].join(' ')}
        onClick={::this.closeShareMenu}
      >
        <div styleName="nav" ref={elt => (this.navElt = elt)}>
          <div styleName="counter">
            {this.listIndex + (state.loop ? 0 : 1)} / {state.items.length}
          </div>
          <div styleName="loading" />
          <div styleName="actions">
            {!state.fullScreenMode && <button styleName="zoom" title={t(MSG.zoom)} onClick={::this.zoom} />}
            {this.constructor.fullScreenSupport && (
              <button styleName="fullscreen" title={t(MSG.fullscreen)} onClick={::this.fullScreen} />
            )}
            <button styleName="share" title={t(MSG.share)} onClick={::this.toggleShareMenu} />
            <button styleName="close" title={t(MSG.close)} onClick={::this.close} />
          </div>
        </div>
        {state.shareMenuOpen && (
          <div styleName="share-menu">
            <a
              onClick={::this.openWindowPopup}
              href={`https://www.facebook.com/sharer/sharer.php?u=${currentURL}`}
              target="_blank"
              styleName="facebook"
            >
              {t(MSG.facebook)}
            </a>
            <a
              onClick={::this.openWindowPopup}
              href={`https://twitter.com/intent/tweet?text=${text}&url=${currentURL}`}
              target="_blank"
              styleName="twitter"
            >
              {t(MSG.twitter)}
            </a>
            <a
              onClick={::this.openWindowPopup}
              href={`http://www.pinterest.com/pin/create/button/?url=${currentURL}&media=${media}&description=${text}`}
              target="_blank"
              styleName="pinterest"
            >
              {t(MSG.pinterest)}
            </a>
            {currentItem.src && (
              <a href={currentItem.src} target="_blank" styleName="download" download>
                {t(MSG.download)}
              </a>
            )}
          </div>
        )}
        <div styleName="content">
          <div
            styleName="wrapper"
            onTransitionEnd={::this.checkIndex}
            ref={elt => (this.wrapperElt = elt)}
            style={{ [transformProp]: transform }}
          >
            {state.list.map((item, index) => {
              let load = this.inRange(index, this.listIndex, state.items.length)
              let style = load ? { backgroundImage: `url(${item.src})` } : {}
              return (
                <div
                  data-key={state.listKey + '_' + index}
                  key={state.listKey + '_' + index}
                  ref={elt => this.setImageElement(elt, index, item.src, load)}
                  styleName="slide"
                  onTransitionEnd={::this.effectEnd}
                >
                  {this.constructor.isTouch ? (
                    <div
                      styleName="image"
                      onTouchMove={::this.imageMove}
                      onTouchStart={::this.imageDown}
                      onTouchEnd={::this.handleTouchEnd}
                      style={style}
                    />
                  ) : (
                    <div
                      styleName="image"
                      onMouseDown={::this.zoomDown}
                      onClick={() => !this.zoomUp() && this.prevNext(1)}
                      onMouseLeave={::this.zoomUp}
                      onMouseMove={::this.zoomMove}
                      style={style}
                    />
                  )}
                  <div styleName="caption">
                    {item.title && <div styleName="title">{item.title}</div>}
                    {item.description && <div styleName="description">{item.description}</div>}
                  </div>
                </div>
              )
            })}
          </div>

          {state.loop || state.index ? (
            <div styleName="previous" title={t(MSG.previous)} onClick={() => this.prevNext(-1)} />
          ) : (
            ''
          )}
          {state.loop || state.index < state.items.length - 1 ? (
            <div styleName="next" title={t(MSG.next)} onClick={() => this.prevNext(1)} />
          ) : (
            ''
          )}
        </div>
      </div>
    )
  }
}

const MSG = defineMessages({
  zoom: {
    id: 'slideshow.zoom',
    defaultMessage: 'Zoom -/+',
  },
  fullscreen: {
    id: 'slideshow.fullscreen',
    defaultMessage: 'Plein écran',
  },
  share: {
    id: 'slideshow.share',
    defaultMessage: 'Partager',
  },
  close: {
    id: 'slideshow.close',
    defaultMessage: 'Fermer',
  },
  previous: {
    id: 'slideshow.previous',
    defaultMessage: 'Précédent',
  },
  next: {
    id: 'slideshow.next',
    defaultMessage: 'Suivant',
  },
  facebook: {
    id: 'slideshow.share.facebook',
    defaultMessage: 'Partager sur Facebook',
  },
  twitter: {
    id: 'slideshow.share.twitter',
    defaultMessage: 'Tweeter',
  },
  pinterest: {
    id: 'slideshow.share.pinterest',
    defaultMessage: 'Pin it',
  },
  download: {
    id: 'slideshow.share.download',
    defaultMessage: 'Télécharger l’image',
  },
})
