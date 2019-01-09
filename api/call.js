import config from '../config/application'

import sendRequest from '../lib/send-request'

const API_URL = config.SERVER_URL + '/api/v2'

export default function(path, options) {
  return sendRequest(API_URL + path, options)
}
