const API_URL = process.env.NODE_ENV === 'production' ? '//my.babypoom.com/api/v2' : '//localhost:3001/api/v2';

const defaultOptions = {
  headers: {}
};

export default function(dispatch, url, options={}) {
  options = { ...defaultOptions, ...options }; // clone

  if (options.data) {
    if (!options.method || 'get' === options.method.toLowerCase()) {
      url += (url.indexOf('?') >= 0 ? '&' : '?') + queryParams(options.data);
    } else {
      options.body = queryParams(options.data);
    }
    delete options.data;
  }
  if (options.json !== false) {
    options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    delete options.json;
  }
  if (options.cors !== false) {
    options.mode = 'cors';
    delete options.cors;
  }

  return new Promise(function(resolve, reject) {
    fetch(API_URL + url, options)
      .then(response => { return Promise.all([response, response.json()]) })
      .then(([response, json]) => {
        if (response.status < 200 || response.status >= 300) {
          return reject(json); // TODO: error
        }
        resolve(json, response.headers);
      })
      .catch(error => {
        reject(error); // TODO: error
      });
  });
}

function queryParams(params) {
  return Object.keys(params).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k])).join('&');
}




