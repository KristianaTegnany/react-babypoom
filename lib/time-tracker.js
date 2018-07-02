export default class TimeTracker {
  start() {
    if (null == this.elapsed && null == this.time) {
      this.time = 0
      this.startTime = new Date().getTime()
    }
  }

  resume() {
    if (null != this.time) {
      this.startTime = new Date().getTime()
    }
  }

  pause() {
    if (null != this.time) {
      this.time += new Date().getTime() - this.startTime
    }
  }

  stop() {
    if (null != this.time) {
      this.elapsed = this.time + new Date().getTime() - this.startTime
      this.time = null
    }
  }
}
