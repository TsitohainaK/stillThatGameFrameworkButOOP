import Camera from "./camera";
import GameObject from "./gameObject";
import Layer from "./layer";

type RendererConfig = {
  parentId: string;
  width: number;
  height: number;
}

export default class Renderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private parent: HTMLElement;

  private layers: Layer[] = [];
  private camera?: Camera;

  constructor(private configs: RendererConfig) {
    this.parent = document.getElementById(configs.parentId)!;
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d")!;

    this.canvas.width = configs.width;
    this.canvas.height = configs.height;
    this.canvas.style.width = configs.width + "px";
    this.canvas.style.height = configs.height + "px";

    this.parent.appendChild(this.canvas);
  }


  addLayer(layers: Layer[]) {
    layers.forEach(layer => {
      this.layers.push(layer);
    })
  }

  getLayersGameObjects(): GameObject[] {
    const gameObjects: GameObject[] = [];
    this.layers.forEach(layer => {
      layer.gameObjects.forEach(go =>
        gameObjects.push(go))
    })
    return gameObjects;
  }

  addCamera(camera: Camera) {
    this.camera = camera;
    this.camera.assignCtx(this.ctx);
  }

  render() {
    this.ctx.clearRect(0, 0, this.configs.width, this.configs.height);
    this.ctx.save();
    if (this.camera) this.camera.render();


    for (let layer of this.layers) {
      layer.render(this.ctx);
    }

    this.ctx.restore();
  }
}