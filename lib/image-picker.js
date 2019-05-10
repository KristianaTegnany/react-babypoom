var webPSupport = (function() {
  if ('undefined' !== typeof document) return false
  var canvas = document.createElement('canvas')
  canvas.width = canvas.height = 1
  return 5 === canvas.toDataURL('image/webp').indexOf('image/webp')
})()

var URL = window.URL || window.webkitURL

// TODO:
// [OK] Replace ids by classes
// [OK] Vider le input de "local" pour pouvoir ajouter une deuxieme fois le meme fichier
// [OK] Lire donnees exif et retourner automatiquement la photo...?
// [OK] Reinit input type (on => change - not click - event...)
// [OK] Video on facebook
// [OK] Compatible transform property
// [OK] Uniformiser structure data Facebook/Google
// [OK] Ajout loadPhotos pour Facebook
// [OK] Check dimension popup sign-in Instagram
// [OK] Google Photos : erreur quand l'album ne contient qu'une photo et qu'on clique dessus !
// [OK] Styles anti-selection sur le crop
// [OK] Passer uniquement les options dont chacun a besoin
// [OK] URL.revokeObjectURL
// [OK] Check server side issues (typeof document...)
// [OK] toNum: keep float?
// [OK] Cropper quand on   tourne la photo garder la       du cropper (changer left en top, ... en fonction du sens)
// [OK] Resize with canvas to avoid sending a file too big?
// [OK] Repositionner image top 0 left 0 quand on upload une nouvelle image
// [KO] webP format on amazon
// [OK] Desactiver "take picture" tant que video pas chargee
// [OK] Camera desactiver/cacher "Take a picture" avant que la video ne soit prete
// [KO] setSelectView on class Tab
// [OK] Afficher le nom de l'album quand on est dedans
// [OK] OnEnter/onLeave pour chaque provider
// [OK] A la fermeture, virer tous les events? Ou au onLeave...? Renvoyer tous les evenements a la fin de onEnter et automatiquement unbinder a onLeave?
// [OK] Detecter si l'utilisateur a effectivement une webcam (ne pas afficher l'onglet sinon)
// [KO] Renomer this.query par $ et queryAll par $$
// [KO] Cropper : changer le type de curseur sur document directement
// [OK] Factoriser code icones
// [OK] Ajouter les traits comme sur iphone sur le cropper
// [OK] Alterner blanc et gris pour les pointilles du cropper. Blanc sur blanc ca se voit pas
// [OK] Factoriser css par fichier
// [OK] Limit file to certain types (image/png...)
// [OK] Regler probleme d'icones (camera et espacement si pas dispo, preview sur mobile view)
// [OK] Fermeture de popup
// [OK] Validateur type de fichier (pour etre sur d'avoir une image)
// [OK] Clone de la function de resize. function generateOtherFunc() { return function resizeVErtOrHor() {} }...
// [OK] Renommer "preview" en "crop" ou "edit"
// [OK] Verifier que, meme si les dimensions de l'image respectent le minimum, c'est toujours le cas en appliquant l'aspect ratio
// [OK] Validateur taille de photo (selection ou camera...)
// [KO] Afficher le nombre de photos dans un album (bulle).
// [OK] Ajout d'un timeout au niveau des donnees en cache (60 minutes)
// [OK] Errors
// [OK] Web workers
// [OK] No albums/photos found => css
// [OK] Bug Safari iOs mode landscape + cropper. Overflow en bas
// [OK] Rajouter etape preview.
// [OK] Nettoyage de code?
// [OK] Detecter click droit sur cropper
// [OK] Fermeture de la popup si click en dehors
// [OK] Afficher la taille minimum dans le message d'erreur
// [OK] i18n
// [OK] Balancer le blob direct en onStart
// Supprimer bouton ok pendant loading
// Renommer class close pour eviter les conflits
// Camera: prendre une vraie photo sur iphone comme uploadcare le fait: media capture
// Ne pas autoriser de deplacer le handle en dehors du container...
// Implementer logout facebook/google photos/instagram...
// FB.getLoginStatus response get expiresIn to renew token later

