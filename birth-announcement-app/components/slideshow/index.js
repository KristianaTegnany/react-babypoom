import React, { Component, useEffect, useRef, useState } from 'react'

import useToggle from '../../hooks/toggle'

import { addClass as addGlobalClass, removeClass as removeGlobalClass } from '../../../lib/css-classes'
import { eventDelegation } from '../../../lib/html-element'

import { defineMessages } from 'react-intl'

// i18n
import t from '../../i18n/i18n'

// Lib
import { transformProp } from '../../../lib/css-props'
import Fullscreen from '../../../lib/fullscreen'

// CSS
import styles from './styles.scss'

const IS_TOUCH = (() =>
  'undefined' !== typeof window &&
  !!('ontouchstart' in window || (window.DocumentTouch && document instanceof window.DocumentTouch)))()

const addClass = (elt, className) => addGlobalClass(elt, styles[className])
const removeClass = (elt, className) => removeGlobalClass(elt, styles[className])

let loop
let container
let currentIndex
let currentItems
let totalItems
let getImageSize
let zoomMode
let zoomInfo
let zoomMoveEnabled
let mouseLastPos
let slideInfo
let slideTransitionInfo
let abortTransition
let lastTap

function calcIndex(add) {
  return loop ? (currentIndex + add + totalItems) % totalItems : currentIndex + add
}

function updateSlides() {
  if (!container) return
  let images = container.querySelectorAll('.' + styles['image'])
  let titles = container.querySelectorAll('.' + styles['title'])
  let descriptions = container.querySelectorAll('.' + styles['description'])
  container.querySelector('.' + styles['counter']).innerHTML = `${currentIndex + 1} / ${totalItems}`
  ;[currentItems[currentIndex] || {}, currentItems[calcIndex(1)] || {}, currentItems[calcIndex(-1)] || {}].forEach(
    (item, index) => {
      index = (index + 1) % 3
      images[index].style.backgroundImage = item.src ? `url(${item.src})` : ''
      titles[index].innerHTML = item.title || ''
      descriptions[index].innerHTML = item.description || ''
    },
  )
  if (!loop) {
    ;(currentIndex === 0 ? addClass : removeClass)(container, 'first')
    ;(currentIndex === totalItems - 1 ? addClass : removeClass)(container, 'last')
  }
}

function cleanSlides() {
  if (!container) return
  container.querySelector('.' + styles['counter']).innerHTML = ''
  let images = container.querySelectorAll('.' + styles['image'])
  let titles = container.querySelectorAll('.' + styles['title'])
  let descriptions = container.querySelectorAll('.' + styles['description'])
  ;[0, 1, 2].forEach(index => {
    images[index].style.backgroundImage = ''
    titles[index].innerHTML = ''
    descriptions[index].innerHTML = ''
  })
  zoom(false)
}

function prevNext(add) {
  let newIndex = calcIndex(add)
  if (newIndex < 0 || newIndex >= totalItems) return
  currentIndex = newIndex
  updateSlides()
}

function prev() {
  prevNext(-1)
}
function next() {
  prevNext(1)
}

function fullScreen() {
  zoom(false)
  ;(Fullscreen.active() ? removeClass : addClass)(container, 'fullscreen-mode')
  Fullscreen.toggle(container)
}

function zoom(force) {
  if (zoomMode === force) return
  let elt = container.querySelectorAll('.' + styles['slide'])[1]
  zoomMode = 'boolean' === typeof force ? force : !elt.style[transformProp]
  ;(zoomMode ? addClass : removeClass)(container, 'zoom-mode')
  ;(zoomMode ? beforeZoomSetup : afterZoomSetup)(elt)
}

function defaultGetImageSize(item, callback) {
  let img = new Image()
  img.onload = () => {
    callback(img)
  }
  img.onerror = () => {
    item.tries = (item.tries || 0) + 1
    getImageSize(item, callback)
  }
  img.src = item.src
}

function setItemDim(item, callback) {
  if (!item.src || item.width >= 0 || item.tries > 1) return callback(item)
  getImageSize(item, size => {
    item.width = size.width
    item.height = size.height
    callback(item)
  })
}

