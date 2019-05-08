function ImageLoader() {
  var img = new Image()
  var queue = []
  var lock = false
  var lastURL
  var lastLoadOk

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

  return load
}

function supportWorker() {
  return !!(Worker && Blob && fetch)
}

function createImageWorker(index) {
  if (supportWorker()) {
    const blob = new Blob(
      [
        `const options = { method: 'GET', mode: 'no-cors', cache: 'default' }
        self.onmessage = function(e) { fetch(e.data, options).then(res => res.blob()) }`,
      ],
      { type: 'application/javascript' },
    )
    try {
      const worker = new Worker(URL.createObjectURL(blob))
      worker.terminate = () => {
        URL.revokeObjectURL(blob)
      }
      worker.kill = signal => {
        setTimeout(worker.terminate)
      }
      return worker
    } catch (e) {
      URL.revokeObjectURL(blob)
    }
  }
  // Fake worker to keep code consistent
  const loaderFunc = ImageLoader()
  return {
    postMessage: function(url) {
      loaderFunc(url)
    },
  }
}

const LOADER_COUNT =
  'undefined' === typeof window ? 0 : supportWorker() ? Math.max(1, (navigator.hardwareConcurrency || 1) - 1) : 4
const LOADERS = []
let currentLoaderIndex = 0
for (let i = 0; i < LOADER_COUNT; ++i) LOADERS.push(createImageWorker(i))

export default function lazyLoad(url) {
  if (!url) return
  LOADERS[currentLoaderIndex].postMessage(url)
  currentLoaderIndex = (currentLoaderIndex + 1) % LOADERS.length
}