export default class ImagePicker {
  constructor(options) {
    this.options = options || {}

    this.managers = {
      'crop-tab': CropPictureManager,
      local: LocalPictureManager,
      camera: CameraPictureManager,
      facebook: FacebookPictureManager,
      'google-photos': GooglePhotosPictureManager,
      instagram: InstagramPictureManager,
    }

    var TEMPLATE = `<style>
.source-container {
  position: fixed;
  top: 20px;
  left: 300px;
  right: 300px;
  bottom: 0px;
  z-index: 10000000;
  background: #ccc;
  overflow: auto;
}
.source-head { float: left; }
.source-container .album-pic,
.source-container .photo {
  width: 150px;
  height: 150px;
  margin: 10px;
  border: 1px solid black;
  float: left;
  background-color: white;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.source-container #camera.loading::before {
  content: 'loading...';
  padding: 10px;
  background-color: red;
  color: white;
}
.source-container .crop-tab .img-container {
  position: relative;
  display: inline-block;
}
.source-container .crop-tab .img-container img {
  width: 100%;
}
.source-container .crop-tab .wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}
.source-container .crop-tab .cropper .handle {
  position: absolute;
  height: 34px;
  width: 34px;
  padding: 10px;
}
.source-container .crop-tab .cropper .handle::before {
  content: '';
  display: block;
  background: #fff;
  border-radius: 50%;
  height: 14px;
  width: 14px;
  box-shadow: inset 0 0 0 1px rgba(0,0,0,.2);
}
.source-container .crop-tab .cropper .handle-tl, .source-container .crop-tab .cropper .handle-br {
  cursor: nwse-resize;
}
.source-container .crop-tab .cropper .handle-tr, .source-container .crop-tab .cropper .handle-bl {
  cursor: nesw-resize;
}
.source-container .crop-tab .cropper .handle-tl, .source-container .crop-tab .cropper .handle-tr {
  top: 0; margin-top: -17px;
}
.source-container .crop-tab .cropper .handle-tl, .source-container .crop-tab .cropper .handle-bl {
  left: 0; margin-left: -17px;
}
.source-container .crop-tab .cropper .handle-tr, .source-container .crop-tab .cropper .handle-br {
  right: 0; margin-right: -17px;
}
.source-container .crop-tab .cropper .handle-bl, .source-container .crop-tab .cropper .handle-br {
  bottom: 0; margin-bottom: -17px;
}
.source-container .crop-tab .cropper {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  will-transform: left, top, right, bottom;
  transform: translateZ(0);
}
.source-container .crop-tab .cropper.overlay {
  box-shadow: 0 0 2000px 2000px rgba(0, 0, 0, 0.5);
  background: linear-gradient(90deg, white 50%, transparent 50%),
    linear-gradient(0deg, white 50%, transparent 50%),
    linear-gradient(90deg, white 50%, transparent 50%),
    linear-gradient(0deg, white 50%, transparent 50%);
  background-repeat: repeat-x, repeat-y, repeat-x, repeat-y;
  background-size: 15px 1px, 1px 15px, 15px 1px, 1px 15px;
  background-position: left top, right top, left bottom, left top;
  animation: border-dance 10s infinite linear;
}
@keyframes border-dance {
  0% { background-position: left top, right top, right bottom, left bottom; }
  100% { background-position: right top, right bottom, left bottom, left top; }
}
</style>
<div class="source-head">
  <div class="tab" data-target=".crop-tab" style="display: none">Preview</div>
  <div class="tab" data-target="#local">Local Files</div>
  <div class="tab" data-target="#camera">Camera</div>
  <div class="tab" data-target="#facebook">Facebook</div>
  <div class="tab" data-target="#google-photos">Google photos</div>
  <div class="tab active" data-target="#instagram">Instagram</div>
</div>
<div class="source-body">
  <div style="display: none" class="crop-tab">
    <div class="img-container"><img id="img" /><div class="wrapper">
      <div class="cropper overlay"></div>
    </div><div class="cropper main-cropper">
      <div data-pos="tl" class="handle handle-tl"></div>
      <div data-pos="tr" class="handle handle-tr"></div>
      <div data-pos="bl" class="handle handle-bl"></div>
      <div data-pos="br" class="handle handle-br"></div>
    </div></div>
    <div class="rotate-left">Rotate left</div>
    <div class="rotate-right">Rotate right</div>
    <button type="button" class="done">Done</button>
  </div>
  <div style="display: none" id="local">
    <div class="drop-area"><input type="file" id="local-button" /></div>
  </div>
  <div style="display: none" id="camera">
    File from web camera
    <div class="rotate-left">Rotate left</div>
    <div class="rotate-right">Rotate right</div>
    <div class="horizontal-flip">Horizontal Flip</div>
    <div class="vertical-flip">Vertical Flip</div>
    <div class="pic"><video class="video" /></div>
    <div class="stream-off" style="display: none">
      <button class="take-another-one">Take another picture</button>
      <button class="use-it">Use picture</button>
    </div>
    <div class="stream-on">
      <button class="take-picture">Take a picture</button>
    </div>
  </div>
  <div style="display: none" id="direct">

  </div>
  <div style="display: none" id="facebook">
    <div class="view intro">
      Get images from your Facebook albums.
      <button class="connect">Continue with Facebook</button>
    </div>
    <div style="display: none" class="view albums">
      <div class="list"></div>
    </div>
    <div style="display: none" class="view photos">
      <div class="back-to-albums">&lt;- albums</div>
      <div class="list"></div>
    </div>
  </div>
  <div style="display: none" id="google-photos">
    <div class="view intro">
      Get images from your Google photos albums.
      <button class="connect">Continue with Google Photos</button>
    </div>
    <div style="display: none" class="view albums">
      <div class="list"></div>
    </div>
    <div style="display: none" class="view photos">
      <div class="back-to-albums">&lt;- albums</div>
      <div class="list"></div>
    </div>
  </div>
  <div style="display: none" id="instagram">
    <div class="view intro">
      Get images from your Instagram.
      <button class="connect">Continue with Instagram</button>
    </div>
    <div style="display: none" class="view photos">
      <div class="list"></div>
    </div>
  </div>
</div>`

    var container = (this.container = $(document.createElement('div')))
    container.addClass('source-container')
    container.html(TEMPLATE)

    // Manage tabs
    this.previewTab = this.container.find('[data-target=".crop-tab"]')
    container.on('click', '.tab', e => this.setTab(e.currTarget.getAttribute('data-target')))
    this.setTab(container.find('.tab.active').attr('data-target'), false)
    ;(options.parent || document.body).appendChild(container.elt)

    // Uploader
    this.uploader = new Uploader(this.options.uploader)
  }

  setTab(target, showCropTab) {
    this.previewTab[showCropTab ? 'show' : 'hide']()
    var tabContentElt, manager
    if (this.oldTabTarget) {
      manager = this[`${this.oldTabTarget.slice(1)}PicManager`]
      if (manager.onLeave) manager.onLeave()
      this.container
        .find(this.oldTabTarget)
        .hide()
        .removeClass('active')
    }
    tabContentElt = this.container.find(target)
    tabContentElt.addClass('active').show()
    var managerType = target.slice(1)
    var managerName = `${managerType}PicManager`
    manager = this[managerName] =
      this[managerName] ||
      new this.managers[managerType](tabContentElt, showCropTab ? this.uploader : this.onSelect, this.options)
    if (manager.onEnter) manager.onEnter(this.imgDataURI)
    this.oldTabTarget = target
  }

  onSelect = dataURI => {
    this.imgDataURI = dataURI
    this.setTab('.crop-tab', true)
  }
}

class Uploader {
  constructor(options) {
    this.options = options || {}
  }

  error(file) {}

  complete(fileName) {
    this.options.done(fileName)
  }

  upload(file, data) {
    this.options.getSignature ? this.options.getSignature(data => this._upload(file, data)) : this._upload(file, data)
  }

