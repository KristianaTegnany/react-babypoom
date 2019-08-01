export default {
  ...(process.env.NODE_ENV === 'production' ? require('./application.prod.json') : require('./application.dev.json')),
  requestCacheVar: '__WEBPACK_REQUEST_CACHE__',
  orderLink: 'https://app.babypoom.com/babypooms/edit/{{id}}/album/',
}
