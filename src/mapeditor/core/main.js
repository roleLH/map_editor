import Grid from "./grid"
import Canvas from "./canvas"
import Player from "./player"
import Controller from "./controller";
import events from "./events";
import GCore from "./core";


  class App {

    clientCoordsToGridCoords(x, y) {
      // event.offsetX, event.offsetY
      let cellSize = 20;
      let borderWidth = 1; 
      let cellX = Math.floor(x / (cellSize + borderWidth));
      let cellY = Math.floor(y / (cellSize + borderWidth));
      return [cellX, cellY];
    }

  constructor(el) {
    this.el = el;

    var cellSize = 20;
    this.canvas = new Canvas(this.el, cellSize, 1, {
      destination: 'rgba(0, 245, 100, 1)',
      player: 'rgba(20, 100, 204, 1)',
      obstacle: 'rgba(100, 100, 100, 1)',
      path: 'rgba(50, 50, 50, 0.2)',
      grid: 'rgba(200, 200, 200, 1)',
      background: 'rgba(255, 255, 255, 1)'
    });

    // this.grid = new Grid(Math.floor(this.el.width / (cellSize + 1)), Math.floor(this.el.height / (cellSize + 1)));
    this.grid = GCore.mainGrid;

    // place a player randomly
    this.player = new Player(null, this.grid);
    this.controller = new Controller();
    this.player.setController(this.controller);

    // create random obstacles


    // save a reference to self
    var _this = this;

    // set event handlers
    this.el.addEventListener('click', function (event) {
      event.preventDefault();
      // _this.rightClicked(event);
    });

  
    this.el.addEventListener("mousedown", (e) => {
      let [x, y] = this.clientCoordsToGridCoords(e.offsetX, e.offsetY);
      GCore.pointerDown(x, y);
      console.log("down");
    })
    this.el.addEventListener("mousemove", (e) => {
      let [x, y] = this.clientCoordsToGridCoords(e.offsetX, e.offsetY);
      GCore.pointerMove(x, y);
    })
    this.el.addEventListener("mouseup", (e) => {
      let [x, y] = this.clientCoordsToGridCoords(e.offsetX, e.offsetY);
      GCore.pointerUp(x, y);
      console.log("up");
    })


    this.el.addEventListener('contextmenu', function (event) {
      event.preventDefault();
      
    });

    document.addEventListener('keydown', function (event) {
      let key = event.key;
      switch(key) {
        case 'w' : { _this.controller.up(); } break;
        case 'a' : { _this.controller. left(); } break;
        case 's' : { _this.controller.down(); } break;
        case 'd' : { _this.controller.right(); } break;
      }
      _this.player.dirty = true;
    })

    this.clicked = function (event) {
      var x = event.offsetX, y = event.offsetY, cell = this.canvas.findCell(x, y, this.grid);

      if (cell.obstacle) {
        return;
      }

      this.grid.clicked(cell);

      if (this.destination) {
        this.destination.set({ destination: false });
      }

      cell.set({ destination: true });
      this.destination = cell;
      this.player.moveTo(cell);
    };

    this.rightClicked = function (event) {
      var cell = this.canvas.findCell(event.offsetX, event.offsetY, this.grid);
      this.grid.rightClicked(cell);

      event.preventDefault();
    };

    this.init = function () {
      this.canvas.drawGrid(this.grid);
      this.run();
    };

    let last_tick = Date.now();
    this.run = function () {
      requestAnimationFrame(function () {
        // _this.player.tick();
        if(Date.now() - last_tick < 333) {
          return _this.run();
        }
        last_tick = Date.now();

        _this.canvas.clear();
        _this.canvas.drawGrid(GCore.mainGrid);
        // _this.canvas.draw(_this.grid.getCells());
        GCore.mainClear();
        GCore.renderShapes();
        GCore.renderTo(_this.canvas);
        // _this.canvas.paintRotateCell(angle);
        _this.canvas.drawToEle();
        
        _this.run();
      });
    };
  }
}

// window.onload = (e) => {
//   console.log(document.getElementById("canvas_container"), 12)
//   var app = new App();
//   app.init();

// }
let node = document.getElementById("root");
events.onkeydown(node);

export default App;