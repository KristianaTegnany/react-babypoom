import config from '../../config'
import { START_FETCHING, STOP_FETCHING } from './Reducer'
import { flash } from '../components/flash/Actions'
import { defineMessages } from 'react-intl'

const API_URL = `${config.SERVER_URL}/api/v2/`

export default function api(opts, cb) {
  return dispatch => {
    let path, error
    if (typeof opts === 'string') {
      path = opts
    } else {
      path = opts.path
      error = opts.error
      delete opts.path
      delete opts.error
    }
    dispatch({ type: START_FETCHING })
    return apiFetch(path, opts)
      .then(val => {
        cb && cb(val)
        dispatch({ type: STOP_FETCHING })
        return val
      })
      .catch(val => {
        dispatch({ type: STOP_FETCHING })
        flash('danger', error || MSG.error)(dispatch)
        return val
      })
  }
}

const defaultOptions = {
  type: 'json',
}

const CONTENT_TYPE_HEADERS = {
  json: 'application/json',
}

function apiFetch(path, options = {}) {
  options = { ...defaultOptions, ...options }

  const fetchOptions = {
    method: options.method,
    headers: {},
  }

  // Data
  if (options.data) {
    if (!options.method || 'get' === options.method.toLowerCase()) {
      path += (path.indexOf('?') >= 0 ? '&' : '?') + toQueryString(options.data)
    } else {
      fetchOptions.body = JSON.stringify(options.data)
    }
  }

  // Headers
  fetchOptions.headers['Content-Type'] = CONTENT_TYPE_HEADERS[options.type]
  Object.keys(options.headers || {}).forEach(headerKey => {
    fetchOptions.headers[headerKey] = options.headers[headerKey]
  })

  // eslint-disable-next-line no-undef
  return new Promise(function(resolve, reject) {
    fetch(API_URL + path, fetchOptions)
      .then(response => {
        if ((response.status >= 200 && response.status < 300) || response.status === 304) {
          return resolve(response[options.type]())
        }
        reject(response)
      })
      .catch(reject)
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

const MSG = defineMessages({
  error: {
    id: 'app.request.error',
    defaultMessage: 'Une erreur est survenue. \nVeuillez réessayer plus tard.',
  },
})
