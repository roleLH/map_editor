const KEY = {
  up : 0,
  down : 1,
  left : 2,
  right : 3,
  ok : 4,
  cancel : 5,
}


class Controller {
  constructor() {
    this.keyStates = [0, 0, 0, 0, 0, 0];
  }

  up() {
    this.keyStates[0] = 1;
  }
  down() {
    this.keyStates[1] = 1;
  }
  left() {
    this.keyStates[2] = 1;
  }
  right() {
    this.keyStates[3] = 1;
  }
  ok() {
    this.keyStates[4] = 1;
  }
  cancel() {
    this.keyStates[5] = 1;
  }
  clearState() {
    for(let i = 0; i < 6; i++) {
      this.keyStates[i] = 0;
    }
  }

  getState(key) {
    return this.keyStates[key];
  }
}

export default Controller;