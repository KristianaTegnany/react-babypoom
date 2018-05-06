import {
  BPOOM,
  CURRENT_STEP,
  STEP_INDEX,
  AVAILABLE_STEPS,
  SAVE_VISITORBOOK_MSG } from './types';

import { NAMES_TO_PATHS } from './steps';

// TODO: store it in the session or localstorage or cookie, with bpoomId /!\ important
let defaultState = {
  bpoom: {},
  currentStep: [...NAMES_TO_PATHS.keys()][0],
  availableSteps: [],
  maxStepIndex: 0,
  stepUnlocked: false,
  cardPreRegistration: {}
};


export default function(state=defaultState, action) {
  switch (action.type) {
    case BPOOM:
      return { ...state, bpoom: action.bpoom };
    case SAVE_VISITORBOOK_MSG:
      let bpoom = { ...state.bpoom };
      let msg = action.visitorbookMsg;
      (bpoom.bp_visitorbook.bp_visitorbook_msgs = bpoom.bp_visitorbook.bp_visitorbook_msgs.slice(0)).push(msg);
      return { ...state, bpoom };
    case CURRENT_STEP:
      return state.currentStep === action.currentStep ? state : { ...state, currentStep: action.currentStep };
    case STEP_INDEX:
      let maxStepIndex = Math.max(state.maxStepIndex, action.stepIndex);
      return maxStepIndex === state.currentStep ? state : { ...state, maxStepIndex };
    case AVAILABLE_STEPS:
      return { ...state, availableSteps: action.availableSteps };
  }
  return state;
}