let vendorProp = (() => {
  let cache = {}
  let PREFIXES = ['', 'Webkit', 'Moz', 'O', 'ms', 'Khtml']
  let capitalize = s => `${s.charAt(0).toUpperCase()}${s.slice(1)}`
  let vendor = (p, ref) => {
    let props = PREFIXES.map(pre => (pre ? `${ref ? pre.toLowerCase() : pre}${capitalize(p)}` : p))
    let obj = ref || document.body.style
    let prop = props.find(p => null != obj[p])
    return ref ? ref[prop] : prop
  }
  return (prop, ref) => cache[prop] || (cache[prop] = vendor(prop, ref))
})()

let IS_TOUCH = 'undefined' !== typeof window && 'ontouchstart' in window

let HAS_3D = null

// Webkit 534.3 on Android wrongly repaints elements that use overflow:hidden + rotation
let HAS_ROT = (() => {
  let parts = 'undefined' !== typeof navigator && /AppleWebkit\/([0-9\.]+)/i.exec(navigator.userAgent)
  return parts ? parseFloat(parts[1]) > 534.3 : true
})()

let PAGES_IN_DOM = 6

let requestAnim =
  vendorProp('requestAnimationFrame', 'undefined' !== typeof window ? window : {}) || (cb => setTimeout(cb, 1000 / 60))

let CEvent = (() => {
  if ('undefined' === typeof window) return
  if ('function' === typeof window.CustomEvent) return window.CustomEvent
  function CustomEvent(event, params) {
    let evt = document.createEvent('CustomEvent')
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail)
    return evt
  }
  CustomEvent.prototype = window.Event.prototype
  return CustomEvent
})()

function EventManager(elt) {
  let events = {}
  return {
    on: function(eventName, func) {
      ;(events[eventName] = events[eventName] || []).push(func)
      elt.addEventListener(eventName, func)
    },
    off: function(eventName, func) {
      if (null == eventName) {
        Object.keys(events).forEach(eventName => this.off(eventName))
      } else if (null == func) {
        events[eventName].forEach(func => this.off(eventName, func))
      } else {
        elt.removeEventListener(eventName, func)
        let list = events[eventName] || []
        for (let i = list.length; i >= 0; --i) if (func === list[i]) list.splice(i, 1)
      }
    },
  }
}

let turnError = (() => {
  function TurnJsError(message) {
    this.name = 'TurnJsError'
    this.message = message
  }
  TurnJsError.prototype = new Error()
  TurnJsError.prototype.constructor = TurnJsError
  return message => new TurnJsError(message)
})()

function bezier(p1, p2, p3, p4, t) {
  let a = 1 - t
  let b = a * a * a
  let c = t * t * t
  let d = 3 * t * a * a
  let e = 3 * t * t * a
  return {
    x: Math.round(b * p1.x + d * p2.x + e * p3.x + c * p4.x),
    y: Math.round(b * p1.y + d * p2.y + e * p3.y + c * p4.y),
  }
}

function rad(degrees) {
  return (degrees / 180) * Math.PI
}

function deg(radians) {
  return (radians / Math.PI) * 180
}

function translate(x, y, use3d) {
  return HAS_3D && use3d ? ` translate3d(${x}px,${y}px,0) ` : ` translate(${x}px,${y}px) `
}

function rotate(deg) {
  return ` rotate(${deg}deg) `
}

function trigger(eventName, elt, detail) {
  return elt.dispatchEvent(new CEvent(eventName, { bubbles: true, cancelable: true, detail: detail }))
}

function createElement(tagName, className, styles, extraStyles) {
  let elt = document.createElement(tagName)
  elt.className = className || ''
  css(elt.style, Object.assign(styles || {}, extraStyles || {}))
  return elt
}

function prepend(node, element) {
  return node.firstChild ? node.insertBefore(element, node.firstChild) : node.appendChild(element)
}

function removeElement(elt) {
  elt && elt.parentNode && elt.parentNode.removeChild(elt)
}

function offset(elt) {
  let rect = elt.getBoundingClientRect()
  return {
    top: rect.top + document.body.scrollTop,
    left: rect.left + document.body.scrollLeft,
  }
}

function visible(elt) {
  return !!(elt.offsetWidth || elt.offsetHeight || elt.getClientRects().length)
}

function findPos(obj, disp) {
  let top = 0
  let left = 0
  do {
    left += obj.offsetLeft
    top += obj.offsetTop
  } while ((obj = obj.offsetParent))
  return { top: top, left: left }
}

function css(style, props) {
  Object.keys(props).forEach(prop => {
    style[prop] = props[prop]
  })
}

function divAtt(top, left, zIndex, overf) {
  return {
    position: 'absolute',
    top: top,
    left: left,
    overflow: overf || 'hidden',
    zIndex: zIndex || 'auto',
  }
}

function gradient(obj, p0, p1, colors) {
  let cs = getComputedStyle(obj)
  let width = parseFloat(cs.width)
  let height = parseFloat(cs.height)

  p0 = { x: (p0.x / 100) * width, y: (p0.y / 100) * height }
  p1 = { x: (p1.x / 100) * width, y: (p1.y / 100) * height }

  let dx = p1.x - p0.x
  let dy = p1.y - p0.y
  let angle = Math.atan2(dy, dx)
  let angle2 = angle - Math.PI / 2
  let diagonal = Math.abs(width * Math.sin(angle2)) + Math.abs(height * Math.cos(angle2))
  let gradientDiagonal = Math.sqrt(dy * dy + dx * dx)
  let corner = { x: p1.x < p0.x ? width : 0, y: p1.y < p0.y ? height : 0 }
  let slope = Math.tan(angle)
  let inverse = -1 / slope
  let x = (inverse * corner.x - corner.y - slope * p0.x + p0.y) / (inverse - slope)
  let c = { x: x, y: inverse * x - inverse * corner.x + corner.y }
  let segA = Math.sqrt(Math.pow(c.x - p0.x, 2) + Math.pow(c.y - p0.y, 2))
  let cols = colors.map(c => ` ${c[1]} ${((segA + gradientDiagonal * c[0]) * 100) / diagonal}%`).join(',')

  obj.style.backgroundImage = `linear-gradient(${90 - deg(-angle)}deg,${cols})`
}

let flipOptions = {
  cornerSize: 100, // Size of the active zone of each corner
}

let corners = {
  backward: ['bl', 'tl'],
  forward: ['br', 'tr'],
  all: ['tl', 'bl', 'tr', 'br', 'l', 'r'],
}

