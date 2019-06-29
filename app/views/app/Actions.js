import { BPOOM, PARAMS } from './types'
import api from '../../api'

export const fetchBpoom = uuid => api(`/album/bpooms/${uuid}`, (bpoom, dispatch) => dispatch({ type: BPOOM, bpoom }))

export const updateParams = params => dispatch => dispatch({ type: PARAMS, params })
