import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import flash from '../components/flash/Reducer'
import mediaQueries from '../components/media-queries/Reducer'
import slideshow from '../components/slideshow/Reducer'
import app from '../views/app/Reducer'
import game from '../views/game/Reducer'
import i18n from '../i18n/hot-intl-provider/HotIntlProviderReducer'

const rootReducer = combineReducers({
  i18n,
  flash,
  mediaQueries,
  form,
  app,
  game,
  slideshow,
})

export default rootReducer
