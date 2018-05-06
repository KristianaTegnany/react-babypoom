import { defineMessages } from 'react-intl';

import { BPOOM,
  CURRENT_STEP,
  STEP_INDEX,
  AVAILABLE_STEPS,
  SAVE_VISITORBOOK_MSG } from './types';

import apiCall from '../../api/call';
import { flash } from '../../components/flash/Actions';


export function loadBpoom({ uuid }, callback) {
  return function(dispatch) {
    return apiCall(dispatch, `/bpooms/${uuid}`, { method: 'GET' }).then((json) => {
      dispatch({ type: AVAILABLE_STEPS, availableSteps: json.available_steps });
      delete json.available_steps;
      dispatch({ type: BPOOM, bpoom: json });
      callback && callback(dispatch);
    }).catch(data => flash('danger', MSG.error)(dispatch));
  }
}

export function saveMsg({ uuid }, params) {
  return function(dispatch) {
    return new Promise(function(resolve, reject) {
      return apiCall(dispatch, `/bp_visitorbook_msgs/${uuid}`, {
        method: 'POST',
        data: params
      }).then((json) => {
        dispatch({ type: SAVE_VISITORBOOK_MSG, visitorbookMsg: json });
        resolve(dispatch, json);
      }).catch(data => {
        reject(dispatch, data);
        flash('danger', MSG.error)(dispatch);
      });
    });
  }
}

export function saveMangopayAccount(params) {
  return function(dispatch) {
    return new Promise(function(resolve, reject) {
      return apiCall(dispatch, `/mangopay_accounts`, {
        method: 'POST',
        data: params
      }).then((json) => {
        resolve(json);
      }).catch(data => {
        reject(dispatch, data);
        flash('danger', MSG.error)(dispatch);
      });
    });
  }
}

export function saveMangopayPayment({ uuid }, params) {
  params.uuid = uuid;
  return function(dispatch) {
    return new Promise(function(resolve, reject) {
      return apiCall(dispatch, `/mangopay_payments`, {
        method: 'POST',
        data: params
      }).then((json) => {
        resolve(json);
      }).catch(data => {
        reject(dispatch, data);
        // No need to display an error. Especially if the payment is ok.
      });
    });
  }
}

export function updateStep({ step }, callback) {
  return function(dispatch) {
    dispatch({ type: CURRENT_STEP, currentStep: step });
    callback && callback(dispatch);
  }
}

export function updateStepIndex({ stepIndex }, callback) {
  return function(dispatch) {
    dispatch({ type: STEP_INDEX, stepIndex });
    callback && callback(dispatch);
  }
}


const MSG = defineMessages({
  error: {
    id: 'app.request.error',
    defaultMessage: "Une erreur est survenue. \nVeuillez réessayer plus tard."
  }
});