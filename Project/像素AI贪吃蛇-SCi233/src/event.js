export class EventEmitter {
  events = {};

  addEventListener (eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = []
    }
    this.events[eventName].push(callback)
  }

  removeEventListener (eventName, callback) {
    if (!this.events[eventName]) {
      return
    }
    this.events[eventName] = this.events[eventName].filter(cb => cb !== callback)
  }

  on (eventName, callback) {
    this.addEventListener(eventName, callback)
  }

  off (eventName, callback) {
    this.removeEventListener(eventName, callback)
  }

  once (eventName, callback) {
    const onceCallback = () => {
      callback()
      this.removeEventListener(eventName, onceCallback)
    }
    this.addEventListener(eventName, onceCallback)
  }

  emit (eventName, ...args) {
    if (!this.events[eventName]) {
      return
    }
    this.events[eventName].forEach(cb => cb(...args))
  }
}
