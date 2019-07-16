import { combineReducers } from 'redux'

import flash from '../components/flash/Reducer'
import app from '../views/app/Reducer'
import api from '../api/Reducer'
import i18n from '../i18n/hot-intl-provider/HotIntlProviderReducer'

const rootReducer = combineReducers({
  i18n,
  flash,
  app,
  api,
})

export default rootReducer
