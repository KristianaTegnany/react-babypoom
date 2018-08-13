// Element.matches() && Element.closest polyfill
if ('undefined' !== typeof Element) {
  // Check if we are on the server side
  let proto = Element.prototype
  if (!proto.matches) {
    proto.matches =
      proto.matchesSelector ||
      proto.mozMatchesSelector ||
      proto.msMatchesSelector ||
      proto.oMatchesSelector ||
      proto.webkitMatchesSelector ||
      function(s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
          i = matches.length
        while (--i >= 0 && matches.item(i) !== this) {}
        return i > -1
      }
  }

  if (!Element.prototype.closest)
    Element.prototype.closest = function(s) {
      var el = this
      if (!document.documentElement.contains(el)) return null
      do {
        if (el.matches(s)) return el
        el = el.parentElement || el.parentNode
      } while (el !== null && el.nodeType === 1)
      return null
    }
}

export function getClosest(elem, selector) {
  for (; elem && elem !== document; elem = elem.parentNode) {
    if (elem.matches(selector)) return elem
  }
  return null
}

export function eventDelegation(eventName, selector, func) {
  let selectorPlus = selector
    .split(',')
    .map(s => s + ' *')
    .join(',')
  document.addEventListener(eventName, event => {
    if (event.target.matches(selector)) {
      event.currTarget = event.target
      func(event)
    }
    if (event.target.matches(selectorPlus)) {
      event.currTarget = getClosest(event.target, selector)
      func(event)
    }
  })
}
