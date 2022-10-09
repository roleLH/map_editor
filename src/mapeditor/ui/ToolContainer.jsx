
import { ReactDOM, Component, createRef } from "react";
import { Button, Input, Col, Row, Card, Popover, Switch, Divider, InputNumber } from "antd";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  SettingOutlined,
  DragOutlined
} from '@ant-design/icons';
import "./tools.css"
import PaletteSelector from "./Palette";
import GCore from "../core/core";

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
      <div onClick={() => {
        if(this.name == "Cell" || this.name == "Rect") {
          GCore.setToolBy(this.name);
        }
      }}>{this.name}</div>
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

class OvalTool extends Tool {
  constructor(props) {
    super(props);
    this.name = "Oval";
  }
}

class UndoRedoTool extends Tool {
  constructor(props) {
    super(props);
  }

  render() {
    return <Row>
        <Col span={12}><div id = "tool"
          onClick={() => {
            GCore.actionStk.undo();
          }}
        >Undo</div></Col>
        <Col span={12}><div id = "tool"
          onClick={() => {
            GCore.actionStk.redo();
          }}
        >Redo</div></Col>
      </Row>
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

    this.init = true;
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
        <Row>
          <Col>
            <div id="toolcontainer_title" >Tools</div>
          </Col>
          <Col>
            <Button icon = {<DragOutlined />}></Button>
          </Col>
        </Row>
      
      <hr/>
      <div id="toollist">
        <PaletteSelector></PaletteSelector>
        <CellTool/>
        <LineTool/>
        <RectTool/>
        <OvalTool/>
        <UndoRedoTool/>
      </div>
    </div>
  }
}


export default ToolContainer