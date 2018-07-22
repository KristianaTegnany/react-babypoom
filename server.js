import express from 'express'
import createLocaleMiddleware from 'express-locale'
import path from 'path'
import compression from 'compression'
import fs from 'fs'

import React from 'react'
import { renderToString } from 'react-dom/server'
import StaticRouter from 'react-router-dom/StaticRouter'
import { matchRoutes, renderRoutes } from 'react-router-config'
import { RouterContext } from 'react-router'
import { Provider } from 'react-redux'

import HotIntlProvider from './birth-announcement-app/i18n/hot-intl-provider/HotIntlProvider'
import { updateLocale } from './birth-announcement-app/i18n/hot-intl-provider/HotIntlProviderActions'
import configureStore from './birth-announcement-app/store/configureStore'
import routes from './birth-announcement-app/routes'

import { messages } from './birth-announcement-app/i18n/messages'
import availableLocales from './available-locales'

import 'isomorphic-fetch'
import { loadBpoom } from './birth-announcement-app/views/app/Actions'
import config from './config/application'

// var stats = JSON.parse(fs.readFileSync("./public/webpack.stats.json"));

var PORT = process.env.PORT || 8080

var ALL_LOCALES = [availableLocales.defaultLocale].concat(availableLocales)

var app = express()
app.disable('x-powered-by')
app.use(compression()) // must be first!
app.use(createLocaleMiddleware()) // detect locale

// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, 'public')))

app.get('*', (req, res) => {
  // const branch = matchRoutes(routes, req.url)
  // const promises = branch.map(({ route, match }) => {
  //   let fetchData = route.component.fetchData
  //   return fetchData instanceof Function ? fetchData(store, match.params) : Promise.resolve(null)
  // })
  // return Promise.all(promises).then(data => {

  // })

  const branch = matchRoutes(routes, req.url)
  if (branch.length) {
    let { route, match } = branch[0]

    let lang = req.locale.language
    if (!lang || !ALL_LOCALES.includes(lang)) lang = ALL_LOCALES[0]

    // SERVER SIDE RENDERING
    let store = configureStore()
    updateLocale(lang)(store.dispatch)

    let component = route.component
    while (component.WrappedComponent) component = component.WrappedComponent

    component
      .fetchData(store, match.params)
      .then(bpoom => {
        let metas = {
          title: interpolateMetaTitle(messages[lang]['metas.title'], bpoom),
          description: interpolateMetaDescription(messages[lang]['metas.description'], bpoom),
          image: bpoom.photo_mum,
        }

        // let context = {}
        // const content = renderToString(
        //   <Provider store={store}>
        //     <HotIntlProvider>
        //       <StaticRouter location={req.url} context={context}>
        //         {renderRoutes(routes)}
        //       </StaticRouter>
        //     </HotIntlProvider>
        //   </Provider>
        // )

        res.send(
          renderPage(
            '',
            match.params.uuid,
            metas,
            `var ${config.requestCacheVar} = ${JSON.stringify(store.getState())}`
          )
        )
      })
      .catch(err => {
        res.send(renderPage('', match.params.uuid, {}))
      })
  }

  // match({ routes: '/:uuid/:step?', location: req.url }, (err, redirect, props) => {
  //   // in here we can make some decisions all at once
  //   if (err) {
  //     // there was an error somewhere during route matching
  //     res.status(500).send(err.message)
  //   } else if (redirect) {
  //     // we haven't talked about `onEnter` hooks on routes, but before a
  //     // route is entered, it can redirect. Here we handle on the server.
  //     res.redirect(redirect.pathname + redirect.search)
  //   } else if (props) {
  // if we got props then we matched a route and can render

  // let apiCache = {}

  // SERVER SIDE RENDERING
  // let app = (
  //   <Provider store={store}>
  //     <HotIntlProvider>
  //       <RouterContext {...props} />
  //     </HotIntlProvider>
  //   </Provider>
  // )

  // requestBpoom(props.params.uuid, store.dispatch, apiCache)
  //   .then(bpoom => {
  //     let metas = {
  //       title: interpolateMetaTitle(messages[lang]['metas.title'], bpoom),
  //       description: interpolateMetaDescription(messages[lang]['metas.description'], bpoom),
  //       image: bpoom.photo_mum,
  //     }

  //     res.send(
  //       renderPage(
  //         renderToString(app),
  //         props.params.uuid,
  //         metas,
  //         `var ${config.requestCacheVar} = ${JSON.stringify(apiCache)}`
  //       )
  //     )
  //   })
  //   .catch(err => {
  //     res.send(renderPage('', props.params.uuid, {}))
  //   })
  // } else {
  //   // no errors, no redirect, we just didn't match anything
  //   res.status(404).send('Not Found')
  // }
  // })
})

const PAGE_CACHE = fs.readFileSync(path.join(__dirname, 'public', 'index.html')).toString()

function interpolateMetaTitle(meta, bpoom) {
  return meta.replace('{name_mum}', bpoom.name_mum).replace('{name_dad}', bpoom.name_dad)
}

function interpolateMetaDescription(meta, bpoom) {
  return meta
}

function renderPage(appHtml, uuid, metas, globalVars) {
  return PAGE_CACHE.replace('###UUID###', uuid)
    .replace('<meta property="og:title" />', `<meta property="og:title" content="${metas.title || ''}" />`)
    .replace(
      '<meta property="og:description" />',
      `<meta property="og:description" content="${metas.description || ''}" />`
    )
    .replace('<meta property="og:image" />', `<meta property="og:image" content="${metas.image || ''}" />`)
    .replace('<script id="globalVars"></script>', `<script id="globalVars">${globalVars || ''}</script>`)
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
}

app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
})
