declare module '*.frag'
declare module '*.vert'

declare const canvas: HTMLCanvasElement
declare const CDN: string
declare const CLOUD_ID: string
declare const pixiUtil: PixiUtil

interface PixiUtil {
  genSprite: (name: string) => PIXI.Sprite
  genMask: () => any
  getTexture: (name: any) => any
  imgList: {[string]: string}
}

interface Window {
  font: string
  interaction: Promise<wx.IRect>
  pixiUtil: PixiUtil
  CLOUD_ENV: string
}

interface IScene {
  hide: () => void
  show: (...args: any[]) => void
}

interface IEvent {
  x: number
  y: number
  id: number
  type: string
  target: PIXI.Container
  currentTarget: PIXI.Container
}
