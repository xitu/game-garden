import { GameObject } from './gameObject.js'
import { getRandomInt, LP2RP } from './utils.js'

const COLORS = [
  '',
  '#23d57d', '#11804b', '#084b2a', '#8f4613',
  '#cb651b', '#522a07', '#6e7679'
]

const PIXEL_DATAS = {
  TREE: [
    [0, 0, 1, 1, 2, 2, 0, 0],
    [0, 1, 2, 2, 2, 2, 2, 0],
    [1, 2, 2, 2, 2, 2, 2, 2],
    [0, 2, 2, 2, 2, 2, 2, 0],
    [3, 3, 2, 3, 3, 2, 2, 3],
    [0, 3, 3, 4, 4, 3, 3, 0],
    [0, 0, 4, 4, 4, 4, 0, 0],
    [0, 4, 4, 4, 4, 4, 4, 0]
  ],
  OAK: [
    [0, 0, 5, 5, 5, 4, 0, 0],
    [0, 5, 5, 4, 4, 4, 4, 0],
    [0, 4, 4, 4, 4, 4, 4, 0],
    [0, 4, 4, 4, 4, 4, 4, 0],
    [0, 4, 4, 6, 6, 4, 6, 0],
    [0, 0, 6, 7, 7, 6, 0, 0],
    [0, 0, 0, 7, 7, 0, 0, 0],
    [0, 0, 0, 7, 7, 0, 0, 0]
  ],
  CELL: [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
  ]
}

export class GameMap extends GameObject {
  constructor (config) {
    const {
      x,
      y,
      rowNums,
      colNums,
      pixelSize
    } = config
    super(x, y)
    this.rowNums = rowNums
    this.colNums = colNums
    this.pixelSize = pixelSize

    this._treeTypeArr = Array(rowNums * 2 + colNums * 2 + 4)
    for (let i = 0; i < this._treeTypeArr.length; i++) {
      this._treeTypeArr[i] = ['TREE', 'OAK'][getRandomInt(0, 2)]
    }
  }

  update () {}

  draw (renderer) {
    this._drawTrees(renderer)
    this._drawCells(renderer)
  }

  _drawCell (renderer, x, y, type) {
    const pixelData = PIXEL_DATAS[type]
    const { pixelSize } = this
    const { x: rx, y: ry } = LP2RP(x, y, pixelSize)
    for (let r = 0; r < pixelData.length; r++) {
      for (let c = 0; c < pixelData[r].length; c++) {
        if (pixelData[r][c] !== 0) {
          renderer.drawRect(
            rx + c * pixelSize,
            ry + r * pixelSize,
            pixelSize,
            pixelSize,
            COLORS[pixelData[r][c]]
          )
        }
      }
    }
  }

  _drawTrees (renderer) {
    let typeIndex = 0
    for (let r = 0; r < this.rowNums + 2; ++r) {
      this._drawCell(renderer, 0, r, this._treeTypeArr[typeIndex++])
      this._drawCell(renderer, this.colNums + 1, r, this._treeTypeArr[typeIndex++])
    }
    for (let c = 1; c <= this.colNums; ++c) {
      this._drawCell(renderer, c, 0, this._treeTypeArr[typeIndex++])
      this._drawCell(renderer, c, this.colNums + 1, this._treeTypeArr[typeIndex++])
    }
  }

  _drawCells (renderer) {
    for (let r = 0; r < this.rowNums; ++r) {
      for (let c = 0; c < this.colNums; ++c) {
        this._drawCell(renderer, c + 1, r + 1, 'CELL')
      }
    }
  }
}
