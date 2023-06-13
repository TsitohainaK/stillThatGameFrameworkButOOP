export default class Vector2 {
  constructor(public x: number, public y: number) { }

  getX(): number {
    return this.x;
  }

  getY(): number {
    return this.y;
  }

  get(): { x: number, y: number } {
    return { x: this.x, y: this.y }
  }

  setX(x: number): void {
    this.x = x;
  }
  setY(y: number): void {
    this.y = y;
  }

  set(vector: Vector2 | { x: number, y: number }): void {
    if (vector instanceof Vector2) {
      this.setX(vector.getX());
      this.setY(vector.getY());
    } else {
      this.setX(vector.x);
      this.setY(vector.y);
    }
  }
}