function beforeZoomSetup(elt) {
  setItemDim(currentItems[currentIndex] || {}, ({ width, height }) => {
    let clientWidth = container.clientWidth
    let clientHeight = container.clientHeight
    let scale = Math.max(
      width > clientWidth ? width / clientWidth : 1,
      height > clientHeight ? height / clientHeight : 1,
    )
    addClass(elt, 'zoom-transition')
    elt.style[transformProp] = `scale(${scale})`
    elt.offsetHeight
    zoomInfo = {
      elt,
      style: elt.style,
      limitPosX: width > clientWidth ? Math.floor((width - clientWidth) / 2) : 0,
      limitPosY: height > clientHeight ? Math.floor((height - clientHeight) / 2) : 0,
      posX: 0,
      posY: 0,
      scale,
    }
  })
}

function afterZoomSetup(elt) {
  if (!zoomInfo) return
  zoomInfo = null
  zoomMoveEnabled = false
  addClass(elt, 'zoom-transition')
  elt.style[transformProp] = ''
  elt.offsetHeight
}

function zoomDown() {
  zoomMoveEnabled = zoomMode
  mouseLastPos = null
}

function zoomMove(e) {
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
      newPosX = zoomInfo.posX - Math.round(diffX / 3) //Math.floor(0.75 * diffX)
      if (!zoomInfo.limitPosX) newPosX = Math.min(40, Math.max(-40, newPosX))
    }
    if (
      (newPosY < -zoomInfo.limitPosY && mouseLastPos.y > clientY) ||
      (newPosY > zoomInfo.limitPosY && mouseLastPos.y < clientY)
    ) {
      newPosY = zoomInfo.posY - Math.round(diffY / 3) // Math.floor(0.75 * diffY)
      if (!zoomInfo.limitPosY) newPosY = Math.min(40, Math.max(-40, newPosY))
    }
    zoomInfo.style[transformProp] = `translate(${newPosX}px, ${newPosY}px) scale(${zoomInfo.scale})`
    zoomInfo.posX = newPosX
    zoomInfo.posY = newPosY
  }
  mouseLastPos = { x: clientX, y: clientY }
}

function zoomUp() {
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
    addClass(zoomInfo.elt, 'zoom-transition')
    zoomInfo.style[transformProp] = `translate(${changes.x}px, ${changes.y}px) scale(${zoomInfo.scale})`
    zoomInfo.elt.offsetHeight
  }
  return true
}

function imageClick() {
  if (!zoomUp()) next()
}

function effectEnd(e) {
  removeClass(e.target, 'zoom-transition')
  e.target.offsetHeight
}

function imageDown(e) {
  if (e.touches.length > 1) return
  zoomDown()

  if (!zoomMode && totalItems > 1) {
    abortTransition = true
    let elt = container.querySelector('.' + styles['slides'])
    let posX = -elt.clientWidth
    slideInfo = {
      elt,
      style: elt.style,
      originalPosX: posX,
      posX: posX,
    }
    // remove transition
    removeClass(elt, 'slide-transition')
    elt.offsetHeight
  }
}

function imageMove(e) {
  if (e.touches && e.touches.length > 1) return
  zoomMoveEnabled ? zoomMove(e) : slide(e)
}

function imageUp() {
  if (!zoomUp()) {
    // End of slide
    if (!slideInfo) return
    let diff = slideInfo.originalPosX - slideInfo.posX
    if (Math.abs(diff) > 30) {
      addClass(slideInfo.elt, 'slide-transition')
      currentIndex = calcIndex(diff < 0 ? -1 : 1)
      slideInfo.style[transformProp] = `translateX(${(diff < 0 ? 0 : -2) * 100}%)`
    } else if (diff) {
      addClass(slideInfo.elt, 'slide-transition')
      slideInfo.style[transformProp] = ''
    }
    slideInfo.elt.offsetHeight // Force browser to apply className rules
    slideTransitionInfo = slideInfo
    abortTransition = false
    slideInfo = null
  }
}