  _upload(file, data) {
    var xhr = new XMLHttpRequest()
    var formData = new FormData()

    xhr.open(this.options.method || 'POST', this.options.url)
    xhr.setRequestHeader('Accept', 'application/json, text/javascript', '*/*')

    var headers = this.options.headers || {}
    Object.keys(headers).forEach(name => {
      var value = headers[name]
      xhr.setRequestHeader(name, typeof value === 'function' ? value() : value)
    })

    const xhrUpload = xhr.upload
    xhrUpload.onloadstart = () => {
      console.log('upload start')
    }
    xhrUpload.onprogress = event => {
      if (event.lengthComputable) {
        var progress = (event.loaded / event.total) * 100
        console.log('upload ' + progress + '%')
      }
    }
    // xhrUpload.onloadend = () => {
    //   console.log(xhr)
    //   if (404 === xhr.status) {
    //     this.error('Upload failed: ', file.name) // TODO
    //   } else {
    //     var extractURL = this.options.extractUrlFromResponse
    //     console.log(xhr)
    //     this.complete(extractURL ? extractURL(xhr) : xhr.responseText)
    //   }
    // }
    xhrUpload.onerror = () => {
      this.error('Upload failed: ', file.name) // TODO
    }
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
          var extractURL = this.options.extractUrlFromResponse
          this.complete(extractURL ? extractURL(xhr) : xhr.responseText)
        } else {
          this.error('Upload failed: ', file.name) // TODO
        }
      }
    }
    Object.keys(data || {}).forEach(prop => formData.append(prop, data[prop]))
    formData.append(this.options.paramName || 'file', file, 'pic.jpg')
    xhr.send(formData)
  }
}

// CROPPER
class CropPictureManager {
  constructor(tabContainer, uploader, options) {
    this.container = tabContainer
    this.uploader = uploader
    this.croppers = this.container.findAll('.cropper')
    this.mainCropper = this.container.find('.main-cropper').elt
    this.imgContainer = this.container.find('.img-container').elt
    this.img = this.container.find('img')
    this.img.elt.onload = this.imageReady.bind(this)

    // TODO: touch support
    var doc = $(document)
    this.container.on('mousedown', '.main-cropper,.handle', this.pointerDown)
    doc.on('mouseup', this.pointerUp)
    doc.on('mousemove', this.handleMove)
    doc.on('mousemove', this.cropperMove)
    this.container.find('.rotate-left').on('click', () => this.rotate(3))
    this.container.find('.rotate-right').on('click', () => this.rotate(1))
    this.container.find('.done').on('click', () => this.crop())

    var cropperOptions = options.cropper || {}
    this.ratio = cropperOptions.ratio
    this.minWidth = cropperOptions.minWidth
    this.minHeight = cropperOptions.minHeight

    if (this.ratio && (this.minWidth || this.minHeight)) {
      if (!this.minWidth || (this.minHeight && this.ratio.v > this.ratio.h))
        this.minWidth = (this.minHeight * this.ratio.v) / this.ratio.h
      if (!this.minHeight || (this.minWidth && this.ratio.v <= this.ratio.h))
        this.minHeight = (this.minWidth * this.ratio.h) / this.ratio.v
    }
  }
  get metrics() {
    var cs = getComputedStyle(this.mainCropper)
    return {
      left: this.toNum(cs.left),
      right: this.toNum(cs.right),
      top: this.toNum(cs.top),
      bottom: this.toNum(cs.bottom),
      width: this.toNum(cs.width),
      height: this.toNum(cs.height),
    }
  }
  onEnter(dataURI) {
    this.img.attr('src', dataURI).show()
  }
  onLeave() {
    this.img.hide()
  }
  imageReady() {
    this.croppers.forEach(x => (x.style = ''))
    var ratio = this.ratio
    if (!ratio) return this.positionCroppers({ top: 0, left: 0 }, '')
    var width = this.img.elt.clientWidth
    var height = this.img.elt.clientHeight
    var dim = this.applyRatio(width, height)
    this.positionCroppers({ top: (height - dim.height) / 2, left: (width - dim.width) / 2 }, '%')
  }
  applyRatio(width, height) {
    var ratio = this.ratio
    var widthFit = width / height <= ratio.v / ratio.h
    return {
      width: widthFit ? width : (height * ratio.v) / ratio.h,
      height: widthFit ? (width * ratio.h) / ratio.v : height,
    }
  }
  positionCroppers(coords, unit) {
    if ('%' === unit) coords = this.convertToPercent(coords)
    this.croppers.forEach(x => {
      x.style.top = coords.top + unit
      x.style.left = coords.left + unit
      x.style.bottom = coords.bottom + unit
      x.style.right = coords.right + unit
    })
  }
  convertToPercent(coords) {
    var img = this.img.elt
    var width = img.clientWidth
    var height = img.clientHeight
    return {
      top: (coords.top * 100) / height,
      left: (coords.left * 100) / width,
      bottom: ((null == coords.bottom ? coords.top : coords.bottom) * 100) / height,
      right: ((null == coords.right ? coords.left : coords.right) * 100) / width,
    }
  }
  toNum(s) {
    return Math.round(parseFloat(s))
  }
  rotate(rot) {
    var img = this.img.elt
    this.container.addClass('loading')
    var dataURI = transformImg(img, img.naturalWidth, img.naturalHeight, { rotate: rot })
    this.container.removeClass('loading')
    this.onEnter(dataURI)
  }
  crop() {
    var metrics = this.metrics
    var img = this.img.elt
    var widthRatio = img.naturalWidth / img.clientWidth
    var heightRatio = img.naturalHeight / img.clientHeight
    var realMetrics = {
      left: metrics.left * widthRatio,
      top: metrics.top * heightRatio,
      width: metrics.width * widthRatio,
      height: metrics.height * heightRatio,
    }
    this.container.addClass('loading')
    cropPic(img, realMetrics, blob => {
      this.container.removeClass('loading')
      this.uploader.upload(blob)
    })
  }
  pointerDown = e => {
    e.preventDefault()
    var event = e.touches ? e.touches[0] : e
    var img = this.img.elt
    var width = img.clientWidth
    var height = img.clientHeight
    var pos = e.currTarget.getAttribute('data-pos') || ''
    var cs = getComputedStyle(this.mainCropper)
    this.info = {
      resizing: this.mainCropper !== e.currTarget,
      pos: this.metrics,
      min: {
        width: this.minWidth ? (width * this.minWidth) / img.naturalWidth : 0,
        height: this.minHeight ? (height * this.minHeight) / img.naturalHeight : 0,
      },
      img: {
        width: width,
        height: height,
      },
      mouse: {
        x: event.clientX,
        y: event.clientY,
      },
      handle: {
        left: pos.indexOf('l') >= 0,
        right: pos.indexOf('r') >= 0,
        top: pos.indexOf('t') >= 0,
        bottom: pos.indexOf('b') >= 0,
      },
    }
  }
  pointerUp = e => {
    this.positionCroppers(this.metrics, '%')
    this.info = null
  }
  handleMove = e => {
    if (!this.info || !this.info.resizing) return

    var info = this.info
    var pos = info.pos
    var handle = info.handle
    var img = info.img
    var min = info.min
    var ratio = this.ratio
    var event = e.touches ? e.touches[0] : e
    var clientX = event.clientX
    var clientY = event.clientY
    var diffX = info.mouse.x - clientX
    var diffY = info.mouse.y - clientY
    var newDim

    pos.top -= handle.top ? diffY : 0
    pos.left -= handle.left ? diffX : 0
    pos.bottom += handle.bottom ? diffY : 0
    pos.right += handle.right ? diffX : 0
    var dim = ratio ? this.applyRatio(img.width - pos.left - pos.right, img.height - pos.top - pos.bottom) : null
    var coords = {
      top: handle.top
        ? Math.min(
            img.height - pos.bottom - min.height,
            Math.max(0, ratio ? img.height - pos.bottom - dim.height : pos.top),
          )
        : pos.top,
      left: handle.left
        ? Math.min(img.width - pos.right - min.width, Math.max(0, ratio ? img.width - pos.right - dim.width : pos.left))
        : pos.left,
      bottom: handle.bottom
        ? Math.min(
            img.height - pos.top - min.height,
            Math.max(0, ratio ? img.height - pos.top - dim.height : pos.bottom),
          )
        : pos.bottom,
      right: handle.right
        ? Math.min(img.width - pos.left - min.width, Math.max(0, ratio ? img.width - pos.left - dim.width : pos.right))
        : pos.right,
    }
    if (ratio) {
      if (0 === coords.top && handle.top) {
        newDim = ((img.height - pos.bottom) * ratio.v) / ratio.h
        if (handle.left) coords.left = Math.max(0, img.width - pos.right - newDim)
        else coords.right = Math.max(0, img.width - pos.left - newDim)
      }
      if (0 === coords.left && handle.left) {
        newDim = ((img.width - pos.right) * ratio.h) / ratio.v
        if (handle.top) coords.top = Math.max(0, img.height - pos.bottom - newDim)
        else coords.bottom = Math.max(0, img.height - pos.top - newDim)
      }
      if (0 === coords.bottom && handle.bottom) {
        newDim = ((img.height - pos.top) * ratio.v) / ratio.h
        if (handle.right) coords.right = Math.max(0, img.width - pos.left - newDim)
        else coords.left = Math.max(0, img.width - pos.right - newDim)
      }
      if (0 === coords.right && handle.right) {
        newHeight = ((img.width - pos.left) * ratio.h) / ratio.v
        if (handle.bottom) coords.bottom = Math.max(0, img.height - pos.top - newDim)
        else coords.top = Math.max(0, img.height - pos.bottom - newDim)
      }
    }
    this.positionCroppers(coords, 'px')
    info.mouse = { x: clientX, y: clientY }
  }
  cropperMove = e => {
    if (!this.info || this.info.resizing) return
    var event = e.touches ? e.touches[0] : e
    var clientX = event.clientX
    var clientY = event.clientY
    var info = this.info
    var pos = info.pos
    var img = info.img
    pos.left -= info.mouse.x - clientX
    pos.top -= info.mouse.y - clientY
    var left = Math.min(img.width - pos.width, Math.max(0, pos.left))
    var top = Math.min(img.height - pos.height, Math.max(0, pos.top))
    pos.right = img.width - left - pos.width
    pos.bottom = img.height - top - pos.height
    this.positionCroppers({ left: left, top: top, right: pos.right, bottom: pos.bottom }, 'px')
    info.mouse = { x: clientX, y: clientY }
  }
}

