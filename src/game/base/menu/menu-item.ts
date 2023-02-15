


export default class MenuItem extends PIXI.Container {
  menu: IMenu
  constructor(menu: IMenu) {
    super()
    this.menu = menu

    this.init()
  }

  private init() {
    const mask = new PIXI.Graphics()
    mask.width = 200
   
    mask.beginFill(0x000000)
    const menuText = new PIXI.Text(this.menu.text, {
      fill: 0xffffff
    })
    this.addChild(menuText)
  }
}