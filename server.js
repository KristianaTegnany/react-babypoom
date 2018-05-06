var express = require('express')
var path = require('path')
var compression = require('compression')
var fs = require('fs')

// import React from 'react'
// import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
// import { Provider } from 'react-redux';

// import HotIntlProvider from './app/i18n/hot-intl-provider/HotIntlProvider';
// import configureStore from './app/store/configureStore';
import routes from './app/routes'

// import { messages, setup } from './app/i18n/messages';

// var stats = JSON.parse(fs.readFileSync("./public/webpack.stats.json"));

var app = express()
app.use(compression()) // must be first!

// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, 'public')))

app.get('*', (req, res) => {

  // let store = configureStore();
  // setup('fr')(store.dispatch);

  match({ routes: routes, location: req.url }, (err, redirect, props) => {
    // in here we can make some decisions all at once
    if (err) {
      // there was an error somewhere during route matching
      res.status(500).send(err.message)
    } else if (redirect) {
      // we haven't talked about `onEnter` hooks on routes, but before a
      // route is entered, it can redirect. Here we handle on the server.
      res.redirect(redirect.pathname + redirect.search)
    } else if (props) {
      // if we got props then we matched a route and can render


      // const appHtml = renderToString(
      //   <Provider store={store}>
      //     <HotIntlProvider allMessages={{ ...messages }}>
      //       <RouterContext {...props}/>
      //     </HotIntlProvider>
      //   </Provider>
      // )
      // res.send(renderPage(appHtml))
      res.send(renderPage(''));
    } else {
      // no errors, no redirect, we just didn't match anything
      res.status(404).send('Not Found')
    }
  })
});

var pageCache;
function renderPage(appHtml) {
  if (!pageCache) {
    var cache = fs.readFileSync(path.join(__dirname, 'public', 'index.html')).toString();
    pageCache = cache.split('<div id="root"></div>');
    pageCache[0] += '<div id="root">';
    pageCache[1] = '</div>' + pageCache[1];
  }
  return pageCache[0] + appHtml + pageCache[1];
}

var PORT = process.env.PORT || 8080;
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
});
