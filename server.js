process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

import express from 'express'
import createLocaleMiddleware from 'express-locale'
import path from 'path'
import favicon from 'serve-favicon'

import shrinkRay from 'shrink-ray-current'
import fs from 'fs'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { matchRoutes, renderRoutes } from 'react-router-config'
import { RouterContext } from 'react-router'
import { Provider } from 'react-redux'

import HotIntlProvider from './app/i18n/hot-intl-provider/HotIntlProvider'
import { updateLocale } from './app/i18n/hot-intl-provider/HotIntlProviderActions'
import configureStore from './app/store/configureStore'
import routes from './app/routes'
import App from './app/views/app'

import { data as localeData, messages } from './config/locales/data/all-data'
import availableLocales from './available-locales'

import 'isomorphic-fetch'
import { updateParams } from './app/views/app/Actions'
import config from './config'

import uuid from './lib/uuid'
import merge from 'easy-pdf-merge'

import puppeteer from 'puppeteer'
import { queryParams } from './lib/url-params'

var PORT = process.env.PORT || 8383

var ALL_LOCALES = [availableLocales.defaultLocale].concat(availableLocales)

var app = express()
app.disable('x-powered-by')
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(shrinkRay()) // must be first!
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

const tplPath = path.join(__dirname, 'public', 'index.tpl')
const htmlPath = path.join(__dirname, 'public', 'index.html')
const PAGE_CACHE = compileString(fs.readFileSync(fileExists(tplPath) ? tplPath : htmlPath).toString())

let BROWSER
;(async () => {
  BROWSER = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-extensions',
      '--disable-sync',
      '--disable-default-apps',
      '--mute-audio',
      '--no-first-run',
    ],
  })
})()

const generatePdf = async function(url, albumPath, lockPath) {
  const page = await BROWSER.newPage()
  page.emulateMedia('screen')
  await page.goto(url, { waitUntil: 'networkidle2' })
  const totalPages = await page.$$eval('.pdf-page', pages => pages.length)
  const pdfId = uuid()
  const pagePaths = []
  let errors = 0
  for (let i = 1; i <= totalPages; ++i) {
    let pagePath = `pdf-albums/${pdfId}-${i}.pdf`
    pagePaths.push(pagePath)
    await page
      .pdf({ path: pagePath, pageRanges: `${i}`, format: 'A4', landscape: true, printBackground: true })
      .catch(err => {
        ++errors
        console.error(err)
      })
  }
  page.close()

  if (errors || fileExists(albumPath)) return deleteFiles(pagePaths.concat(lockPath))

  merge(pagePaths, albumPath, err => {
    if (err) console.error(err)
    deleteFiles(pagePaths.concat(lockPath))
  })
}
process.on('exit', async function() {
  await BROWSER.close()
})

var REG_PDF = /\.bp\.pdf$/

app.get('/favicon.ico', (req, res) => res.sendStatus(204))

app.get('*', (req, res) => {
  if (REG_PDF.test(req.url.split('?')[0])) {
    const bpoomUuid = req.url.slice(1).replace(REG_PDF, '')
    const albumPath = `pdf-albums/${bpoomUuid}.pdf`
    const lockPath = `pdf-albums/${bpoomUuid}.txt`
    if (fileExists(albumPath)) {
      res.setHeader('Content-Type', 'application/pdf')
      res.setHeader('Content-Disposition', `inline;filename=${bpoomUuid}.pdf`)
      return fs.readFile(albumPath, (err, data) => {
        if (err) return console.error(err)
        res.send(data)
      })
    }
    if (!fileExists(lockPath)) {
      fs.writeFileSync(lockPath, '')
      const originalURL =
        (req.connection && req.connection.encrypted ? 'https' : 'http') +
        '://' +
        (req.get('host') + req.originalUrl).replace(REG_PDF, '')
      generatePdf(originalURL + (originalURL.indexOf('?') >= 0 ? '&hd=1' : '?hd=1'), albumPath, lockPath)
    }
    return res.send(
      'Creating the pdf... <br />This page will refresh when the pdf is ready' +
        '<script>setTimeout(function() { location.reload() }, 5000);</script>',
    )
  }

  const branch = matchRoutes(routes, req.url)

  if (branch.length) {
    let { route, match } = branch[0]

    // SERVER SIDE RENDERING
    let store = configureStore()
    updateParams(queryParams(req.url))(store.dispatch)

    let component = route.component
    while (component.WrappedComponent) component = component.WrappedComponent

    if (!component.fetchData) {
      return res.send(PAGE_CACHE({ html: render() }))
    }

    component
      .fetchData(store, match.params)
      .then(bpoom => {
        let locale = bpoom.locale
        let msgs = messages[locale]
        updateLocale({ locale, localeData: localeData[locale], messages: msgs })(store.dispatch)

        var content = PAGE_CACHE({
          // ogTitle: interpolateMetaTitle(messages[lang]['metas.title'], bpoom),
          // ogDescription: interpolateMetaDescription(
          //   messages[lang]['welcome'],
          //   bpoom,
          // ),
          // ogImage: bpoom.photo_mum,
          html: render(),
          uuid: match.params.uuid,
          cachedJs: `var ${config.requestCacheVar} = ${JSON.stringify(store.getState())}`,
        })
        res.send(content)
      })
      .catch(err => {
        console.log('ERROR:', err, (match || {}).params)
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
//     .replace('{parent_1_name}', bpoom.parent_1_name)
//     .replace('{parent_2_name}', bpoom.parent_2_name)
// }

// function interpolateMetaDescription(meta, bpoom) {
//   return meta
// }

let listener = app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
})

function fileExists(path) {
  try {
    fs.accessSync(path, fs.constants.R_OK)
    return true
  } catch (err) {
    return false
  }
}

function deleteFiles(files) {
  var i = files.length
  files.forEach(function(filepath) {
    fs.unlink(filepath, function(err) {
      i--
      if (err) return console.error(err)
    })
  })
}
