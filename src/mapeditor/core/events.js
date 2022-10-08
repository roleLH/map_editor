import GCore from "./core";

let events = {};

let ctrl_or_meta_key = "ctrlKey";
if(navigator.platform.search("Mac") != -1) {
  ctrl_or_meta_key = "metaKey";
}


let onkeydown = (el) => {

  /**
   * 
   * @param {KeyboardEvent} e 
   */
  let _cb = (e) => {
    let key = e.key;
    console.log(key);
    let listener = events[key];
    if(listener && e[ctrl_or_meta_key]) {
      listener();
    }
  }
  document.addEventListener("keydown", _cb);
  return () => {
    document.removeEventListener("keydown", _cb);
  }
}

function listenForCtrlKey(key, cb) {
  events[key] = cb;
}
function removeListener(key) {
  delete events[key];
}


listenForCtrlKey('c', () => {
  GCore.setToolBy("copy");
})
listenForCtrlKey('v', () => {
  GCore.setToolBy("paste");
})
listenForCtrlKey('x', () => {
  GCore.setToolBy("cut");
})
listenForCtrlKey('z', () => {
  GCore.actionStk.undo();
})
listenForCtrlKey('Z', () => {
  GCore.actionStk.redo();
})


export default {
  listenForCtrlKey, 
  removeListener, 
  onkeydown
}