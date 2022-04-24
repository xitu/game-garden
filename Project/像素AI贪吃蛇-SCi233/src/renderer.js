export class Renderer {
  constructor (canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
  }

  clear (fillColor) {
    if (!fillColor) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    } else {
      this.ctx.save()
      this.ctx.fillStyle = fillColor
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx.restore()
    }
  }

  drawRect (x, y, width, height, color) {
    const { ctx } = this
    ctx.save()
    ctx.fillStyle = color
    ctx.fillRect(x, y, width, height)
    ctx.restore()
  }

  drawCircle (x, y, radius, color) {
    const { ctx } = this
    ctx.save()
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 2 * Math.PI)
    ctx.fill()
    ctx.restore()
  }

  drawText (x, y, text, color, font) {
    const { ctx } = this
    ctx.save()
    ctx.textAlign = 'left'
    ctx.textBaseline = 'top'
    ctx.font = font
    ctx.fillStyle = color
    ctx.fillText(text, x, y)
    ctx.restore()
  }

  measureText (text, font) {
    const { ctx } = this
    ctx.save()
    ctx.font = font
    const textMetrics = ctx.measureText(text)
    ctx.restore()

    const width = textMetrics.width
    const height = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent

    return { width, height }
  }
}
