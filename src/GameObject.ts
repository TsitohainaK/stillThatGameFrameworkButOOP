import { Bodies } from "matter-js";
import CustomBody from "./CustomBody";
import Draw from "./draw";

export default class GameObject {
  position: { x: number; y: number } = { x: 200, y: 200 };
  size: { w: number; h: number } = { w: 200, h: 200 };
  transform: CustomBody = new CustomBody(
    Bodies.rectangle(this.position.x, this.position.y, this.size.w, this.size.h)
  );
  constructor(public key: string) {}
  render(ctx: CanvasRenderingContext2D) {
    Draw.rect(
      ctx,
      this.transform.value.position.x,
      this.transform.value.position.y,
      this.size.w,
      this.size.h
    );
  }
}
