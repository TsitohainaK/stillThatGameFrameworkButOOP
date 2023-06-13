import { GameObject, GameObjectOption, GameObjectTransform, Input } from "../core";
import { Draw } from "../core/utils";

export default class Player extends GameObject {
  color: string;
  speed: number = 5;
  velocity: { x: number, y: number } = {
    x: 0,
    y: 0,
  }
  constructor(name: string, transform: GameObjectTransform, options?: GameObjectOption) {
    super(name, transform, options);
    this.color = 'green'
  }

  render(ctx: CanvasRenderingContext2D): void {
    // ctx.moveTo(this.transform.position.x, this.transform.position.y)
    Draw.rect(ctx, this.transform.position.x, this.transform.position.y, this.size.w * this.scale.w, this.size.h * this.scale.h, this.color);
    // Draw.text(ctx, `x:${this.position.x}, y:${this.position.y}`, this.position.x, this.position.y)
  }

  update(): void {
    // this.velocity.x += Input.horizontal() * this.speed;
    // this.velocity.y += Input.vertical() * this.speed;
    this.controller.setVelocity(this.transform,  {
      x: Input.horizontal() * this.speed,
      y: Input.vertical() * this.speed
    })



    // this.position.x += this.velocity.x;
    // this.position.y += this.velocity.y;


    // this.velocity.x *= 0.8;
    // this.velocity.y *= 0.8;
  }
}