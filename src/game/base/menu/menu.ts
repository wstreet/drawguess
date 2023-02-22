
import MenuItem from './menu-item'



export default class Menu extends PIXI.Container {
  #options: IMenuOptions
  #menus: IMenu[]
  constructor(options: IMenuOptions) {
    super()
    this.#options = options
    this.#menus = options.menus
    this.init()
  }

  private init () {
    this.#menus.forEach((menu, idx) => {
      const menuItem = new MenuItem(menu)
      this.addChild(menuItem)
      menuItem.y = idx * 20
      menuItem.on('pointerdown', this.onTap.bind(this))
    })
  }

  private onTap(e) {
    this.emit('pointerdown', e)
  }



}