export default function Turn(turnElt, opts) {
  HAS_3D =
    HAS_3D ||
    (el => {
      document.body.appendChild(el)
      let transform = vendorProp('transform')
      el.style[transform] = 'translate3d(1px,1px,1px)'
      let _3d = getComputedStyle(el)[transform]
      document.body.removeChild(el)
      return _3d && 'none' !== _3d
    })(document.createElement('p'))

  let style = turnElt.style
  let classManager = turnElt.classList
  let cs = getComputedStyle(turnElt)
  let ch = [].slice.call(turnElt.children)

  opts = Object.assign(
    {
      width: parseFloat(cs.width),
      height: parseFloat(cs.height),
      direction: turnElt.getAttribute('data-dir') || turnElt.getAttribute('data-direction') || 'ltr',
      acceleration: true, // Enables hardware acceleration
      display: 'double', // Display
      duration: 600, // Duration of transition in milliseconds
      page: 1, // First page
      gradients: true, // Enables gradients
      turnCorners: 'bl,br', // Corners used when turning the page
    },
    opts,
  )

  let turnData = {
    opts: opts,
    pageObjs: {},
    pages: {},
    pageWrap: {},
    pageZoom: {},
    pagePlace: {},
    pageMv: [],
    zoom: 1,
    totalPages: opts.pages || 0,
  }

  let docEM = new EventManager(document)
  let eltEM = new EventManager(turnElt)
  let parEM = new EventManager(turnElt.parentNode)

  Object.keys(opts.when || []).forEach(eventName => {
    eltEM.on(eventName, opts.when[eventName])
  })
  css(style, { position: 'relative', width: `${opts.width}px`, height: `${opts.height}px` }) // Set the css
  display(opts.display) // Set the initial display
  direction(opts.direction) // Set the direction

  // Prevent blue screen problems of switching to hardware acceleration mode
  // By forcing hardware acceleration for ever
  if (HAS_3D && !IS_TOUCH && opts.acceleration) transform(style, translate(0, 0, true))

  // Add pages from the DOM
  let cnt = 0
  for (let i = 0; i < ch.length; i++) {
    if (ch[i].getAttribute('data-ignore') !== '1') {
      addPage(ch[i], ++cnt)
    }
  }

  let mouseEvents = IS_TOUCH
    ? {
        down: 'touchstart',
        move: 'touchmove',
        up: 'touchend',
        over: 'touchstart',
        out: 'touchend',
      }
    : {
        down: 'mousedown',
        move: 'mousemove',
        up: 'mouseup',
        over: 'mouseover',
        out: 'mouseout',
      }

  docEM.on(mouseEvents.move, _touchMove)
  docEM.on(mouseEvents.up, _touchEnd)
  eltEM.on(mouseEvents.down, _touchStart)
  eltEM.on('end', _eventEnd)
  eltEM.on('pressed', _eventPressed)
  eltEM.on('released', _eventReleased)
  eltEM.on('flip', _flip)
  parEM.on('start', _eventStart)

  page(opts.page) // Set the initial page
  turnData.done = true // This flipbook is ready

  return {
    transform: transform,
    direction: direction,
    display: display,
    page: page,
    next: next,
    previous: previous,
    peel: peel,
    pages: pages,
    size: size,
    resize: resize,
    stop: stop,
    center: center,
    update: update,
    options: options,
    view: view,
    addPage: addPage,
    animating: animating,
    corner: corner,
    calculateZ: calculateZ,
    range: range,
    destroy: destroy,
    removePage: removePage,
    removeAllPages: removeAllPages,
    zoom: zoom,
    disable: disable,
    disabled: disabled,
  }

  function options(opts) {
    if (null == opts) return turnData.opts

    Object.assign(turnData.opts, opts) // Set new values
    if (opts.pages) pages(opts.pages) // Set pages
    if (opts.page) page(opts.page) // Set page
    if (opts.display) display(opts.display) // Set display
    if (opts.direction) direction(opts.direction) // Set direction
    if (opts.width && opts.height) size(opts.width, opts.height) // Set size
    if (opts.when) {
      eltEM.off()
      Object.keys(opts.when).forEach(eventName => eltEM.on(eventName, opts.when[eventName]))
      eltEM.on(mouseEvents.down, _touchStart)
      eltEM.on('end', _eventEnd)
      eltEM.on('pressed', _eventPressed)
      eltEM.on('released', _eventReleased)
      eltEM.on('flip', _flip)
    }
  }

  function addPage(element, page) {
    if (turnData.destroying) return false
    let incPages = false
    let lastPage = turnData.totalPages + 1

    // Read the page number from the className of `element` - format: p[0-9]+
    let currentPage = /\bp([0-9]+)\b/.exec(element.className) // TODO: use data- attr?
    if (currentPage) page = parseInt(currentPage[1], 10)
    if (page) {
      if (page > lastPage) throw turnError(`Page "${page}" cannot be inserted`)
      if (page === lastPage) incPages = true
    } else {
      page = lastPage
      incPages = true
    }
    if (page >= 1 && page <= lastPage) {
      if (turnData.done) stop() // Stop animations
      if (page in turnData.pageObjs) _movePages(page, 1) // Move pages if it's necessary
      if (incPages) turnData.totalPages = lastPage // Increase the number of pages

      // Add element
      element.style.cssFloat = 'left'
      element.className += ` page p${page} ${'double' !== turnData.display ? '' : page % 2 ? 'odd' : 'even'}`
      turnData.pageObjs[page] = element

      _addPage(page) // Add page
      _removeFromDOM() // Remove pages out of range
    }
  }

  function transform(style, value, origin) {
    if (origin) style[vendorProp('transformOrigin')] = origin
    style[vendorProp('transform')] = value
  }

  function direction(dir) {
    if (dir === undefined) return turnData.direction
    dir = dir.toLowerCase()
    if (['ltr', 'rtl'].indexOf(dir) < 0) throw turnError(`"${dir}" is not a value for direction`)
    turnElt.setAttribute('data-dir', dir)
    style.direction = dir
    turnData.direction = dir
    if (turnData.done) {
      let s = size()
      size(s.width, s.height)
    }
  }

  function display(disp) {
    let currentDisplay = turnData.display
    if (disp === undefined) return currentDisplay
    disp = disp.toLowerCase()
    if (['single', 'double'].indexOf(disp) < 0) throw turnError(`"${disp}" is not a value for display`)
    let page = turnData.pageObjs[0]
    switch (disp) {
      case 'single':
        // Create a temporal page to use as folded page
        if (!page) {
          stop()
          style.overflow = 'hidden'
          let cs = getComputedStyle(turnElt)
          page = createElement('div', 'page p-temporal', { width: cs.width, height: cs.height })
          turnElt.appendChild(page)
          turnData.pageObjs[0] = page
        }
        classManager.add('shadow')
        break
      case 'double':
        // Remove the temporal page
        if (page) {
          stop()
          style.overflow = ''
          removeElement(page)
          delete turnData.pageObjs[0]
        }
        classManager.remove('shadow')
        break
    }
    turnData.display = disp
    if (currentDisplay) {
      let s = size()
      _movePages(1, 0)
      size(s.width, s.height)
      update()
    }
  }

  function size(width, height) {
    if (undefined === width || undefined === height) {
      let cs = getComputedStyle(turnElt)
      return { width: parseFloat(cs.width), height: parseFloat(cs.height) }
    }
    stop()
    let pageWidth = turnData.display == 'double' ? width / 2 : width
    css(style, { width: `${width}px`, height: `${height}px` })
    if (turnData.pageObjs[0]) css(turnData.pageObjs[0].style, { width: `${pageWidth}px`, height: `${height}px` })
    Object.keys(turnData.pageWrap).forEach(page => {
      page = +page
      let props = _pageSize(page, true)
      css(turnData.pageObjs[page].style, { width: props.width, height: props.height })
      css(turnData.pageWrap[page].style, props)
      if (turnData.pages[page]) css(turnData.pages[page].elt.style, { width: props.width, height: props.height })
    })
    resize()
  }

  function resize() {
    if (turnData.pages[0]) {
      css(turnData.pageWrap[0].style, { left: -getComputedStyle(turnElt).width })
      turnData.pages[0].resize(true)
    }
    for (let page = 1; page <= turnData.totalPages; page++) if (turnData.pages[page]) turnData.pages[page].resize(true)
    _updateShadow()
    if (turnData.opts.autoCenter) center()
  }

  function range(page) {
    page = page || turnData.tpage || turnData.page || 1
    if (page < 1 || page > turnData.totalPages) throw turnError(`"${page}" is not a valid page`)
    let view = _view(page)
    view[1] = view[1] || view[0]

    let left, right
    if (view[0] >= 1 && view[1] <= turnData.totalPages) {
      let remainingPages = Math.floor((PAGES_IN_DOM - 2) / 2)
      if (turnData.totalPages - view[1] > view[0]) {
        left = Math.min(view[0] - 1, remainingPages)
        right = 2 * remainingPages - left
      } else {
        right = Math.min(turnData.totalPages - view[1], remainingPages)
        left = 2 * remainingPages - right
      }
    } else {
      left = right = PAGES_IN_DOM - 1
    }
    return [Math.max(1, view[0] - left), Math.min(turnData.totalPages, view[1] + right)]
  }

  function page(p) {
    if (null == p) return turnData.page
    if (!turnData.disabled && !turnData.destroying) {
      p = Math.floor(p)
      if (p <= 0 || p > turnData.totalPages) throw turnError(`The page "${p}" does not exist`)
      if (p !== turnData.page) {
        if (!turnData.done || view().indexOf(p) >= 0) _fitPage(p)
        else _turnPage(p)
      }
    }
  }

  function next() {
    return page(Math.min(turnData.totalPages, _view(turnData.page).pop() + 1))
  }

  function previous() {
    return page(Math.max(1, _view(turnData.page)[0] - 1))
  }

  function peel(corner, animate) {
    animate = null == animate ? true : animate === true
    if (false === corner) return stop(null, animate)
    if ('single' === turnData.display) {
      turnData.pages[turnData.page].peel(corner, animate)
    } else {
      let page = view()[turnData.direction.charAt(0) === corner.charAt(1) ? 0 : 1]
      if (turnData.pages[page]) turnData.pages[page].peel(corner, animate)
    }
  }

  function stop(ignore, animate) {
    if (animating()) {
      if (turnData.tpage) {
        turnData.page = turnData.tpage
        delete turnData.tpage
      }
      turnData.pageMv.forEach(mv => {
        if (mv && mv !== ignore) {
          let page = turnData.pages[mv]
          let opts = page.data.f.opts
          page.hideFoldedPage(animate)
          if (!animate) page.moveFoldingPage(false)
          if (opts.force) {
            opts.next = opts.page % 2 === 0 ? opts.page - 1 : opts.page + 1
            delete opts.force
          }
        }
      })
    }
    update()
  }

  function update() {
    if (animating() && turnData.pageMv[0] !== 0) {
      // Update motion
      let pos = calculateZ(turnData.pageMv)
      let c = corner()
      let actualView = view()
      let newView = view(turnData.tpage)

      Object.keys(turnData.pageWrap).forEach(page => {
        page = +page

        let objClass = turnData.pageObjs[page].classList
        let fixed = objClass.contains('fixed')
        css(turnData.pageWrap[page].style, {
          display: pos.pageV[page] || fixed ? '' : 'none',
          zIndex: (objClass.contains('hard') ? pos.partZ[page] : pos.pageZ[page]) || (fixed ? -1 : 0),
        })
        let p = turnData.pages[page]
        if (p) {
          p.z(pos.partZ[page] || null)
          if (pos.pageV[page]) p.resize()
          if (turnData.tpage) {
            p.hover(false)
            p.disable(turnData.pageMv.indexOf(page) < 0 && page !== newView[0] && page !== newView[1])
          } else {
            p.hover(!c)
            p.disable(page !== actualView[0] && page !== actualView[1])
          }
        }
      })
    } else {
      // Update static pages
      Object.keys(turnData.pageWrap).forEach(page => {
        page = +page

        let pageLocation = _setPageLoc(page)
        let p = turnData.pages[page]
        if (p) {
          p.disable(turnData.disabled || pageLocation !== 1)
          p.hover(true)
          p.z(null)
        }
      })
    }
  }

  function center(page) {
    if (!turnData.noCenter) {
      let left = 0
      if ('double' === turnData.display) {
        let v = view(page || turnData.tpage || turnData.page)
        let add = (size().width / 4) * ('ltr' === turnData.direction ? 1 : -1)
        if (!v[0]) left -= add
        else if (!v[1]) left += add
      }
      style.left = `${left}px`
    }
  }

  function view(page) {
    let v = _view(page)
    if ('double' === turnData.display) return [v[0] > 0 ? v[0] : 0, v[1] <= turnData.totalPages ? v[1] : 0]
    return [v[0] > 0 && v[0] <= turnData.totalPages ? v[0] : 0]
  }

  function animating() {
    return turnData.pageMv.length > 0
  }

  function corner() {
    return Object.keys(turnData.pages).some(page => turnData.pages[page].corner())
  }

  function calculateZ(mv) {
    let v = view()
    let currentPage = v[0] || v[1]
    let total = mv.length - 1
    let r = { pageZ: {}, partZ: {}, pageV: {} }
    for (let i = 0; i <= total; i++) {
      let page = mv[i]
      let nextPage = turnData.pages[page].data.f.opts.next
      let placePage = turnData.pagePlace[page]
      addView(page)
      addView(nextPage)
      let dpage = nextPage === turnData.pagePlace[nextPage] ? nextPage : page
      r.pageZ[dpage] = turnData.totalPages - Math.abs(currentPage - dpage)
      r.partZ[placePage] = turnData.totalPages * 2 - total + i
    }
    return r

    function addView(page) {
      let v = view(page)
      if (v[0]) r.pageV[v[0]] = true
      if (v[1]) r.pageV[v[1]] = true
    }
  }

  function removeAllPages() {
    while (turnData.totalPages) removePage(turnData.totalPages)
  }

  function removePage(page) {
    if (page < 1 || page > turnData.totalPages) throw turnError(`The page "${page}" doesn't exist`)
    if (turnData.pageObjs[page]) {
      stop() // Stop animations
      _removePageFromDOM(page) // Remove `page`
      delete turnData.pageObjs[page]
    }
    _movePages(page, -1) // Move the pages
    --turnData.totalPages // Resize the size of this flipbook
    // Check the current view
    if (turnData.page > turnData.totalPages) {
      turnData.page = null
      _fitPage(turnData.totalPages)
    } else {
      _makeRange()
      update()
    }
  }

  function destroy() {
    if (!turnData) return
    if (!trigger('destroying', turnElt)) return
    turnData.destroying = true
    docEM.off()
    eltEM.off()
    parEM.off()
    removeAllPages()
    if (turnData.fparent) removeElement(turnData.fparent)
    if (turnData.shadow) removeElement(turnData.shadow)
    turnData = null
  }

  function zoom(newZoom) {
    if (null == newZoom) return turnData.zoom
    newZoom += 0
    if (newZoom < 0.001 || newZoom > 100) throw turnError(`${newZoom} is not a value for zoom`)
    if (!trigger('zooming', turnElt, [newZoom, turnData.zoom])) return
    let s = size()
    let currentView = view()
    let iz = 1 / turnData.zoom
    let newWidth = Math.round(s.width * iz * newZoom)
    let newHeight = Math.round(s.height * iz * newZoom)
    turnData.zoom = newZoom
    stop()
    size(newWidth, newHeight)
    if (turnData.opts.autoCenter) center()
    _updateShadow()
    currentView.forEach(v => {
      if (v && turnData.pageZoom[v] !== turnData.zoom) {
        trigger('zoomed', turnElt, [v, currentView, turnData.pageZoom[v], turnData.zoom]) // TODO: check tous les trigger & "on" func
        turnData.pageZoom[v] = turnData.zoom
      }
    })
  }

  function disable(d) {
    let v = view()
    turnData.disabled = null == d || d === true
    Object.keys(turnData.pages).forEach(page => {
      page = +page
      turnData.pages[page].disable(turnData.disabled ? true : v.indexOf(page) < 0)
    })
  }

  function disabled(d) {
    return null == d ? turnData.disabled === true : disable(d)
  }

  function pages(pages) {
    if (null == pages) return turnData.totalPages
    if (pages < turnData.totalPages) for (let page = turnData.totalPages; page > pages; page--) removePage(page)
    turnData.totalPages = pages
    _fitPage(turnData.page)
  }

  function _addPage(page) {
    let obj = turnData.pageObjs[page]
    if (obj) {
      if (_necessPage(page)) {
        if (!turnData.pageWrap[page]) {
          // Wrapper
          turnElt.appendChild(
            (turnData.pageWrap[page] = createElement('div', 'page-wrapper', {
              position: 'absolute',
              overflow: 'hidden',
            })),
          )

          if (!turnData.pagePlace[page]) {
            turnData.pagePlace[page] = page
            turnData.pageWrap[page].appendChild(turnData.pageObjs[page]) // Move `pageObjs[page]` to wrapper
          }
          // Set the size of the page
          let props = _pageSize(page, true)
          css(obj.style, { width: props.width, height: props.height })
          css(turnData.pageWrap[page].style, props)
        }
        if (page === turnData.pagePlace[page]) _makeFlip(page) // If the page isn't in another place, create the flip effect
      } else {
        turnData.pagePlace[page] = 0 // Place
        if (turnData.pageObjs[page]) removeElement(turnData.pageObjs[page]) // Remove element from the DOM
      }
    }
  }

  function _movePages(from, change) {
    if (change > 0) {
      for (let page = turnData.totalPages; page >= from; page--) _movePage(page, change)
    } else {
      for (let page = from; page <= turnData.totalPages; page++) _movePage(page, change)
    }
  }

  function _movePage(page, change) {
    let next = page + change
    let odd = next % 2

    if (turnData.pageObjs[page]) {
      let obj = turnData.pageObjs[page]
      let objClass = obj.classList
      ;[(`p${page}`, 'odd', 'even')].forEach(c => objClass.remove(c))
      ;[(`p${next}`, odd ? 'odd' : 'even')].forEach(c => objClass.add(c))
      turnData.pageObjs[next] = obj
    }

    if (turnData.pagePlace[page] && turnData.pageWrap[page]) {
      turnData.pagePlace[next] = next
      let wrap = turnData.pageWrap[page]
      if (!turnData.pageObjs[next].classList.contains('fixed')) css(wrap.style, _pageSize(next, true))
      turnData.pageWrap[next] = wrap

      if (turnData.pages[page]) {
        turnData.pages[next] = turnData.pages[page].options({
          page: next,
          next: 'single' === turnData.display || odd ? next + 1 : next - 1,
        })
      }
      if (change) {
        ;[turnData.pages, turnData.pagePlace, turnData.pageZoom, turnData.pageObjs, turnData.pageWrap].forEach(
          obj => delete obj[page],
        )
      }
    }
  }

  function _view(page) {
    page = page || turnData.page
    return 'double' !== turnData.display ? [page] : page % 2 ? [page - 1, page] : [page, page + 1]
  }

  function _necessPage(page) {
    if (0 === page || turnData.pageObjs[page].classList.contains('fixed')) return true
    let r = range()
    return page >= r[0] && page <= r[1]
  }

  function _removeFromDOM() {
    Object.keys(turnData.pageWrap).forEach(page => {
      page = +page
      if (!_necessPage(page)) _removePageFromDOM(page)
    })
  }

  function _makeRange() {
    if (turnData.totalPages < 1) return
    let r = range()
    for (let page = r[0]; page <= r[1]; page++) _addPage(page)
  }

  function _removePageFromDOM(page) {
    if (turnData.pages[page]) {
      let dd = turnData.pages[page].data
      turnData.pages[page].moveFoldingPage(false)
      if (dd.f && dd.f.fwrapper) removeElement(dd.f.fwrapper)
      removeElement(turnData.pages[page])
      delete turnData.pages[page]
    }
    if (turnData.pageObjs[page]) {
      removeElement(turnData.pageObjs[page]) // delete data.pageObjs[page] ?
    }
    if (turnData.pageWrap[page]) {
      removeElement(turnData.pageWrap[page])
      delete turnData.pageWrap[page]
    }
    _removeMv(page)
    delete turnData.pagePlace[page]
    delete turnData.pageZoom[page]
  }

  function _fitPage(page) {
    _missing(page)
    if (!turnData.pageObjs[page]) return

    let newView = view(page)
    turnData.page = page
    stop()
    newView.forEach(v => {
      if (v && turnData.pageZoom[v] !== turnData.zoom) {
        trigger('zoomed', turnElt, [v, newView, turnData.pageZoom[v], turnData.zoom])
        turnData.pageZoom[v] = turnData.zoom
      }
    })
    _removeFromDOM()
    _makeRange()
    _updateShadow()
    trigger('turned', turnElt, [page, newView])
    update()
    if (turnData.opts.autoCenter) center()
  }

  function _missing(page) {
    if (turnData.totalPages < 1) return
    let r = range(page)
    let missing = []
    for (let p = r[0]; p <= r[1]; p++) if (!turnData.pageObjs[p]) missing.push(p)
    if (missing.length > 0) trigger('missing', turnElt, [missing])
  }

  function _removeMv(page) {
    let index = turnData.pageMv.indexOf(page)
    if (index < 0) return false
    turnData.pageMv.splice(index, 1)
    return true
  }

  function _updateShadow() {
    let cs = getComputedStyle(turnElt)
    let pageWidth = 'single' === turnData.display ? cs.width : `${parseFloat(cs.width) / 2}px`
    let v = view()
    turnData.pageMv.forEach(mv => {
      if (v[0] && v[1]) {
        v = view(turnData.pages[mv].data.f.opts.next)
        let v2 = view(mv)
        v[0] = v[0] && v2[0]
        v[1] = v[1] && v2[1]
      }
    })
    if (!turnData.shadow) turnElt.appendChild((turnData.shadow = createElement('div', 'shadow', divAtt(0, 0, 0))))
    if (v[0] && v[1]) {
      css(turnData.shadow.style, { width: cs.width, height: cs.height, top: 0, left: 0 })
    } else if ('ltr' === turnData.direction ? !v[0] : v[0] && !v[1]) {
      css(turnData.shadow.style, { width: pageWidth, height: cs.height, top: 0, left: pageWidth })
    } else {
      css(turnData.shadow.style, { width: pageWidth, height: cs.height, top: 0, left: 0 })
    }
  }

  function _pageSize(page, position) {
    let cs = getComputedStyle(turnElt)
    if ('single' === turnData.display)
      return position ? { top: 0, left: 0, right: 'auto', width: cs.width, height: cs.height } : {}
    let prop = {}
    let pageWidth = parseFloat(cs.width) / 2
    let obj = turnData.pageObjs[page]
    if (obj.classList.contains('own-size')) {
      let cs = getComputedStyle(obj)
      prop.width = cs.width
      prop.height = cs.height
    } else {
      prop.width = `${pageWidth}px`
      prop.height = cs.height
    }
    if (position) {
      prop.top = `${(parseFloat(cs.height) - parseFloat(prop.height)) / 2}px`
      let odd = page % 2
      let sides = ('ltr' === turnData.direction ? odd : !odd) ? ['right', 'left'] : ['left', 'right']
      prop[sides[0]] = `${pageWidth - parseFloat(prop.width)}px`
      prop[sides[1]] = 'auto'
    }
    return prop
  }

  function _setPageLoc(page) {
    let v = view()
    if (v[0] === page || v[1] === page) {
      if (!animating()) css(turnData.pageWrap[page].style, { zIndex: turnData.totalPages, display: '' })
      return 1
    }
    if (
      ('single' === turnData.display && page === v[0] + 1) ||
      (('double' === turnData.display && page === v[0] - 2) || page === v[1] + 2)
    ) {
      if (!animating()) css(turnData.pageWrap[page].style, { zIndex: turnData.totalPages - 1, display: '' })
      return 2
    }
    if (!animating())
      css(turnData.pageWrap[page].style, {
        zIndex: 0,
        display: turnData.pageObjs[page].classList.contains('fixed') ? '' : 'none',
      })
    return 0
  }

  function _makeFlip(page) {
    if (!turnData.pages[page] && turnData.pagePlace[page] === page) {
      let obj = turnData.pageObjs[page]
      css(obj.style, _pageSize(page))
      let flip = new Flip(obj, {
        page: page,
        next: page % 2 || 'single' === turnData.display ? page + 1 : page - 1,
        turnData: turnData,
      })
      flip.disable(turnData.disabled)
      turnData.pages[page] = flip
      _setPageLoc(page) // Issue about z-index
      turnData.pageZoom[page] = turnData.zoom
    }
    return turnData.pages[page]
  }

  function _turnPage(page) {
    let v = view()
    let newView = view(page)
    if (page !== turnData.page) {
      let currentPage = turnData.page
      let place = turnData.pagePlace[page]
      if (!trigger('turning', turnElt, [page, newView])) {
        if (currentPage == turnData.page && turnData.pageMv.indexOf(place) >= 0)
          turnData.pages[place].hideFoldedPage(true)
        return
      }
      if (newView.indexOf(1) >= 0) trigger('first', turnElt)
      if (newView.indexOf(turnData.totalPages) >= 0) trigger('last', turnElt)
    }
    let current = v[0]
    let next = newView[0]
    if ('single' !== turnData.display) {
      if (v[1] && page > v[1]) {
        current = v[1]
      } else if (v[0] && page < v[0]) {
        next = newView[1]
      }
    }
    let optsCorners = turnData.opts.turnCorners.split(',')
    let flipData = turnData.pages[current].data.f
    let opts = flipData.opts
    let actualPoint = flipData.point
    _missing(page)
    if (!turnData.pageObjs[page]) return
    stop()
    turnData.page = page
    _makeRange()
    turnData.tpage = next
    if (opts.next !== next) {
      opts.next = next
      opts.force = true
    }
    update()
    flipData.point = actualPoint
    if ('hard' === flipData.effect) {
      if ('ltr' === turnData.direction) turnData.pages[current].turnPage(page > current ? 'r' : 'l')
      else turnData.pages[current].turnPage(page > current ? 'l' : 'r')
    } else {
      if ('ltr' === turnData.direction) turnData.pages[current].turnPage(optsCorners[page > current ? 1 : 0])
      else turnData.pages[current].turnPage(optsCorners[page > current ? 0 : 1])
    }
  }

  function _touchStart(e) {
    Object.keys(turnData.pages).some(page => {
      if (false === turnData.pages[page].eventStart(e)) {
        e.preventDefault()
        e.stopPropagation()
        return true
      }
      return false
    })
  }

  function _touchMove(e) {
    Object.keys(turnData.pages).forEach(page => {
      turnData.pages[page].eventMove(e)
    })
  }

  function _touchEnd(e) {
    Object.keys(turnData.pages).forEach(page => {
      turnData.pages[page].eventEnd(e)
    })
  }

  function _eventStart(e) {
    let detail = e.detail
    let opts = detail[0]
    let corner = detail[1]
    if (!e.defaultPrevented) {
      let actualZoom = turnData.pageZoom[opts.page]
      if (actualZoom && actualZoom !== turnData.zoom) {
        trigger('zoomed', turnElt, [opts.page, view(opts.page), actualZoom, turnData.zoom])
        turnData.pageZoom[opts.page] = turnData.zoom
      }
      if ('single' === turnData.display && corner) {
        if (corner.charAt(1) === turnData.direction.charAt(0)) {
          opts.next = opts.next < opts.page ? opts.next : opts.page - 1
          opts.force = true
        } else {
          opts.next = opts.next > opts.page ? opts.next : opts.page + 1
        }
      }
      _addMotionPage(e.target)
    }
    _updateShadow()
  }

  function _eventEnd(e) {
    let detail = e.detail
    let opts = detail[0]
    let turned = detail[1]
    if (turned) {
      let tpage = turnData.tpage || turnData.page
      if (tpage === opts.next || tpage === opts.page) {
        delete turnData.tpage
        _fitPage(tpage || opts.next, true)
      }
    } else {
      _removeMv(opts.page)
      _updateShadow()
      update()
    }
  }

  function _eventPressed(e) {
    turnData.mouseAction = true
    update()
    e.target.setAttribute('data-time', Date.now())
  }

  function _eventReleased(e) {
    let detail = e.detail
    let point = detail[0]
    let target = e.target
    let f = turnData.pages[target.getAttribute('data-page')].data.f

    let outArea
    let cs = getComputedStyle(target)
    let width = parseFloat(cs.width)
    if ('single' === turnData.display) {
      outArea = ['br', 'tr'].indexOf(point.corner) >= 0 ? point.x < width / 2 : point.x > width / 2
    } else {
      outArea = point.x < 0 || point.x > width
    }
    if (Date.now() - +target.getAttribute('data-time') < 200 || outArea) {
      e.preventDefault()
      _turnPage(f.opts.next)
    }
    turnData.mouseAction = false
  }

  function _flip(e) {
    e.stopPropagation()
    let opts = turnData.pages[e.target.getAttribute('data-page')].data.f.opts
    trigger('turn', turnElt, [opts.next])
    if (turnData.opts.autoCenter) center(opts.next)
  }

  function _addMotionPage(target) {
    let opts = turnData.pages[target.getAttribute('data-page')].data.f.opts
    _addMv(opts.page)
  }

  function _addMv(page) {
    _removeMv(page)
    turnData.pageMv.push(page)
  }

  // Flip
  function Flip(flipElt, opts) {
    let data = {
      f: {
        disabled: false,
        hover: false,
        effect: flipElt.classList.contains('hard') ? 'hard' : 'sheet',
      },
    }
    options(opts)
    _addPageWrapper()

    return {
      elt: flipElt,
      data: data,
      options: options,
      setData: setData,
      type: type,
      z: z,
      hide: hide,
      hideFoldedPage: hideFoldedPage,
      moveFoldingPage: moveFoldingPage,
      resize: resize,
      turnPage: turnPage,
      moving: moving,
      isTurning: isTurning,
      corner: corner,
      disable: disable,
      hover: hover,
      peel: peel,
      eventMove: eventMove,
      eventEnd: eventEnd,
      eventStart: eventStart,
    }

    function options(opts) {
      if (null == opts) return data.opts
      let dataOpts = Object.assign({}, data.opts || flipOptions, opts)
      setData({ opts: dataOpts })
      flipElt.setAttribute('data-page', dataOpts.page)
    }

    function setData(d) {
      Object.assign(data.f, d)
    }

    function type() {
      return data.f.effect
    }

    function z(z) {
      let f = data.f
      f.opts.zIndex = z
      if (f.fwrapper) f.fwrapper.style.zIndex = z || +getComputedStyle(f.parent).zIndex || 0
    }

    function animatef(point) {
      if (data.effect) data.effect.stop()

      if (point) {
        if (!point.to.length) point.to = [point.to]
        if (!point.from.length) point.from = [point.from]

        let diff = point.to.map((to, i) => to - point.from[i])
        let animating = true
        let time = Date.now()
        let frame = () => {
          if (data.effect && animating) {
            let timeDiff = Math.min(point.duration, Date.now() - time)
            let v = point.from.map((from, i) => data.effect.easing(1, timeDiff, from, diff[i], point.duration))

            point.frame(1 === v.length ? v[0] : v)

            if (timeDiff === point.duration) {
              delete data.effect
              // that.data(data) // TODO
              if (point.complete) point.complete()
            } else {
              requestAnim(frame)
            }
          }
        }

        data.effect = Object.assign(
          {
            stop: () => (animating = false),
            easing: (x, t, b, c, data) => c * Math.sqrt(1 - (t = t / data - 1) * t) + b,
          },
          point,
        )
        // this.data(data) // TODO

        frame()
      } else {
        delete data.effect
      }
    }

    function hide() {
      let f = data.f
      let turnData = f.opts.turnData
      let folding = _foldingPage()

      switch (f.effect) {
        case 'hard':
          if (turnData.opts.gradients) {
            f.bshadowLoc = 0
            removeElement(f.bshadow)
            f.ashadow.style.display = 'none'
          }
          transform(f.wrapper.style, '')
          f.fpage.style.display = 'none'
          break
        case 'sheet':
          let flips = +f.fparent.getAttribute('data-flips') - 1
          f.fparent.setAttribute('data-flips', flips)
          if (flips === 0) f.fparent.style.display = 'none'
          css(flipElt.style, { left: 0, top: 0, right: 'auto', bottom: 'auto' })
          transform(flipElt.style, '')
          transform(f.wrapper.style, '')
          f.fwrapper.style.display = 'none'
          if (f.bshadow) f.bshadow.style.display = 'none'
          transform(folding.style, '')
          break
      }
      f.visible = false
      return this
    }

    function hideFoldedPage(animate) {
      let f = data.f
      if (!f.point) return

      let h = () => {
        f.point = null
        f.status = ''
        hide()
        trigger('end', flipElt, [f.opts, false])
      }

      if (animate) {
        let p1 = f.point
        let p4 = _c(p1.corner)
        let delta = Math['t' === p1.corner.charAt(0) ? 'min' : 'max'](0, p1.y - p4.y) / 2
        let p2 = { x: p1.x, y: p1.y + delta }
        let p3 = { x: p4.x, y: p4.y - delta }

        animatef({
          from: 0,
          to: 1,
          frame: v => {
            let np = bezier(p1, p2, p3, p4, v)
            p1.x = np.x
            p1.y = np.y
            _fold(p1)
          },
          complete: h,
          duration: 800,
          hiding: true,
        })
      } else {
        animatef(false)
        h()
      }
    }

    function resize(full) {
      // TODO: Check there is no mix between turn and flip methods
      let f = data.f
      let turnData = f.opts.turnData
      let cs = getComputedStyle(flipElt)
      let dim = { width: cs.width, height: cs.height }
      switch (f.effect) {
        case 'hard':
          if (full) {
            css(f.wrapper.style, dim)
            css(f.fpage.style, dim)
            if (turnData.opts.gradients) {
              css(f.ashadow.style, dim)
              css(f.bshadow.style, dim)
            }
          }
          return
        case 'sheet':
          if (full) {
            let size = `${Math.round(
              Math.sqrt(Math.pow(parseFloat(cs.width), 2) + Math.pow(parseFloat(cs.height), 2)),
            )}px`
            css(f.wrapper.style, { width: size, height: size })
            css(f.fwrapper.style, { width: size, height: size })
            css(f.fwrapper.firstElementChild.style, dim)
            css(f.fpage.style, dim)
            if (turnData.opts.gradients) css(f.ashadow.style, dim)
            if (_backGradient()) css(f.bshadow.style, dim)
          }
          if (visible(f.parent)) {
            let offset = findPos(f.parent, 1)
            css(f.fwrapper.style, { top: `${offset.top}px`, left: `${offset.left}px` })
            offset = findPos(turnElt)
            css(f.fparent.style, { top: `${-offset.top}px`, left: `${-offset.left}px` })
          }
          z(f.opts.zIndex)
          return
      }
    }

    function turnPage(corner) {
      let f = data.f
      let turnData = f.opts.turnData
      corner = { corner: f.corner ? f.corner.corner : corner || _cAllowed()[0] }
      let p1 = f.point || _c(corner.corner, turnData.opts.elevation)
      let p4 = _c2(corner.corner)

      trigger('flip', flipElt)
      animatef({
        from: 0,
        to: 1,
        frame: v => {
          let np = bezier(p1, p1, p4, p4, v)
          corner.x = np.x
          corner.y = np.y
          _showFoldedPage(corner)
        },
        complete: () => {
          trigger('end', flipElt, [f.opts, true])
        },
        duration: turnData.opts.duration,
        turning: true,
      })
      f.corner = null
    }

    function moving() {
      return 'effect' in data
    }

    function isTurning() {
      return moving() && data.effect.turning
    }

    function corner() {
      return data.f.corner
    }

    function disable(disable) {
      data.f.disabled = disable
    }

    function hover(hover) {
      data.f.hover = hover
    }

    function peel(corner, animate) {
      let f = data.f

      if (corner) {
        if (corners.all.indexOf(corner) < 0) throw turnError(`Corner ${corner} is not permitted`)
        if (_cAllowed().indexOf(corner) >= 0) {
          let point = _c(corner, f.opts.cornerSize / 2)
          f.status = 'peel'
          _showFoldedPage({ corner: corner, x: point.x, y: point.y }, animate)
        }
      } else {
        f.status = ''
        hideFoldedPage(animate)
      }
    }

    function moveFoldingPage(move) {
      let f = data.f
      let turnData = f.opts.turnData
      let place = turnData.pagePlace

      if (move) {
        let nextPage = f.opts.next
        if (place[nextPage] !== f.opts.page) {
          if (f.folding) moveFoldingPage(false)
          f.fpage.appendChild(_foldingPage())
          place[nextPage] = f.opts.page
          f.folding = nextPage
        }
        update() // TODO: turn method
      } else {
        if (f.folding) {
          if (turnData.pages[f.folding]) {
            // If we have flip available
            let flipData = turnData.pages[f.folding].data.f
            flipData.wrapper.appendChild(turnData.pageObjs[f.folding])
          } else if (turnData.pageWrap[f.folding]) {
            // If we have the pageWrapper
            turnData.pageWrap[f.folding].appendChild(turnData.pageObjs[f.folding])
          }
          if (f.folding in place) place[f.folding] = f.folding
          delete f.folding
        }
      }
    }

    function eventMove(e) {
      let f = data.f

      if (!f.disabled) {
        e = e.touches || [e]

        if (f.corner) {
          let pos = offset(f.parent)
          f.corner.x = e[0].pageX - pos.left
          f.corner.y = e[0].pageY - pos.top
          _showFoldedPage(f.corner)
        } else if (f.hover && !data.effect && visible(flipElt)) {
          let point = _isIArea(e[0])
          if (point) {
            if (('sheet' === f.effect && 2 === point.corner.length) || 'hard' === f.effect) {
              f.status = 'hover'
              let origin = _c(point.corner, f.opts.cornerSize / 2)
              point.x = origin.x
              point.y = origin.y
              _showFoldedPage(point, true)
            }
          } else {
            if ('hover' === f.status) {
              f.status = ''
              hideFoldedPage(true)
            }
          }
        }
      }
    }

    function eventStart(e) {
      let f = data.f
      let turnData = f.opts.turnData

      if (!f.corner && !f.disabled && !isTurning() && f.opts.page === turnData.pagePlace[f.opts.page]) {
        f.corner = _isIArea(e)
        if (f.corner && _foldingPage()) {
          trigger('pressed', flipElt, [f.point])
          _showFoldedPage(f.corner)
          return false
        }
        f.corner = null
      }
    }

    function eventEnd(e) {
      let f = data.f
      let corner = f.corner
      if (!f.disabled && corner && trigger('released', flipElt, [f.point || corner])) hideFoldedPage(true)
      f.corner = null
    }

    function _cAllowed() {
      let f = data.f
      let turnData = f.opts.turnData // TODO
      let page = f.opts.page
      let odd = page % 2
      if ('hard' === f.effect) return ('ltr' === turnData.direction ? odd : !odd) ? ['r'] : ['l']
      if ('single' !== turnData.display)
        return corners[('ltr' === turnData.direction ? odd : !odd) ? 'forward' : 'backward']
      if (1 === page) return corners['ltr' === turnData.direction ? 'forward' : 'backward']
      if (turnData.totalPages === page) return corners['ltr' === turnData.direction ? 'backward' : 'forward']
      return corners['all']
    }

    function _cornerActivated(p) {
      let cs = getComputedStyle(flipElt)
      let width = parseFloat(cs.width)
      let height = parseFloat(cs.height)
      let point = { x: p.x, y: p.y, corner: '' }
      if (point.x <= 0 || point.y <= 0 || point.x >= width || point.y >= height) return false
      let f = data.f
      let csz = f.opts.cornerSize
      if ('hard' === f.effect) {
        if (point.x > width - csz) point.corner = 'r'
        else if (point.x < csz) point.corner = 'l'
        else return false
      } else if ('sheet' === f.effect) {
        if (point.y < csz) point.corner += 't'
        else if (point.y >= height - csz) point.corner += 'b'
        else return false
        if (point.x <= csz) point.corner += 'l'
        else if (point.x >= width - csz) point.corner += 'r'
        else return false
      }
      return !point.corner || _cAllowed().indexOf(point.corner) < 0 ? false : point
    }

    function _isIArea(e) {
      e = e.touches ? e.touches[0] : e
      let o = offset(data.f.parent)
      return _cornerActivated({ x: e.pageX - o.left, y: e.pageY - o.top })
    }

    function _c(corner, opts) {
      opts = opts || 0
      let cs = getComputedStyle(flipElt)
      let width = parseFloat(cs.width)
      let height = parseFloat(cs.height)
      switch (corner) {
        case 'tl':
          return { x: opts, y: opts }
        case 'tr':
          return { x: width - opts, y: opts }
        case 'bl':
          return { x: opts, y: height - opts }
        case 'br':
          return { x: width - opts, y: height - opts }
        case 'l':
          return { x: opts, y: 0 }
        case 'r':
          return { x: width - opts, y: 0 }
      }
    }

    function _c2(corner) {
      let cs = getComputedStyle(flipElt)
      let width = parseFloat(cs.width)
      let height = parseFloat(cs.height)
      switch (corner) {
        case 'tl':
          return { x: width * 2, y: 0 }
        case 'tr':
          return { x: -width, y: 0 }
        case 'bl':
          return { x: width * 2, y: height }
        case 'br':
          return { x: -width, y: height }
        case 'l':
          return { x: width * 2, y: 0 }
        case 'r':
          return { x: -width, y: 0 }
      }
    }

    function _foldingPage() {
      let opts = data.f.opts
      let turnData = opts.turnData
      return 'single' !== turnData.display
        ? turnData.pageObjs[opts.next]
        : opts.next > 1 || opts.page > 1
        ? turnData.pageObjs[0]
        : null
    }

    function _backGradient() {
      let f = data.f
      let turnData = f.opts.turnData
      let gradient =
        turnData.opts.gradients &&
        ('single' === turnData.display || (f.opts.page !== 2 && f.opts.page !== turnData.totalPages - 1))
      if (gradient && !f.bshadow) {
        let cs = getComputedStyle(flipElt)
        f.bshadow = createElement('div', '', divAtt(0, 0, 1), {
          position: '',
          width: cs.width,
          height: cs.height,
        })
        f.parent.appendChild(f.bshadow)
      }
      return gradient
    }

    function _addPageWrapper() {
      let f = data.f
      let turnData = f.opts.turnData
      let parent = (f.parent = flipElt.parentNode)

      if (!f.wrapper)
        switch (f.effect) {
          case 'hard':
            let props = {}
            props[vendorProp('transformStyle')] = 'preserve-3d'
            props[vendorProp('backfaceVisibility')] = 'hidden'
            parent.appendChild((f.wrapper = createElement('div', '', divAtt(0, 0, 2), props)))
            prepend(f.wrapper, flipElt)
            parent.appendChild((f.fpage = createElement('div', '', divAtt(0, 0, 1), props)))
            if (turnData.opts.gradients) {
              parent.appendChild((f.ashadow = createElement('div', '', divAtt(0, 0, 0), { display: 'none' })))
              f.bshadow = createElement('div', '', divAtt(0, 0, 0))
            }
            break
          case 'sheet':
            f.fparent = f.opts.turnData.fparent
            if (!f.fparent) {
              let fparent = createElement('div', '', divAtt(0, 0, 'auto', 'visible'), {
                pointerEvents: 'none',
                display: 'none',
              })
              fparent.setAttribute('data-flips', 0)
              turnElt.appendChild(fparent)
              f.opts.turnData.fparent = fparent
              f.fparent = fparent
            }
            css(flipElt.style, { position: 'absolute', top: 0, left: 0, bottom: 'auto', right: 'auto' })
            parent.appendChild((f.wrapper = createElement('div', '', divAtt(0, 0, getComputedStyle(flipElt).zIndex))))
            prepend(f.wrapper, flipElt)
            let o = offset(parent)
            f.fparent.appendChild((f.fwrapper = createElement('div', '', divAtt(o.top, o.left))))
            f.fwrapper.appendChild(
              (f.fpage = createElement('div', '', divAtt(0, 0, 0, 'visible'), { cursor: 'default' })),
            )
            if (turnData.opts.gradients) f.fpage.appendChild((f.ashadow = createElement('div', '', divAtt(0, 0, 1))))
            break
        }
      resize(true) // Set size
    }

    function _fold(point) {
      let f = data.f
      let turnData = f.opts.turnData
      let o = _c(point.corner)
      let cs = getComputedStyle(flipElt)
      let width = parseFloat(cs.width)
      let height = parseFloat(cs.height)

      switch (f.effect) {
        case 'hard':
          point.x =
            'l' === point.corner
              ? Math.min(Math.max(point.x, 0), width * 2)
              : Math.max(Math.min(point.x, width), -width)
          let relX = o.x ? (o.x - point.x) / width : point.x / width
          let angle = relX * 90
          let half = angle < 90
          let leftPos
          let shadow
          let gradientX
          let fpageOrigin
          let parentOrigin
          let totalPages = turnData.totalPages

          switch (point.corner) {
            case 'l':
              fpageOrigin = '0% 50%'
              parentOrigin = '100% 50%'
              if (half) {
                leftPos = 0
                shadow = f.opts.next - 1 > 0
                gradientX = 1
              } else {
                leftPos = '100%'
                shadow = f.opts.page + 1 < totalPages
                gradientX = 0
              }
              break
            case 'r':
              fpageOrigin = '100% 50%'
              parentOrigin = '0% 50%'
              angle = -angle
              width = -width
              if (half) {
                leftPos = 0
                shadow = f.opts.next + 1 < totalPages
                gradientX = 0
              } else {
                leftPos = '-100%'
                shadow = f.opts.page !== 1
                gradientX = 1
              }
              break
          }
          let parentCss = { overflow: 'visible' }
          parentCss[vendorProp('perspectiveOrigin')] = parentOrigin
          let depth = flipElt.getAttribute('data-depth') || 0
          transform(f.wrapper.style, `rotateY(${angle}deg) translate3d(0,0,${depth}px)`, parentOrigin)
          transform(f.fpage.style, `translateX(${width}px) rotateY(${180 + angle}deg)`, fpageOrigin)
          css(f.parent.style, parentCss)
          let zIndex = f.opts['z-index'] || totalPages
          if (half) {
            relX = -relX + 1
            f.wrapper.style.zIndex = zIndex + 1
            f.fpage.style.zIndex = zIndex
          } else {
            relX = relX - 1
            f.wrapper.style.zIndex = zIndex
            f.fpage.style.zIndex = zIndex + 1
          }
          if (turnData.opts.gradients) {
            if (shadow) {
              css(f.ashadow.style, {
                display: '',
                left: leftPos,
                backgroundColor: `rgba(0,0,0,${0.5 * relX})`,
              })
              transform(f.ashadow.style, 'rotateY(0deg)')
            } else {
              f.ashadow.style.display = 'none'
            }
            f.bshadow.style.opacity = -relX + 1
            let parent = half ? f.wrapper : f.fpage
            if (f.bshadow.parentNode !== parent) parent.appendChild(f.bshadow)
            gradient(f.bshadow, { x: gradientX * 100, y: 0 }, { x: (-gradientX + 1) * 100, y: 0 }, [
              [0, 'rgba(0,0,0,0.3)'],
              [1, 'rgba(0,0,0,0)'],
            ])
          }
          break
        case 'sheet':
          if (['l', 'r'].indexOf(point.corner) >= 0) break

          let mv = { x: 0, y: 0 }
          let df = { x: 0, y: 0 }
          let tr = { x: 0, y: 0 }
          let ac = turnData.opts.acceleration
          let h = parseFloat(getComputedStyle(f.wrapper).height)
          let top = 't' === point.corner.charAt(0)
          let left = 'l' === point.corner.charAt(1)
          let A90 = Math.PI / 2
          let gradientEndPointA
          let gradientEndPointB
          let gradientStartVal
          let gradientSize
          let gradientOpacity
          let shadowVal
          let a

          let compute = function() {
            let rel = { x: o.x ? o.x - point.x : point.x, y: HAS_ROT ? (o.y ? o.y - point.y : point.y) : 0 }
            let middle = { x: left ? width - rel.x / 2 : point.x + rel.x / 2, y: rel.y / 2 }
            let alpha = A90 - Math.atan2(rel.y, rel.x)
            let gamma = alpha - Math.atan2(middle.y, middle.x)
            let distance = Math.max(0, Math.sin(gamma) * Math.sqrt(Math.pow(middle.x, 2) + Math.pow(middle.y, 2)))

            a = deg(alpha)
            tr = { x: distance * Math.sin(alpha), y: distance * Math.cos(alpha) }

            if (alpha > A90) {
              tr = { x: tr.x + Math.abs((tr.y * rel.y) / rel.x), y: 0 }
              if (Math.round(tr.x * Math.tan(Math.PI - alpha)) < height) {
                point.y = Math.sqrt(Math.pow(height, 2) + 2 * middle.x * rel.x)
                if (top) point.y = height - point.y
                return compute()
              }

              let beta = Math.PI - alpha
              let dd = h - height / Math.sin(beta)
              mv = {
                x: Math.round(dd * Math.cos(beta)) * (left ? -1 : 1),
                y: Math.round(dd * Math.sin(beta)) * (top ? -1 : 1),
              }
            }
            let px = Math.round(tr.y / Math.tan(alpha) + tr.x)
            let side = width - px
            let sideX = side * Math.cos(alpha * 2)
            let sideY = side * Math.sin(alpha * 2)
            df = { x: Math.round(left ? side - sideX : px + sideX), y: Math.round(top ? sideY : height - sideY) }

            // Gradients
            if (turnData.opts.gradients) {
              let endingPoint = _c2(point.corner)
              let far = Math.sqrt(Math.pow(endingPoint.x - point.x, 2) + Math.pow(endingPoint.y - point.y, 2)) / width

              gradientSize = side * Math.sin(alpha)
              shadowVal = Math.sin(A90 * (far > 1 ? 2 - far : far))
              gradientOpacity = Math.min(far, 1)
              gradientStartVal = gradientSize > 100 ? (gradientSize - 100) / gradientSize : 0
              gradientEndPointA = {
                x: ((gradientSize * Math.sin(alpha)) / width) * 100,
                y: ((gradientSize * Math.cos(alpha)) / height) * 100,
              }
              if (_backGradient()) {
                gradientEndPointB = {
                  x: ((gradientSize * 1.2 * Math.sin(alpha)) / width) * 100,
                  y: ((gradientSize * 1.2 * Math.cos(alpha)) / height) * 100,
                }
                if (!left) gradientEndPointB.x = 100 - gradientEndPointB.x
                if (!top) gradientEndPointB.y = 100 - gradientEndPointB.y
              }
            }
            tr.x = Math.round(tr.x)
            tr.y = Math.round(tr.y)
          }

          let transf = function(tr, cssA, x, a) {
            let mvW = ((width - h) * x[0]) / 100
            let mvH = ((height - h) * x[1]) / 100
            let aliasingFk = a !== 90 && a !== -90 ? (left ? -1 : 1) : 0
            let origin = `${x[0]}% ${x[1]}%`

            css(flipElt.style, cssA)
            transform(flipElt.style, rotate(a) + translate(tr.x + aliasingFk, tr.y, ac), origin)
            css(f.fpage.style, cssA)
            transform(
              f.fpage.style,
              rotate(a) +
                translate(tr.x + df.x - mv.x - (width * x[0]) / 100, tr.y + df.y - mv.y - (height * x[1]) / 100, ac) +
                rotate((180 / a - 2) * a),
              origin,
            )
            transform(f.wrapper.style, translate(-tr.x + mvW - aliasingFk, -tr.y + mvH, ac) + rotate(-a), origin)
            transform(f.fwrapper.style, translate(-tr.x + mv.x + mvW, -tr.y + mv.y + mvH, ac) + rotate(-a), origin)

            if (turnData.opts.gradients) {
              if (x[0]) gradientEndPointA.x = 100 - gradientEndPointA.x
              if (x[1]) gradientEndPointA.y = 100 - gradientEndPointA.y
              _foldingPage().style.boxShadow = `0 0 20px rgba(0,0,0,${0.5 * shadowVal})`
              gradient(f.ashadow, { x: left ? 100 : 0, y: top ? 0 : 100 }, gradientEndPointA, [
                [gradientStartVal, 'rgba(0,0,0,0)'],
                [(1 - gradientStartVal) * 0.8 + gradientStartVal, `rgba(0,0,0,${0.2 * gradientOpacity})`],
                [1, `rgba(255,255,255,${0.2 * gradientOpacity})`],
              ])
              if (_backGradient())
                gradient(f.bshadow, { x: left ? 0 : 100, y: top ? 0 : 100 }, gradientEndPointB, [
                  [0.6, 'rgba(0,0,0,0)'],
                  [0.8, `rgba(0,0,0,${0.3 * gradientOpacity})`],
                  [1, 'rgba(0,0,0,0)'],
                ])
            }
          }
          switch (point.corner) {
            case 'tl':
              point.x = Math.max(point.x, 1)
              compute()
              transf(tr, { left: 'auto', top: 0, right: 0, bottom: 'auto' }, [100, 0], a)
              break
            case 'tr':
              point.x = Math.min(point.x, width - 1)
              compute()
              transf({ x: -tr.x, y: tr.y }, { left: 0, top: 0, right: 0, bottom: 'auto' }, [0, 0], -a)
              break
            case 'bl':
              point.x = Math.max(point.x, 1)
              compute()
              transf({ x: tr.x, y: -tr.y }, { left: 'auto', top: 'auto', right: 0, bottom: 0 }, [100, 100], -a)
              break
            case 'br':
              point.x = Math.min(point.x, width - 1)
              compute()
              transf({ x: -tr.x, y: -tr.y }, { left: 0, top: 'auto', right: 'auto', bottom: 0 }, [0, 100], a)
              break
          }
          break
      }
      f.point = point
    }

    function _showFoldedPage(c, animate) {
      let folding = _foldingPage()
      let f = data.f
      let visible = f.visible

      if (folding) {
        if (!visible || !f.point || f.point.corner !== c.corner) {
          let corner = 'hover' === f.status || 'peel' === f.status || f.opts.turnData.mouseAction ? c.corner : null
          visible = false
          if (!trigger('start', flipElt, [f.opts, corner])) return false
        }
        if (animate) {
          let point = f.point && f.point.corner === c.corner ? f.point : _c(c.corner, 1)
          animatef({
            from: [point.x, point.y],
            to: [c.x, c.y],
            duration: 500,
            frame: v => {
              c.x = Math.round(v[0])
              c.y = Math.round(v[1])
              _fold(c)
            },
          })
        } else {
          _fold(c)
          if (data.effect && !data.effect.turning) animatef(false)
        }
        if (!visible) {
          switch (f.effect) {
            case 'hard':
              f.visible = true
              moveFoldingPage(true)
              f.fpage.style.display = ''
              if (f.opts.shadows) f.bshadow.style.display = ''
              break
            case 'sheet':
              f.visible = true
              f.fparent.style.display = ''
              f.fparent.setAttribute('data-flips', +f.fparent.getAttribute('data-flips') + 1)
              moveFoldingPage(true)
              f.fwrapper.style.display = ''
              if (f.bshadow) f.bshadow.style.display = ''
              break
          }
        }
        return true
      }
      return false
    }
  }
}
