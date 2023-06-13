export default class Input {
  static currents: {
    [key: string]: boolean;
  };
  static mouseLeftClick = false;
  constructor(keys: {
    [key: string]: boolean;
  }) {
    if (keys) Input.currents = keys;
    Object.seal(Input.currents);

    window.addEventListener("keydown", (e) => {
      try {
        Input.currents[e.key] = true;
      } catch (error) {
        // do nothing
      }
    });
    window.addEventListener("keyup", (e) => {
      try {
        Input.currents[e.key] = false;
      } catch (error) {
        // do nothing
      }
    });

    window.addEventListener("mousedown", (e) => {
      if (e.button === 0) {
        Input.mouseLeftClick = true;
      }
    });
    window.addEventListener("mouseup", (e) => {
      if (e.button === 0) {
        Input.mouseLeftClick = false;
      }
    });
  }

  static listenTo(key: string) {
    return Input.currents[key] === true;
  }

  static horizontal() {
    return this.currents["ArrowLeft"] && !this.currents["ArrowRight"] === true
      ? -1
      : this.currents["ArrowRight"] && !this.currents["ArrowLeft"]
        ? 1
        : 0;
  }
  static vertical() {
    return this.currents["ArrowUp"] && !this.currents["ArrowDown"] === true
      ? -1
      : this.currents["ArrowDown"] && !this.currents["ArrowUp"]
        ? 1
        : 0;
  }
}
