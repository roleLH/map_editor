import { Popconfirm, Popover, Row, Col, Divider } from "antd";
import { Component } from "react";
import GCore from "../core/core";
import "./tools.css"

const HSLToRGB = (h, s, l) => {
  s /= 100;
  l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [255 * f(0), 255 * f(8), 255 * f(4)];
};

class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      h: 0,
    }
  }

  render() {
    let trs = [];
    for(let i = 0; i <= 5; i++) {
      let eles = [];
      for(let j = 1; j <10; j++) {
        let className = undefined;
        if(i == this.props.i && j == this.props.j) {
          className = "select";
          console.log(i, j);
        }
        let [r, g, b] = HSLToRGB(this.state.h, i*20, j*10);
        eles.push(<td>
          <div id = "color_cube" style={{backgroundColor: `rgb(${r}, ${g}, ${b})`}}
            onClick = {() => {
              this.props.onClick(i, j, this.state.h);
            }}
            className = {className}
          ></div>
        </td>);
      }
      let tr = <tr>
        {eles} 
      </tr>
      trs.push(tr);
    }
    let hs = [];
    for(let i = 0; i <= 10; i++) {
      let [r, g, b] = HSLToRGB(i * 36, 100, 50);
      hs.push(<td id="color_h"  
        style={{backgroundColor: `rgb(${r}, ${g}, ${b})`}}
        onClick={() => {
          this.setState({
            h: i * 36
          })
        }}
      />);
    }

    let [r, g, b] = HSLToRGB(this.state.h, this.props.i * 20, this.props.j * 10);
    return <div>
      <Row align="middle" justify="center">
        <Col>
          {trs}
        </Col>
        <Col>
          <Divider type="vertical"></Divider>
        </Col>
        <Col>
          <div>
            H : {this.state.h}
          </div>
          <div>
            S : {this.props.i * 20}
          </div>
          <div>
            L : {this.props.j * 10}
          </div>
          <hr></hr>
          <div>
            R : {Math.floor(r)}
          </div>
          <div>
            G : {Math.floor(g)}
          </div>
          <div>
            B : {Math.floor(b)}
          </div>
        </Col>
      </Row>
       <hr/>
       <Row justify="center">
       {hs}
       </Row>
    </div>
  }
}

class PaletteSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      h: 0,
      s: 0,
      l: 0,

      colors: [],
    }
  }

  addColor(color) {
    let colors = this.state.colors;
    if(colors.length >= 8) {
      for(let i = 0; i < 8; i++) {
        colors[i - 1] = colors[i];
      }
      colors[colors.length - 1] = color; 
    } else {
      colors.push(color);
    }
    this.setState({
      colors,
    });
  }

  onSelectColor(i, j, h) {
    this.setState({
      h: h,
      s: i * 20,
      l: j * 10
    });
    this.addColor([h, i * 20, j * 10]);
    let [r, g, b] = HSLToRGB(h, i * 20, j * 10);
    GCore.setColor(r, g, b);
  }

  buildColors() {
    let colors = this.state.colors;
    let eles = [];
    colors.forEach((color) => {
      let [r, g, b] = HSLToRGB(color[0], color[1], color[2]);
      eles.push(<Col>
        <div id = "color_cache"
        style={{backgroundColor: `rgb(${r}, ${g}, ${b})`}}
        onClick={() => {
          this.setState({
            h: color[0],
            s: color[1],
            l: color[2]
          })
          GCore.setColor(r, g, b);
        }}
        ></div>
      </Col>)
    });
    while(eles.length < 8) {
      eles.push(<Col>
        <div id = "color_cache"></div>
      </Col>);
    }
    return eles;
  }

  render() {
    let [r, g, b] = HSLToRGB(this.state.h, this.state.s, this.state.l);
    return <div id="palette">
          <Row align="middle" justify="center">
          <Col>
            <Popover trigger="click" content = {
              <Palette i = {this.state.s / 20}
                      j = {this.state.l / 10}
                onClick = {(i, j, h) => {
                  this.onSelectColor(i, j, h);
                }}></Palette>
              }>
                <div id = "color_selector"
                  style={{backgroundColor: `rgb(${r}, ${g}, ${b})`}}
                ></div>
            </Popover>
          </Col>
          <Divider type="vertical"/>
          {this.buildColors()}
        </Row>
      </div>
  }
}


export default PaletteSelector;