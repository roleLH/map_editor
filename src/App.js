
import './App.css';
import { Col, Row } from "antd"; 
import "antd/dist/antd.css"

import ChunkPanel from './mapeditor/ui/ChunkPanel';
import Canvas from './mapeditor/ui/Canvas';
import ToolContainer from './mapeditor/ui/ToolContainer';
import PaletteSelector from './mapeditor/ui/Palette';

function App() {
  return (
    <div className="App">
        <Row>
          <Col>
            <ToolContainer></ToolContainer>
          </Col>
        </Row>
        <Row>
          <Col span={18}>
            <Canvas></Canvas>
          </Col>
          <Col span={6}>
            {/* <ChunkPanel></ChunkPanel> */}
          </Col>
        </Row>
    </div>
  );
}

export default App;
