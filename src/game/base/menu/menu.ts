
import { createContainer } from '../../core'
import MenuItem from './menu-item'



export default class Menu extends PIXI.Container {
  options: IMenuOptions
  menus: IMenu[]
  menuGroup: PIXI.Container
  constructor(options: IMenuOptions) {
    super()
    this.interactive = true
    this.interactiveChildren = true

    this.options = options
    this.menus = options.menus

    this.init()
  }

  private init () {
    const menuBtn = pixiUtil.genSprite('menu');
    menuBtn.interactive = true;
    menuBtn.buttonMode = true;
    menuBtn.x = 40;
    menuBtn.y = 40;
    menuBtn.width = 50;
    menuBtn.height = 50;
    this.addChild(menuBtn);
    let isOpen = false
    menuBtn.on('pointerdown', (e) => {
      if (isOpen) {
        this.menuGroup.visible = false
        return
      }
      this.menuGroup.visible = true
    });
    this.menuGroup = createContainer()
    this.addChild(this.menuGroup)
    this.menuGroup.visible = false
    this.menuGroup.x = menuBtn.x
    this.menuGroup.y = menuBtn.y + menuBtn.height
    this.menus.forEach((menu, idx) => {
      const menuItem = new MenuItem(menu)
      this.menuGroup.addChild(menuItem)
      menuItem.y = (menuItem.height + 1) * idx
      menuItem.on('pointerdown', () => {
        this.menuGroup.visible = false
      })
    })
  }



}