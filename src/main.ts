import { Game } from "./Game";
import GameObject from "./GameObject";
import Layer from "./Layer";
import Scene from "./Scene";


const obj = new GameObject("obj");

const layer = new Layer("bg");
layer.addGameObject(obj);

const scene = new Scene("hello");
scene.layersManager.addLayer(layer);

const game = new Game(
  {
    parentEltId: "app",

  },
  [scene]
);

game.start();

console.log(game)
