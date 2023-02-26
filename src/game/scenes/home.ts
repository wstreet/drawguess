import { stage, screen, monitor, createContainer } from '../core';


export default {
  show(opt = {}) {
    this.init();
    monitor.emit('scene:show', 'home');
  },
  hide() {
    this.container.destroy({ children: true });
    monitor.emit('scene:hide', 'home');
  },
  init() {
    this.showRanking = false;

    this.container = createContainer();
    stage.addChild(this.container);

    const bg = pixiUtil.genSprite('bg');
    bg.width = screen.width;
    bg.height = screen.height;
    this.container.addChild(bg);

    const logo = pixiUtil.genSprite('logo');
    logo.x = screen.width / 2;
    logo.y = screen.height / 2 - 450;
    logo.anchor.set(0.5, 0.5);
    this.container.addChild(logo);

    const quick_start = pixiUtil.genSprite('quick_start');
    quick_start.x = screen.width / 2;
    quick_start.y = screen.height / 2 - 150;
    quick_start.anchor.set(0.5, 0.5);
    quick_start.interactive = true;
    quick_start.on('pointerdown', (e) => {
      this.hide();
      monitor.emit('scene:go', 'room', {
        type: 'quick_start'
      });
    });
    this.container.addChild(quick_start);

    const create_public = pixiUtil.genSprite('create_public');
    create_public.x = screen.width / 2 - 130;
    create_public.y = screen.height / 2;
    create_public.anchor.set(0.5, 0.5);
    this.container.addChild(create_public);

    create_public.interactive = true;
    create_public.on('pointerdown', (e) => {
      this.hide();
      monitor.emit('scene:go', 'room', {
        type: 'create_public'
      });
    });

    const private_room = pixiUtil.genSprite('private_room');
    private_room.x = screen.width / 2 + 150;
    private_room.y = screen.height / 2;
    private_room.anchor.set(0.5, 0.5);
    this.container.addChild(private_room);
    private_room.interactive = true;
    private_room.on('pointerdown', (e) => {
      this.hide();
      monitor.emit('scene:go', 'room', {
        type: 'private_room'
      });
    });

    // 
    // const guide = pixiUtil.genSprite('btn_guide');
    // guide.x = screen.width / 2;
    // guide.y = start.y + start.height + 50;
    // guide.anchor.set(0.5, 0.5);
    // this.container.addChild(guide);

    // guide.interactive = true;
    // guide.once('pointerdown', (e) => {
    //   this.hide();
    //   monitor.emit('scene:go', 'room', {
    //     guide: true
    //   });
    // });

    // const toolInfo = pixiUtil.genSprite('btn_tool_info');
    // toolInfo.x = screen.width / 2;
    // toolInfo.y = guide.y + guide.height + 50;
    // toolInfo.anchor.set(0.5, 0.5);
    // this.container.addChild(toolInfo);

    // toolInfo.interactive = true;
    // toolInfo.on('pointerdown', (e) => {
    //   wx.showModal({
    //     title: '提示',
    //     content: '敬请期待...',
    //     showCancel: false
    //   });
    // });

    // const musicIcon = pixiUtil.genSprite(wx.$audio.muted.bgm ? 'btn_music_close' : 'btn_music');
    // musicIcon.anchor.set(0.5, 0.5);
    // musicIcon.scale.x = musicIcon.scale.y = 0.7;
    // musicIcon.x = screen.width / 2;
    // musicIcon.y = start.y - 150;
    // this.container.addChild(musicIcon);
    // musicIcon.interactive = true;
    // musicIcon.on('pointerdown', (e) => {
    //   monitor.emit('muted:bgm', !wx.$audio.muted.bgm);
    //   musicIcon.texture = pixiUtil.getTexture(wx.$audio.muted.bgm ? 'btn_music_close' : 'btn_music');
    // });
  },
  update() {
    if (!this.showRanking) {
      return;
    }
  }
};