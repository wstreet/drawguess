



export default class Input extends PIXI.Container {
  #options = {
    width: 100,
    height: 100,
    padding: 20,
    sendWidth: 0,
    x: 0,
    y: 0
  }
  value = ''

  constructor(options) {
    super()
    const opts = Object.assign({}, this.#options, options)
    this.#options = opts
    this.height = opts.height
    this.width = opts.width
    this.x = opts.x
    this.y = opts.y
    this.interactive = true
    this.interactiveChildren = true
    this.init()

    wx.onKeyboardInput((value) => {
      // @ts-ignore
      this.value = value
    })
  }

  init() {
    this.createInput()
    // this.createEmoji() TODO:
  }

  /**
  * 
  * @param {CanvasContext} ctx canvas上下文
  * @param {number} x 圆角矩形选区的左上角 x坐标
  * @param {number} y 圆角矩形选区的左上角 y坐标
  * @param {number} w 圆角矩形选区的宽度
  * @param {number} h 圆角矩形选区的高度
  * @param {number} r 圆角的半径
  */
  roundRect(ctx, x, y, w, h, r) {
    // 开始绘制
    ctx.beginPath()
    // 因为边缘描边存在锯齿，最好指定使用 transparent 填充
    // 这里是使用 fill 还是 stroke都可以，二选一即可
    ctx.strokeStyle = '#000000'
    // ctx.fillStyle = '#000000'
    // 左上角
    ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5)

    // border-top
    ctx.moveTo(x + r, y)
    ctx.lineTo(x + w - r, y)
    // ctx.lineTo(x + w, y + r)
    // 右上角
    ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2)

    // border-right
    ctx.moveTo(x + w, y + r)
    ctx.lineTo(x + w, y + h - r)
    // ctx.lineTo(x + w - r, y + h)

    // 右下角
   
    ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5)
    ctx.stroke()

    // border-bottom
    ctx.moveTo(x + w - r, y + h)
    ctx.lineTo(x + r, y + h)

    // 左下角
    ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI)

    // border-left
    ctx.moveTo(x, y + r)
    ctx.lineTo(x, y + h - r)

    // 这里是使用 fill 还是 stroke都可以，二选一即可，但是需要与上面对应
    // ctx.fill()
    ctx.stroke()
    ctx.closePath()
    // 剪切
    ctx.clip()
  }
  createInput() {
    const canvas = document.createElement('canvas')
    const { width, height, padding, sendWidth } = this.#options
    canvas.height = height
    canvas.width = width
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#cccccc'
    ctx.fillRect(0, 0, width, height)
    ctx.strokeStyle = '#000000'
    // ctx.beginPath();
    this.roundRect(ctx, padding, padding, width - padding * 2 - sendWidth, height - padding * 2, 10)
    // ctx.stroke();
    const inputSprite = PIXI.Sprite.from(canvas)
    inputSprite.interactive = true
    inputSprite.on('pointerdown', () => {
      
      wx.showKeyboard({
        confirmHold: true,
        defaultValue: this.value,
        maxLength: 500,
        multiple: true,
        confirmType: 'send'
      })
      wx.onKeyboardInput((e) => {
        this.value = e.value
      })
      
    })
    // const send = new PIXI.Text('发送', {
    //   fontFamily: wx.$store.font,
    // })
    // send.anchor.set(0, 0.5)
    // send.y = this.#options.height / 2
    // send.x = width - sendWidth
    this.addChild(inputSprite)
  }
  createEmoji() {

  }

}