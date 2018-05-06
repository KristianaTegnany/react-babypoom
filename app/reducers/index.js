import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import flash from '../components/flash/Reducer';
import app from '../views/app/Reducer';
import game from '../views/game/Reducer';
import i18n from '../i18n/hot-intl-provider/HotIntlProviderReducer';

const rootReducer = combineReducers({
  routing,
  i18n,
  flash,
  form,
  app,
  game
});

export default rootReducer;
