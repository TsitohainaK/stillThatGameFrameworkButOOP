import { Camera, Engine, EngineOptions, Input, Layer } from './core'
import { Vector2 } from './core/utils';
import Player from './classes/player';
import './style.css'
import Obstacle from './classes/obstacle';

const options: EngineOptions = {
  parentId: "app",
  resolution: {
    width: innerWidth,
    height: innerHeight,
  },
  inputKeys: {
    "ArrowUp": false,
    "ArrowDown": false,
    "ArrowLeft": false,
    "ArrowRight": false,
    "a": false,
  },
  physicEngineOptions: {
    gravity: { x: 0, y: 0, scale: 0.001 },

  }
}

const game = new Engine(options)

// const backgroundLayer = new Layer('background');
const playerLayer = new Layer('player');
const objectsLayer = new Layer('objects');

const player = new Player("p1", {
  position: { x: 200, y: 200 },
  size: { w: 50, h: 50 },
}, {
  lockRotation: true
})

const obstacle1 = new Obstacle('obs1', {
  position: { x: 400, y: 200 },
  size: { w: 100, h: 500 }
}, {
  isStatic: true,
})
const obstacle2 = new Obstacle('obs2', {
  position: { x: 400, y: 500 },
  size: { w: 500, h: 100 }
}, {
  isStatic: true,
})

playerLayer.add([player])
objectsLayer.add([obstacle1, obstacle2])

const camera = new Camera('cam1', {
  position: new Vector2(game.options.resolution.width * 0.5, game.options.resolution.height * 0.5),
  size: new Vector2(game.options.resolution.width, game.options.resolution.height),
})

camera.update(() => {
  if (Input.listenTo('a')) {
    // camera.position = new Vector2(game.options.resolution.width, game.options.resolution.height)
    camera.zoom(new Vector2(0.5, 0.5))

  } else {
    // camera.position = new Vector2(game.options.resolution.width * 0.5, game.options.resolution.height * 0.5)
    camera.zoom(new Vector2(1, 1))
  }
  const lerp = (p0:number, p1:number, t:number) => {return (p1-p0) * t + p0}
  camera.move(new Vector2(
    lerp(camera.transform.position.x, player.transform.position.x, 0.8),
    lerp(camera.transform.position.y, player.transform.position.y, 0.8)
  ))
})

game.init([playerLayer, objectsLayer], camera)

game.run()
