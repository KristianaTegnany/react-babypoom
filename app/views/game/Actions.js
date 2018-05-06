import { GUESSED } from './types';


export function updateGuessed(vars, callback) {
  return function(dispatch) {
    dispatch({ ...vars, type: GUESSED });
    callback && callback();
  }
}

