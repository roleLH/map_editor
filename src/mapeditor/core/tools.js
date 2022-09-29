

class Selector {
  constructor() {
    this.startPos = [0, 0];
    this.endPos = [0, 0];

    this.onClickFn = (event) => {
      let x = event.offsetX;
      let y = event.offsetY;

      this.setStart(x, y);
      this.setEnd(x, y);
    }

    this.onMouseDownFn = (event) => {
      let x = event.offsetX;
      let y = event.offsetY;

      this.setStart(x, y);
    }

    this.onMouseMoveFn = (event) => {
      let x = event.offsetX;
      let y = event.offsetY;

      this.setEnd(x, y);
    }

    this.onMouseUpFn = (event) => {
      let x = event.offsetX;
      let y = event.offsetY;

      this.setEnd(x, y);
    }

  }

  setStart(x, y) {
    this.startPos[0] = x;
    this.startPos[1] = y;
  }
  setEnd(x, y) {
    this.endPos[0] = x;
    this.endPos[1] = y;
  }

  getRect() {
    let x = Math.min(this.startPos[0], this.endPos[0]);
    let y = Math.min(this.startPos[1], this.endPos[1]);
    let w = Math.abs(this.startPos[0] - this.endPos[0]);
    let h = Math.abs(this.startPos[1] - this.endPos[1]);

    return [x, y, w, h];
  }

  /**
   * 
   * @param {HTMLElement} el 
   */
  attachTo(el) {
    
    el.addEventListener("click", this.onClickFn);
    el.addEventListener("mousedown", (e) => {
      this.onMouseDownFn(e);
      el.addEventListener("mousemove", this.onMouseMoveFn);
    });
    el.addEventListener("mouseup", (e) => {
      this.onMouseUpFn(e);
      el.removeEventListener("mousemove", this.onMouseMoveFn);
    });
  }

  /**
   * 
   * @param {HTMLElement} el 
   */
  detachTo(el) {
    el.removeEventListener("click", this.onClickFn);
    el.removeEventListener("mousedown", this.onMouseDownFn);
    el.removeEventListener("mouseup", this.onMouseUpFn);
  }
}





class Tool {
  constructor() {
    this.name = "tool";
  }

  active() {}
  inactive() {}
}



export default Tool;