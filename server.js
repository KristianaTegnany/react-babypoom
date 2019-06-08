// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
import express from 'express'
import createLocaleMiddleware from 'express-locale'
import favicon from 'serve-favicon'
import path from 'path'

import shrinkRay from 'shrink-ray-current'
import fs from 'fs'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { matchRoutes, renderRoutes } from 'react-router-config'
import { RouterContext } from 'react-router'
import { Provider } from 'react-redux'

import HotIntlProvider from './birth-announcement-app/i18n/hot-intl-provider/HotIntlProvider'
import { updateLocale } from './birth-announcement-app/i18n/hot-intl-provider/HotIntlProviderActions'
import configureStore from './birth-announcement-app/store/configureStore'
import routes from './birth-announcement-app/routes'
import App from './birth-announcement-app/views/app'

import { data as localeData, messages } from './config/locales/data/all-data'
import metas from './birth-announcement-app/i18n/messages/metas'
import availableLocales from './available-locales'

import 'isomorphic-fetch'
import { loadBpoom, updateStep } from './birth-announcement-app/views/app/Actions'
import config from './config/application'

import { queryParams } from './lib/url-params'
import template from './lib/template'

// Bootstrap
import Bootstrap from './config/bootstrap/bootstrap.scss'
import { setGlobalCssModule } from 'reactstrap/lib/utils'
import { PATH_TO_STEP_MAP } from './birth-announcement-app/views/app/steps'
setGlobalCssModule(Bootstrap)

// var stats = JSON.parse(fs.readFileSync("./public/webpack.stats.json"));

var PORT = process.env.PORT || 8080

var ALL_LOCALES = [availableLocales.defaultLocale].concat(availableLocales)

var app = express()
app.disable('x-powered-by')
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(shrinkRay()) // must be first!
app.use(createLocaleMiddleware()) // detect locale

// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, 'public')))

const tplPath = path.join(__dirname, 'public', 'index.tpl')
const htmlPath = path.join(__dirname, 'public', 'index.html')
const PAGE_CACHE = template(fs.readFileSync(fileExists(tplPath) ? tplPath : htmlPath).toString())

app.get('*', (req, res) => {
  const branch = matchRoutes(routes, req.url)
  if (branch.length) {
    let { route, match } = branch[0]

    // let lang = req.locale.language
    // if (!lang || !ALL_LOCALES.includes(lang)) lang = ALL_LOCALES[0]

    // SERVER SIDE RENDERING
    let store = configureStore()

    let component = route.component
    while (component.WrappedComponent) component = component.WrappedComponent

    if (!component.fetchData) {
      return res.send(PAGE_CACHE({ html: render() }))
    }

    component
      .fetchData(store, match.params, queryParams(match.url))
      .then(bpoom => {
        let locale = bpoom.locale
        let msgs = messages[locale]
        updateLocale({ locale, localeData: localeData[locale], messages: msgs })(store.dispatch)

        let availableSteps = bpoom.available_steps || []
        let current = PATH_TO_STEP_MAP[match.params.step || '']
        let index = availableSteps.indexOf(current)
        if (availableSteps.length && index < 0) {
          current = NAMES_TO_PATHS.keys().next().value
          index = 0
        }
        updateStep({
          current,
          index,
          prev: index < 0 ? null : availableSteps[index - 1],
          next: index < 0 ? null : availableSteps[index + 1],
        })(store.dispatch)

        res.send(
          PAGE_CACHE({
            ogTitle: interpolateMetaTitle(msgs ? msgs['metas.title'] : metas.title.defaultMessage, bpoom),
            ogDescription: interpolateMetaDescription(
              msgs ? msgs['metas.description'] : metas.description.defaultMessage,
              bpoom,
            ),
            ogImage: (bpoom.photo_mum_urls || {}).thumbnail,
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

function interpolateMetaTitle(meta, bpoom) {
  return meta.replace('{name_mum}', bpoom.name_mum).replace('{name_dad}', bpoom.name_dad)
}

function interpolateMetaDescription(meta, bpoom) {
  return meta
}

function fileExists(path) {
  try {
    fs.accessSync(path, fs.constants.R_OK)
    return true
  } catch (err) {
    return false
  }
}

app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
})
