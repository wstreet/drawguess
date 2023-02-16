import { stage, screen, monitor } from '../core';
// import 'pixi-text-input'
import Draw from '../base/draw'
import Player from '../base/player'
import Menu from '../base/menu';


export default {
  show(opt = {}) {
    this.init();
    monitor.emit('scene:show', 'room');
  },
  hide() {
    this.container.destroy({ children: true });
    monitor.emit('scene:hide', 'room');
  },
  init() {
    this.showRanking = false;

    this.container = new PIXI.Container();
    this.container.interactive = true;
    stage.addChild(this.container);

    const bg = pixiUtil.genSprite('bg');
    bg.width = screen.width;
    bg.height = screen.height;
    this.container.addChild(bg);

    // 菜单
    const menuBtn = pixiUtil.genSprite('menu');
    menuBtn.interactive = true;
    menuBtn.x = 0;
    menuBtn.y = 0;
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
    // @ts-ignore
    const input = new PIXI.TextInput({
      input: { fontSize: '25px' },
      box: { fill: 0xEEEEEE }
    })
    
    input.x = 0
    input.y = 0
    input.width = screen.width - 20
    input.height = 20
    input.placeholder = '请输入消息'
    input.text = 'xxx' 
    this.container.addChild(input)

    const send = new PIXI.Text('发送', {
      fill: 0x000000
    })
    send.interactive = true
    send.x = screen.width - 100
    send.y = screen.height - 100
    this.container.addChild(send)
    send.on('tap', e => {
      const sendMsg = input.text
      console.log('sendMsg', sendMsg)
      input.text = ''
    })


    // 画板
    const draw = new Draw({
      width: screen.width,
      height: 300
    })
    draw.x = 0
    draw.y = 0
    draw.width = screen.width
    draw.height = screen.height / 2
    this.container.addChild(draw)

    // 
    for (let idx = 0; idx < 6; idx++) {// 邀请
      const player = new Player({});
      player.x = (screen.width / 6) * idx
      player.y = screen.height / 2 + 50
      this.container.addChild(player)
    }
  },
  update() {
    if (!this.showRanking) {
      return;
    }
  }
};