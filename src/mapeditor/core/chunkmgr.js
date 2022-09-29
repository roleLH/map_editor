class Chunk {
  constructor(id, name) {
    this.id = id || 0;
    this.name = name;
    this.tilePositions = [];
    this.oriPosition = [0, 0];
  }

  moveto(x, y) {
    this.oriPosition[0] += x;
    this.oriPosition[1] += y;

    this.tilePositions.forEach((pos) => {
      pos[0] += x;
      pos[1] += y;
    })
  }

  /**
   * 逆时针旋转
   */
  rotate(times, reverse) {
    times %= 4;
    if(reverse) {
      times = 4 - times; 
    }
    this.tilePositions.forEach((pos) => {
      move(pos, -this.oriPosition[0], -this.oriPosition[1]);
      rotate(pos, times);
      move(pos, this.oriPosition[0], this.oriPosition[1]);
    })
  }
}


class ChunkMgr {
  constructor() {
    this.chunks = {};
    
    this.id = 0;

    this.names = new Set();
  }

  _nextId() {
    let id = this.id;
    this.id++;
    return id;
  }

  newChunk(name) {
    if(this.names.has(name)) {
      console.log("[chunkmgr] same name", name);
      return ;
    }
    let id = this._nextId();
    let chunk = new Chunk(id, name);
    this.chunks[id] = chunk;
    return chunk;
  }

  delChunk(id) {
    let chunk = this.chunks[id];
    delete this.chunks[id];
    if(chunk) {
      this.names.delete(chunk.name);
    }
  }


}

export default ChunkMgr;