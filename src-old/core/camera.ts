import GameObject from "./gameObject";
import Vector2 from "./utils/vector2";

export default class Camera extends GameObject {
  private ctx?: CanvasRenderingContext2D;
  private _update?: Function;
  constructor(name: string, transform?: any) {
    super(name, transform);
  }

  assignCtx(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  zoom(at: Vector2) {
    this.ctx?.scale(at.x * this.scale.w, at.y * this.scale.h);
  }

  move(to: Vector2) {
    this.ctx?.translate(
      -to.x + this.transform.position.x,
      -to.y + this.transform.position.y
    )
  }

  update(callback: Function): void {
    this._update = callback
  }

  render() {
    this._update?.()
  }

}