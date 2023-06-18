import { Bodies } from "matter-js";
import CustomBody from "./CustomBody";
import Draw from "./Draw";

export default class GameObject {
  position: { x: number; y: number } = { x: 0, y: 0 };
  size: { w: number; h: number } = { w: 32, h: 32 };
  transform: CustomBody;

  constructor(
    public key: string,
    transform: { position?: { x: number; y: number }; size: { w: number; h: number } },
    rigidBody?: CustomBody,
    /**
     * Options are useless when body is assigned to a rigid body
     */
    options?: {
      isStatic?: boolean;
      lockRotation?: boolean;
    },
  ) {
    if (transform && transform.position) this.position = transform.position;
    if (transform && transform.size) this.size = transform.size;

    this.transform =
    rigidBody ||
      new CustomBody(
        Bodies.rectangle(this.position.x, this.position.y, this.size.w, this.size.h, {
          isStatic: options?.isStatic,
          inertia: options?.lockRotation ? Infinity : undefined,
        })
      );
  }
  render(ctx: CanvasRenderingContext2D) {
    Draw.rect(
      ctx,
      this.transform.value.position.x,
      this.transform.value.position.y,
      this.size.w,
      this.size.h
    );
  }
  update() {}
}
