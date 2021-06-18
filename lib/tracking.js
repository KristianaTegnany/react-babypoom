import mixpanel from "mixpanel-browser"
mixpanel.init("d2d11fabc4c8471df4d01a80f4f9c8f5")

let envCheck = process.env.NODE_ENV === "development"

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
