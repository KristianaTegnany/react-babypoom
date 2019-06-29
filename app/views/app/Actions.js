import { BPOOM, PARAMS } from './types'
import api from '../../api'

export const loadBpoom = uuid => dispatch =>
  api(`/album/bpooms/${uuid}`, bpoom => dispatch({ type: BPOOM, bpoom }))(dispatch)

export function updateParams(params) {
  return function(dispatch) {
    dispatch({ type: PARAMS, params })
  }
}
