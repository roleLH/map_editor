const KEY = {
  up : 0,
  down : 1,
  left : 2,
  right : 3,
  ok : 4,
  cancel : 5,
}


function checkCanMove(x, y, grid) {
  let cell = grid.getCell(x, y);
  if(cell && !cell.obstacle) {
    return true;
  }
  return false;
}


  class Player {
  constructor(cell, grid, x, y) {

    this.grid = grid;
    this.path = [];

    this.lastMoved = +new Date();
    this.speed = 50;

    this.controller = null;
    this.pos = [x || 0, y || 0];
    this.cell = this.grid.getCell(0, 0);
    this.cell.set({ player: true});

    this.dirty = true;
  }
  move() {

    let controller = this.controller;
    let x = this.pos[0];
    let y = this.pos[1];

    if(controller.getState(KEY.up) == 1) {
      y -= 1;
    }
    if(controller.getState(KEY.down) == 1) {
      y += 1;
    }
    if(controller.getState(KEY.left) == 1) {
      x -= 1;
    }
    if(controller.getState(KEY.right) == 1) {
      x += 1;
    }
    controller.clearState();
    if(!checkCanMove(x, y, this.grid)) {
      return;
    }
    this.pos[0] = x;
    this.pos[1] = y;

    let nextCell = this.grid.getCell(x, y);
    if(nextCell == this.cell) {return; }
    nextCell.set({ player: true, destination: false });

    if(this.cell) {
      this.cell.set({ player: false });
    }
    
    this.cell = nextCell;
    this.lastMoved = +new Date();
  }
  moveTo(goalCell) {
  }
  tick() {
    var now = +new Date();
    if (now - this.lastMoved > this.speed) {
      if(!this.dirty) { return; }
      this.move();
      this.dirty = false;
    }
  }

  setController(c) {
    this.controller = c;
  }
}

export default Player;
