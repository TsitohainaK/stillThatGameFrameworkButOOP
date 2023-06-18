import { Body, Composite } from "matter-js";
import { Game } from "./Game";
import Scene from "./Scene";
import { CheckArray } from "./Utils";
import Layer from "./Layer";

export default class ScenesManager {
  scenes: Scene[] = [];
  constructor(private game: Game) {
    this.scenes = game.scenes;
    this.setCurrent(game.config.defaultScenes);
    if (!CheckArray(game.scenes, Scene))
      throw new Error("[Game]: No scene found, aborting game.start!", { cause: "No scene passed" });

    this.boot();
  }

  boot() {
    if (!this.game.world) console.warn("Physic world missing!");
    if (this.game.world) {
      const layers = this.game.currentScene?.layers;
      const transforms: Body[] = [];
      if (!CheckArray(layers, Layer))
        throw new Error("[Game]: No layer found, aborting game.start!", {
          cause: "No layer passed",
        });

      layers?.forEach((layer) => {
        layer.gameObjects.forEach((gameObject) => {
          if (gameObject.transform?.value) transforms.push(gameObject.transform.value);
        });
      });
      console.log(transforms, this.game.world);
      Composite.add(this.game.world, [...transforms]);
    }
  }

  addScenes(key: string, scene: Scene) {
    if (this.scenes.some((s) => s.key === key))
      throw new Error(`[add scene] Scene with key:${key} already exist!`, {
        cause: "Trying to add scenes with existing key",
      });

      if (!this.game.world) console.warn("Physic world missing!");
      if (this.game.world) {
      const layers = scene.layers;
      const transforms: Body[] = [];
      layers.forEach((layer) => {
        layer.gameObjects.forEach((gameObject) => {
          if (gameObject.transform?.value) transforms.push(gameObject.transform.value);
        });
      });
      console.log(transforms);
      Composite.add(this.game.world, transforms);
    }
    this.scenes.push(scene);
  }

  removeScenes(key: string) {
    if (!this.scenes.some((s) => s.key === key))
      throw new Error(`[remove scenes] Scenes with key:${key} not found!`);

    this.scenes = this.scenes.filter((s) => s.key !== key);
  }

  swap(scene1key: string, scene2key: string) {
    const id1 = this.scenes.findIndex((s) => s.key === scene1key);
    if (id1 === -1) throw new Error(`[swap scenes] Scene with key:${scene1key} not found!`);
    const id2 = this.scenes.findIndex((s) => s.key === scene2key);
    if (id2 === -1) throw new Error(`[swap scenes] Scene with key:${scene2key} not found!`);

    const tmp = this.scenes[id1];
    this.scenes[id1] = this.scenes[id2];
    this.scenes[id2] = tmp;
  }

  setCurrent(key?: string) {
    if (this.scenes.length < 1) return;
    if (!key) {
      this.game.currentScene = this.scenes[0];
      return;
    }
    if (!this.scenes.some((s) => s.key === key))
      throw new Error(`[set current scenes] Scenes with key:${key} not found!`);
    this.game.currentScene = this.scenes.find((s) => s.key === key)!;
  }
}
