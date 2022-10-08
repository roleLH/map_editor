import Grid from "./grid";
import tools from "./tools/base"
import actions from "./actions";

class ActionStack {
  constructor(core) {
    this.undoStk = [];
    this.redoStk = [];


    this.core = core;
  }

  execute(action) {
    this.undoStk.push(action);
    action.do();
    this.redoStk = [];
  }

  undo() {
    if(this.undoStk.length <= 0) {return; }
    let act = this.undoStk.pop();
    act.undo();
    this.redoStk.push(act);

    this.core.emit("undo", {action: act});
    this.core.emit("drawingchange");
  }

  redo() {
    if(this.redoStk.length <= 0) { return; }
    let act = this.redoStk.pop();
    this.undoStk.push(act);
    act.do();
    this.core.emit("redo", {actions: act});
    this.core.emit("drawingchange");
  }

}



class Core {
  /**
   * opts : {
   *    width,
   *    height,
   * }
   * @param {Object} opts 
   */
  constructor(opts) {
    this.events = {};

    this.width = opts.width;
    this.height = opts.height;

    this.mainGrid = new Grid(opts.width, opts.height);
    this.activeGrid = new Grid(opts.width, opts.height);
    this.bufferGrid = new Grid(opts.width, opts.height);

    this.shapes = [];

    this.tool = tools.Cell;
    this.color = [0, 0, 0];

    this.actionStk = new ActionStack(this);
    this.needRenderBuffer = false;
  }

  renderShapes() {
    this.shapes.forEach((shape) => {
      shape.drawTo(this.mainGrid);
      console.log(this.shapes.length);
    })
    
  }
  renderTo(canvas) {
    canvas.draw(this.mainGrid.getCells());
    if(this.needRenderBuffer) {
      canvas.draw(this.bufferGrid.getCells());
    }
  }
  bufferClear() {
    this.bufferGrid.clearCells("rgba(255, 255, 255, 0)");
  }
  mainClear() {
    this.mainGrid.clearCells("rgba(255, 255, 255, 1)");
  }


  setColorByHSL(h, s, l) {

  }
  setColor(r, g, b) {
    this.color[0] = r;
    this.color[1] = g;
    this.color[2] = b;
  }
  getColor() {
    return this.color;
  }

  
  on(e, fn) {
    let listeners = this.events[e];
    if(!listeners) {
      listeners = [];
    }
    listeners.push(fn);
    this.events[e] = listeners;
  }

  emit(e, data) {
    let listeners = this.events[e];
    if(listeners) {
      listeners.forEach((fn) => {
        fn(data);
      })
    }
  }

  removeEvent(e, fn) {
    let listeners = this.events[e];
    if(!listeners) { return; }
    let idx = listeners.indexOf(fn);
    if(idx != -1) {
      listeners.split(idx, 1);
    }
  }

  /**
   * 
   * @param {Tool} tool 
   */
  setTool(tool) {
    this.tool.inactive(this);
    this.tool = tool;
    this.emit("toolchange", {tool: tool});
    tool.active(this);
  }

  /**
   * 
   * @param {String} name 
   */
  setToolBy(name) {

  }


  /**
   * 
   * @param {Shape} shape 
   */
  drawShapeToBuffer(shape) {
    shape.drawTo(this.bufferGrid);
  }
  saveShape(shape) {
    // this.shapes.push(shape);
    let act = new actions.AddShapeAction(this, shape, 0);
    this.actionStk.execute(act);
    this.emit("drawingchange");
    this.bufferClear();
  }




  pointerDown(x, y) {
    if(this.tool.simple) {
      this.tool.begin(x, y, this);
      this.isDragging = true;
      this.on("drawStart", {tool: this.tool});
    } else {
      this.isDragging = true;
      this.on("pointerdown", {});
    }
  }

  pointerMove(x, y) {
    if(this.tool.simple) {
      if(this.isDragging) {
        this.tool.continue(x, y, this);
        this.on("drawContinue", {tool: this.tool})
      }
    } else {
      if(this.isDragging) {
        this.on("pointdrag");
      } else {
        this.on("pointermove");
      }
    }
  }

  pointerUp(x, y) {
    if(this.tool.simple) {
      if(this.isDragging) {
        this.tool.end(x, y, this);
        this.isDragging = false;
        this.on("drawEnd", {tool: this.tool});
      }
    } else {
      this.isDragging = false;
      this.on("pointerup", {});
    }
  }


}

let GCore = new Core({width: 20, height: 20});
window.GCore = GCore;
export default GCore;

