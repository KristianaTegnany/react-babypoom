import config from './index.NODE_ENV.json'

export default {
  ...config,
  requestCacheVar: '__WEBPACK_REQUEST_CACHE__',
  orderLink: 'https://app.babypoom.com/babypooms/edit/{{id}}/album/',
  previewLink: 'https://album.babypoom.com/{{uuid}}',
}
