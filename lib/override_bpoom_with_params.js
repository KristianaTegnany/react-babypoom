import isLocalhost from './is-localhost'

// Only override params if it's the dashboard preview
export default function overrideBpoom(bpoom, params, canEdit) {
  if ((params && params['aha']) || (params && params['queryParams'] && params['queryParams']['aha'])) {
    if (bpoom['baby_name'] === '') bpoom['baby_name'] = 'Demo'
    bpoom['size'] = 'XXX'
    bpoom['weight'] = 'XXX'
    bpoom['location_hospital'] = 'XXX'
    bpoom['hair_color'] = 'XXX'
    bpoom['eyes_color'] = 'XXX'
    bpoom['parent_1_name'] = 'Maman'
    bpoom['parent_2_name'] = 'Papa'
    bpoom['parent_1_reaction'] = 'XXXX XXXXXX XXXX 😘'
    bpoom['parent_2_reaction'] = 'XXXX XXXXXX XXXX 🙏'
    bpoom['guest_book_msgs'] = [
      { name: 'ami_demo', message: 'XXXX XXXXXX XXXX 😘' },
      { name: 'amie_demo', message: 'XXXX XXXXXX XXXX 😚' },
      { name: 'frere_demo', message: 'XXXX XXXXXX XXXX 😜' },
      { name: 'soeur_demo', message: 'XXXX XXXXXX XXXX 👏' },
      { name: 'papi_demo', message: 'XXXX XXXXXX XXXX 😍' },
      { name: 'mamie_demo', message: 'XXXX XXXXXX XXXX 🙏' },
    ]
  }
  if (isLocalhost() || canEdit) {
    Object.keys(params).forEach((param) => {
      if (typeof param !== 'string') return
      let keys = param.split('.')
      if (1 === keys.length) {
        if (param in bpoom) {
          bpoom[param] = parseJSON(params[param])
        }
      } else {
        let lastKey = keys.pop()
        let obj = getIn(bpoom, keys)
        if (obj && lastKey in obj) obj[lastKey] = parseJSON(params[param])
      }
    })
  }
  return bpoom
}

// function inIframe() {
//   try {
//     return window.self !== window.top
//   } catch (e) {
//     return true
//   }
// }

function parseJSON(val) {
  try {
    return JSON.parse(val)
  } catch (e) {
    // do nothing
  }
  return val
}

function getIn(h, keys) {
  return keys.reduce((h, k) => (h || {})[k], h)
}
