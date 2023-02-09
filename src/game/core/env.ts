import {install} from '@pixi/unsafe-eval'
import Interaction from '@iro/interaction'

PIXI.settings.SORTABLE_CHILDREN = true
PIXI.settings.PREFER_ENV = PIXI.ENV.WEBGL
PIXI.settings.PRECISION_FRAGMENT = PIXI.PRECISION.HIGH

install(PIXI)
PIXI.Renderer.registerPlugin('interaction', Interaction)

/* 云开发 环境名 */
wx.$store.CLOUD_ENV = 'wx-demo-mo9m4';