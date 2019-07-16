import 'babel-polyfill'

import React from 'react'
import { hydrate } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import routes from './routes'
import configureStore from './store/configureStore'
import HotIntlProvider from './i18n/hot-intl-provider/HotIntlProvider'
import { updateParams } from './views/app/Actions'
import 'isomorphic-fetch'
import config from '../config'
import isLocalhost from '../lib/is-localhost'
import { queryParams } from '../lib/url-params'

if (!isLocalhost() && typeof document !== 'undefined')
  document.domain = location.hostname
    .split('.')
    .slice(-2)
    .join('.')

// Store
const initialState = window[config.requestCacheVar]
let store

if (initialState) {
  store = configureStore(initialState)
} else {
  store = configureStore()
  updateParams(queryParams(window.location.search))(store.dispatch)
}

hydrate(
  <Provider store={store}>
    <HotIntlProvider>
      <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
    </HotIntlProvider>
  </Provider>,
  document.getElementById('root'),
)
