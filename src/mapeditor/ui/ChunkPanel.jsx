

import { ReactDOM, Component } from "react";
import { Button, Input, Col, Row, Card, Popover, Switch, Divider, InputNumber } from "antd";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  SettingOutlined
} from '@ant-design/icons';

import GCore from "../core/core";

class ReName  extends Component {
  constructor(props) {
    super(props);
    this.input = this.props.defaultValue;
  }

  render() {
    return (<Row>
      <Col>
        <Input defaultValue={this.props.defaultValue} 
          onChange = {(e) => {
            this.input = e.target.value;
          }}
        ></Input>
      </Col>
      <Col>
          <Button type={"link"}
            onClick = {() => {
              this.props.click(this.input);
            }}
          >ok</Button>
      </Col>
    </Row>)
  }
}

class Title extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Row justify="center" align="middle">
        <Col>
          {`${this.props.name}`}
        </Col>
        <Col>
          <Button 
            type = "text"
            onClick={ () => {
              this.props.click();
            }}
          ></Button>
        </Col>
      </Row>
    )
  }
}

class Editor extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Popover trigger="click"
      content = {<div id="chunkedit">
        <Button block size={"small"}>重命名</Button><br/>
        <Button block size={"small"}>删除</Button>
      </div>}
    >
      <Button id="chunktitleeye"
          icon = {<SettingOutlined />}></Button>
    </Popover>
  }
}



class ChunkTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editable : false,
      cansee : true,
    }
  }

  renderEl() {
    if(this.state.editable) {
      return <ReName defaultValue = {this.props.title}
        click = {(name) => {

        }}
      ></ReName>
    }
    return <Title name = {this.props.title}
      click = {() => {

      }}
    ></Title>
  }

  render() {

    let btnicon = this.state.cansee ? <EyeOutlined/> : <EyeInvisibleOutlined />

    return <div id="chunktitle" className={this.props.class}>
        <Row>
          <Col>{this.renderEl()}</Col>
          <Col>
            {/* <Button 
            type="link"
            onClick = {() => {
              this.props.ondelete();
            }}>
              delete
            </Button> */}

            <Button id="chunktitleeye"
              icon = {btnicon}
              onClick = {() => {
                this.setState({
                  cansee : !this.state.cansee
                })
              }}
            ></Button>
            <Editor/>
          </Col>
        </Row>
      </div>;
  }
}

let NULL_INSTRUCTION = {
  value: 100,
  name: "<->"
}
class InstructionList extends Component {
  constructor(props) {
    super(props);

  }

  _buildData() {
    let data = this.props.instructions || [];
    let onselect = this.props.onselect;
    console.log(this.props.cursor);

    let eles = [];
    for(let i = 0; i < data.length; i++) {
      let info = data[i];
      let el = <div id = "instruction" className= {this.props.cursor == i ? "select" : undefined}
        onClick={() => {
          onselect(i);
        }}>
        {info.name}
      </div>

      eles.push(el);
    }


    return eles;
  }

  render() {
    return <div id="instructionlist">
      <div id="list">
        {this._buildData()}
      </div>
      <div id="edit">
        <Button style={{width: '50%'}}
          onClick = {() => {
            this.props.ondelete();
          }}
        >删除</Button>
        <Button style={{width: '50%'}}
          onClick = { () => {
            this.props.onclear();
          }}
        >全部删除</Button>
      </div>
    </div>
  }
}


const BTN_INFO = [
  {
    value: 0,
    name: "向上移动",
    idx: 0,
  }, {
    value: 1,
    name: "向下移动",
    idx: 1,
  }, {
    value: 2,
    name: "向左移动",
    idx: 2,
  },{
    value: 3,
    name: "向右移动",
    idx: 3,
  },{
    value: 4,
    name: "向左旋转90度",
    idx: 4,
  },{
    value: 5,
    name: "向左旋转180度",
    idx: 5,
  },{
    value: 6,
    name: "向左旋转270度",
    idx: 6,
  },
]

