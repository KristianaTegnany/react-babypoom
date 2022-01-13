import { GAME_OVER_GAME_5 } from "./types";

let defaultState = {
  win: false,
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case GAME_OVER_GAME_5:
      return {
        ...state,
        win: true,
      };
  }
  return state;
}
