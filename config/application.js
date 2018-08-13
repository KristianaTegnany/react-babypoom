export default {
  ...(process.env.NODE_ENV === 'production' ? require('./application.dev.json') : require('./application.dev.json')),
  requestCacheVar: '__WEBPACK_REQUEST_CACHE__',
}
