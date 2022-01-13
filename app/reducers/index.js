import { combineReducers } from "redux";

import flash from "../components/flash/Reducer";
import { reducer as mediaQueries } from "../components/media-queries";
import slideshow from "../components/slideshow/Reducer";
import app from "../views/app/Reducer";
import game1 from "../views/game1/Reducer";
import game2 from "../views/game2/Reducer";
import game3 from "../views/game3/Reducer";
import game4 from "../views/game4/Reducer";
import game5 from "../views/game5/Reducer";
import i18n from "../i18n/hot-intl-provider/HotIntlProviderReducer";

const rootReducer = combineReducers({
  i18n,
  flash,
  mediaQueries,
  app,
  game1,
  game2,
  game3,
  game4,
  game5,
  slideshow,
});

export default rootReducer;
