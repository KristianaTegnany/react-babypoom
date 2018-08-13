process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

import express from 'express'
import createLocaleMiddleware from 'express-locale'
import path from 'path'

import compression from 'compression'
import fs from 'fs'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { matchRoutes, renderRoutes } from 'react-router-config'
import { RouterContext } from 'react-router'
import { Provider } from 'react-redux'

import HotIntlProvider from './album-photo-app/i18n/hot-intl-provider/HotIntlProvider'
import { updateLocale } from './album-photo-app/i18n/hot-intl-provider/HotIntlProviderActions'
import configureStore from './album-photo-app/store/configureStore'
import routes from './album-photo-app/routes'
import App from './album-photo-app/views/app'

import { messages } from './album-photo-app/i18n/messages'
import availableLocales from './available-locales'

import 'isomorphic-fetch'
import { loadBpoom } from './album-photo-app/views/app/Actions'
import config from './config/application'

import puppeteer from 'puppeteer'

var PORT = process.env.PORT || 8080

var ALL_LOCALES = [availableLocales.defaultLocale].concat(availableLocales)

var app = express()
app.disable('x-powered-by')
app.use(compression()) // must be first!
app.use(createLocaleMiddleware()) // detect locale

// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, 'public')))

var compileString = (function() {
  var REG_D_QUOTES = /"/g,
    REG_EOL = /(\n)/gm,
    REG_INTERPOLATE = /([^\{])\{\{([^\{\}]*)\}\}([^\}])/gm

  return function(str) {
    return new Function(
      'd',
      'return "' +
        str
          .replace(REG_EOL, '\\n')
          .replace(REG_D_QUOTES, '\\"')
          .replace(REG_INTERPOLATE, '$1"+(d.$2 || "")+"$3') +
        '"',
    )
  }
})()

const PAGE_CACHE = compileString(fs.readFileSync(path.join(__dirname, 'public', 'index.tpl')).toString())

// ;(async () => {
//   console.log('START')
//   const browser = await puppeteer.launch({ defaultViewport: { width: 1200, height: 800 } })
//   const page = await browser.newPage()
//   await page.goto('https://album-photo.babypoom.com/1', { waitUntil: 'networkidle2' })
//   await page.pdf({ path: 'page.pdf', format: 'A4', landscape: true, printBackground: true })
//   await browser.close()
//   console.log('DONE')
// })()

app.get('*', (req, res) => {
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

    if (!component.fetchData) {
      return res.send(PAGE_CACHE({ html: render() }))
    }

    component
      .fetchData(store, match.params)
      .then(bpoom => {
        res.send(
          PAGE_CACHE({
            // ogTitle: interpolateMetaTitle(messages[lang]['metas.title'], bpoom),
            // ogDescription: interpolateMetaDescription(
            //   messages[lang]['welcome'],
            //   bpoom,
            // ),
            // ogImage: bpoom.photo_mum,
            html: render(),
            uuid: match.params.uuid,
            cachedJs: `var ${config.requestCacheVar} = ${JSON.stringify(store.getState())}`,
          }),
        )
      })
      .catch(err => {
        console.log('ERROR:', err)
        res.send(PAGE_CACHE({ uuid: match.params.uuid }))
      })

    function render() {
      return renderToString(
        <Provider store={store}>
          <HotIntlProvider>
            <StaticRouter location={req.url} context={{}}>
              {renderRoutes(routes)}
            </StaticRouter>
          </HotIntlProvider>
        </Provider>,
      )
    }
  }
})

// function interpolateMetaTitle(meta, bpoom) {
//   return meta
//     .replace('{name_mum}', bpoom.name_mum)
//     .replace('{name_dad}', bpoom.name_dad)
// }

// function interpolateMetaDescription(meta, bpoom) {
//   return meta
// }

app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
})