// CAMERA
var WEBCAM_SUPPORT = 'undefined' !== typeof navigator && navigator.mediaDevices && navigator.mediaDevices.getUserMedia

class CameraPictureManager {
  constructor(tabContainer, onSelect, options) {
    this.onSelect = onSelect
    this.container = tabContainer
    this.canvas = document.createElement('canvas')
    this.picElt = this.container.find('.pic').elt
    this.videoElt = this.container.find('.video').elt
    this.streamOnElt = this.container.find('.stream-on')
    this.streamOffElt = this.container.find('.stream-off')

    this.picElt.style.display = 'inline-block'

    // Bind events
    $(this.videoElt).on('loadedmetadata', e => this.videoPlay(e))
    this.container.find('.take-picture').on('click', () => this.takePicture())
    this.container.find('.take-another-one').on('click', () => this.takeAnotherOne())
    this.container.find('.use-it').on('click', () => this.useIt())
    this.container.find('.rotate-right').on('click', () => this.rotate(1))
    this.container.find('.rotate-left').on('click', () => this.rotate(-1))
    this.container.find('.vertical-flip').on('click', () => this.flip('vFlip'))
    this.container.find('.horizontal-flip').on('click', () => this.flip('hFlip'))
  }

  onEnter() {
    this.rot = 0
    this.hFlip = 1
    this.vFlip = 1

    var md = navigator.mediaDevices || navigator
    md.getMedia = md.getUserMedia || md.webkitGetUserMedia || md.mozGetUserMedia || md.msGetUserMedia

    this.container.addClass('loading')
    md.getMedia({ video: true }).then(stream => {
      this.stream = stream
      this.videoElt.src = URL.createObjectURL(stream)
      this.videoElt.play()
      this.container.removeClass('loading')
    })
  }

