import Layer from "./Layer";
import Scene from "./Scene";

export default class LayersManager {
  layers: Layer[] = [];
  constructor(private scene: Scene) {
    this.layers = this.scene.layers;
  }

  addLayer(layers: Layer[]) {
    layers.forEach((layer) => {
      const key = layer.key;
      if (this.layers.some((l) => l.key === key))
        throw new Error(`[add layer] layer with key:${key} already exist!`);
      this.layers.push(layer);
    });
  }

  removeLayer(key: string) {
    if (!this.layers.some((l) => l.key === key))
      throw new Error(`[remove layer] layer with key:${key} not found!`);

    this.layers = this.layers.filter((l) => l.key !== key);
  }

  swap(layer1key: string, layer2key: string) {
    const id1 = this.layers.findIndex((l) => l.key === layer1key);
    if (id1 === -1) throw new Error(`[swap layer] layer with key:${layer1key} not found!`);
    const id2 = this.layers.findIndex((l) => l.key === layer2key);
    if (id2 === -1) throw new Error(`[swap layer] layer with key:${layer2key} not found!`);

    const tmp = this.layers[id1];
    this.layers[id1] = this.layers[id2];
    this.layers[id2] = tmp;
  }
}
