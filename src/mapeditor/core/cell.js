
  class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dirty = false;
    this.obstacle = false;
    this.color = "rgba(255,255,255,1)";
  }
  equals(cell) {
    return (this.x === cell.x && this.y === cell.y);
  }
  isDirty() {
    return this.dirty;
  }
  set(obj) {
    var i, keys = Object.keys(obj), length = keys.length;

    for (i = 0; i < length; i++) {
      this[keys[i]] = obj[keys[i]];
    }

    this.setDirty();
  }
  setClean() {
    this.dirty = false;
  }
  setDirty() {
    this.dirty = true;
  }
  clicked() {
    this.set({
      obstacle: !this.obstacle
    });
    this.setDirty();
  }
  rightClicked() {
    this.set({
      obstacle: !this.obstacle
    });
  }
  pos() {
    return { x: this.x, y: this.y };
  }

  setColor(c) {
    this.color = c; 
    this.setDirty();
  }
}



  export default Cell;
