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
