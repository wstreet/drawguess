import { pixelRatio } from "../core"
interface Point {
  x: number
  y: number
}

interface DrawOpts {
  width: number
  height: number
}

enum PenStyle {
  PENCIL,
  ERASER
}
/**
 * 画板
 */
export default class Draw extends PIXI.Container {
  #canvas: HTMLCanvasElement
  #ctx: CanvasRenderingContext2D
  #startPoint: Point | undefined
  #painting: Boolean = false
  #color: number = 0x000000
  #lineWidth: number = 2
  #eraserWidth: number = 2
  #canvasSprite: PIXI.Sprite
  #options: DrawOpts = {
    width: 100,
    height: 100
  }
  #pencilGroup: PIXI.Container
  #colorlGroup: PIXI.Container
  #eraserGroup: PIXI.Container
  #toolItemWidth = 60
  #toolItemHeight = 60
  #toolItemOffset = 80
  #penStyle = PenStyle.PENCIL

  constructor(options: DrawOpts) {
    super()
    this.interactive = true
    this.interactiveChildren = true
    this.#options = options
    this.initCanvas()
    this.addEvent()
    this.createTools()
  }
  initCanvas() {
    const options = this.#options
    const canvas = document.createElement('canvas')
    canvas.width = options.width
    canvas.height = options.height
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = 'transparent'
    ctx.fillRect(0 ,0, canvas.width, canvas.height)
    this.#canvasSprite = PIXI.Sprite.from(canvas)
    this.#canvasSprite.x = 0
    this.#canvasSprite.y = 0
    this.#canvasSprite.interactive = true
    this.addChild(this.#canvasSprite)

    this.#canvas = canvas
    this.#ctx = ctx
   
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
    this.#startPoint = { x: e.x - this.x, y: e.y - this.y }
  }
  /**
   * 开始画线
   * @param e 
   */
  private touchMove(e) {
    const point = { x: e.x - this.x, y: e.y - this.y }
    if (this.#painting) {
      if (this.#penStyle === PenStyle.PENCIL) {
        this.drawLine(this.#startPoint!, point)
      } else if (this.#penStyle === PenStyle.ERASER) {
        this.drawRect(this.#startPoint!, point)
      }
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
  }
  /**
   * 画线方法
   * @param startPoint 
   * @param point 
   */
  private drawLine(startPoint: Point, point: Point) {
    this.#ctx.strokeStyle = wx.$util.getColorString(this.#color)
    this.#ctx.lineWidth = this.#lineWidth
    console.log(startPoint)
    this.#ctx.beginPath();
    this.#ctx.moveTo(startPoint.x, startPoint.y);
    this.#ctx.lineTo(point.x, point.y);
    this.#ctx.stroke();
    this.#ctx.closePath();
  }
  private drawRect(startPoint: Point, point: Point) {
    // this.#graphics.drawRect()
    // TODO:
    
  }
  /**
   * 清除画布
   */
  public clear() {
    this.#ctx.clearRect(0, 0, this.#options.width, this.#options.height)
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

  public setEraserWidth(width: number) {
    this.#eraserWidth = width
  }
  /**
   * 撤回到上一步
   */
  public undo() {

  }

  private createTools() {
    this.createPencilTool()
    this.createColorTool()
    this.createEraserTool()
    this.creatClearTool() 
  }
  private createPencilTool() {
    const texture = pixiUtil.genSprite('qianbi')
    
    texture.width = this.#toolItemWidth
    texture.height = this.#toolItemHeight
    texture.x = 0 * 100 + this.#toolItemOffset
    texture.y = this.#options.height
    texture.interactive = true
    texture.on('pointerdown', () => {
      this.hideGroup()
      this.#pencilGroup.visible = true
    })
    
    this.addChild(texture)
    const pencilGroup = new PIXI.Container()
    pencilGroup.interactive = true
    pencilGroup.interactiveChildren = true
    pencilGroup.visible = false
    pencilGroup.x = texture.x
    pencilGroup.addChild(...this.createWidthItems())
    this.addChild(pencilGroup)
    this.#pencilGroup = pencilGroup
  }
  private createWidthItems() {
    const lineWidthList = [2, 4, 8, 10]
    const widthItems = []
    const width = this.#toolItemWidth
    const height = this.#toolItemHeight
    for (let i = 0; i < lineWidthList.length; i++) {
      const lineWidth = lineWidthList[i]
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = this.#lineWidth == lineWidth ? '#a0c1ae' : '#9fc4cf'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
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
      lineWidthSprite.on('pointerdown', (e) => {
        this.setLineWidth(e.target.data)
        this.hideGroup()
      })
      widthItems.push(lineWidthSprite)
    }
    return widthItems

  }
  private createColorTool() {
    const texture = pixiUtil.genSprite('caipan')
    texture.width = this.#toolItemWidth
    texture.height = this.#toolItemHeight
    texture.x = 1 * 100 + this.#toolItemOffset
    texture.y = this.#options.height
    texture.interactive = true
    texture.on('pointerdown', () => {
      this.hideGroup()
      this.#colorlGroup.visible = true
    })
    this.addChild(texture)
    const colorlGroup = new PIXI.Container()
    colorlGroup.interactive = true
    colorlGroup.interactiveChildren = true
    colorlGroup.visible = false
    colorlGroup.x = texture.x
    colorlGroup.addChild(...this.createColorItems())
    this.addChild(colorlGroup)
    this.#colorlGroup = colorlGroup
  }
  private createColorItems() {
    const colors = [0x000000, 0xff0000, 0xff8c00, 0xffd700, 0x00ff00, 0x00bfff, 0x9370db, 0xff69b4 ]
    const colorItems = []
    const width = this.#toolItemWidth
    const height = this.#toolItemHeight
    for (let i = 0; i < colors.length; i++) {
      const color = colors[i]
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = wx.$util.getColorString(color)
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const colorSprite = PIXI.Sprite.from(canvas)
      // @ts-ignore
      colorSprite.data = color
      colorSprite.x = i * width
      colorSprite.y = this.#options.height - height
      colorSprite.interactive = true
      colorSprite.on('pointerdown', (e) => {
        this.setColor(e.target.data)
        this.hideGroup()
      })
      colorItems.push(colorSprite)
    }
    return colorItems
  }
  private createEraserTool() {
    const texture = pixiUtil.genSprite('xiangpi')
    texture.width = this.#toolItemWidth
    texture.height = this.#toolItemHeight
    texture.x = 2 * 100 + this.#toolItemOffset
    texture.y = this.#options.height
    texture.interactive = true
    texture.on('pointerdown', () => {
      this.hideGroup()
      this.#eraserGroup.visible = true
    })
    this.addChild(texture)
    const eraserGroup = new PIXI.Container()
    eraserGroup.interactive = true
    eraserGroup.interactiveChildren = true
    eraserGroup.visible = false
    eraserGroup.x = texture.x
    eraserGroup.addChild(...this.createEraserItems())
    this.addChild(eraserGroup)
    this.#eraserGroup = eraserGroup
  }
  private createEraserItems() {
    const widths = [4, 8, 16, 32]
    const eraserItems = []
    const width = this.#toolItemWidth
    const height = this.#toolItemHeight
    for (let i = 0; i < widths.length; i++) {
      const rectWidth = widths[i]
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = this.#lineWidth == rectWidth ? '#a0c1ae' : '#9fc4cf'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(
        (canvas.width - rectWidth) / 2,
        (canvas.height - rectWidth) / 2,
        rectWidth,
        rectWidth
      )
      const eraserSprite = PIXI.Sprite.from(canvas)
      // @ts-ignore
      eraserSprite.data = rectWidth
      eraserSprite.x = i * width
      eraserSprite.y = this.#options.height - height
      eraserSprite.interactive = true
      eraserSprite.on('pointerdown', (e) => {
        this.setEraserWidth(e.target.data)
        this.hideGroup()
      })
      eraserItems.push(eraserSprite)
    }
    return eraserItems
  }
  private creatClearTool() {
    const texture = pixiUtil.genSprite('shuaxin')
    texture.width = this.#toolItemWidth
    texture.height = this.#toolItemHeight
    texture.x = 3 * 100 + this.#toolItemOffset
    texture.y = this.#options.height
    texture.interactive = true
    texture.on('pointerdown', () => {
      this.clear()
    })
    this.addChild(texture)
  }

  private hideGroup() {
    this.#eraserGroup.visible = false
    this.#colorlGroup.visible = false
    this.#pencilGroup.visible = false
  }
}