import mixpanel from "mixpanel-browser"
mixpanel.init("68576aa81ca606b70f0468ef16e2dcc0")

let envCheck = true// process.env.NODE_ENV === "development"//"production" //"development"

let actions = {
  identify: (id) => {
    if (envCheck) mixpanel.identify(id)
  },
  alias: (id) => {
    if (envCheck) mixpanel.alias(id)
  },
  track: (name, props) => {
    if (envCheck) mixpanel.track(name, props)
  },
  people: {
    set: (props) => {
      if (envCheck) mixpanel.people.set(props)
    },
  },
}

let Tracking = actions

export default Tracking
