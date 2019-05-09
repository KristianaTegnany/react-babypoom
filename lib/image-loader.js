function ImageLoader() {
  const options = { method: 'GET', mode: 'no-cors', cache: 'default' }
  const queue = []
  let lock = false

  function oncomplete() {
    lock = false
    if (queue.length) load(queue.shift())
  }
  function load(data) {
    if (lock) return queue.push(data)
    lock = true
    fetch(data, options)
      .then(res => {
        res.blob()
        oncomplete()
      })
      .catch(oncomplete)
  }

  return typeof fetch !== 'undefined' ? load : () => {}
}

function supportWorker() {
  return !!(Worker && Blob && fetch)
}

function createImageWorker(index) {
  if (supportWorker()) {
    const blob = new Blob(
      [`const loaderFunc = (${ImageLoader.toString()})(); self.onmessage = function(e) { loaderFunc(e.data) }`],
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
