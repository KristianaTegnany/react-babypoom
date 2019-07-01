import { BPOOM, STEPS, NO_NAV, GUEST_BOOK_MSG_SAVE, GUEST_BOOK_MSG_DELETE } from './types'
import overrideBpoom from '../../../lib/override_bpoom_with_params'
import api from '../../api'

export const fetchBpoom = (uuid, queryParams = {}) =>
  api({
    path: `/birth_app/bpooms/${uuid}`,
    success: (bpoom, dispatch) => dispatch({ type: BPOOM, bpoom: overrideBpoom(bpoom, queryParams) }),
  })

export const saveMsg = (uuid, guest_book_msg) =>
  api({
    path: `/birth_app/guest_book_msgs/${uuid}`,
    method: 'POST',
    data: { guest_book_msg },
    success: (guestBookMsg, dispatch) => dispatch({ type: GUEST_BOOK_MSG_SAVE, guestBookMsg }),
  })

export const deleteMsg = (id, uuid) =>
  api({
    path: `/birth_app/guest_book_msgs/${id}/${uuid}`,
    method: 'DELETE',
    success: (json, dispatch) => dispatch({ type: GUEST_BOOK_MSG_DELETE, id: json.id }),
  })

export const saveMangopayAccount = mangopay_account =>
  api({
    path: `/birth_app/mangopay_accounts`,
    method: 'POST',
    data: { mangopay_account },
  })

export const saveMangopayPayment = mangopay_payment =>
  api({
    path: `/birth_app/mangopay_payments`,
    method: 'POST',
    data: { mangopay_payment },
  })

export const updateStep = (steps, callback) => dispatch => {
  dispatch({ type: STEPS, steps })
  callback && callback(dispatch)
}

export const updateNoNav = (noNav, callback) => dispatch => {
  dispatch({ type: NO_NAV, noNav })
  callback && callback(dispatch)
}
