import { GameObject, GameObjectOption, GameObjectTransform } from "../core";
import { Draw } from "../core/utils";

export default class Obstacle extends GameObject {
  constructor(name: string, transform: GameObjectTransform, options: GameObjectOption) {
    super(name, transform, options);
  }

  render(ctx: CanvasRenderingContext2D): void {
    Draw.rect(ctx, this.transform.position.x, this.transform.position.y, this.size.w, this.size.h, 'blue');
  }
}