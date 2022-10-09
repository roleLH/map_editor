class Shape {
  constructor(name) {
    this.name = name;
  }

  draw(ctx, retryCallback) {

  }

}

class Rectangle extends Shape {
  constructor(x, y, w, h, c, fill) {
    super("Rectangle")
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.color = c;
    this.fill = fill || false;
  }

  drawTo(grid) {
    if(this.fill) {
      return grid.rectFill(this.x, this.y, this.width, this.height, this.color);
    }
    return grid.rect(this.x, this.y, this.width, this.height, this.color);
  }

  move(info) {
    this.x -= info.xDiff;
    this.y -= info.yDiff;
  }

  setUpperLeft(info) {
    this.x = info.x;
    this.y = info.y;
  }

}

class Line extends Shape {
  constructor(x1, y1, x2, y2, c) {
    super("Line")
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.color = c;
  }

  drawTo(grid) {
    grid.line(this.x1, this.y1, this.x2, this.y2, this.color);
  }

  move(info) {
    this.x1 -= info.xDiff;
    this.y1 -= info.yDiff;
    this.x2 -= info.xDiff;
    this.y2 -= info.yDiff;
  }
}

class Ellipse extends Shape {
  constructor(x, y, w, h, c, fill) {
    super("Ellipse")
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.color = c;
    this.fill = fill;
  }

  drawTo(grid) {
    if(this.fill) {
      return grid.circFill(this.x, this.y, this.width, this.height, this.color);
    }
    return grid.circ(this.x, this.y, this.width, this.height, this.color);
  }

  move(info) {
    this.x -= info.xDiff;
    this.y -= info.yDiff;
  }

  setUpperLeft(info) {
    this.x = info.x;
    this.y = info.y;
  }

}

class Path extends Shape {
  constructor() {
    super("Path");
    this.points = [];
  }

  addPoint(point) {
    this.points.push(point);
  }

  drawTo(grid) {
    this.points.forEach((point) => {
      grid.setCellColor(point.x, point.y, point.color);
    })
  }

  //TODO:
  move() {}
  //TODO:
  setUpperLeft() {}

}

class Point extends Shape {
  constructor(x, y, c) {
    super("Point");
    this.x = x;
    this.y = y;
    this.color = c;
  }

  drawTo(grid) {
    grid.setCellColor(this.x, this.y, this.color);
  }

  move(info) {
    this.x -= info.xDiff;
    this.y -= info.yDiff;
  }

  setUpperLeft(info) {
    this.x = info.x;
    this.y = info.y;
  }
}

class SelectionBox extends Shape {
  constructor() {
    super("SelectionBox");

  }
}

const SHAPES = {
  Line: Line,
  Ellipse: Ellipse,
  LinePath: Path,
  Path: Path,
  Point: Point,
  SelectionBox: SelectionBox,
  Rectangle: Rectangle,
}

let id = 0;
function createShape(shapeName, ...args) {
  let shape = new SHAPES[shapeName](...args);
  shape.id = id;
  id++;
  return shape;
}

export default createShape;