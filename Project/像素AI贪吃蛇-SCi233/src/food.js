import { GameObject } from './gameObject.js'
import { LP2RP } from './utils.js'

export const TYPE = {
  APPLE: 0,
  CHERRY: 1,
  BANANA: 2,
  WATERMELON: 3
}

const COLORS = [
  '',
  '#59b574', '#4e1413', '#832525', '#bc3532', '#e23f40', '#e78385',
  '#fceaaa', '#f3de70', '#cf641e', '#f37a2a', '#8e4413'
]

const PIXEL_DATAS = {
  [TYPE.APPLE]: [
    [0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0],
    [0, 0, 3, 3, 2, 3, 0, 0],
    [0, 3, 6, 6, 2, 4, 3, 0],
    [0, 3, 5, 5, 5, 4, 3, 0],
    [0, 3, 4, 4, 4, 4, 3, 0],
    [0, 0, 3, 3, 3, 3, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
  ],
  [TYPE.CHERRY]: [
    [0, 0, 0, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 2, 1, 0, 1],
    [0, 0, 0, 2, 0, 2, 0, 0],
    [0, 0, 0, 2, 0, 4, 4, 0],
    [0, 0, 3, 4, 3, 5, 6, 4],
    [0, 3, 5, 6, 3, 5, 5, 4],
    [0, 3, 5, 5, 3, 3, 3, 0],
    [0, 0, 3, 3, 0, 0, 0, 0]
  ],
  [TYPE.BANANA]: [
    [0, 0, 0, 11, 11, 11, 11, 11],
    [0, 0, 0, 11, 7, 8, 8, 11],
    [0, 0, 0, 0, 9, 8, 11, 0],
    [0, 0, 0, 9, 8, 8, 10, 0],
    [0, 0, 9, 8, 8, 8, 10, 0],
    [9, 9, 8, 8, 7, 10, 0, 0],
    [9, 8, 8, 7, 10, 0, 0, 0],
    [0, 9, 9, 9, 0, 0, 0, 0]
  ],
  [TYPE.WATERMELON]: [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 6, 4, 4, 2, 4, 4, 1],
    [1, 2, 4, 4, 4, 4, 4, 1],
    [1, 4, 4, 2, 4, 4, 2, 1],
    [0, 1, 4, 4, 4, 4, 1, 0],
    [0, 0, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
  ]
}

export class Food extends GameObject {
  constructor (x, y, pixelSize, type) {
    super(x, y)
    this.pixelSize = pixelSize
    this.type = type
  }

  update () {}

  draw (renderer) {
    const { pixelSize, type } = this
    const pixelData = PIXEL_DATAS[type]
    const { x, y } = LP2RP(this.x, this.y, pixelSize)
    for (let r = 0; r < pixelData.length; r++) {
      for (let c = 0; c < pixelData[r].length; c++) {
        if (pixelData[r][c] !== 0) {
          renderer.drawRect(
            x + c * pixelSize,
            y + r * pixelSize,
            pixelSize,
            pixelSize,
            COLORS[pixelData[r][c]]
          )
        }
      }
    }
  }
}
