import { stage, screen, monitor, createContainer } from '../core';
import Draw from '../base/draw'
import Player from '../base/player'
import Menu from '../base/menu';
import Input from '../base/input';

export default {
  show(opt = {}) {
    console.log(opt)
    this.init();
    monitor.emit('scene:show', 'room');
  },
  hide() {
    this.container.destroy({ children: true });
    monitor.emit('scene:hide', 'room');
  },
  init() {
    this.showRanking = false;

    this.container = createContainer();
    stage.addChild(this.container);

    const bg = pixiUtil.genSprite('bg');
    bg.width = screen.width;
    bg.height = screen.height;
    this.container.addChild(bg);

    // 菜单
    const menuBtn = pixiUtil.genSprite('menu');
    menuBtn.interactive = true;
    menuBtn.x = 20;
    menuBtn.y = 20;
    menuBtn.width = 50;
    menuBtn.height = 50;
    this.container.addChild(menuBtn);
    let isOpen = false
    let menuList
    menuBtn.on('tap', (e) => {
      if (isOpen) {
        this.container.removeChild(menuList)
        isOpen = !isOpen
        return
      }
      menuList = new Menu({
        menus: [
          {
            text: '关闭',
            key: 'close'
          }
        ]
      })
      menuList.on('tap', (e) => {
        console.log(e);
      })
      this.container.addChild(menuList)
      isOpen = true
      
    });
  
    // 输入框
    const input = new Input({
      width: screen.width,
      height: 40,
    })
    this.container.addChild(input)
    wx.onKeyboardConfirm(() => {
      // send api
      input.value = ''
    })


    // 画板
    const draw = new Draw({
      width: screen.width,
      height: screen.height * 3 / 7
    })
    draw.y = 100
   
    this.container.addChild(draw)

    // 
    for (let idx = 0; idx < 6; idx++) {// 邀请
      const player = new Player({});
      player.x = (screen.width / 6) * idx + 30
      player.y = screen.height / 2 + 100
      player.width = (screen.width - 100) / 6 -50
      player.height = player.width
      // player.anchor.set(0.5, 0.5);
      this.container.addChild(player)
    }
  },
  update() {
    if (!this.showRanking) {
      return;
    }
  }
};