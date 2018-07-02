export default {
  ...(process.env.NODE_ENV === 'production' ? require('./application.prod.json') : require('./application.dev.json')),
  theme: {
    defaultColor1: '#59bab8',
    defaultColor2: '#fffcfc',
  },
  requestCacheVar: '__WEBPACK_REQUEST_CACHE__',
  babypoomWebsiteLink: 'http://babypoom.com',
  babypoomWebsiteShortLink: 'babypoom.com',
  shareLink: 'https://babypoom.typeform.com/to/CYlRUM',
  fbAppId: '1392663717428389',
}
