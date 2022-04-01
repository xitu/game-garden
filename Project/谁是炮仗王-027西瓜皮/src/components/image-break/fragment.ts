export interface Box {
  x: number,
  y: number,
  w: number,
  h: number
}

export default class Fragment {
  public pointA: Array<number>;
  public pointB: Array<number>;
  public pointC: Array<number>;
  public box: Box;
  public centroid: Array<number>;
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D | null;

  constructor(
    pointA: Array<number>,
    pointB: Array<number>,
    pointC: Array<number>,
    // img: CanvasImageSource
    ) {
    this.pointA = pointA;
    this.pointB = pointB;
    this.pointC = pointC;
    this.box = this.computeBoundingBox()
    this.centroid = this.computeCentroid()
    this.canvas = document.createElement('canvas');
    this.ctx = this.createCanvas()
    // this.clip(img)
  }

  computeBoundingBox(): Box {
    const xMin = Math.min(this.pointA[0], this.pointB[0], this.pointC[0]),
    xMax = Math.max(this.pointA[0], this.pointB[0], this.pointC[0]),
    yMin = Math.min(this.pointA[1], this.pointB[1], this.pointC[1]),
    yMax = Math.max(this.pointA[1], this.pointB[1], this.pointC[1]);

    return {
      x:xMin,
      y:yMin,
      w:xMax - xMin,
      h:yMax - yMin
    };
  }

  computeCentroid(): Array<number> {
    var x = (this.pointA[0] + this.pointB[0] + this.pointC[0]) / 3,
    y = (this.pointA[1] + this.pointB[1] + this.pointC[1]) / 3;
    return [x, y];
  }

  createCanvas() {
    this.canvas.className = 'page-breaker__fragment-canvas'
    this.canvas.width = this.box.w;
    this.canvas.height = this.box.h;
    this.canvas.style.width = this.box.w + 'px';
    this.canvas.style.height = this.box.h + 'px';
    this.canvas.style.left = this.box.x + 'px';
    this.canvas.style.top = this.box.y + 'px';
    return this.canvas.getContext('2d');
  }

  clip(image: CanvasImageSource, canvasWidth: number, canvasHeight: number) {
    this.ctx?.translate(-this.box.x, -this.box.y);
    this.ctx?.beginPath();
    this.ctx?.moveTo(this.pointA[0], this.pointA[1]);
    this.ctx?.lineTo(this.pointB[0], this.pointB[1]);
    this.ctx?.lineTo(this.pointC[0], this.pointC[1]);
    this.ctx?.closePath();
    this.ctx?.clip();
    this.ctx?.drawImage(image, 0, 0, canvasWidth, canvasHeight);
  }
}
