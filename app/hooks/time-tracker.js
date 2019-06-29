import { useEffect } from 'react'
import TimeTracker from '../../lib/time-tracker'

let timeTracker = new TimeTracker()

export default () => {
  useEffect(() => {
    timeTracker.resume() // Will only resume if it's already started
    return () => timeTracker.pause()
  }, [])

  return timeTracker
}
