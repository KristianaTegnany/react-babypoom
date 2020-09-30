import isLocalhost from './is-localhost'
import imgPath from './img-path'
import { createPhotoURLs } from './get-photo'
import config from '../config'

const DEMO_BPOOM = (function () {
  const qs = config.avatarBackgroundQuerystring

  return {
    // TODO: translate
    photo_urls: createPhotoURLs(imgPath('/avatars/baby.svg' + qs)),
    baby_name: 'Demo',
    parent_1_name: 'Maman',
    parent_2_name: 'Papa',
    size: 'XXX',
    weight: 'XXX',
    location_hospital: 'XXX',
    hair_color: 'XXX',
    eyes_color: 'XXX',
    parent_1_photo_urls: createPhotoURLs(imgPath('/avatars/parent-1.svg' + qs)),
    parent_2_photo_urls: createPhotoURLs(imgPath('/avatars/parent-2.svg' + qs)),
    parent_1_reaction: 'XXXX XXXXXX XXXX 😘',
    parent_2_reaction: 'XXXX XXXXXX XXXX 🙏',
    guest_book_msgs: [
      { name: 'ami_demo', message: 'XXXX XXXXXX XXXX 😘' },
      { name: 'amie_demo', message: 'XXXX XXXXXX XXXX 😚' },
      { name: 'frere_demo', message: 'XXXX XXXXXX XXXX 😜' },
      { name: 'soeur_demo', message: 'XXXX XXXXXX XXXX 👏' },
      { name: 'papi_demo', message: 'XXXX XXXXXX XXXX 😍' },
      { name: 'mamie_demo', message: 'XXXX XXXXXX XXXX 🙏' },
    ],
  }
})()

// Only override params if it's the dashboard preview
export default function overrideBpoom(bpoom, params, canEdit) {
  if (params.aha || (params.queryParams || {}).aha) {
    Object.keys(DEMO_BPOOM).forEach((prop) => {
      if (
        !bpoom[prop] ||
        (Array.isArray(bpoom[prop]) && !bpoom[prop].length) ||
        (typeof bpoom[prop] === 'object' && !Object.keys(bpoom[prop]).length)
      )
        bpoom[prop] = DEMO_BPOOM[prop]
    })
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
