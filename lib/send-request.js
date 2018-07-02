const defaultOptions = {
  headers: {},
}

// TODO: json by default
export default function(url, options = {}) {
  options = { ...defaultOptions, ...options } // clone

  if (options.data) {
    if (!options.method || 'get' === options.method.toLowerCase()) {
      url += (url.indexOf('?') >= 0 ? '&' : '?') + toQueryString(options.data)
    } else {
      options.body = options.json ? JSON.stringify(options.data) : toQueryString(options.data)
    }
  }
  delete options.data

  if (options.json) {
    options.headers['Content-Type'] = 'application/json'
  } else {
    options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  }
  delete options.json
  delete options.form

  if (options.cors !== false) {
    options.mode = 'cors'
  }
  delete options.cors

  return new Promise(function(resolve, reject) {
    fetch(url, options)
      .then(response => {
        return Promise.all([response, response.json()])
      })
      .then(([response, json]) => {
        if (!response.ok) {
          return reject([json, response]) // TODO: error
        }
        resolve([json, response])
      })
      .catch(error => {
        reject([error]) // TODO: error
      })
  })
}

const RBRACKET_REG = /\[\]$/
const SPACE_REG = /%20/g

function toQueryString(hash) {
  return 'string' === hash
    ? hash
    : buildQuery([], '', hash)
        .join('&')
        .replace(SPACE_REG, '+')
}

function buildQuery(query, prefix, obj) {
  let i, len, key

  if (prefix) {
    if (Array.isArray(obj)) {
      let hasBracket = RBRACKET_REG.test(prefix)
      for (i = 0, len = obj.length; i < len; ++i) {
        if (hasBracket) {
          addToQuery(query, prefix, obj[i])
        } else {
          buildQuery(query, prefix + '[' + (typeof obj[i] === 'object' ? i : '') + ']', obj[i])
        }
      }
    } else if (obj && String(obj) === '[object Object]') {
      for (key in obj) {
        buildQuery(query, prefix + '[' + key + ']', obj[key])
      }
    } else {
      addToQuery(query, prefix, obj)
    }
  } else if (Array.isArray(obj)) {
    for (i = 0, len = obj.length; i < len; ++i) {
      addToQuery(query, obj[i].name, obj[i].value)
    }
  } else {
    for (key in obj) {
      buildQuery(query, key, obj[key])
    }
  }
  return query
}

function addToQuery(query, k, v) {
  query.push(encodeURIComponent(k) + '=' + encodeURIComponent((v = typeof v === 'function' ? v() : v == null ? '' : v)))
}
