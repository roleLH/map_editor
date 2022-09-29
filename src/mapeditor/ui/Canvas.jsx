

import App from "../core/main";

import { ReactDOM, Component, createRef } from "react";

class Canvas extends Component {
  constructor(props) {
    super(props) 
      this.elref = createRef();

      this.app = null;
  }

  componentDidMount() {
    let canvas = this.elref.current;
    if(!this.app) {
      this.app = new App(canvas);
      this.app.init();
    }
  }

  render() {
    return <canvas ref={this.elref}></canvas>
  }
}

export default Canvas