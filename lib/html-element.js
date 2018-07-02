// Element.matches() polyfill
let proto = 'undefined' !== typeof Element ? Element.prototype : {} // Check because it could be executed by node
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
