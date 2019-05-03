import React from 'react'
import { hydrate } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { renderRoutes } from 'react-router-config'

import routes from './routes'

import configureStore from './store/configureStore'

import HotIntlProvider from './i18n/hot-intl-provider/HotIntlProvider'

import 'isomorphic-fetch'

import config from '../config/application'

// i18n
import { FormattedMessage } from 'react-intl'
import './i18n/messages/metas' // Just to be extracted by babel-plugin-react-intl
import Validators from 'redux-form-validators'
import './i18n/messages/redux-form-validators'

// Bootstrap
import Bootstrap from '../config/bootstrap/bootstrap.scss'
import { setGlobalCssModule } from 'reactstrap/lib/utils'
setGlobalCssModule(Bootstrap)

Validators.formatMessage = function(msg) {
  return <FormattedMessage {...msg.props || msg} />
}

let store = configureStore(window[config.requestCacheVar])
hydrate(
  <Provider store={store}>
    <HotIntlProvider>
      <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
    </HotIntlProvider>
  </Provider>,
  document.getElementById('root'),
)
