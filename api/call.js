import config from '../config/application'

import sendRequest from '../lib/send-request'

const API_URL = config.SERVER_URL + '/api/v2/album'

export default function(url, options) {
  return sendRequest(API_URL + url, options)
}
