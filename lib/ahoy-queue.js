export default class Queue {
  constructor() {
    this.ok = false
    this.queue = []
  }

  ready() {
    let callback
    while ((callback = this.queue.shift())) {
      callback()
    }
    this.ok = true
  }

  onReady(callback) {
    if (this.ok) {
      callback()
    } else {
      this.queue.push(callback)
    }
  }
}
