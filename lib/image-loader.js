let img
let queue = []
let lock = false
let lastURL
let lastLoadOk

if ('undefined' !== typeof document) {
  img = new Image()
}

export default function lazyLoad(url, callback, errorCallback) {
  if (!url) return
  if (lock) return queue.push(arguments)
  lock = true
  if (lastURL === url) return lastLoadOk ? onload() : onerror()
  lastURL = url
  img.src = url
  img.onload = onload
  img.onerror = onerror

  function onload() {
    lastLoadOk = true
    if (callback) callback(img)
    oncomplete()
  }

  function onerror() {
    lastLoadOk = false
    if (errorCallback) errorCallback(lastURL)
    oncomplete()
  }
}

function oncomplete() {
  lock = false
  if (queue.length) lazyLoad.apply(null, queue.shift())
}
