
import createCanvasSprite from '../canvas-sprite'
import { monitor } from '../../core'

export default class MenuItem extends PIXI.Container {
  menu: IMenu
  constructor(menu: IMenu) {
    super()
    this.menu = menu
   
    this.interactive = true
    this.interactiveChildren = true
    this.init()
  }

  private init() {
    const mask = createCanvasSprite({
      fill: '#808080',
      width: 120,
      height: 60
    })
    const menuText = new PIXI.Text(this.menu.text, {
      fontFamily: wx.$store.font,
      fill: 0xffffff,
      fontSize: 40,
      align: 'center',
      lineHeight: 60,
    })
    
    menuText.interactive = true
    menuText.anchor.set(0.5, 0.5)
    menuText.x = mask.width / 2
    
    menuText.y = mask.height / 2
    menuText.on('pointerdown', () => {
      monitor.emit('menu:click', this.menu)
    })
    this.addChild(mask, menuText)
  }
}