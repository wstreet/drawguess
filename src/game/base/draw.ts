import { pixelRatio } from "../core"
interface Point {
  x: number
  y: number
}

interface DrawOpts {
  width: number
  height: number
}
/**
 * 画板
 */
export default class Draw extends PIXI.Container {
  #graphics: PIXI.Graphics
  #startPoint: Point | undefined
  #painting: Boolean = false
  #color: number = 0x000000
  #lineWidth: number = 2
  #restore: PIXI.Graphics[] = []
  #canvasSprite: PIXI.Sprite
  #options: DrawOpts = {
    width: 100,
    height: 100
  }

  constructor(options: DrawOpts) {
    super()
    this.interactive = true
    this.interactiveChildren = true

    this.#options = options
    this.#graphics = new PIXI.Graphics();
    
    const canvas = document.createElement('canvas')
    canvas.width = options.width
    canvas.height = options.height
    // const ctx = canvas.getContext('2d')
    // ctx.fillStyle = '#ffffff'
    // ctx.fillRect(0 ,0, canvas.width, canvas.height)
    this.#canvasSprite = PIXI.Sprite.from(canvas)
    this.#canvasSprite.x = 0
    this.#canvasSprite.y = 0
    this.#canvasSprite.interactive = true
   
    
    this.addChild(this.#graphics)
    this.addChild(this.#canvasSprite)
    this.addEvent()
   
    this.createTool()
  }

  private addEvent() {
    this.#canvasSprite
    .on('pointerdown', this.touchStart.bind(this))
    .on('pointermove', this.touchMove.bind(this))
    .on('pointerup', this.touchEnd.bind(this))
  }
  /**
   * 接触屏幕
   * @param e 
   */
  private touchStart(e) {
    this.#painting = true
    this.#startPoint = { x: e.x, y: e.y }
  }
  /**
   * 开始画线
   * @param e 
   */
  private touchMove(e) {
    const point = { x: e.x, y: e.y }
    if (this.#painting) {
      this.drawLine(this.#startPoint!, point)
      this.#startPoint = point
    }

  }
  /**
   * 离开屏幕
   * @param e 
   */
  private touchEnd(e) {
    this.#painting = false
    this.#startPoint = null
    this.#restore.push(
      // this.#graphics // TODO: 
    )
  }
  /**
   * 画线方法
   * @param startPoint 
   * @param point 
   */
  private drawLine(startPoint: Point, point: Point) {
    this.#graphics.lineStyle(this.#lineWidth, this.#color, 1)
    //起始位置
    this.#graphics.moveTo(startPoint.x, startPoint.y);
    //停止位置
    this.#graphics.lineTo(point.x, point.y);
    //结束绘制
    this.#graphics.endFill()

  }
  /**
   * 清除画布
   */
  public clear() {
    this.#graphics.clear()
    this.#restore.push(
      // this.#ctx.getImageData(0, 0, canvas.width, canvas.height)
    )
  }
  /**
   * 设置画笔颜色
   *  @param color 
   */
  public setColor(color: number) {
    this.#color = color
  }
  /**
   * 设置画笔宽度
   * @param lineWidth 
   */
  public setLineWidth(lineWidth: number) {
    this.#lineWidth = lineWidth
  }
  /**
   * 撤回到上一步
   */
  public undo() {
    if (this.#restore.length > 1) {
      // this.#ctx.putImageData(this.#restore[this.#restore.length - 2], 0, 0);
      this.#restore.length --;
    }
  }

  private createTool() {
    const toolImgs = [
      'qianbi', 'caipan', 'xiangpica', 'shuaxin'
    ]
    for (let i = 0; i < toolImgs.length; i++) {
      const texture = pixiUtil.genSprite(toolImgs[i])
      texture.width = 60
      texture.height = 60
      texture.x = i * 100 + 80
      texture.y = this.#options.height
      texture.interactive = true
      if (i == 0) {
        texture.on('tap', this.pencilHander.bind(this))
      }
      this.addChild(texture)
    }
  }

  pencilHander() {
    const lineWidthList = [2, 4, 8, 10]
    const width = 60
    const height = 60
    for (let i = 0; i < lineWidthList.length; i++) {
      const lineWidth = lineWidthList[i]
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = this.#lineWidth == lineWidth ? '#a0c1ae' : '#9fc4cf'
      ctx.fillRect(0 ,0, canvas.width, canvas.height)
      ctx.fillStyle = '#000000'
      ctx.beginPath();
      ctx.strokeStyle = '#000000'
      ctx.arc(width / 2, height / 2, lineWidth, 0, Math.PI * 2, false)
      ctx.stroke();
      ctx.fill()
      const lineWidthSprite = PIXI.Sprite.from(canvas)
      // @ts-ignore
      lineWidthSprite.data = lineWidth
      lineWidthSprite.x = i * width
      lineWidthSprite.y = this.#options.height - height
      lineWidthSprite.interactive = true
      lineWidthSprite.on('tap', (e) => {
        this.setLineWidth(e.target.data)
      })
      this.addChild(lineWidthSprite)
    }
    
   
  }


}