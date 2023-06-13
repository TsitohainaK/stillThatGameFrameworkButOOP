import GameObject from "./GameObject";

export default class Layer {
  gameObjects: GameObject[] = [];
  constructor(public key: string) {}

  addGameObject(go:GameObject){
    this.gameObjects.push(go)
  }

  render(ctx: CanvasRenderingContext2D) {
    this.gameObjects.forEach((gameObject) => {
      gameObject.render(ctx);
    });
  }
}
