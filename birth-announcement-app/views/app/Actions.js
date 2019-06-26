import { defineMessages } from 'react-intl'

import { BPOOM, STEPS, NO_NAV, GUEST_BOOK_MSG_SAVE, GUEST_BOOK_MSG_DELETE } from './types'

import apiCall from '../../../api/call'
import { flash } from '../../components/flash/Actions'

import overrideBpoom from '../../../lib/override_bpoom_with_params'

function _exec(url, urlOptions, options, okCallback, koCallback) {
  return function(dispatch) {
    return new Promise(function(resolve, reject) {
      return apiCall('/birth_app' + url, urlOptions)
        .then(([json, response]) => {
          if (okCallback) okCallback(dispatch, json)
          resolve(json)
        })
        .catch(function(args) {
          let [error, response = {}] = [].concat(args)
          if (!options || false !== options.flash) flash('danger', MSG.error)(dispatch)
          if (koCallback) koCallback(dispatch, error, response)
          reject(error)
        })
    })
  }
}

export function loadBpoom(uuid, options) {
  return _exec(
    `/bpooms/${uuid}`,
    { method: 'GET' },
    options,
    (dispatch, json) => {
      let bpoom = overrideBpoom(json, options.queryParams)
      dispatch({ type: BPOOM, bpoom })
    },
    (dispatch, error, response) => {
      if (response && 404 === response.status) {
        dispatch({ type: BPOOM, bpoom: { not_found: true } })
      }
    },
  )
}

export function saveMsg(uuid, params, options) {
  return _exec(`/guest_book_msgs/${uuid}`, { method: 'POST', data: params }, options, (dispatch, json) => {
    dispatch({ type: GUEST_BOOK_MSG_SAVE, guestBookMsg: json })
  })
}

export function deleteMsg(id, uuid, options) {
  return _exec(`/guest_book_msgs/${id}/${uuid}`, { method: 'DELETE' }, options, (dispatch, json) => {
    dispatch({ type: GUEST_BOOK_MSG_DELETE, id: json.id })
  })
}

export function saveMangopayAccount(data, options) {
  return _exec(`/mangopay_accounts`, { method: 'POST', data: data }, options)
}

export function saveMangopayPayment(uuid, data, options) {
  data.uuid = uuid
  return _exec(`/mangopay_payments`, { method: 'POST', data: data }, options)
}

export function updateStep(steps, callback) {
  return function(dispatch) {
    dispatch({ type: STEPS, steps })
    callback && callback(dispatch)
  }
}

export function updateNoNav(noNav, callback) {
  return function(dispatch) {
    dispatch({ type: NO_NAV, noNav })
    callback && callback(dispatch)
  }
}

const MSG = defineMessages({
  error: {
    id: 'app.request.error',
    defaultMessage: 'Une erreur est survenue. \nVeuillez réessayer plus tard.',
  },
})
