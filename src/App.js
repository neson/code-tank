import React, { Component } from 'react';

import $ from 'jquery';
window.jQuery = $;

require('bootstrap/dist/js/bootstrap.js');
require('bootstrap/dist/css/bootstrap.css');

const SAMPLE_MAP_STRING = `
[
  _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _,
  _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _,
  _, _, _, _, _, _, _, _, _, _, _, _, _, Y, _, _,
  _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _,
  _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _,
  _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _,
  _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _,
  _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _,
  _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _,
  _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _,
  _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _,
  _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _,
  _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _,
  _, _, X, _, _, _, _, _, _, _, _, _, _, _, _, _,
  _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _,
  _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _
]
`;

const MAP_WIDTH = 16;
const MAP_HEIGHT = 16;

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      initialMapStr: `// 初始地圖\n${SAMPLE_MAP_STRING}`,
      map: [],
      p1Code: '// P1 程式碼',
      p2Code: '// P2 程式碼',
    };

    this.run = this.run.bind(this);
    this.handleInitialMapChange = this.handleInitialMapChange.bind(this);
    this.handleP1CodeChange = this.handleP1CodeChange.bind(this);
    this.handleP2CodeChange = this.handleP2CodeChange.bind(this);
  }

  run() {
    this.parseMap();
  }

  parseMap() {
    const _ = 'NULL';
    const W = 'WALL';
    const X = 'P1';
    const Y = 'P2';
    const map = eval(this.state.initialMapStr);
    this.setState({ map })
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">Code Tank</a>
            </div>
            <div id="navbar" className="navbar-collapse collapse">
              <ul className="nav navbar-nav">
                <li><a href="#" onClick={this.run}>Run</a></li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container-fluid" style={{ width: '100%', height: '100%', paddingTop: '52px' }}>
          <table style={{ width: '100%', height: '100%' }}>
            <tbody>
              <tr style={{ width: '100%', height: '50%' }}>
                <td style={{ width: '50%', height: '50%' }}>
                  <h3>遊戲畫面</h3>
                  <pre style={{ fontSize: '10px', lineHeight: '8px' }}>
                    {this.renderACSIIMap()}
                  </pre>
                </td>
                <td style={{ width: '50%', height: '50%' }}>
                  <textarea
                    style={{ boxSizing: 'border-box', width: '100%', height: '100%' }}
                    value={this.state.initialMapStr}
                    onChange={this.handleInitialMapChange}
                  />
                </td>
              </tr>
              <tr style={{ width: '100%', height: '50%' }}>
                <td style={{ width: '50%', height: '50%' }}>
                  <textarea
                    style={{ boxSizing: 'border-box', width: '100%', height: '100%' }}
                    value={this.state.p1Code}
                    onChange={this.handleP1CodeChange}
                  />
                </td>
                <td style={{ width: '50%', height: '50%' }}>
                  <textarea
                    style={{ boxSizing: 'border-box', width: '100%', height: '100%' }}
                    value={this.state.p2Code}
                    onChange={this.handleP2CodeChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  renderACSIIMap() {
    const { map } = this.state;
    const drawedMap = map.map((item) => {
      switch (item) {
        case 'NULL':
          return '   \n   \n   ';
        case 'P1':
          return '┌─┐\n│1│\n└─┘';
        case 'P2':
          return '┌─┐\n│2│\n└─┘';
      }
    });

    const drawedMapRows = drawedMap.reduce((accumulator, item, index) => {
      let rowIndex = parseInt(index/MAP_WIDTH, 10);
      let indexInRow = index % MAP_WIDTH;

      if (typeof accumulator[rowIndex] === 'undefined') accumulator[rowIndex] = [];
      accumulator[rowIndex][indexInRow] = item;

      return accumulator;
    }, []);

    const renderedMap = drawedMapRows.map(row => {
      let lines = row.reduce((accumulator, item, index) => {
        let itemLines = item.split('\n');

        accumulator[0] += itemLines[0];
        accumulator[1] += itemLines[1];
        accumulator[2] += itemLines[2];

        return accumulator;
      }, ['', '', '']);
      return lines.join('\n');
    }).join('\n');

    return renderedMap;
  }

  handleInitialMapChange(e) {
    const value = e.target.value;
    this.setState({ initialMapStr: value });
  }

  handleP1CodeChange(e) {
    const value = e.target.value;
    this.setState({ p1Code: value });
  }

  handleP2CodeChange(e) {
    const value = e.target.value;
    this.setState({ p2Code: value });
  }
}

export default App;
