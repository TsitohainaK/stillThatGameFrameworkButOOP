import GameObject from "./GameObject";

export default class Layer {
  gameObjects: GameObject[] = [];
  constructor(public key: string) {}

  addGameObject(gameObjects: GameObject[]) {
    gameObjects.forEach((gameObject) => this.gameObjects.push(gameObject));
  }

  render(ctx: CanvasRenderingContext2D) {
    this.gameObjects.forEach((gameObject) => {
      gameObject.render(ctx);
    });
  }

  update() {
    this.gameObjects.forEach((gameObject) => {
      gameObject.update();
    });
  }
}
