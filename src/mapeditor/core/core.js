


class Core {
  constructor() {
    this.events = {};
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


}

let GCore = new Core();

export default GCore;

