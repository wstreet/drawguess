
interface Point {
  x: number
  y: number
}
/**
 * 画板
 */
export default class Draw extends PIXI.DisplayObject {
  private canvas: WechatMinigame.Canvas
  private ctx: CanvasRenderingContext2D
  private startPoint: Point | undefined
  private painting: Boolean = false
  private color: string = '#000000'
  private lineWidth: number = 2
  private restore: ImageData[] = []

  constructor() {
    super()
    this.canvas = wx.createCanvas()
    this.ctx = this.canvas.getContext("2d")

    this.addEvent('touchstart', this.touchStart.bind(this))
    this.addEvent('touchmove', this.touchMove.bind(this))
    this.addEvent('touchend', this.touchEnd.bind(this))
  }

  private addEvent(event: string, callback: any) {
    // @ts-ignore
    this.canvas.addEventListener(event, callback)
  }
  /**
   * 接触屏幕
   * @param e 
   */
  private touchStart(e: TouchEvent) {
    this.painting = true
    this.startPoint = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    }
  }
  /**
   * 开始画线
   * @param e 
   */
  private touchMove(e: TouchEvent) {
    const point = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    }
    if (this.painting) {
      this.drawLine(this.startPoint!, point)
    }

  }
  /**
   * 离开屏幕
   * @param e 
   */
  private touchEnd(e: TouchEvent) {
    this.painting = false
    this.startPoint = undefined
    this.restore.push(
      this.ctx.getImageData(0, 0, canvas.width, canvas.height)
    )
  }
  /**
   * 画线方法
   * @param startPoint 
   * @param point 
   */
  private drawLine(startPoint: Point, point: Point) {
    this.ctx.strokeStyle = this.color
    this.ctx.lineWidth = this.lineWidth
    this.ctx.beginPath();
    //起始位置
    this.ctx.moveTo(startPoint.x, startPoint.y);
    //停止位置
    this.ctx.lineTo(point.x, point.y);
    //描绘线路
    this.ctx.stroke();
    //结束绘制
    this.ctx.closePath();
  }
  /**
   * 清除画布
   */
  public clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.restore.push(
      this.ctx.getImageData(0, 0, canvas.width, canvas.height)
    )
  }
  /**
   * 设置画笔颜色
   *  @param color 
   */
  public setColor(color: string) {
    this.color = color
  }
  /**
   * 设置画笔宽度
   * @param lineWidth 
   */
  public setLineWidth(lineWidth: number) {
    this.lineWidth = lineWidth
  }
  /**
   * 撤回到上一步
   */
  public undo() {
    if (this.restore.length > 1) {
      this.ctx.putImageData(this.restore[this.restore.length - 2], 0, 0);
      this.restore.length --;
    }
  }
}