import { install } from '@pixi/unsafe-eval'
import Interaction from '@iro/interaction'

PIXI.settings.SORTABLE_CHILDREN = true
PIXI.settings.PREFER_ENV = PIXI.ENV.WEBGL
PIXI.settings.PRECISION_FRAGMENT = PIXI.PRECISION.HIGH

install(PIXI)

// remove default interaction extensions
for (const x in PIXI.extensions._queue) {
  for (const ext of PIXI.extensions._queue[x]) {
    if (ext.name === 'interaction') {
      PIXI.extensions.remove(ext)
    }
  }
}

// add @iro/interaction
PIXI.extensions.add(
  {
    name: 'interaction',
    ref: Interaction,
    type: [PIXI.ExtensionType.RendererPlugin, PIXI.ExtensionType.CanvasRendererPlugin]
  }
)
