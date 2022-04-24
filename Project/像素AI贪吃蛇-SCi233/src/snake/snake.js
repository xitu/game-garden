import { GameObject } from '../gameObject.js'
import { SnakeHead } from './snakeHead.js'
import { SnakeBody } from './snakeBody.js'
import { SnakeTail } from './snakeTail.js'
import { EventEmitter } from '../event.js'
import { isTouchable } from '../utils.js'
import {
  DIRECTION,
  INVALID_DIRECTION,
  directionValues
} from './constants.js'

const MAX_SPEED = isTouchable() ? 3 : 5
const INIT_SPEED = 1
const AI_SPEED = 16

class ListNode {
  constructor (value, prev, next) {
    this.value = value
    this.next = next || null
    this.prev = prev || null
  }
}

export class Snake extends GameObject {
  constructor (config) {
    const { length, rowNums, colNums, pixelSize } = config

    super(0, 0)

    this.length = length
    this.rowNums = rowNums
    this.colNums = colNums
    this.pixelSize = pixelSize

    this.direction = DIRECTION.RIGHT
    this.speed = INIT_SPEED

    this.beforeMove = null

    this.head = new ListNode(new SnakeHead(length, 1, pixelSize, SnakeHead.TYPES.RIGHT))
    let tail = this.head
    for (let i = 1; i < length - 1; i++) {
      tail.next = new ListNode(new SnakeBody(length - i, 1, pixelSize, SnakeBody.TYPES.HORIZONTAL), tail)
      tail = tail.next
    }
    tail.next = new ListNode(new SnakeTail(1, 1, pixelSize, SnakeTail.TYPES.RIGHT), tail)
    tail = tail.next
    this.tail = tail

    this._elapsed = 0
    this._canGrow = false
    this._directionQueue = []
    this._lastDirection = this.direction
    this._eventEmitter = new EventEmitter()
    this._dash = 0
  }

  update (elapsed) {
    this._elapsed += elapsed
    const aiSpeed = this.beforeMove ? AI_SPEED : 0
    if (this._elapsed >= 1000 / (aiSpeed || this._dash || this.speed)) {
      this._elapsed = 0
      if (this.beforeMove) {
        const isTailAccessible = !this._canGrow
        this.direction = this.beforeMove({ isTailAccessible })
      } else if (this._directionQueue.length > 0) {
        this._lastDirection = this.direction
        this.direction = this._directionQueue.shift()
      }
      if (this._canGrow) {
        this._doGrow()
        this._canGrow = false
      } else {
        this.move()
      }
    }
  }

  draw (renderer) {
    for (let node = this.tail; node; node = node.prev) {
      if (node.value.visible) {
        node.value.draw(renderer)
      }
    }
  }

  move () {
    for (let p = this.tail; p.prev; p = p.prev) {
      p.value.x = p.prev.value.x
      p.value.y = p.prev.value.y
      if (SnakeBody.ENDPOINT_TYPES.includes(p.prev.value.type)) {
        p.value.type = SnakeBody.ENDPOINT_TYPES_TO_TYPES[p.prev.value.type]
      } else {
        p.value.type = p.prev.value.type
      }
    }
    this.tail.value.type = this._calcTailType()
    const head = this.head
    const direction = directionValues[this.direction]
    head.value.x += direction[1]
    head.value.y += direction[0]
    head.value.type = SnakeHead.DIRECTION_TO_TYPE[this.direction]
    if (this.direction !== this._lastDirection) {
      head.value.type = SnakeHead.DIRECTION_TO_TYPE[this.direction]
      head.next.value.type = SnakeBody.DIRECTION_TO_TYPE['' + this._lastDirection + this.direction]
      this._lastDirection = this.direction
    }
  }

  dash () {
    this._dash = 10
    setTimeout(() => {
      this._dash = 0
    }, 300)
  }

  _calcTailType () {
    const tail = this.tail.value
    const tailPrev = this.tail.prev.value
    if (tail.x === tailPrev.x) {
      return tail.y < tailPrev.y ? SnakeTail.TYPES.DOWN : SnakeTail.TYPES.UP
    } else {
      return tail.x < tailPrev.x ? SnakeTail.TYPES.RIGHT : SnakeTail.TYPES.LEFT
    }
  }

  grow () {
    this._canGrow = true
  }

  toString () {
    let str = ''
    for (let node = this.head; node; node = node.next) {
      str += `[${node.value.x},${node.value.y},${node.value.type}] `
    }
    return str
  }

  _doGrow () {
    const head = this.head
    const node = new ListNode(new SnakeBody(head.value.x, head.value.y, this.pixelSize, head.value.type), head, head.next)
    head.next.prev = node
    head.next = node
    this.length++
    const direction = directionValues[this.direction]
    head.value.x += direction[1]
    head.value.y += direction[0]
    if (this.direction !== this._lastDirection) {
      head.value.type = SnakeHead.DIRECTION_TO_TYPE[this.direction]
      head.next.value.type = SnakeBody.DIRECTION_TO_TYPE['' + this._lastDirection + this.direction]
      this._lastDirection = this.direction
    }

    this._eventEmitter.emit('statusChanged', this.length, this.speed)
  }

  changeDirection (direction) {
    if (this._directionQueue.length === 0) {
      if (direction !== this.direction && INVALID_DIRECTION[direction] !== this.direction) {
        this._directionQueue.push(direction)
      }
    } else {
      const lastDirection = this._directionQueue[this._directionQueue.length - 1]
      if (direction !== lastDirection && INVALID_DIRECTION[direction] !== lastDirection) {
        this._directionQueue.push(direction)
      }
    }
  }

  speedUp () {
    this.speed = Math.min(this.speed + 1, MAX_SPEED)

    this._eventEmitter.emit('statusChanged', this.length, this.speed)
  }

  speedDown () {
    this.speed = Math.max(this.speed - 1, 1)

    this._eventEmitter.emit('statusChanged', this.length, this.speed)
  }

  isEat (food) {
    const head = this.head
    return head.value.x === food.x && head.value.y === food.y
  }

  isDead () {
    const head = this.head
    const { x: headX, y: headY } = head.value
    if (headX < 1 || headX > this.colNums ||
      headY < 1 || headY > this.rowNums) {
      return true
    }
    for (let node = head.next; node; node = node.next) {
      if (node.value.x === headX && node.value.y === headY) {
        return true
      }
    }
  }

  forEach (cb) {
    for (let node = this.head; node; node = node.next) {
      cb(node.value)
    }
  }

  includes (x, y) {
    for (let node = this.head; node; node = node.next) {
      if (node.value.x === x && node.value.y === y) {
        return true
      }
    }
    return false
  }

  onStatusChanged (cb) {
    this._eventEmitter.on('statusChanged', cb)
  }

  getHead () {
    return this.head.value
  }

  getTail () {
    return this.tail.value
  }
}