function slide(e) {
  if (!slideInfo) return
  let clientX = e.touches[0].clientX
  if (mouseLastPos) {
    let diffX = mouseLastPos.x - clientX
    let newPosX = slideInfo.posX - diffX
    if (loop || ((diffX < 0 && currentIndex > 0) || (diffX > 0 && currentIndex < totalItems - 1))) {
      slideInfo.style[transformProp] = `translateX(${newPosX}px)`
      slideInfo.posX = newPosX
      // deactivate double tap
      lastTap = null
    }
  }
  mouseLastPos = { x: clientX }
}

function handleTouchEnd() {
  imageUp()
  if (lastTap && new Date() - lastTap <= 500) {
    // Double tap
    zoom()
    lastTap = null
  } else {
    lastTap = new Date()
  }
}

function checkIndex() {
  if (abortTransition) return
  if (slideTransitionInfo) {
    let slides = container.querySelectorAll('.' + styles['slide'])
    // remove transition
    removeClass(slideTransitionInfo.elt, 'slide-transition')
    slideTransitionInfo.style[transformProp] = ''
    // slideTransitionInfo.elt.offsetHeight
    let diff = slideTransitionInfo.originalPosX - slideTransitionInfo.posX
    if (diff < 0) {
      slideTransitionInfo.elt.insertBefore(slides[2], slides[0])
    } else {
      slideTransitionInfo.elt.appendChild(slides[0])
    }
    updateSlides()
  }
  slideTransitionInfo = null
}

const preventDefault = event => {
  let e = event.touches[0]
  if (
    document.elementFromPoint
      ? document.elementFromPoint(e.clientX, e.clientY).closest('.' + styles['slideshow'])
      : e.clientY > 170
  )
    event.preventDefault()
}

export default function({
  items = [],
  open = true,
  index: propIndex,
  loop: propLoop = true,
  onChangeIndex,
  onClose,
  getImageSize: getImageSizeFunc,
  loop: loopProp,
}) {
  const toggle = useToggle(open)
  const containerElt = useRef(null)
  currentIndex = propIndex
  currentItems = items
  totalItems = items.length
  zoomMode = false
  loop = loopProp
  getImageSize = getImageSizeFunc || defaultGetImageSize

  useEffect(() => {
    let resize = () => zoom(false)
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  useEffect(() => {
    if ((container = containerElt.current) && IS_TOUCH) {
      addClass(container, 'touch')
    }
  }, [containerElt])

  useEffect(() => {
    let root = document.getElementById('root')
    if (open) {
      updateSlides()
      root.addEventListener('touchmove', preventDefault, { passive: false })
    } else {
      cleanSlides()
      root.removeEventListener('touchmove', preventDefault)
    }
  }, [items, propIndex, open])

  return (
    <div styleName="slideshow" style={{ display: open ? '' : 'none' }} ref={containerElt}>
      <div styleName="nav">
        <div styleName="counter" />
        <div styleName="loading" />
        <div styleName="actions">
          <button styleName="zoom" title={t(MSG.zoom)} onClick={() => zoom()} />
          {Fullscreen.support && <button styleName="fullscreen" title={t(MSG.fullscreen)} onClick={fullScreen} />}
          <button styleName="close" title={t(MSG.close)} onClick={() => (toggle.hide(), onClose && onClose())} />
        </div>
      </div>
      <div styleName="content">
        <div styleName="slides" onTransitionEnd={checkIndex}>
          {[0, 1, 2].map(index => (
            <div key={index} styleName="slide" onTransitionEnd={effectEnd}>
              {IS_TOUCH ? (
                <div styleName="image" onTouchMove={imageMove} onTouchStart={imageDown} onTouchEnd={handleTouchEnd} />
              ) : (
                <div
                  styleName="image"
                  onMouseDown={zoomDown}
                  onClick={imageClick}
                  onMouseLeave={zoomUp}
                  onMouseMove={zoomMove}
                />
              )}
              <div styleName="caption">
                <div styleName="title" />
                <div styleName="description" />
              </div>
            </div>
          ))}
        </div>
        <div styleName="previous" title={t(MSG.previous)} onClick={prev} />
        <div styleName="next" title={t(MSG.next)} onClick={next} />
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
