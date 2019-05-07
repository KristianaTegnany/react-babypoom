function ImageLoader() {
  var img = new Image()
  var queue = []
  var lock = false
  var lastURL
  var lastLoadOk
  return { load: load }

  function load(url, callback, errorCallback) {
    if (!url) {
      if (errorCallback) errorCallback(url)
      return
    }
    if (lock) return queue.push(arguments)
    lock = true
    if (lastURL === url) return lastLoadOk ? onload() : onerror()
    lastURL = url
    img.onload = onload
    img.onerror = onerror
    img.src = url

    function onload() {
      lastLoadOk = true
      if (callback) callback(img)
      oncomplete()
    }
    function onerror() {
      lastLoadOk = false
      if (errorCallback) errorCallback(url)
      oncomplete()
    }
  }
  function oncomplete() {
    lock = false
    if (queue.length) load.apply(null, queue.shift())
  }
}

const LOADER_COUNT = 'undefined' !== typeof document ? 4 : 0
const LOADERS = []
let currentLoaderIndex = 0

for (let i = 0; i < LOADER_COUNT; ++i) LOADERS.push(new ImageLoader())

export default function lazyLoad(url) {
  LOADERS[currentLoaderIndex].load(url)
  currentLoaderIndex = (currentLoaderIndex + 1) % LOADERS.length
}