  setStreamElt(on) {
    this.streamOnElt[on ? 'show' : 'hide']()
    this.streamOffElt[on ? 'hide' : 'show']()
  }

  takeAnotherOne() {
    this.picElt.style.backgroundImage = ''
    this.videoElt.style.visibility = ''
    this.setStreamElt(true)
  }

  transform() {
    var ratio = this.rot % 2 ? this.videoElt.videoHeight / this.videoElt.videoWidth : 1
    var scale = `${this.hFlip * ratio}, ${this.vFlip * ratio}`
    this.picElt.style.transform = `rotate(${this.rot * 90}deg) scale(${scale})`
  }

  flip(prop) {
    this[prop] *= -1
    this.transform()
  }

  rotate(add) {
    this.rot = (this.rot + add + 4) % 4
    this.transform()
  }

  useIt() {
    this.onSelect(this.savedPicture)
  }

  takePicture() {
    // Preview
    var width = this.videoElt.videoWidth
    var height = this.videoElt.videoHeight
    var ctx = this.canvas.getContext('2d')
    this.canvas.setAttribute('width', width)
    this.canvas.setAttribute('height', height)
    ctx.drawImage(this.videoElt, 0, 0, width, height)
    this.videoElt.style.visibility = 'hidden'
    this.picElt.style.background = `url('${this.canvas.toDataURL('image/png')}') left/auto no-repeat`
    this.setStreamElt(false)
    // Save pic
    this.savedPicture = transformImg(this.videoElt, width, height, {
      rotate: this.rot,
      scaleX: this.hFlip,
      scaleY: this.vflip,
    })
  }

  videoPlay(e) {
    if (!this.streaming) {
      this.streaming = true
    }
  }

  onLeave() {
    if (this.stream && this.stream.getTracks) this.stream.getTracks().forEach(track => track.stop())
    this.streaming = false
    this.takeAnotherOne()
  }
}

// TODO
// chrome://settings/content/camera

// LOCAL
var dragNDropSupport = (function() {
  var div = document.createElement('div')
  return 'draggable' in div || ('ondragstart' in div && 'ondrop' in div)
})()

class LocalPictureManager {
  constructor(tabContainer, onSelect, options) {
    this.onSelect = onSelect
    this.container = tabContainer
    this.container.find('#local-button').on('change', e => this.handleFile(e.target.files[0]))

    this.dropArea = this.container.find('.drop-area')
    if (dragNDropSupport) {
      ;['drag', 'dragstart', 'dragend', 'dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName =>
        this.dropArea.on(eventName, this.preventDefaults),
      )
      ;['dragenter', 'dragover'].forEach(eventName => this.dropArea.on(eventName, this.highlight))
      ;['dragleave', 'dragend', 'drop'].forEach(eventName => this.dropArea.on(eventName, this.unhighlight))
      this.dropArea.on('drop', e => this.handleFile(e.dataTransfer.files[0]))
    } else {
      this.dropArea.addClass('no-support')
    }
  }

  doneWithURL(url) {
    this.container.removeClass('loading')
    this.onSelect(url)
  }

  handleFile = file => {
    if (!file) return
    this.container.addClass('loading')
    var url = URL.createObjectURL(file)
    getOrientation(file, orientation => {
      var hFlip = 1
      var rot = 0
      if ([2, 4, 5, 7].indexOf(orientation) >= 0) hFlip *= -1
      if (5 === orientation || 6 === orientation) rot = 1
      if (3 === orientation || 4 === orientation) rot = 2
      if (7 === orientation || 8 === orientation) rot = 3

      if (hFlip !== 1 || rot !== 0) {
        urlToImage(
          url,
          img => {
            this.doneWithURL(transformImg(img, img.naturalWidth, img.naturalHeight, { rotate: rot, scaleX: hFlip }))
            URL.revokeObjectURL(file)
          },
          () => {
            console.log('ERROR')
            this.doneWithURL(url)
          },
        )
        return
      }
      this.doneWithURL(url)
    })
  }

  highlight = e => {
    this.dropArea.addClass('highlight')
  }

  unhighlight = e => {
    this.dropArea.removeClass('highlight')
  }

  preventDefaults = e => {
    e.preventDefault()
    e.stopPropagation()
  }
}

// ALBUM SERVICE
class AlbumManager {
  constructor(tabContainer, onSelect, options) {
    this.container = tabContainer
    this.options = options
    this.albumData = {}
    this.photoData = {}
    this.selectedAlbumId = null
    this.photoDataByAlbumId = {}

    // Bind events
    this.container.find('.connect').on('click', () => (this.loadSDK ? this.loadSDK() : this.authenticate()))
    this.container.on('click', '.back-to-albums', () => this.setSelectView('albums'))
    this.container.on('click', '.album-pic', e => {
      this.selectedAlbumId = e.currTarget.getAttribute('data-album-id')
      this.loadPhotos(this.selectedAlbumId)
    })
    this.container.on('click', '[data-next-page-info]', e => {
      var target = $(e.currTarget)
      var info = target.attr('data-next-page-info')
      'albums' === target.attr('data-more') ? this.loadMoreAlbums(info) : this.loadMorePhotos(info)
      target.remove()
    })
    this.container.on('click', '.photo', e => {
      getDataUri(e.currTarget.getAttribute('data-photo'), onSelect, () => console.log('ERROR LOADING IMAGE')) // TODO: error
    })
  }

  setSelectView(view) {
    this.container.findAll('.view').forEach(v => $(v).hide())
    this.container.find(`.view.${view}`).show()
  }

