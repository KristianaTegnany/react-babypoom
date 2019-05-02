import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import flash from '../components/flash/Reducer'
import { reducer as mediaQueries } from '../components/media-queries'
import slideshow from '../components/slideshow/Reducer'
import app from '../views/app/Reducer'
import game1 from '../views/game1/Reducer'
import game2 from '../views/game2/Reducer'
import game3 from '../views/game3/Reducer'
import i18n from '../i18n/hot-intl-provider/HotIntlProviderReducer'

const rootReducer = combineReducers({
  i18n,
  flash,
  mediaQueries,
  form,
  app,
  game1,
  game2,
  game3,
  slideshow,
})

export default rootReducer
