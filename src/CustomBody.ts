import { Body } from "matter-js";

export default class CustomBody {
  private body = Body;
  constructor(public value: Body | Matter.Body) {}

  setVelocity(velocity: { x: number; y: number }) {
    this.body.setVelocity(this.value, velocity);
  }

  setAngle(angle: number) {
    this.body.setAngle(this.value, angle);
  }

  setForce(pos: { x: number; y: number }, force: { x: number; y: number }) {
    this.body.applyForce(this.value, pos, force);
  }
}
