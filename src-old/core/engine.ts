import { Engine as PhysicEngine, IEngineDefinition, Composite } from "matter-js";
import Camera from "./camera";
import GameObject from "./gameObject";
import Input from "./input";
import Layer from "./layer";
import Renderer from "./renderer";

export type EngineOptions = {
  parentId: string,
  resolution: {
    width: number,
    height: number
  },
  inputKeys: { [key: string]: boolean },
  physicEngineOptions?: IEngineDefinition
};

export default class Engine {
  private renderer: Renderer;
  private gameObjects?: GameObject[];
  private physicEngine!: PhysicEngine;

  constructor(public options: EngineOptions) {
    this.renderer = new Renderer({
      width: this.options.resolution.width,
      height: this.options.resolution.height,
      parentId: this.options.parentId,
    });
    new Input(options.inputKeys);
    this.physicEngine = PhysicEngine.create(options.physicEngineOptions)
  };

  preload() {

  }

  init(layers: Layer[], camera: Camera) {
    layers = layers.reverse();
    this.renderer.addLayer(layers);
    this.renderer.addCamera(camera);
    this.gameObjects = this.renderer.getLayersGameObjects()
    const world = this.physicEngine.world;
    Composite.add(world, [...this.gameObjects.map(go => { return go.transform })])
  }

  update() {
    PhysicEngine.update(this.physicEngine);
    this.gameObjects?.forEach(go => {
      go.update();
    })
  }

  run() {
    const that = this;

    (function mainLoop() {

      that.update();

      that.renderer.render();

      requestAnimationFrame(mainLoop);
    })()

  }
}