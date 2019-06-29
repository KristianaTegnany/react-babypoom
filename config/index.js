import config from './index.NODE_ENV.json'

export default {
  ...config,
  imageSizes: {
    hd: 1000,
    normal: 650,
    thumbnail: 250,
  },
  theme: {
    color_1: '#59bab8',
    color_2: '#fffcfc',
  },
  requestCacheVar: '__WEBPACK_REQUEST_CACHE__',
  babypoomDashboardHost: 'app.babypoom.com',
  babypoomWebsiteLink: 'http://babypoom.com',
  babypoomWebsiteShortLink: 'babypoom.com',
  shareLink: 'https://babypoom.typeform.com/to/CYlRUM',
  // googleClientID: '411093289547-4m9rruahuo10kme0tb1kp35foo87cioh.apps.googleusercontent.com',
  instClientID: 'bb10fbd9dd7342f2977aa63edff5a2dc',
}
