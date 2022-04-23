import { GameObject } from './gameObject.js'

export class ResultText extends GameObject {
  constructor (x, y, options) {
    super(x, y)

    const { width, height, text, textColor } = options

    this.width = width
    this.height = height
    this.text = text
    this.textColor = textColor || 'White'

    this.font = `${height / 5}px sans-serif`
  }

  draw (renderer) {
    renderer.drawRect(this.x, this.y, this.width, this.height, '#8fbc8fcc')
    const { width: realWidth } = renderer.measureText(this.text, this.font)
    renderer.drawText(this.x + (this.width - realWidth) / 2, this.y + this.height / 5 * 2, this.text, this.textColor, this.font)
  }
}