  renderAlbums(albumData) {
    var albums = this.container.find('.albums .list')
    var length = albums.findAll('.album-pic').length

    albums.addHtml(
      albumData.albums
        .slice(length)
        .map(a => {
          return a.count
            ? `<div class="album-pic" data-title="${a.title}" data-album-id="${a.id}" data-count="${
                a.count
              }" style="background-image: url('${a.picture}')"></div>`
            : ''
        })
        .join(''),
    )

    var firstAlbum = albums.find('[data-album-id]')
    if (!length && !firstAlbum.elt) {
      albums.html(`<div class="no-album">Sorry we didn't find any picture on your profile.</div>`) // TODO: i18n
      return
    }
    if (albumData.nextPageInfo) {
      albums.addHtml(
        `<div data-more="albums" data-next-page-info="${
          albumData.nextPageInfo
        }" class="more-albums">Load more albums</div>`,
      )
    }
    this.selectedAlbumId = firstAlbum.attr('data-album-id')
  }

  renderPhotos(photoData) {
    var photos = this.container.find('.photos .list')
    var length = photos.findAll('.photo').length

    photos.addHtml(
      photoData.photos
        .slice(length)
        .map(img => {
          return `<div class="photo" title="${img.title}" data-photo="${img.photo}" style="background-image: url('${
            img.thumbnail
          }')"></div>`
        })
        .join(''),
    )

    if (photoData.nextPageInfo) {
      photos.addHtml(
        `<div data-more="photos" data-next-page-info="${
          photoData.nextPageInfo
        }" class="more-photos">Load more photos</div>`,
      )
    }
  }
}

// Instagram
class InstagramPictureManager extends AlbumManager {
  constructor(tabContainer, onSelect, options) {
    super(tabContainer, onSelect, options)
  }

  // We'll open instagram sign-in page in a new popup
  // Once authenticated, instagram will redirect us to redirectURI and will add an access_token in the URL
  // We'll detect the popup location change and extract the access_token
  // Note:
  //  - We can only detect the popup location change if we keep the same origin.
  //  - The content at this URL (redirectURI) doesn't matter, we'll close the popup as soon as we get the accessToken
  //  - Ensure that you correctly setup your instagram app (Security -> Valid redirect URI + Enable Implicit OAuth)
  authenticate() {
    var redirectURI = window.location.protocol + '//' + window.location.host
    var popup = popupCentered(
      `https://api.instagram.com/oauth/authorize/?client_id=${
        this.options.instagram.clientID
      }&redirect_uri=${encodeURIComponent(this.options.instagram.redirectURI || redirectURI)}&response_type=token`,
      'Instagram',
      600,
      497,
    )
    var interval = this.accessToken ? 20 : 250
    var waitAccessToken = () => {
      setTimeout(() => {
        try {
          if (!popup.location || !popup.location.href) return // window has been closed
          if (!popup.location.hash || popup.location.hash.indexOf('#access_token') < 0) return waitAccessToken()
          this.accessToken = popup.location.hash.replace('#access_token=', '')
          this.userID = this.accessToken.slice(0, this.accessToken.indexOf('.'))
          popup.close()
          this.loadPhotos()
        } catch (e) {
          waitAccessToken()
        }
      }, interval)
    }
    setTimeout(() => (interval = 500), 3 * 60 * 1000)
    setTimeout(() => (interval = 1000), 10 * 60 * 1000)
    waitAccessToken()
  }

  processPhotoData(response, albumId) {
    var result = response.data.reduce((acc, post) => {
      acc.push({
        title: post.caption.text,
        thumbnail: post.images.thumbnail.url,
        photo: post.images.standard_resolution.url,
      })
      return acc
    }, [])
    this.photoData = {
      photos: (this.photoData.photos || []).concat(result),
      nextPageInfo: response.pagination.next_url,
    }
  }

  loadMorePhotos(nextPageInfo) {
    this.loadPhotos(nextPageInfo)
  }

  loadPhotos(nextPageInfo) {
    this.container.addClass('loading')
    sendRequest(
      nextPageInfo ||
        `https://api.instagram.com/v1/users/${this.userID}/media/recent?access_token=${this.accessToken}&count=${
          this.options.instagram.photosToLoad
        }`,
      response => {
        this.container.removeClass('loading')
        this.processPhotoData(response)
        this.setSelectView('photos')
        this.renderPhotos(this.photoData)
      },
      () => {
        this.container.removeClass('loading')
        console.log('ERROR...') // TODO
      },
    )
  }
}

// GOOGLE PHOTOS
class GooglePhotosPictureManager extends AlbumManager {
  constructor(tabContainer, onSelect, options) {
    super(tabContainer, onSelect, options)
  }

  loadSDK() {
    if ('undefined' !== typeof gapi) return this.authenticate()
    this.container.addClass('loading')

    window.gpAsyncInit = () => {
      this.container.removeClass('loading')
      this.authenticate()
    }
    ;((d, s) => {
      var js,
        fjs = d.getElementsByTagName(s)[0]
      js = d.createElement(s)
      js.src = 'https://apis.google.com/js/client:plus.js?onload=gpAsyncInit'
      fjs.parentNode.insertBefore(js, fjs)
    })(document, 'script')
  }

  authenticate() {
    gapi.auth.authorize(
      {
        immediate: false,
        client_id: this.options.googlePhotos.oAuthClientID,
        scope: ['https://www.googleapis.com/auth/photoslibrary.readonly', 'profile'],
      },
      response => {
        if (response && !response.error) {
          this.accessToken = response.access_token
          this.loadAlbums()
        } else {
          // google authentication failed
          console.log('Cancelled authorization')
        }
      },
    )
  }

  processAlbumData(response) {
    var result = response.result.albums.reduce((acc, album) => {
      if (parseInt(album.mediaItemsCount, 10)) {
        acc.push({
          id: album.id,
          count: album.mediaItemsCount,
          picture: `${album.coverPhotoBaseUrl}=w150-h150-c`,
          title: album.title,
        })
      }
      return acc
    }, [])
    this.albumData = {
      albums: (this.albumData.albums || []).concat(result),
      nextPageInfo: response.result.nextPageToken,
    }
  }

  processPhotoData(response, albumId) {
    var result = response.result.mediaItems.reduce((acc, photo) => {
      if (photo.mimeType.indexOf('video') < 0) {
        console.log(photo.baseUrl)
        acc.push({
          title: photo.filename,
          thumbnail: `${photo.baseUrl}=w150-h150-c`,
          photo: photo.baseUrl,
        })
      }
      return acc
    }, [])
    this.photoDataByAlbumId[albumId] = {
      photos: ((this.photoDataByAlbumId[albumId] || {}).photos || []).concat(result),
      nextPageInfo: response.result.nextPageToken,
    }
  }

