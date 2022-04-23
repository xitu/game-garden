const KEY_STATUS = {
  PRESSED: 'pressed',
  RELEASED: 'released'
}

const keyStatus = {}

window.addEventListener('keydown', (event) => {
  const code = event.code
  keyStatus[code] = KEY_STATUS.PRESSED
})

window.addEventListener('keyup', (event) => {
  const code = event.code
  keyStatus[code] = KEY_STATUS.RELEASED
})

export class Keyboard {
  static isPressed (key) {
    return keyStatus[key] === KEY_STATUS.PRESSED
  }

  static isReleased (key) {
    return keyStatus[key] === KEY_STATUS.RELEASED
  }

  constructor (key) {
    this.key = key
  }

  isPressed () {
    return Keyboard.isPressed(this.key)
  }

  isReleased () {
    return Keyboard.isReleased(this.key)
  }
}
