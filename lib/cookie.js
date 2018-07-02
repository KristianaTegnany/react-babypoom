export default class {
  static set(name, value, ttl, domain) {
    let expires = ''
    if (ttl) {
      var date = new Date()
      date.setTime(date.getTime() + ttl * 60 * 1000)
      expires = '; expires=' + date.toGMTString()
    }
    if ('undefined' !== typeof document) {
      document.cookie = name + '=' + escape(value) + expires + (domain || '') + '; path=/'
    }
    return value
  }

  static get(name) {
    if ('undefined' === typeof document) return null
    let nameEQ = name + '='
    let ca = document.cookie.split(';')
    for (let i = 0, c; i < ca.length; ++i) {
      c = ca[i]
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length)
      }
      if (c.indexOf(nameEQ) === 0) {
        return unescape(c.substring(nameEQ.length, c.length))
      }
    }
    return null
  }

  static destroy(name) {
    this.set(name, '', -1)
  }
}
