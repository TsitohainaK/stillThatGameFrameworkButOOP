import { Game } from "./Game";
import { CreateRenderer } from "./Renderer";

export function ChangeDOMTitle(name: string) {
  document.title = name;
}

export function DOMContentLoaded(callback: Function) {
  if (document.readyState === "complete" || document.readyState === "interactive") {
    callback();
    return;
  }

  function done() {
    document.removeEventListener("DOMContentLoaded", done, true);
    window.removeEventListener("load", done, true);
    callback();
  }

  document.addEventListener("DOMContentLoaded", done, false);
  window.addEventListener("load", done, false);
}

export function AddToDom(game: Game) {
  if (!game.canvas) {
    CreateRenderer(game);
  }

  if (!game.parentElt) {
    if (game.config.parentEltId) game.parentElt = document.getElementById(game.config.parentEltId);
    else game.parentElt = document.body;
  }

  game.parentElt!.appendChild(game.canvas!);
}
