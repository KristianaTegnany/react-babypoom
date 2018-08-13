function unsupportedLocales(locales) {
  if ('undefined' === typeof window) return []
  if (
    !(
      'Intl' in window &&
      'DateTimeFormat' in window.Intl &&
      'supportedLocalesOf' in window.Intl.DateTimeFormat &&
      'NumberFormat' in window.Intl &&
      'supportedLocalesOf' in window.Intl.NumberFormat
    )
  ) {
    return locales
  }
  let unsupported = []
  ;['NumberFormat', 'DateTimeFormat'].forEach(function(type) {
    let supported = window.Intl[type].supportedLocalesOf(locales)
    if (supported.length != locales.length) {
      unsupported.push.apply(unsupported, locales.filter(l => !supported.includes(l)))
    }
  })
  // Uniq
  return unsupported.filter((value, index, self) => self.indexOf(value) === index)
}

export default function loadIntl(locales, callback) {
  let unsupported = unsupportedLocales(locales)
  if (!unsupported.length) return callback()
  var script = document.createElement('script')
  script.src = `//polyfill.io/v2/polyfill.min.js?features=${unsupported.map(loc => `Intl.~locale.${loc}`).join(',')}`
  script.onload = function() {
    callback()
  }
  script.onerror = function() {
    alert('Error. Please try again later')
  }
  document.head.appendChild(script)
}
