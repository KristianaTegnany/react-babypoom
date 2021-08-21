import { BPOOM, PARAMS } from './types'
import api from '../../api'

export const fetchBpoom = uuid =>
  api({
    path: `/album/bpooms/${uuid}`,
    success: (bpoom, dispatch) => dispatch({ type: BPOOM, bpoom }),
  })

export const updateParams = params => dispatch => dispatch({ type: PARAMS, params })

export const fetchStripeSession = () =>
  api({
    path: `/album/stripe`,
    success: (bpoom, dispatch) => dispatch({ type: BPOOM, bpoom }),
  })
