



export default class Input extends PIXI.Container {
  #options = {
    width: 100,
    height: 100,
    padding: 10,
    sendWidth: 20,
    x: 0,
    y: 0
  }
  value = ''

  constructor(options) {
    super()
    this.#options = options
    this.height = options.height
    this.width = options.width
    this.x = options.x
    this.y = options.y
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

  createInput() {
    const canvas = document.createElement('canvas')
    const { width, height, padding, sendWidth } = this.#options
    canvas.height = height
    canvas.width = width
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#cccccc'
    ctx.fillRect(0, 0, width, height)
    ctx.strokeStyle = '#000000'
    ctx.strokeRect(padding, padding, width - padding - sendWidth, height - padding)
    // ctx.fillText('发送', width - sendWidth, 0)
    const inputSprite = PIXI.Sprite.from(canvas)
    inputSprite.on('tap', () => {
      wx.showKeyboard({
        confirmHold: true, 
        defaultValue: this.value, 
        maxLength: 500, 
        multiple: true,
        confirmType: 'send'
      })
    })
    const send = new PIXI.Text('发送')
    send.y = padding
    send.x =  width - padding
    this.addChild(inputSprite, send)
  }
  createEmoji() {

  }





}