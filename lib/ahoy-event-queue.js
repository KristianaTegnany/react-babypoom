import Cookie from './cookie'

export default class EventQueue {
  constructor(name) {
    this.queue = []
    this.name = name
  }

  add(element) {
    this.queue.push(element)
    return this.save()
  }

  remove(element) {
    let index = this.queue.indexOf(element)
    if (index >= 0) {
      this.queue.splice(index, 1)
      this.save()
    }
    return this
  }

  load() {
    try {
      this.queue = JSON.parse(Cookie.get(this.name) || '[]')
    } catch (e) {
      // do nothing
    }
    return this
  }

  exec(func) {
    this.queue.forEach(func)
    return this
  }

  save() {
    Cookie.set(this.name, JSON.stringify(this.queue), 1)
    return this
  }
}
