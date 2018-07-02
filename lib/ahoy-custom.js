import Cookie from './cookie'
import uuid from './uuid'
import Queue from './ahoy-queue'
import EventQueue from './ahoy-event-queue'
import { getClosest, eventDelegation } from './html-element'
import send from './send-request'

const VISIT_TTL = 4 * 60 // 4 hours
const VISITOR_TTL = 2 * 365 * 24 * 60 // 2 years

let config = {
  urlPrefix: '',
  visitsUrl: '/ahoy/visits',
  eventsUrl: '/ahoy/events',
  cookieDomain: null,
  page: null,
  platform: 'Web',
  useBeacon: false,
  startOnReady: true,
}

let queue = new Queue()
let eventQueue = new EventQueue('ahoy_events')

let ahoy = {
  configure: function(options) {
    Object.assign(config, options)
  },
  // Bpoom Custom
  updateVisit: function(visitParams) {
    queue.onReady(function() {
      let attrs = JSON.parse(Cookie.get('ahoy_visit_attrs') || '[]')

      // Already updated
      if (!Object.keys(visitParams).some(attr => !attrs.includes(attr))) return

      let params = {
        visit: visitParams,
        visit_token: ahoy.getVisitId(),
      }
      sendRequest(visitsUrl(), params, 'PATCH').then(() => {
        Object.keys(visitParams).forEach(attr => {
          if (!attrs.includes(attr)) {
            attrs.push(attr)
          }
        })
        Cookie.set('ahoy_visit_attrs', JSON.stringify(attrs), VISIT_TTL)
      })
    })
  },
}

function visitsUrl() {
  return config.urlPrefix + config.visitsUrl
}

function eventsUrl() {
  return config.urlPrefix + config.eventsUrl
}

function canTrackNow() {
  return (config.useBeacon || config.trackNow) && typeof window.navigator.sendBeacon !== 'undefined'
}

function log(message) {
  if (Cookie.get('ahoy_debug')) {
    window.console.log(message)
  }
}

// from jquery-ujs
function csrfToken() {
  let token = document.querySelector('meta[name="csrf-token"]')
  return token ? token.getAttribute('content') : null
}

function csrfParam() {
  let param = document.querySelector('meta[name=csrf-param]')
  return param ? param.getAttribute('content') : null
}

function eventData(event) {
  var data = {
    events: [event],
    visit_token: event.visit_token,
    visitor_token: event.visitor_token,
  }
  delete event.visit_token
  delete event.visitor_token
  return data
}

function sendRequest(url, data, method) {
  let options = {
    method: method || 'POST',
    data: data,
    json: true,
    headers: {},
  }
  var token = csrfToken()
  if (token) options.headers['X-CSRF-Token'] = token
  return send(url, options)
}

function trackEvent(event) {
  queue.onReady(function() {
    sendRequest(eventsUrl(), eventData(event)).then(() => eventQueue.remove(event))
  })
}

function trackEventNow(event) {
  queue.onReady(function() {
    var data = eventData(event)
    var param = csrfParam()
    var token = csrfToken()
    if (param && token) data[param] = token
    var payload = new Blob([JSON.stringify(data)], { type: 'application/json; charset=utf-8' })
    navigator.sendBeacon(eventsUrl(), payload)
  })
}

function page() {
  return config.page || window.location.pathname
}

function eventProperties(e) {
  let target = e.currTarget
  let section = getClosest(target, '[data-section]')
  return {
    tag: target.tagName.toLowerCase(),
    id: target.id,
    class: target.className,
    page: page(),
    section: section ? section.getAttribute('data-section') : void 0,
  }
}

function createVisit() {
  let visitId = ahoy.getVisitId()
  let visitorId = ahoy.getVisitorId()
  let track = Cookie.get('ahoy_track')

  if (visitId && visitorId && !track) {
    // TODO keep visit alive?
    log('Active visit')
    queue.ready()
  } else {
    if (track) {
      Cookie.destroy('ahoy_track')
    }

    if (!visitId) {
      visitId = Cookie.set('ahoy_visit', uuid(), VISIT_TTL)
    }

    // make sure cookies are enabled
    if (Cookie.get('ahoy_visit')) {
      log('Visit started')

      if (!visitorId) {
        visitorId = Cookie.set('ahoy_visitor', uuid(), VISITOR_TTL)
      }

      var data = {
        visit_token: visitId,
        visitor_token: visitorId,
        platform: config.platform,
        landing_page: window.location.href,
        screen_width: window.screen.width,
        screen_height: window.screen.height,
      }

      // referrer
      if (document.referrer) {
        data.referrer = document.referrer
      }

      log(data)
      sendRequest(visitsUrl(), data).then(() => queue.ready())
    } else {
      log('Cookies disabled')
      queue.ready()
    }
  }
}

ahoy.getVisitId = function() {
  return Cookie.get('ahoy_visit')
}

ahoy.getVisitorId = function() {
  return Cookie.get('ahoy_visitor')
}

ahoy.reset = function() {
  Cookie.destroy('ahoy_visit')
  Cookie.destroy('ahoy_visitor')
  Cookie.destroy('ahoy_events')
  Cookie.destroy('ahoy_track')
  Cookie.destroy('ahoy_visit_attrs')
  return true
}

ahoy.debug = function(enabled) {
  if (enabled === false) {
    Cookie.destroy('ahoy_debug')
  } else {
    Cookie.set('ahoy_debug', 't', 365 * 24 * 60) // 1 year
  }
  return true
}

ahoy.track = function(name, properties) {
  // generate unique id
  var event = {
    id: uuid(),
    name: name,
    properties: properties || {},
    time: new Date().getTime() / 1000.0,
  }

  queue.onReady(function() {
    log(event)

    if (!ahoy.getVisitId()) {
      createVisit()
    }

    event.visit_token = ahoy.getVisitId()
    event.visitor_token = ahoy.getVisitorId()

    if (canTrackNow()) {
      trackEventNow(event)
    } else {
      eventQueue.add(event)

      // wait in case navigating to reduce duplicate events
      setTimeout(function() {
        trackEvent(event)
      }, 1000)
    }
  })
}

ahoy.trackView = function(additionalProperties) {
  var properties = {
    url: window.location.href,
    title: document.title,
    page: page(),
  }
  if (additionalProperties) {
    Object.assign(properties, additionalProperties)
  }
  ahoy.track('$view', properties)
}

ahoy.trackClicks = function() {
  eventDelegation('click', 'a, button, input[type=submit]', function(e) {
    let target = e.currTarget
    let properties = eventProperties(e)
    properties.text = properties.tag == 'input' ? target.value : target.innerText.replace(/[\s\r\n]+/g, ' ').trim()
    properties.href = target.getAttribute('href')
    ahoy.track('$click', properties)
  })
}

ahoy.trackSubmits = function() {
  eventDelegation('submit', 'form', function(e) {
    let properties = eventProperties(e)
    ahoy.track('$submit', properties)
  })
}

ahoy.trackChanges = function() {
  eventDelegation('change', 'input, textarea, select', function(e) {
    let properties = eventProperties(e)
    ahoy.track('$change', properties)
  })
}

ahoy.trackAll = function() {
  ahoy.trackView()
  ahoy.trackClicks()
  ahoy.trackSubmits()
  ahoy.trackChanges()
}

eventQueue.load().exec(trackEvent)

ahoy.start = function() {
  createVisit()

  ahoy.start = function() {}
}

export default ahoy
