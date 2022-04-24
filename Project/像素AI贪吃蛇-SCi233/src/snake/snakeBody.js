import { GameObject } from '../gameObject.js'
import { DIRECTION } from './constants.js'
import { LP2RP } from '../utils.js'

const HORIZONTAL_PIXEL_DATAS = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [3, 3, 3, 3, 3, 3, 3, 3],
  [3, 1, 1, 1, 3, 1, 1, 1],
  [1, 1, 1, 3, 1, 1, 1, 3],
  [3, 3, 3, 3, 3, 3, 3, 3],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]
]

const VERTICAL_PIXEL_DATAS = [
  [0, 0, 3, 3, 1, 3, 0, 0],
  [0, 0, 3, 1, 1, 3, 0, 0],
  [0, 0, 3, 1, 1, 3, 0, 0],
  [0, 0, 3, 1, 3, 3, 0, 0],
  [0, 0, 3, 3, 1, 3, 0, 0],
  [0, 0, 3, 1, 1, 3, 0, 0],
  [0, 0, 3, 1, 1, 3, 0, 0],
  [0, 0, 3, 1, 3, 3, 0, 0]
]

export class SnakeBody extends GameObject {
  static TYPES = {
    HORIZONTAL: 0,
    VERTICAL: 1,
    LEFTTOP: 2,
    RIGHTTOP: 3,
    LEFTBOTTOM: 4,
    RIGHTBOTTOM: 5,
    UP: 6,
    RIGHT: 7,
    DOWN: 8,
    LEFT: 9
  }

  static ENDPOINT_TYPES = [
    SnakeBody.TYPES.UP,
    SnakeBody.TYPES.RIGHT,
    SnakeBody.TYPES.DOWN,
    SnakeBody.TYPES.LEFT
  ]

  static ENDPOINT_TYPES_TO_TYPES = {
    [SnakeBody.TYPES.UP]: SnakeBody.TYPES.VERTICAL,
    [SnakeBody.TYPES.RIGHT]: SnakeBody.TYPES.HORIZONTAL,
    [SnakeBody.TYPES.DOWN]: SnakeBody.TYPES.VERTICAL,
    [SnakeBody.TYPES.LEFT]: SnakeBody.TYPES.HORIZONTAL
  }

  static DIRECTION_TO_TYPE = {
    ['' + DIRECTION.UP + DIRECTION.RIGHT]: SnakeBody.TYPES.LEFTTOP,
    ['' + DIRECTION.UP + DIRECTION.LEFT]: SnakeBody.TYPES.RIGHTTOP,
    ['' + DIRECTION.RIGHT + DIRECTION.DOWN]: SnakeBody.TYPES.RIGHTTOP,
    ['' + DIRECTION.RIGHT + DIRECTION.UP]: SnakeBody.TYPES.RIGHTBOTTOM,
    ['' + DIRECTION.DOWN + DIRECTION.LEFT]: SnakeBody.TYPES.RIGHTBOTTOM,
    ['' + DIRECTION.DOWN + DIRECTION.RIGHT]: SnakeBody.TYPES.LEFTBOTTOM,
    ['' + DIRECTION.LEFT + DIRECTION.UP]: SnakeBody.TYPES.LEFTBOTTOM,
    ['' + DIRECTION.LEFT + DIRECTION.DOWN]: SnakeBody.TYPES.LEFTTOP
  }

  static COLORS = [
    '',
    'Green', 'Black', 'DarkGreen', 'Pink'
  ];

  static PIXEL_DATAS = {
    [SnakeBody.TYPES.HORIZONTAL]: HORIZONTAL_PIXEL_DATAS,
    [SnakeBody.TYPES.RIGHT]: HORIZONTAL_PIXEL_DATAS,
    [SnakeBody.TYPES.LEFT]: HORIZONTAL_PIXEL_DATAS,
    [SnakeBody.TYPES.VERTICAL]: VERTICAL_PIXEL_DATAS,
    [SnakeBody.TYPES.UP]: VERTICAL_PIXEL_DATAS,
    [SnakeBody.TYPES.DOWN]: VERTICAL_PIXEL_DATAS,
    [SnakeBody.TYPES.LEFTTOP]: [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 3, 3, 3, 3],
      [0, 0, 0, 3, 3, 1, 1, 1],
      [0, 0, 3, 3, 1, 1, 1, 3],
      [0, 0, 3, 1, 1, 1, 3, 3],
      [0, 0, 3, 1, 1, 3, 0, 0],
      [0, 0, 3, 1, 3, 3, 0, 0]
    ],
    [SnakeBody.TYPES.RIGHTTOP]: [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [3, 3, 3, 3, 0, 0, 0, 0],
      [3, 1, 1, 1, 3, 0, 0, 0],
      [1, 1, 1, 3, 1, 3, 0, 0],
      [3, 3, 1, 1, 1, 3, 0, 0],
      [0, 0, 3, 1, 1, 3, 0, 0],
      [0, 0, 3, 1, 3, 3, 0, 0]
    ],
    [SnakeBody.TYPES.LEFTBOTTOM]: [
      [0, 0, 3, 3, 1, 3, 0, 0],
      [0, 0, 3, 1, 1, 3, 0, 0],
      [0, 0, 3, 1, 1, 1, 3, 3],
      [0, 0, 3, 1, 3, 1, 1, 1],
      [0, 0, 0, 3, 1, 1, 1, 3],
      [0, 0, 0, 0, 3, 3, 3, 3],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ],
    [SnakeBody.TYPES.RIGHTBOTTOM]: [
      [0, 0, 3, 3, 1, 3, 0, 0],
      [0, 0, 3, 1, 1, 3, 0, 0],
      [3, 3, 1, 1, 1, 3, 0, 0],
      [3, 1, 1, 1, 3, 3, 0, 0],
      [1, 1, 1, 3, 3, 0, 0, 0],
      [3, 3, 3, 3, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ]
  }

  constructor (x, y, pixelSize, type) {
    super(x, y)
    this.pixelSize = pixelSize
    this.type = type || SnakeBody.TYPES.HORIZONTAL
  }

  update () {}

  draw (renderer) {
    const { pixelSize, type } = this
    const { x, y } = LP2RP(this.x, this.y, pixelSize)
    const pixelData = this._getPixelData(type)
    for (let r = 0; r < pixelData.length; r++) {
      for (let c = 0; c < pixelData[r].length; c++) {
        if (pixelData[r][c] !== 0) {
          renderer.drawRect(x + c * pixelSize, y + r * pixelSize, pixelSize, pixelSize, this._getColor(pixelData[r][c]))
        }
      }
    }
  }

  _getPixelData (type) {
    return SnakeBody.PIXEL_DATAS[type]
  }

  _getColor (colorType) {
    return SnakeBody.COLORS[colorType]
  }
}
