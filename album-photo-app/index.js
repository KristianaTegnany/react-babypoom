import 'babel-polyfill'

import React from 'react'
import { hydrate } from 'react-dom'
import { Provider } from 'react-redux'

import { BrowserRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import routes from './routes'

import configureStore from './store/configureStore'

import HotIntlProvider from './i18n/hot-intl-provider/HotIntlProvider'
import { updateLocale } from './i18n/hot-intl-provider/HotIntlProviderActions'

import { updateMedia } from './views/app/Actions'

import 'isomorphic-fetch'

import config from '../config/application'

// Lib
import loadIntl from '../lib/intl-detection'
import { REG_PRINT } from '../lib/regs'

// i18n
import availableLocales from '../available-locales'
import { messages } from './i18n/messages'

let locale = availableLocales.defaultLocale
loadIntl([locale].concat(availableLocales), () => {
  // Store
  const initialState = window[config.requestCacheVar]
  let store

  if (initialState) {
    store = configureStore(initialState)
  } else {
    store = configureStore()
    updateLocale('fr')(store.dispatch) // TODO: detect browser locale

    // hd param
    if (REG_PRINT.test(window.location.search)) {
      updateMedia('print')(store.dispatch)
    }
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
