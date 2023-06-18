export default class Draw {
  static line(
    ctx: CanvasRenderingContext2D,
    xf: number,
    yf: number,
    xt: number,
    yt: number,
    color = "indigo"
  ) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 10;
    ctx.lineJoin = "bevel";
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(xf, yf);
    ctx.lineTo(xt, yt);
    ctx.stroke();
    ctx.closePath();
  }
  static rect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    angle: number = 0,
    color = "indigo"
  ) {
    const _x = x - w * 0.5;
    const _y = y - h * 0.5;
    ctx.save();
    ctx.translate(_x, _y);
    ctx.rotate(angle);
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, w, h);
    ctx.restore();
  }
  static rectStroke(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    color = "indigo"
  ) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 5;
    ctx.strokeRect(x, y, w, h);
    ctx.closePath();
  }
  static text(ctx: CanvasRenderingContext2D, text: string, x: number, y: number) {
    ctx.font = "32 Helvetica";
    ctx.fillStyle = "red";
    ctx.fillText(text, x, y);
  }
}