  loadMoreAlbums(nextPageInfo) {
    this.loadAlbums(nextPageInfo)
  }

  loadAlbums(nextPageInfo) {
    this.container.addClass('loading')
    gapi.client
      .request({
        path: 'https://photoslibrary.googleapis.com/v1/albums',
        method: 'GET',
        params: {
          pageSize: this.options.googlePhotos.albumPageSize,
          pageToken: nextPageInfo,
        },
      })
      .then(
        response => {
          this.container.removeClass('loading')
          this.processAlbumData(response)
          this.setSelectView('albums')
          this.renderAlbums(this.albumData)
        },
        reason => {
          this.container.removeClass('loading')
          console.log(reason)
        },
      )
  }

  loadMorePhotos(nextPageInfo) {
    this.loadPhotos(this.selectedAlbumId, nextPageInfo)
  }

  loadPhotos(albumId, nextPageInfo) {
    this.container.addClass('loading')
    gapi.client
      .request({
        path: 'https://photoslibrary.googleapis.com/v1/mediaItems:search',
        method: 'POST',
        params: {
          pageSize: this.options.googlePhotos.photosToLoad,
          pageToken: nextPageInfo,
          albumId: albumId,
        },
      })
      .then(
        response => {
          this.container.removeClass('loading')
          this.processPhotoData(response, albumId)
          this.container.find('.photos .list').html('')
          this.setSelectView('photos')
          this.renderPhotos(this.photoDataByAlbumId[albumId])
        },
        reason => {
          console.log(reason)
        },
      )
  }
}

// FACEBOOK
var IMG_PROP = webPSupport ? 'webp_images' : 'images'

class FacebookPictureManager extends AlbumManager {
  constructor(tabContainer, onSelect, options) {
    super(tabContainer, onSelect, options)
  }

  loadSDK(callback) {
    if ('undefined' !== typeof FB) return this.authenticate()

    this.container.addClass('loading')
    window.fbAsyncInit = () => {
      this.container.removeClass('loading')
      FB.init({
        appId: this.options.facebook.appId,
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v3.1',
      })
      this.authenticate()
    }
    ;((d, s) => {
      var js,
        fjs = d.getElementsByTagName(s)[0]
      js = d.createElement(s)
      js.src = 'https://connect.facebook.net/' + this.options.locale + '/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    })(document, 'script')
  }

  authenticate() {
    FB.login(
      response => {
        if (!response.authResponse) return console.log('Cancelled authorization')
        this.loadAlbums()
      },
      { scope: 'user_photos' },
    )
  }

  processAlbumData(response) {
    var result = response.data.reduce((acc, album) => {
      if (album.count) {
        acc.push({
          id: album.id,
          count: album.count,
          picture: album.cover_photo.picture,
          title: album.name,
        })
        this.processPhotoData(album.photos, album.id)
      }
      return acc
    }, [])
    this.albumData = {
      albums: (this.albumData.albums || []).concat(result),
      nextPageInfo: response.paging.next,
    }
  }

  processPhotoData(response, albumId) {
    var result = response.data.reduce((acc, photo) => {
      var images = photo[IMG_PROP]
      acc.push({
        thumbnail: photo.picture,
        photo: this.selectPhoto(images, 1000).source,
      })
      return acc
    }, [])
    this.photoDataByAlbumId[albumId] = {
      photos: ((this.photoDataByAlbumId[albumId] || {}).photos || []).concat(result),
      nextPageInfo: response.paging.next,
    }
  }

  selectPhoto(array, minSize) {
    for (var i = 1, image; i < array.length; ++i) {
      image = array[i]
      if (image.width <= minSize || image.height <= minSize) return array[i - 1]
    }
    return array[0]
  }

  loadMore(url, success) {
    this.container.addClass('loading')
    sendRequest(
      url,
      json => {
        this.container.removeClass('loading')
        success(json)
      },
      () => {
        this.container.removeClass('loading')
        // TODO: error
        console.log('ERROR')
      },
    )
  }

  loadMoreAlbums(nextPageInfo) {
    this.loadMore(nextPageInfo, json => {
      this.processAlbumData(json, this.selectedAlbumId)
      this.renderAlbums(this.albumData)
    })
  }

  loadAlbums() {
    this.container.addClass('loading')
    FB.api(`/me?fields=albums{name,count,cover_photo{picture},photos{picture,${IMG_PROP}}}`, response => {
      this.processAlbumData(response.albums)
      this.setSelectView('albums')
      this.renderAlbums(this.albumData)
    })
  }

  loadMorePhotos(nextPageInfo) {
    this.loadMore(nextPageInfo, json => {
      this.processPhotoData(json, this.selectedAlbumId)
      this.renderPhotos(this.photoDataByAlbumId[this.selectedAlbumId])
    })
  }

  loadPhotos(albumId) {
    this.container.find('.photos .list').html('')
    this.setSelectView('photos')
    this.renderPhotos(this.photoDataByAlbumId[albumId])
  }
}

// General Helpers
var image = new Image()
image.crossOrigin = 'Anonymous'
var canvas = document.createElement('canvas')
var ctx = canvas.getContext('2d')

function getDataUri(url, callback, error) {
  image.onload = function onload() {
    canvas.width = this.naturalWidth
    canvas.height = this.naturalHeight
    ctx.drawImage(this, 0, 0)
    callback(canvas.toDataURL('image/png'))
    image.onload = null
    image.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"/>'
  }
  image.onerror = () => {
    error()
  }
  image.src = url
}

var image2 = new Image()
function urlToImage(url, callback, error) {
  image2.onload = function() {
    callback(image2)
    try {
      image2.src = 'about:blank'
    } catch (e) {}
  }
  image2.onerror = () => {
    if (image2.src !== 'about:blank') error()
  }
  image2.src = url
}

function getOrientation(file, callback) {
  var reader = new FileReader()
  reader.onload = function(e) {
    var view = new DataView(e.target.result)
    if (view.getUint16(0, false) != 0xffd8) return callback(-2)
    var length = view.byteLength
    var offset = 2
    var marker, little, tags, i
    while (offset < length) {
      if (view.getUint16(offset + 2, false) <= 8) return callback(-1)
      marker = view.getUint16(offset, false)
      offset += 2
      if (marker == 0xffe1) {
        if (view.getUint32((offset += 2), false) != 0x45786966) return callback(-1)
        little = view.getUint16((offset += 6), false) == 0x4949
        offset += view.getUint32(offset + 4, little)
        tags = view.getUint16(offset, little)
        offset += 2
        for (i = 0; i < tags; ++i)
          if (view.getUint16(offset + i * 12, little) == 0x0112)
            return callback(view.getUint16(offset + i * 12 + 8, little))
      } else if ((marker & 0xff00) != 0xff00) {
        break
      } else {
        offset += view.getUint16(offset, false)
      }
    }
    return callback(-1)
  }
  reader.readAsArrayBuffer(file.slice(0, 64 * 4 * 1024))
}

// options.rotate => [1, 2, 3, 4] right quarter turns
function transformImg(source, width, height, options) {
  options = options || {}
  var invertDim = options.rotate % 2
  canvas.width = invertDim ? height : width
  canvas.height = invertDim ? width : height
  ctx.translate(canvas.width / 2, canvas.height / 2)
  ctx.rotate((Math.PI / 2) * options.rotate || 0)
  ctx.scale(options.scaleX || 1, options.scaleY || 1)
  ctx.drawImage(source, -width / 2, -height / 2)
  return canvas.toDataURL('image/png')
}

if ('undefined' !== typeof HTMLCanvasElement && !HTMLCanvasElement.prototype.toBlob) {
  HTMLCanvasElement.prototype.toBlob = function(callback, type, quality) {
    var dataURL = this.toDataURL(type, quality).split(',')[1]
    setTimeout(function() {
      var binStr = atob(dataURL)
      var len = binStr.length
      var arr = new Uint8Array(len)
      for (var i = 0; i < len; ++i) arr[i] = binStr.charCodeAt(i)
      callback(new Blob([arr], { type: type || 'image/png' }))
    })
  }
}

function cropPic(source, metrics, callback) {
  canvas.width = metrics.width
  canvas.height = metrics.height
  ctx.drawImage(source, metrics.left, metrics.top, metrics.width, metrics.height, 0, 0, metrics.width, metrics.height)
  return canvas.toBlob(callback, 'image/jpeg', 90)
}

function popupCentered(url, title, w, h) {
  var win = window,
    de = document.documentElement
  var dualScreenLeft = win.screenLeft != undefined ? win.screenLeft : win.screenX
  var dualScreenTop = win.screenTop != undefined ? win.screenTop : win.screenY
  var width = win.innerWidth ? win.innerWidth : de.clientWidth ? de.clientWidth : win.screen.width
  var height = win.innerHeight ? win.innerHeight : de.clientHeight ? de.clientHeight : win.screen.height
  var left = width / 2 - w / 2 + dualScreenLeft
  var top = Math.min(50, height / 2 - h / 2 + dualScreenTop)
  var newWindow = win.open(
    url,
    title,
    `toolbar=no,directories=no,status=no,menubar=no,resizable=no,copyhistory=no,scrollbars=yes,width=${w},height=${h},top=${top},left=${left}`,
  )
  if (newWindow.focus) newWindow.focus()
  return newWindow
}

// Request helpers
function sendRequest(url, success, error) {
  var xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
        success && success(JSON.parse(xhr.responseText))
      } else {
        error && error(xhr)
      }
    }
  }
  xhr.open('get', url)
  xhr.send()
}

