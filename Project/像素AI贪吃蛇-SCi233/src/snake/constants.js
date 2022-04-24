export const DIRECTION = {
  UP: 1,
  RIGHT: 2,
  DOWN: 4,
  LEFT: 8
}

export const INVALID_DIRECTION = {
  [DIRECTION.UP]: DIRECTION.DOWN,
  [DIRECTION.RIGHT]: DIRECTION.LEFT,
  [DIRECTION.DOWN]: DIRECTION.UP,
  [DIRECTION.LEFT]: DIRECTION.RIGHT
}

export const directionValues = {
  [DIRECTION.UP]: [-1, 0],
  [DIRECTION.RIGHT]: [0, 1],
  [DIRECTION.DOWN]: [1, 0],
  [DIRECTION.LEFT]: [0, -1]
}
