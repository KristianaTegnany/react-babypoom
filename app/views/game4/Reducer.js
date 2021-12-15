import { GAME_OVER_GAME_4 } from "./types";

let defaultState = {
  win: false,
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case GAME_OVER_GAME_4:
      return {
        ...state,
        win: true,
      };
  }
  return state;
}
