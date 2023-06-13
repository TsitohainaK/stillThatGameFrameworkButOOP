import GameObject from "./gameObject";

export default class Layer {
  name: string = "unnamed";
  gameObjects: Map<string, GameObject> = new Map();

  constructor(name?: string, gameObjects?: GameObject[]) {
    if (name) this.name = name;
    if (gameObjects) {
      gameObjects.forEach(_gameObject => {
        this.gameObjects.set(_gameObject.name, _gameObject);
      });
    }
  }

  add(gameObjects: GameObject[]) {
    gameObjects.forEach(gameObject => {
      gameObject.setLayerName(this.name);
      this.gameObjects.set(gameObject.name, gameObject);
    })
  }

  remove(gameObject: GameObject) {
    this.gameObjects.delete(gameObject.name);
  }

  update() { }

  render(ctx: CanvasRenderingContext2D) {
    this.gameObjects.forEach(gameObject => {
      gameObject.render(ctx);
    })
  }
}