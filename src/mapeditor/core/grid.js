import Cell from "./cell";


  class Grid {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.cells = this._createCells(width, height);
  }


  clearCells(c) {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        this.cells[i][j].color = c;
      }
    }
  }


  clicked(cell) {
    cell.clicked();
  }
  rightClicked(cell) {
    cell.rightClicked();
  }
  _createCells(width, height) {
    var i, j, cells = new Array(height);

    for (i = 0; i < height; i++) {
      cells[i] = new Array(width);
      for (j = 0; j < width; j++) {
        cells[i][j] = new Cell(j, i);
      }
    }

    return cells;
  }
  getCell(x, y) {
    if(x < 0 || x >= this.width) {
      return null;
    }
    if(y < 0 || y >= this.height) {
      return null;
    }
    return this.cells[y][x];
  }
  getCells() {
    return [].concat.apply([], this.cells);
  }

  drawCell(x, y, c) {
    let cell = this.getCell(x, y);
    if(!cell) {
      return;
    }
    cell.setColor(c);
  }
  setCellColor(x, y, c) {
    let cell = this.getCell(x, y);
    if(!cell) {
      return;
    }
    let _c = `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
    cell.setColor(_c);
  }

  line(x1, y1, x2, y2, c) {

  }


  rect(x, y, w, h, c) {
    for(let i = 0; i < w; i++) {
      this.setCellColor(x + i, y, c);
      this.setCellColor(x + i, y + h - 1, c);
    }
    for(let i = 0; i < h - 1; i++) {
      this.setCellColor(x, y + i, c);
      this.setCellColor(x + w - 1, y + i, c);
    }
  }

  _drawLine(x1, x2, y, c) {
    for(let i = x1; i < x2; i++) {
      this.setCellColor(i, y, c);
    }
  }

  rectFill(x, y, w, h, c) {
    for(let i = y; i < y + h; i++) {
      this._drawLine(x, x + w, i, c);
    }
  }

  circ(x, y, r, c) {
    let d = 3 - ( 2 * r);
    let ox = 0;
    let oy = r;

    while(ox <= oy) {
      this.setCellColor(x + ox, y + oy, c);
      this.setCellColor(x + ox, y - oy, c);
      this.setCellColor(x - ox, y + oy, c);
      this.setCellColor(x - ox, y - oy, c);
      this.setCellColor(x + oy, y + ox, c);
      this.setCellColor(x + oy, y - ox, c);
      this.setCellColor(x - oy, y + ox, c);
      this.setCellColor(x - oy, y - ox, c);

      ox++;
      if(d < 0) {
        d += 4 * ox + 6;
      } else {
        d += 4 * (ox - oy) + 10;
        oy--;
      }
    }

  }

  circFill(x, y, r, c) {
    let d = 3 - ( 2 * r);
    let ox = 0;
    let oy = r;

    while(ox <= oy) {
      this._drawLine(x - ox, x + ox, y + oy, c);
      this._drawLine(x - ox, x + ox, y - oy, c);
      this._drawLine(x - oy, x + oy, y + ox, c);
      this._drawLine(x - oy, x + oy, y - ox, c);

      ox++;
      if(d < 0) {
        d += 4 * ox + 6;
      } else {
        d += 4 * (ox - oy) + 10;
        oy--;
      }
    }

  }

}

export default Grid;
