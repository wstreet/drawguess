
const sysInfo = wx.getSystemInfoSync()
let {
  windowWidth: width,
  windowHeight: height,
  pixelRatio: devicePixelRatio,
} = sysInfo

const ticker = PIXI.Ticker.shared
const loader = PIXI.Loader.shared
function createContainer() {
  const container = new PIXI.Container()
  container.interactive = true;
  container.interactiveChildren = true
  return container
}
const stage = createContainer()

const monitor = new PIXI.utils.EventEmitter()
const pixelRatio = Math.min(2, devicePixelRatio)

canvas.width = width * pixelRatio
canvas.height = height * pixelRatio

const renderer = new PIXI.Renderer({
  view: canvas,
  antialias: true,
  backgroundColor: 0,
  width: width * pixelRatio,
  height: height * pixelRatio,
})


ticker.add(() => renderer.render(stage), null, PIXI.UPDATE_PRIORITY.NORMAL)


renderer.plugins.accessibility.destroy()
renderer.plugins.interaction.mapPositionToPoint = (point, x, y) => {
  point.x = x * pixelRatio;
  point.y = y * pixelRatio;
  // console.log(point)
};


export const screen = renderer.screen

export function tick() {
  return new Promise(resolve => {
    renderer.once('postrender', resolve)
  })
}

export {
  stage,
  loader,
  ticker,
  monitor,
  renderer,
  pixelRatio,
  devicePixelRatio,
  createContainer
}
