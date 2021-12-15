let init = false;
let CANVAS;
let CTX;
let IMG;
let lock = false;
let queue = [];
let lastSrc;

export default function process(options, callback) {
  if ("undefined" === typeof document) return;

  if (lock) {
    return queue.push([options, callback]);
  }
  lock = true;

  let { src, ...opts } = options;
  if (!src) {
    return processNext();
  }
  initialize();

  if (lastSrc !== src) {
    lastSrc = src;
    let objectURL;
    IMG.onload = function () {
      callback && pixelate(opts, callback);
      processNext();
      if (objectURL) URL.revokeObjectURL(objectURL);
    };
    try {
      // No Cache (CORS issues otherwise...)
      console.log(src);
      fetch(src, {
        method: "GET",
        cache: "no-cache",
        headers: {
          pragma: "no-cache",
          "cache-control": "no-cache",
        },
      })
        .catch(() => (IMG.src = src))
        .then((response) => response.blob())
        .then(function (response) {
          IMG.src = objectURL = URL.createObjectURL(response);
        });
    } catch (e) {
      IMG.src = src;
    }
  } else {
    callback && pixelate(opts, callback);
    processNext();
  }
}

function initialize() {
  if (!init) {
    init = true;
    CANVAS = document.createElement("canvas");
    CTX = CANVAS.getContext("2d");
    IMG = new Image();
    IMG.crossOrigin = "anonymous";
  }
}

function processNext() {
  lock = false;
  let nextArgs = queue.shift();
  nextArgs && process.apply(null, nextArgs);
}

function pixelate(opts, callback) {
  let w = IMG.width || IMG.clientWidth || IMG.offsetWidth;
  let h = IMG.height || IMG.clientHeight || IMG.offsetHeight;
  CANVAS.width = w;
  CANVAS.height = h;

  let res = null == opts.resolution ? 16 : opts.resolution;
  res = Math.floor((Math.min(w, h) * res) / 260) * 2;

  let alpha = opts.alpha || 1;
  if (!res) {
    CTX.globalAlpha = alpha;
    CTX.drawImage(IMG, 0, 0);
    let dataURL = CANVAS.toDataURL();
    CTX.clearRect(0, 0, w, h);
    return callback(dataURL);
  }

  CTX.globalAlpha = 1;
  CTX.drawImage(IMG, 0, 0);
  let data = CTX.getImageData(0, 0, w, h).data;
  CTX.clearRect(0, 0, w, h);

  let cols = w / res + 1;
  let rows = h / res + 1;
  let halfSize = res / 2;

  let row, y, pixelY, col, x, pixelX, pixelIndex, red, green, blue, pixelAlpha;

  for (row = 0; row < rows; ++row) {
    y = (row - 0.5) * res;
    pixelY = Math.max(Math.min(y, h - 1), 0);
    for (col = 0; col < cols; ++col) {
      x = (col - 0.5) * res;
      pixelX = Math.max(Math.min(x, w - 1), 0);
      pixelIndex = (pixelX + pixelY * w) * 4;
      red = data[pixelIndex];
      green = data[pixelIndex + 1];
      blue = data[pixelIndex + 2];
      pixelAlpha = alpha * (data[pixelIndex + 3] / 255);

      CTX.fillStyle = `rgba(${red},${green},${blue},${pixelAlpha})`;
      CTX.fillRect(x - halfSize, y - halfSize, res, res);
    }
  }
  callback(CANVAS.toDataURL());
}
