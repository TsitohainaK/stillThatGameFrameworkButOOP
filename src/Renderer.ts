import { Game } from "./Game";

const baseSize = {
  width: 800,
  height: 600,
};

export default class Renderer {
  ctx: CanvasRenderingContext2D;
  constructor(private game: Game) {
    this.ctx = game.context!;
  }

  step() {
    this.game.update()
    this.ctx.clearRect(0, 0, this.game.config.size!.width, this.game.config.size!.height);
    this.ctx.save();
    // moving
    this.ctx.translate(0, 0);
    
    // zooming
    this.ctx.scale(1, 1);

    // doing every things
    this.game.render()

    this.ctx.restore();
  }

  private loop() {
    this.step();
    requestAnimationFrame(this.loop.bind(this));
  }

  run() {
    this.loop();
  }
}

export function CreateRenderer(game: Game) {
  const config = game.config;

  game.canvas = document.createElement("canvas");
  game.context = game.canvas.getContext("2d");

  if (!config.size) {
    config.size = baseSize;
  }

  if (config.canvasStyle) {
    Object.keys(config.canvasStyle).forEach((k: any) => {
      game.canvas!.style[k] = config.canvasStyle![k];
    });
  }

  game.canvas.width = config.size.width;
  game.canvas.height = config.size.height;
  game.canvas.style.width = config.size.width + "px";
  game.canvas.style.height = config.size.height + "px";

  game.renderer = new Renderer(game);
}
