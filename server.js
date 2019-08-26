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
import { queryParams, hasParam, toQueryString } from './lib/url-params'

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

const generatePdf = async function(url, path, params) {
  const page = await BROWSER.newPage()
  page.emulateMedia('screen')
  await page.goto(url, { waitUntil: 'networkidle2' })

  // Clean up
  deleteFiles([path.cover], true)

  const pdfId = uuid()
  const pagePaths = []
  let errors = 0
  let startPage = 1

  let totalPages = await page.$$eval('.pdf-page', pages => pages.length)

  if (params.kite) {
    startPage = 2
    totalPages -= 1

    await page
      .pdf({
        path: path.cover,
        pageRanges: '1',
        width: '654.76mm',
        height: '256mm',
        printBackground: true,
      })
      .catch(err => {
        ++errors
        console.error(err)
      })
  }

  for (let i = startPage; i <= totalPages; ++i) {
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

  if (errors || fileExists(path.album)) return deleteFiles(pagePaths.concat(path.lock))

  merge(pagePaths, path.album, err => {
    if (err) console.error(err)
    deleteFiles(pagePaths.concat(path.lock))
  })
}
process.on('exit', async function() {
  await BROWSER.close()
})

var REG_PDF = /\.bp\.pdf$/

app.get('/favicon.ico', (req, res) => res.sendStatus(204))

app.get('*', (req, res) => {
  const [reqPath, queryString = ''] = req.originalUrl.split('?')
  const params = queryParams(queryString)
  const protocol = req.connection && req.connection.encrypted ? 'https' : 'http'
  const originalURL = `${protocol}://${req.get('host')}${reqPath}`

  if (REG_PDF.test(reqPath)) {
    const bpoomUuid = reqPath.slice(1).replace(REG_PDF, '')
    const path = {
      album: `pdf-albums/${bpoomUuid}-pages.pdf`,
      cover: `pdf-albums/${bpoomUuid}-cover.pdf`,
      lock: `pdf-albums/${bpoomUuid}.txt`,
    }

    // Manage lock file
    if (params.check_lock) return res.send('lock file ' + (fileExists(path.lock) ? 'found' : 'not found'))
    if (params.delete_lock) {
      if (fileExists(path.lock)) {
        deleteFiles([path.lock])
        return res.send('lock file deleted')
      }
      return res.send('lock file not found')
    }
    // Delete album files if force flag is set
    if (params.delete_files) {
      deleteFiles([path.cover, path.album], true)
      return res.send('album files deleted')
    }

    // Render album
    if (fileExists(path.album) || fileExists(path.cover)) {
      if (params.kite && !params.type) {
        const coverURL = originalURL + '?' + toQueryString({ ...params, type: 'cover' })
        const pagesURL = originalURL + '?' + toQueryString({ ...params, type: 'pages' })
        return res.send(`<a href="${coverURL}">Cover</a><br /><a href="${pagesURL}">Pages</a>`)
      }

      res.setHeader('Content-Type', 'application/pdf')
      res.setHeader('Content-Disposition', `inline;filename=${bpoomUuid}.pdf`)
      return fs.readFile(params.kite && params.type === 'cover' ? path.cover : path.album, (err, data) => {
        if (err) return console.error(err)
        res.send(data)
      })
    }

    // Create lock and generate pdf
    if (!fileExists(path.lock)) {
      fs.writeFileSync(path.lock, '')
      const pdfURL = originalURL.replace(REG_PDF, '')
      const pdfParams = { ...params, hd: 1 }
      generatePdf(pdfURL + '?' + toQueryString(pdfParams), path, params)
    }

    // Wait for it...! :P
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

function deleteFiles(files, check) {
  files.forEach(filepath => {
    if (!check || fileExists(filepath)) fs.unlink(filepath, err => err && console.error(err))
  })
}
