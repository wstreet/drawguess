import { stage, screen, monitor } from '../core';
import PIXI from 'pixi.js'

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

    const logo = pixiUtil.genSprite('logo');
    logo.x = screen.width / 2;
    logo.y = screen.height / 2 - 150;
    logo.anchor.set(0.5, 0.5);
    this.container.addChild(logo);

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
  },
  update() {
    if (!this.showRanking) {
      return;
    }
  }
};