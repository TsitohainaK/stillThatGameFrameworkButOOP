import { Bodies, Body } from "matter-js";

export type GameObjectTransform = {
  position: { x: number, y: number };
  size: { w: number, h: number };
  scale?: { w: number, h: number };
  angle?: 0;
}

export type GameObjectOption = {
  isStatic?: boolean;
  lockRotation?: boolean;
}

export default class GameObject {
  name: string;
  layerName?: string;
  size: { w: number, h: number } = { w: 0, h: 0 };
  scale: { w: number, h: number } = { w: 1, h: 1 };
  transform!: Body;
  controller = Body;

  constructor(name: string, transform: GameObjectTransform, options?: GameObjectOption) {
    this.name = name;
    this.transform = Bodies.rectangle(transform.position.x, transform.position.y, transform.size.w, transform.size.h, { isStatic: options?.isStatic, inertia: options?.lockRotation ? Infinity : undefined });
    this.size = transform.size
    // this.transform = Bodies.rectangle(transform.position.x, transform.position.y, transform.size.w, transform.size.h);
    if (transform.scale) { this.scale = transform.scale; this.controller.scale(this.transform, this.scale.w, this.scale.h) };
    if (transform.angle) this.controller.setAngle(this.transform, transform.angle)
  }

  setLayerName(layerName: string) {
    this.layerName = layerName;
  }

  update(params?: any) {
    if (params) { }
  }

  render(ctx: CanvasRenderingContext2D) {
    if (ctx) { }
  }
}