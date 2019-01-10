import React from 'react'
import { hydrate } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { renderRoutes } from 'react-router-config'

import routes from './routes'

import configureStore from './store/configureStore'

// import { NAMES_TO_PATHS } from './views/app/steps'

import HotIntlProvider from './i18n/hot-intl-provider/HotIntlProvider'
import { updateLocale } from './i18n/hot-intl-provider/HotIntlProviderActions'

import 'isomorphic-fetch'

import config from '../config/application'

// Lib
import loadIntl from '../lib/intl-detection'

// i18n
import availableLocales from '../available-locales'
import { messages } from './i18n/messages'
import './i18n/messages/metas' // Just to be extracted by babel-plugin-react-intl

// Bootstrap
import Bootstrap from '../config/bootstrap/bootstrap.scss'
import { setGlobalCssModule } from 'reactstrap/lib/utils'
setGlobalCssModule(Bootstrap)

loadIntl([availableLocales.defaultLocale].concat(availableLocales), () => {
  // Store
  const initialState = window[config.requestCacheVar]
  let store

  if (initialState) {
    store = configureStore(initialState)
  } else {
    store = configureStore()
    updateLocale('fr')(store.dispatch) // TODO: detect browser locale
  }

  hydrate(
    <Provider store={store}>
      <HotIntlProvider>
        <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
      </HotIntlProvider>
    </Provider>,
    document.getElementById('root'),
  )
})