// HTML Helpers
let proto = 'undefined' !== typeof Element ? Element.prototype : {}
if (!proto.matches) {
  proto.matches =
    proto.matchesSelector ||
    proto.mozMatchesSelector ||
    proto.msMatchesSelector ||
    proto.oMatchesSelector ||
    proto.webkitMatchesSelector
}

function $(selector) {
  return new ExtendedElement('string' === typeof selector ? document.querySelector(selector) : selector)
}

class ExtendedElement {
  constructor(elt) {
    this.elt = elt
  }
  find(selector) {
    return new ExtendedElement(this.elt.querySelector(selector))
  }
  findAll(selector) {
    return Array.prototype.slice.call(this.elt.querySelectorAll(selector))
  }
  hide() {
    this.elt.style.display = 'none'
    return this
  }
  show() {
    this.elt.style.display = ''
    return this
  }
  addHtml(val) {
    return (this.elt.innerHTML += val), this
  }
  html(val) {
    return null == val ? this.elt.innerHTML : ((this.elt.innerHTML = val), this)
  }
  attr(name, val) {
    return null == val ? this.elt.getAttribute(name) : (this.elt.setAttribute(name, val), this)
  }
  remove() {
    this.elt.parentNode.removeChild(this.elt)
  }
  addClass(className) {
    this.elt.className += ` ${className}`
    return this
  }
  removeClass(className) {
    className = ` ${className} `
    var cName = ` ${this.elt.className} `
    while (cName.indexOf(className) >= 0) cName = cName.replace(className, ' ')
    this.elt.className = cName.trim()
    return this
  }
  on(eventName, selector, handler) {
    var func = selector
    var element = this.elt
    if ('function' !== typeof selector) {
      var selectorPlus = selector
        .split(',')
        .map(s => s + ' *')
        .join(',')
      func = event => {
        if (event.target.matches(selector)) {
          event.currTarget = event.target
          handler(event)
        } else if (event.target.matches(selectorPlus)) {
          for (var elem = event.target; elem && elem !== element; elem = elem.parentNode)
            if (elem.matches(selector)) event.currTarget = elem
          handler(event)
        }
      }
    }
    element.addEventListener(eventName, func, false)
    return () => element.removeEventListener(eventName, func, false)
  }
}
