import { defineMessages } from 'react-intl'

import { BPOOM } from './types'

import apiCall from '../../../api/call'
import { flash } from '../../components/flash/Actions'

function _exec(url, urlOptions, options, okCallback, koCallback) {
  return function(dispatch) {
    return new Promise(function(resolve, reject) {
      return apiCall(url, urlOptions)
        .then(([json, response]) => {
          if (okCallback) okCallback(dispatch, json)
          resolve(json)
        })
        .catch(function([error, response]) {
          if (!options || false !== options.flash)
            flash('danger', MSG.error)(dispatch)
          if (koCallback) koCallback(dispatch, error, response)
          reject(error)
        })
    })
  }
}

export function loadBpoom(uuid, options) {
  return _exec(
    `/bpooms/photo-album-data/${uuid}`,
    { method: 'GET' },
    options,
    (dispatch, json) => {
      dispatch({ type: BPOOM, bpoom: json })
    },
    (dispatch, error, response) => {
      if (response && 404 === response.status) {
        dispatch({ type: BPOOM, bpoom: { not_found: true } })
      }
    },
  )
}

const MSG = defineMessages({
  error: {
    id: 'app.request.error',
    defaultMessage: 'Une erreur est survenue. \nVeuillez réessayer plus tard.',
  },
})
