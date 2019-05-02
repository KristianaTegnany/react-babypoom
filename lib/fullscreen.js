const REQUEST_FULLSCREEN_PREFIXES = ['request', 'webkitRequest', 'mozRequest', 'msRequest']
const EXIT_FULLSCREEN_PREFIXES = ['exit', 'webkitExit', 'mozCancel', 'msExit']

let active
let Fullscreen = {
  support: (() =>
    'undefined' !== typeof document &&
    !!EXIT_FULLSCREEN_PREFIXES.find(p => document[`${p}FullScreen`] || document[`${p}Fullscreen`]))(),
  active: () => 'undefined' !== typeof document && !!(document.fullscreen || document.webkitIsFullScreen || active),
  toggle: function(elt) {
    let on = this.active()
    if (on) elt = document
    if (elt) {
      let prop = (on ? EXIT_FULLSCREEN_PREFIXES : REQUEST_FULLSCREEN_PREFIXES).reduce(
        (acc, p, a) => (acc ? acc : elt[(a = `${p}FullScreen`)] ? a : elt[(a = `${p}Fullscreen`)] ? a : ''),
        '',
      )
      if (prop) {
        active = !on
        elt[prop]()
      }
    }
  },
}
active = Fullscreen.active()

export default Fullscreen
