/*! A fix for the iOS orientationchange zoom bug.
 Script by @scottjehl, rebound by @wilto.
 MIT / GPLv2 License.
*/
;(function(w) {
  if (!w) return

  // This fix addresses an iOS bug, so return early if the UA claims it's something else.
  let ua = navigator.userAgent
  if (
    !(
      /iPhone|iPad|iPod/.test(navigator.platform) &&
      /OS [1-5]_[0-9_]* like Mac OS X/i.test(ua) &&
      ua.indexOf('AppleWebKit') > -1
    )
  )
    return

  let doc = w.document
  if (!doc.querySelector) return

  let meta = doc.querySelector('meta[name=viewport]')
  if (!meta) return

  let initialContent = meta && meta.getAttribute('content')
  let disabledZoom = initialContent + ',maximum-scale=1'
  let enabled = true

  function restoreZoom() {
    meta.setAttribute('content', initialContent)
    enabled = true
  }

  function disableZoom() {
    meta.setAttribute('content', disabledZoom)
    enabled = false
  }

  function checkTilt(e) {
    let aig = e.accelerationIncludingGravity
    let x = Math.abs(aig.x)
    let y = Math.abs(aig.y)
    let z = Math.abs(aig.z)

    // If portrait orientation and in one of the danger zones
    if ((!w.orientation || w.orientation === 180) && (x > 7 || (((z > 6 && y < 8) || (z < 8 && y > 6)) && x > 5))) {
      if (enabled) disableZoom()
    } else if (!enabled) {
      restoreZoom()
    }
  }

  w.addEventListener('orientationchange', restoreZoom, false)
  w.addEventListener('devicemotion', checkTilt, false)
})('undefined' !== typeof window ? window : null)
