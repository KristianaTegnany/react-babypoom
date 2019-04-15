export default function overrideBpoom(bpoom, params) {
  if (params.edit) {
    Object.keys(params).forEach(param => {
      if (typeof param !== 'string') return
      let keys = param.split('.')
      if (1 === keys.length) {
        if (param in bpoom) bpoom[param] = parseJSON(params[param])
      } else {
        let lastKey = keys.pop()
        let obj = getIn(bpoom, keys)
        if (obj && lastKey in obj) obj[lastKey] = parseJSON(params[param])
      }
    })
  }
  return bpoom
}

function parseJSON(val) {
  try {
    return JSON.parse(val)
  } catch (e) {}
  return val
}

function getIn(h, keys) {
  return keys.reduce((h, k) => (h || {})[k], h)
}
