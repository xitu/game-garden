import { SnakeBody } from './snakeBody.js'
import { DIRECTION } from './constants.js'

export class SnakeTail extends SnakeBody {
  static DIRECTION_TO_TYPE = {
    [DIRECTION.UP]: SnakeBody.TYPES.UP,
    [DIRECTION.RIGHT]: SnakeBody.TYPES.RIGHT,
    [DIRECTION.DOWN]: SnakeBody.TYPES.DOWN,
    [DIRECTION.LEFT]: SnakeBody.TYPES.LEFT
  }

  static PIXEL_DATAS = {
    [SnakeBody.TYPES.UP]: [
      [0, 0, 3, 3, 1, 3, 0, 0],
      [0, 0, 3, 1, 1, 3, 0, 0],
      [0, 0, 3, 1, 1, 3, 0, 0],
      [0, 0, 3, 1, 1, 3, 0, 0],
      [0, 0, 3, 3, 3, 3, 0, 0],
      [0, 0, 0, 3, 3, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ],
    [SnakeBody.TYPES.RIGHT]: [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 3, 3, 3, 3, 3],
      [0, 0, 3, 3, 1, 1, 1, 1],
      [0, 0, 3, 3, 1, 1, 1, 3],
      [0, 0, 0, 3, 3, 3, 3, 3],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ],
    [SnakeBody.TYPES.DOWN]: [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 3, 3, 0, 0, 0],
      [0, 0, 3, 3, 3, 3, 0, 0],
      [0, 0, 3, 1, 1, 3, 0, 0],
      [0, 0, 3, 1, 1, 3, 0, 0],
      [0, 0, 3, 1, 1, 3, 0, 0],
      [0, 0, 3, 1, 3, 3, 0, 0]
    ],
    [SnakeBody.TYPES.LEFT]: [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [3, 3, 3, 3, 3, 0, 0, 0],
      [3, 1, 1, 1, 3, 3, 0, 0],
      [1, 1, 1, 1, 3, 3, 0, 0],
      [3, 3, 3, 3, 3, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ]
  }

  update () {}

  draw (renderer) {
    super.draw(renderer)
  }

  _getPixelData (type) {
    return SnakeTail.PIXEL_DATAS[type]
  }
}
