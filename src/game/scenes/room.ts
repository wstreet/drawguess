import { stage, screen, monitor } from '../core';
import TextInput from 'pixi-text-input'
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
        this.removeChild(menuList)
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
      this.addChild(menuList)
      isOpen = true
      
    });
    

    const start = pixiUtil.genSprite('btn_start');
    start.x = screen.width / 2;
    start.y = screen.height / 2 + 300;
    start.anchor.set(0.5, 0.5);
    this.container.addChild(start);

    start.interactive = true;
    start.once('tap', (e) => {
      this.hide();
      monitor.emit('scene:go', 'game');
    });

    const guide = pixiUtil.genSprite('btn_guide');
    guide.x = screen.width / 2;
    guide.y = start.y + start.height + 50;
    guide.anchor.set(0.5, 0.5);
    this.container.addChild(guide);

    guide.interactive = true;
    guide.once('tap', (e) => {
      this.hide();
      monitor.emit('scene:go', 'game', {
        guide: true
      });
    });

    const toolInfo = pixiUtil.genSprite('btn_tool_info');
    toolInfo.x = screen.width / 2;
    toolInfo.y = guide.y + guide.height + 50;
    toolInfo.anchor.set(0.5, 0.5);
    this.container.addChild(toolInfo);

    toolInfo.interactive = true;
    toolInfo.on('tap', (e) => {
      wx.showModal({
        title: '提示',
        content: '敬请期待...',
        showCancel: false
      });
    });

    const musicIcon = pixiUtil.genSprite(wx.$audio.muted.bgm ? 'btn_music_close' : 'btn_music');
    musicIcon.anchor.set(0.5, 0.5);
    musicIcon.scale.x = musicIcon.scale.y = 0.7;
    musicIcon.x = screen.width / 2;
    musicIcon.y = start.y - 150;
    this.container.addChild(musicIcon);
    musicIcon.interactive = true;
    musicIcon.on('tap', (e) => {
      monitor.emit('muted:bgm', !wx.$audio.muted.bgm);
      musicIcon.texture = pixiUtil.getTexture(wx.$audio.muted.bgm ? 'btn_music_close' : 'btn_music');
    });
    // 输入框
    const input = new TextInput({
      input: { fontSize: '25px' },
      box: { fill: 0xEEEEEE }
    })
    input.x = 0
    input.y = screen.height - 20
    input.width = screen.width - 20
    input.height = 20
    input.placeholder = '请输入消息'
    // set input.text = 'xxx' 
    // get input.text
    stage.addChild(input)

    // 画板
    const draw = new Draw({
      width: screen.width,
      height: 300
    })
    draw.x = 0
    draw.y = 0
    draw.width = screen.width
    draw.height = screen.height / 3
    stage.addChild(draw)

    // 
    for (let idx = 0; idx < 6; idx++) {// 邀请
      const player = new Player({});
      player.x = (screen.width / 6) * idx
      player.y = 300
      stage.addChild(player)
    }
  },
  update() {
    if (!this.showRanking) {
      return;
    }
  }
};