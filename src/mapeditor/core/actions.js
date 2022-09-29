

class ClearAction {
  constructor(core, oldShape, newShape) {
    this.core = core;
    this.oldShape = oldShape;
    this.newShape = newShape;
  }

  do() {
    this.core.shapes = this.newShape;
    this.core.repaintLayer();
  }
  undo() {
    this.core.shapes = this.oldShape;
    this.core.repaintLayer();
  }

}

class MoveAction {
  constructor(core, shapes, prePos, newPos) {
    this.core = core;
    this.shapes = shapes;
    this.prePos = prePos;
    this.newPos = newPos;
  }

  do() {
    this.shapes.forEach((shape) => {
      shape.setUpperLeft(this.newPos[0], this.newPos[1]);
    })
    this.core.repaintLayer();
  }
  undo() {
    this.shapes.forEach((shape) => {
      shape.setUpperLeft(this.prePos[0], this.prePos[1]);
    })
    this.core.repaintLayer();
  }
}

class AddShapeAction {
  constructor(core, shape, preShapeId) {
    
  }
}