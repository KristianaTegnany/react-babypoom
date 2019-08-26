const HAS_PROP = {}.hasOwnProperty

const REG_SEP = /^.*?\?/

export function queryParams(queryString) {
  let array = (queryString || '').replace(REG_SEP, '').split('&'),
    hash = {},
    pair
  for (let i = 0, len = array.length; i < len; ++i) {
    pair = array[i]
    if ((pair = pair.split('='))[0]) {
      let key = decodeURIComponent(pair.shift()),
        value = pair.length > 1 ? pair.join('=') : pair[0]
      if (value != undefined) value = decodeURIComponent(value)
      if (key in hash && key.endsWith('[]')) {
        if (!Array.isArray(hash[key])) hash[key] = [hash[key]]
        hash[key].push(value)
      } else {
        hash[key] = value
      }
    }
  }
  return hash
}

export function hasParam(queryString, paramName) {
  return HAS_PROP.call(queryParams(queryString), paramName)
}

const RBRACKET_REG = /\[\]$/
const SPACE_REG = /%20/g

export function toQueryString(hash) {
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
