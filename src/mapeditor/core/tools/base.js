import createShape from "../shapes";


class Tool {
  constructor() {
    this.name = null;
    this.simple = true;
  }

  begin(x, y, core) {}
  continue(x, y, core) {}
  end(x, y, core) {}

  active(core) {}
  inactive(core) {}
}

class Cell extends Tool {
  constructor() {
    super();
    this.name = "Cell";
    this.timeThreshold = 10;
    this.lastPos = [0, 0];
  }

  /**
   * 
   * @param {Number} x 
   * @param {Number} y 
   * @param {Core} core 
   */
  begin(x, y, core) {
    this.currentShape = createShape('LinePath');
    let c = core.getColor();
    this.currentShape.addPoint(createShape('Point', x, y, [c[0], c[1], c[2]]));
    this.lastTime = Date.now();
    core.needRenderBuffer = true;
    this.lastPos[0] = x;
    this.lastPos[1] = y;
  }

  continue(x, y, core) {
    let diff = Date.now() - this.lastTime;
    if(diff > this.timeThreshold) {
      this.lastTime += diff;
      if(this.lastPos[0] == x && this.lastPos[y] == y) {
        return;
      }
      let c = core.getColor();
      this.currentShape.addPoint(createShape('Point', x, y, [c[0], c[1], c[2]]));
      core.drawShapeToBuffer(this.currentShape);
    }
  }
  end(x, y, core) {
    core.saveShape(this.currentShape);
    this.currentShape = null;
    core.needRenderBuffer = false;
  }
}


export default {
  Cell: new Cell(),

}
