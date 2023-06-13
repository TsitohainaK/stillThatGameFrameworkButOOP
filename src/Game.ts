import { Engine, IEngineDefinition, World } from "matter-js";
import { ChangeDOMTitle, DOMContentLoaded } from "./Dom";
import Renderer, { AddToDom, CreateRenderer } from "./Renderer";
import Scene from "./Scene";
import ScenesManager from "./ScenesManager";

export interface ElementCSSInlineStyle {
  style: CSSStyleDeclaration;
}
export type GameConfig = {
  name?: string;
  parentEltId?: string;
  size?: {
    width: number;
    height: number;
  };
  canvasStyle?: CSSStyleDeclaration;
  /**
   * key for scene to show at launch if there is more than one
   */
  defaultScenes?: string;

  physicEngineOptions?: IEngineDefinition;
};

export class Game {
  name: string = "My game";
  parentElt: HTMLElement | null = null;
  canvas: HTMLCanvasElement | null = null;
  context: CanvasRenderingContext2D | null = null;
  renderer: Renderer | null = null;

  currentScene?: Scene;
  scenesManager?: ScenesManager;

  physicEngine?: Engine;
  world?: World;

  constructor(public config: GameConfig = {}, public scenes: Scene[] = []) {
    if (config.name) this.name = config.name;

    DOMContentLoaded(this.boot.bind(this));
  }

  private boot() {
    this.physicEngine = Engine.create(this.config.physicEngineOptions)
    this.world = this.physicEngine.world;
    this.scenesManager = new ScenesManager(this);
    ChangeDOMTitle(this.name);
    CreateRenderer(this);
    AddToDom(this);
  }

  update(){
    if(this.physicEngine) Engine.update(this.physicEngine)
  }

  render() {
    this.currentScene?.render(this.context!);
  }

  start() {
    this.renderer!.run();
  }
}
