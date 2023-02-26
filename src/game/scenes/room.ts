import { stage, screen, monitor, createContainer } from '../core';
import Draw from '../base/draw'
import Player from '../base/player'
import Menu from '../base/menu';
import Input from '../base/input';

export default {
  type: '',
  gameServerManager: null,
  room: null,

  show(opt: {type?: string} = {}) {
    console.log(opt)
    this.type = opt.type
    this.init();
    this.createRoom()
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

    const bg = pixiUtil.genSprite('room_bg');
    bg.width = screen.width;
    bg.height = screen.height;
    this.container.addChild(bg);

    // 菜单
    const menu = new Menu({
      menus: [
        {text: '退出', key: 'exit'},
        {text: '关闭', key: 'close'}
      ]
    })
    
    monitor.on('menu:click', (m) => {
      if (m.key == 'exit') {
        this.hide()
        monitor.emit('scene:go', 'home');
      }
    })
    this.container.addChild(menu)
  
    // 输入框
    const input = new Input({
      width: screen.width,
      height: 100,
      x: 0,
      y: screen.height - 100
    })
    this.container.addChild(input)
    
    wx.onKeyboardConfirm(() => {
      // send api
      console.log(input.value)
      wx.hideKeyboard()
      input.value = ''
    })


    // 画板
    const draw = new Draw({
      width: screen.width,
      height: screen.height * 3 / 7
    })
   
    this.container.addChild(draw)

    
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
  async createRoom() {
    const gameServerManager = wx.getGameServerManager()
    this.gameServerManager = gameServerManager
    debugger
    const room = await gameServerManager.createRoom({
      maxMemberNum: 6,
      startPercent: 80,
      needUserInfo: 'true',
      gameLastTime: 3600,
    })
    this.room = room
    console.log(room, 'room')
    // gameServerManager.startGame()

    gameServerManager.onRoomInfoChange((res) => {
      console.log(res)
      // roomState
    })
    gameServerManager.onGameStart(() => {
      // this.select()
    })
  },
  update() {
    if (!this.showRanking) {
      return;
    }
  }
};