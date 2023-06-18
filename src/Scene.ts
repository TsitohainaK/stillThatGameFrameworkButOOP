import Layer from "./Layer";
import LayersManager from "./LayersManager";

export default class Scene {
  layers: Layer[] = [];
  layersManager: LayersManager;

  constructor(public key: string) {
    this.layersManager = new LayersManager(this);
  }

  render(ctx: CanvasRenderingContext2D) {
    this.layers.forEach((layer) => {
      layer.render(ctx);
    });
  }

  update() {
    this.layers.forEach((layer) => layer.update());
  }
}
