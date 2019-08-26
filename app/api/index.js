import config from '../../config'
import { START_FETCHING, STOP_FETCHING } from './Reducer'
import { flash } from '../components/flash/Actions'
import { defineMessages } from 'react-intl'
import { toQueryString } from '../../lib/url-params'

const API_URL = `${config.SERVER_URL}/api/v2/`

export default function api({ path, error, fail, success, complete, beforeSend, ...fetchOptions }) {
  return dispatch => {
    dispatch({ type: START_FETCHING })
    if (beforeSend) beforeSend(dispatch)

    return request(API_URL + path, fetchOptions)
      .then(val => {
        dispatch({ type: STOP_FETCHING })
        if (success) success(val, dispatch)
        if (complete) complete(val, dispatch)
        return val
      })
      .catch(val => {
        dispatch({ type: STOP_FETCHING })

        if (fail) {
          fail(val, dispatch)
        } else {
          flash('danger', error || MSG.error)(dispatch)
        }
        if (complete) complete(val, dispatch)
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

export function request(path, options = {}) {
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
    fetch(path, fetchOptions)
      .then(response => {
        if ((response.status >= 200 && response.status < 300) || response.status === 304) {
          return resolve(response[options.type]())
        }
        reject(response)
      })
      .catch(reject)
  })
}

const MSG = defineMessages({
  error: {
    id: 'app.request.error',
    defaultMessage: 'Une erreur est survenue. \nVeuillez réessayer plus tard.',
  },
})
