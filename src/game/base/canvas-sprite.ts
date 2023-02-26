
interface IOptions {
  x?: number,
  y?: number,
  width?: number,
  height?: number,
  fill?: string
}

const defaultOpts: IOptions = {
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  fill: '#ffffff'
}


export default function createCanvasSprite(options: IOptions): PIXI.Sprite {
  const opts = Object.assign({}, defaultOpts, options)
  const canvas = document.createElement('canvas')
  canvas.width = opts.width
  canvas.height = opts.height

  const ctx = canvas.getContext('2d')
  ctx.fillStyle = opts.fill
  ctx.fillRect(opts.x, opts.y, opts.width, opts.height)

  const sprite = PIXI.Sprite.from(canvas)
  return sprite

}