import React, { Component, useEffect, useRef, useState } from 'react'

import useToggle from '../../hooks/toggle'

import { addClass, removeClass } from '../../../lib/css-classes'

import { defineMessages } from 'react-intl'

// i18n
import t from '../../i18n/i18n'

// Lib
import { transformProp } from '../../../lib/css-props'
import Fullscreen from '../../../lib/fullscreen'

// CSS
import styles from './styles.scss'

function getList(items) {
  if (items.length < 2) return items
  let list = items.slice(0)
  list.push(list[0])
  list.unshift(list[list.length - 2])
  return list
}

// TODO: mousemove and mouseup should be done on document
// TODO: e.preventDefault on pointerDown to avoid browser's own drag to take over

const IS_TOUCH = (() =>
  'undefined' !== typeof window &&
  !!('ontouchstart' in window || (window.DocumentTouch && document instanceof window.DocumentTouch)))()

let zoomInfo
let zoomMoveEnabled
let slideInfo
let slideTransitionInfo
let mouseLastPos
let abortTransition
let lastTap

export default ({ items = [], open = true, index: propIndex = 0, loop: propLoop = true, onChangeIndex, onClose }) => {
  const toggle = useToggle(open)
  const [loop, setLoop] = useState(propLoop && items.length > 1)
  const [currentIndex, setCurrentIndex] = useState(propIndex + (loop ? 1 : 0))
  const [zoomMode, setZoomMode] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(Fullscreen.active())

  const wrapperElt = useRef(null)
  const containerElt = useRef(null)

  const list = loop ? getList(items) : items
  let images = []
  let rangeLoad = true

  useEffect(() => {
    setLoop(propLoop && items.length > 1)
  }, [propLoop, items])

  useEffect(() => {
    setCurrentIndex(propIndex + (loop ? 1 : 0))
  }, [propIndex, loop])

  useEffect(() => {
    toggle[open ? 'show' : 'hide']()
  }, [open, toggle])

  useEffect(() => {
    const resetZoom = () => {
      if (zoomMode) zoom(false)
    }
    window.addEventListener('resize', resetZoom)
    return () => window.removeEventListener('resize', resetZoom)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoomMode])

  const calcListIndex = index => {
    if (loop) {
      if (0 === index) return list.length - 2
      if (index === list.length - 1) return 1
    }
    return index
  }

  const listIndex = () => calcListIndex(currentIndex)

  const changeIndex = index => {
    setCurrentIndex(index)
    onChangeIndex(index + (loop ? -1 : 0))
  }

  // const inRange = (index, current, length) => {
  //   if (!rangeLoad) return true
  //   if (loop && (!index || index > length)) return false
  //   if ((current >= index && current - index <= 2) || (loop && length - index + current <= 2)) return true
  //   if ((current <= index && index - current <= 5) || (loop && length - current + index <= 5)) return true
  //   return false
  // }

  const prevNext = dir => {
    let currentImg = images[listIndex()]
    let index = currentIndex + dir
    setZoomMode(false)
    changeIndex(loop ? calcListIndex(index) : Math.min(items.length - 1, Math.max(0, index)))
    afterZoomSetup(currentImg)
  }
  const prev = () => prevNext(-1)
  const next = () => prevNext(1)

  const fullScreen = () => {
    zoom(false)
    setIsFullscreen(!isFullscreen)
    Fullscreen.toggle(containerElt.current)
  }

  const zoom = force => {
    let elt = images[listIndex()]
    let zoomMode = 'boolean' === typeof force ? force : !elt.style[transformProp]
    setZoomMode(zoomMode)
    if (!zoomMode) {
      afterZoomSetup(elt)
    } else {
      beforeZoomSetup(elt)
    }
  }

  const setItemDim = (item, callback) => {
    if (!item.src || item.width >= 0 || item.tries > 2) return callback(item)
    let img = new Image()
    img.onload = () => {
      item.width = img.width
      item.height = img.height
      callback(img)
    }
    img.onerror = () => {
      item.tries = (item.tries || 0) + 1
      setItemDim(item, callback)
    }
    img.src = item.src
  }

  const beforeZoomSetup = (elt, tries) => {
    setItemDim(list[currentIndex] || {}, item => {
      let width = item.width
      let height = item.height
      let clientWidth = containerElt.current.clientWidth
      let clientHeight = containerElt.current.clientHeight
      let posX = width > clientWidth ? Math.floor((width - clientWidth) / 2) : 0
      let posY = height > clientHeight ? Math.floor((height - clientHeight) / 2) : 0
      let scale = Math.max(
        width > clientWidth ? width / clientWidth : 1,
        height > clientHeight ? height / clientHeight : 1,
      )
      zoomInfo = {
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

  const afterZoomSetup = elt => {
    if (!zoomInfo) return
    zoomInfo = null
    zoomMoveEnabled = false
    addClass(elt, styles['zoom-transition'])
    elt.style[transformProp] = ''
    elt.offsetHeight
  }

  const zoomDown = () => {
    zoomMoveEnabled = zoomMode
    mouseLastPos = null
  }

  const zoomMove = e => {
    if (!zoomMoveEnabled) return
    let event = e.touches ? e.touches[0] : e
    let clientX = event.clientX
    let clientY = event.clientY
    if (mouseLastPos) {
      let diffX = mouseLastPos.x - clientX
      let diffY = mouseLastPos.y - clientY
      let newPosX = zoomInfo.posX - diffX
      let newPosY = zoomInfo.posY - diffY
      if (
        (newPosX < -zoomInfo.limitPosX && mouseLastPos.x > clientX) ||
        (newPosX > zoomInfo.limitPosX && mouseLastPos.x < clientX)
      ) {
        newPosX = zoomInfo.posX - Math.round(diffX / 4) //Math.floor(0.75 * diffX)
      }
      if (
        (newPosY < -zoomInfo.limitPosY && mouseLastPos.y > clientY) ||
        (newPosY > zoomInfo.limitPosY && mouseLastPos.y < clientY)
      ) {
        newPosY = zoomInfo.posY - Math.round(diffY / 4) // Math.floor(0.75 * diffY)
      }
      zoomInfo.style[transformProp] = `translate(${newPosX}px, ${newPosY}px) scale(${zoomInfo.scale})`
      zoomInfo.posX = newPosX
      zoomInfo.posY = newPosY
    }
    mouseLastPos = { x: clientX, y: clientY }
  }

  const zoomUp = () => {
    if (!zoomMoveEnabled) return false
    zoomMoveEnabled = false
    let changes = { x: null, y: null }
    if (!zoomInfo) return
    if (zoomInfo.posX < -zoomInfo.limitPosX) {
      changes.x = -zoomInfo.limitPosX
    } else if (zoomInfo.posX > zoomInfo.limitPosX) {
      changes.x = zoomInfo.limitPosX
    }
    if (zoomInfo.posY < -zoomInfo.limitPosY) {
      changes.y = -zoomInfo.limitPosY
    } else if (zoomInfo.posY > zoomInfo.limitPosY) {
      changes.y = zoomInfo.limitPosY
    }
    if (null !== changes.x || null !== changes.y) {
      if (null === changes.x) changes.x = zoomInfo.posX
      if (null === changes.y) changes.y = zoomInfo.posY
      zoomInfo.posX = changes.x
      zoomInfo.posY = changes.y
      addClass(zoomInfo.elt, styles['zoom-transition'])
      zoomInfo.style[transformProp] = `translate(${changes.x}px, ${changes.y}px) scale(${zoomInfo.scale})`
      zoomInfo.elt.offsetHeight
    }
    return true
  }

  const imageClick = () => {
    if (!zoomUp()) next()
  }

  const imageDown = e => {
    if (e.touches.length > 1) return
    zoomDown()

    if (!zoomMode && items.length > 1) {
      abortTransition = true
      let elt = wrapperElt.current
      let posX = -listIndex() * elt.clientWidth
      slideInfo = {
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

  const imageMove = e => {
    if (e.touches && e.touches.length > 1) return
    zoomMoveEnabled ? zoomMove(e) : slide(e)
  }

  const imageUp = () => {
    if (!zoomUp()) {
      // End of slide
      if (!slideInfo) return
      let diff = slideInfo.originalPosX - slideInfo.posX
      if (Math.abs(diff) > 30) {
        addClass(slideInfo.elt, styles['slide-transition'])
        changeIndex(listIndex() + (diff < 0 ? -1 : 1)) // Will re-render and call translateX
      } else if (diff) {
        addClass(slideInfo.elt, styles['slide-transition'])
        slideInfo.style[transformProp] = `translateX(${-currentIndex * 100}%)` // TODO: transform (fallback)
      }
      slideInfo.elt.offsetHeight // Force browser to apply className rules
      slideTransitionInfo = slideInfo
      abortTransition = false
      slideInfo = null
    }
  }

  const slide = e => {
    if (!slideInfo) return
    let clientX = e.touches[0].clientX
    if (mouseLastPos) {
      let diffX = mouseLastPos.x - clientX
      let newPosX = slideInfo.posX - diffX
      if (loop || ((diffX < 0 && currentIndex > 0) || (diffX > 0 && currentIndex < list.length - 1))) {
        slideInfo.style[transformProp] = `translateX(${newPosX}px)`
        slideInfo.posX = newPosX
        // deactivate double tap
        lastTap = null
      }
    }
    mouseLastPos = { x: clientX }
  }

  const handleTouchEnd = () => {
    imageUp()
    if (lastTap && new Date() - lastTap <= 500) {
      // Double tap
      zoom()
      lastTap = null
    } else {
      lastTap = new Date()
    }
  }

  const checkIndex = () => {
    if (abortTransition) return
    if (slideTransitionInfo) {
      // remove transition
      removeClass(slideTransitionInfo.elt, styles['slide-transition'])
      slideTransitionInfo.elt.offsetHeight
    }
    if (!loop) return
    changeIndex(listIndex())
    slideTransitionInfo && slideTransitionInfo.elt.offsetHeight
    slideTransitionInfo = null
  }

  const effectEnd = e => {
    removeClass(e.target, styles['zoom-transition'])
    e.target.offsetHeight
  }

  const setImageElement = (elt, index, src, load) => {
    images[index] = elt
    let item = list[index]

    if (load) {
      setItemDim(item, () => {
        if (elt && elt.firstChild && item.width) {
          let style = elt.firstChild.style
          style.maxWidth = `${item.width}px`
          style.maxHeight = `${item.height}px`
        }
      })
    }
  }

  const close = () => {
    toggle.hide()
    onClose && onClose()
  }

  if (!toggle.visible || !items.length) return ''

  let transform = `translateX(${-currentIndex * 100}%)`
  let currentItem = list[currentIndex]
  let currentURL = encodeURIComponent(window.location.href)
  let media = encodeURIComponent(currentItem.src || '')
  let text = encodeURIComponent(
    currentItem.title ? `${currentItem.title} - ${currentItem.description || ''}` : currentItem.description,
  )

  return (
    <div
      ref={containerElt}
      className={[
        styles.slideshow,
        IS_TOUCH ? styles.touch : '',
        isFullscreen ? styles['fullscreen-mode'] : '',
        zoomMode ? styles['zoom-mode'] : '',
        // shareMenuOpen ? styles['share-menu-open'] : '',
      ].join(' ')}
      // onClick={closeShareMenu}
    >
      <div styleName="nav">
        <div styleName="counter">
          {listIndex() + (loop ? 0 : 1)} / {items.length}
        </div>
        <div styleName="loading" />
        <div styleName="actions">
          {!isFullscreen && <button styleName="zoom" title={t(MSG.zoom)} onClick={() => zoom()} />}
          {Fullscreen.support && <button styleName="fullscreen" title={t(MSG.fullscreen)} onClick={fullScreen} />}
          {/* <button styleName="share" title={t(MSG.share)} onClick={toggleShareMenu} /> */}
          <button styleName="close" title={t(MSG.close)} onClick={close} />
        </div>
      </div>
      {/* {shareMenuOpen && (
          <div styleName="share-menu">
            <a
              onClick={openWindowPopup}
              href={`https://www.facebook.com/sharer/sharer.php?u=${currentURL}`}
              target="_blank"
              styleName="facebook"
            >
              {t(MSG.facebook)}
            </a>
            <a
              onClick={openWindowPopup}
              href={`https://twitter.com/intent/tweet?text=${text}&url=${currentURL}`}
              target="_blank"
              styleName="twitter"
            >
              {t(MSG.twitter)}
            </a>
            <a
              onClick={openWindowPopup}
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
        )} */}
      <div styleName="content">
        <div styleName="wrapper" onTransitionEnd={checkIndex} ref={wrapperElt} style={{ [transformProp]: transform }}>
          {list.map((item, index) => {
            let style = { backgroundImage: `url(${item.src})` }
            return (
              <div
                key={'_' + index}
                ref={elt => setImageElement(elt, index, item.src, true)}
                styleName="slide"
                onTransitionEnd={effectEnd}
              >
                {IS_TOUCH ? (
                  <div
                    styleName="image"
                    onTouchMove={imageMove}
                    onTouchStart={imageDown}
                    onTouchEnd={handleTouchEnd}
                    style={style}
                  />
                ) : (
                  <div
                    styleName="image"
                    onMouseDown={zoomDown}
                    onClick={imageClick}
                    onMouseLeave={zoomUp}
                    onMouseMove={zoomMove}
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
        {loop || currentIndex ? <div styleName="previous" title={t(MSG.previous)} onClick={prev} /> : ''}
        {loop || currentIndex < items.length - 1 ? <div styleName="next" title={t(MSG.next)} onClick={next} /> : ''}
      </div>
    </div>
  )
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
  // share: {
  //   id: 'slideshow.share',
  //   defaultMessage: 'Partager',
  // },
  // facebook: {
  //   id: 'slideshow.share.facebook',
  //   defaultMessage: 'Partager sur Facebook',
  // },
  // twitter: {
  //   id: 'slideshow.share.twitter',
  //   defaultMessage: 'Tweeter',
  // },
  // pinterest: {
  //   id: 'slideshow.share.pinterest',
  //   defaultMessage: 'Pin it',
  // },
  // download: {
  //   id: 'slideshow.share.download',
  //   defaultMessage: 'Télécharger l’image',
  // },
})
