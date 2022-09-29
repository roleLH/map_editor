
import { ReactDOM, Component, createRef } from "react";
import { Button, Input, Col, Row, Card, Popover, Switch, Divider, InputNumber } from "antd";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  SettingOutlined
} from '@ant-design/icons';
import "./tools.css"


function tool(c) {
  return <div id = "tool">
    {c}
  </div>
}


class Tool extends Component {
  constructor(props) {
    super(props);
    this.name = null;
  }

  render() {
    return tool(
      <div>{this.name}</div>
    );
  }
}

class CellTool extends Tool {
  constructor(props) {
    super(props);
    this.name = "Cell"
  }
}

class LineTool extends Tool {
  constructor(props) {
    super(props);
    this.name = "Line"
  }
}

class RectTool extends Tool {
  constructor(props) {
    super(props);
    this.name = "Rect";
  }
}

class ToolContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pos: [0, 0],
      canmove: false,
    }
    
    this.pos = [0, 0];
    this.tmpPos = [0, 0];
    this.ref = createRef();

    this.init = false;
  }

  componentDidMount() {
    
    if(this.init) {return; }
    this.init = true;
    console.log("tttttttttttttttttttt")

    let ele = this.ref.current;
    let fn = (e) => {
      let x = e.clientX;
      let y = e.clientY;
      console.log(x, y);
      this.pos[0] = x - this.tmpPos[0];
      this.pos[1] = y - this.tmpPos[1];

      let c = ele.parentNode;
      c.style.top = `${this.pos[1]}px`;
      c.style.left = `${this.pos[0]}px`;

    }
    ele.addEventListener("mousedown", (e) => {
      this.tmpPos[0] = e.clientX - this.pos[0];
      this.tmpPos[1] = e.clientY - this.pos[1];
      console.log(this.tmpPos);

      ele.addEventListener("mousemove", fn);
    });
    ele.addEventListener("mouseup", (e) => {
      ele.removeEventListener("mousemove", fn);
    });
    ele.addEventListener("mouseleave", (e) => {
      ele.removeEventListener("mousemove", fn);
    })
  }

  render() {
    return <div id = "toolcontainer" style={
      { position: "relative"}}>
      <div id="toolcontainer_title" ref={this.ref}>Tools</div>
      <hr/>
      <div id="toollist">
        <CellTool/>
        <LineTool/>
        <RectTool/>
      </div>
    </div>
  }
}


export default ToolContainer