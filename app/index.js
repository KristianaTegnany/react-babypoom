import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';


import configureStore from './store/configureStore';
import Root from './containers/Root';

import HotIntlProvider from './i18n/hot-intl-provider/HotIntlProvider';
import { updateLocale } from './i18n/hot-intl-provider/HotIntlProviderActions';

import 'isomorphic-fetch';

// Store
const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

// i18n
import { messages } from './i18n/messages';

// TODO: detect browser locale
updateLocale('fr')(store.dispatch);


render(
  <Provider store={store}>
    <HotIntlProvider allMessages={{ ...messages }}>
      <Root history={history} />
    </HotIntlProvider>
  </Provider>,
  document.getElementById('root')
);


if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NewRoot = require('./containers/Root').default;
    const AppContainer = require('react-hot-loader').AppContainer;
    let m = { ...messages };

    render(
      <Provider store={store}>
        <HotIntlProvider allMessages={m}>
          <AppContainer>
            <NewRoot history={history}/>
          </AppContainer>
        </HotIntlProvider>
      </Provider>,
      document.getElementById('root')
    );
  });

  module.hot.addStatusHandler(function(status) {
    if ('ready' === status) {
      document.querySelectorAll('link[href][rel=stylesheet]').forEach((link) => {
        link.href = link.href.replace(/(\?\d+)?$/, `?${Date.now()}`);
      });
    }
  })
}