class InstructionPanel extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    let btns = [];
    BTN_INFO.forEach((info) => {
      let btn = <Button block
        onClick={
          () => this.props.addInstruction(info)
        }
      >{info.name}</Button>
      btns.push(btn);
      
    })

    return <div id="instructionpanel">
      {btns}
    </div>
  }
}

class OriginPoint extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <div>
      <Row align="middle">
        <Col>原点(旋转中心)</Col>
        <Col>
          <div id="originedit">
            X: <InputNumber min={0} bordered={false} defaultValue={0} size= "small"></InputNumber>
            Y: <InputNumber min={0} bordered={false} defaultValue={0} size= "small"></InputNumber>
          </div>
        </Col>
      </Row>
    </div>
  }
}


class ChunkInfo extends Component {
  constructor(props) {
    super(props);

    this.always = false;

    this.state = {
      cursor : 0,
      instructions : [NULL_INSTRUCTION],
    }
  }

  setAlways(flag) {
    this.always = flag;
  }

  addInstruction(info) {
    let ins = this.state.instructions;
    ins.splice(this.state.cursor, 0, info);
    this.setState({
      instructions: ins,
      cursor: this.state.cursor+1,
    })
  }

  clearInstructions() {
    this.setState({
      instructions: [NULL_INSTRUCTION],
      cursor: 0
    })
  }

  deleteInstruction() {
    let ins = this.state.instructions;
    if(this.state.cursor >= this.state.instructions.length - 1) { return; }
    ins.splice(this.state.cursor, 1);
    this.setState({
      instructions: ins,
      
    })
  }


  render() {
    return <div id = "chunkinfo">
      <Row>
        <Col>
        <Switch checkedChildren="一直" unCheckedChildren="反向" defaultChecked />
        </Col>
        <Col>
          执行
        </Col>
      </Row>
      {/* <Divider /> */}
      <hr/>
      {<OriginPoint></OriginPoint>}
      <hr/>
      <Row>
        <Col span={12}>
          <InstructionList 
          instructions = { this.state.instructions }
          cursor = {this.state.cursor}
          ondelete = {() => {this.deleteInstruction()}}
          onclear = {() => {this.clearInstructions()}}
          onselect = { (idx) => {
            if(idx == this.state.cursor) {
              return;
            }
            this.setState({
              cursor: idx,
            })
          }}/>
        </Col>
        <Col span={12}>
          <InstructionPanel addInstruction = { (info) => {
            this.addInstruction(info);
          }}/>
        </Col>
      </Row>
    </div>
  }
}



let test = [
  {
    idx : 0,
    id  : 0,
    name : "test"
  }, {
    idx : 1,
    id  : 1,
    name : "test"
  }, {
    idx : 2,
    id  : 2,
    name : "test"
  }, 
]

/**
 * chunk {
 *  idx :
 *  id :
 *  name : ""
 *  positions: []
 * }
 */
class ChunkPanel extends Component {
  constructor(props) {
    super(props);

    
    let chunks = {}
    test.forEach((chunk) =>{
      chunks[chunk.idx] = chunk;
    })
    this.state = {
      chunks,
    }

  }



  changeName(idx, name) {
    let chunk = this.state.chunks[idx];
    if(chunk) {
      chunk.name = name;
    }
  }

  deleteChunk(idx) {
    let chunks = this.state.chunks;
    if(chunks[idx]) {
      delete chunks[idx];
      this.setState({
        chunks,
      });
    }
  }




  buildChunks() {
    let idx = 0;
    let eles = [];
    let chunks = this.state.chunks;
    Object.values(chunks).forEach((chunk) => {
      let ele = <ChunkTitle key = {chunk.id} 
        title = {chunk.name}
        class = { idx++ %2 == 0 ? "single" : "double" }
      >

      </ChunkTitle>

      eles.push(ele);
    })
    return eles;
  }



  render() {
    return <div>
       <div id = "chunkpanel">
        {this.buildChunks()}
      </div>
      <ChunkInfo/>
    </div>
    
  }
}



export default ChunkPanel;