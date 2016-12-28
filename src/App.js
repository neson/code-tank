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
      playerDirections: ['right', 'left'],
      map: [],
      p0Code: '// P0 程式碼',
      p1Code: '// P1 程式碼',
    };

    this.prepare = this.prepare.bind(this);
    this.run = this.run.bind(this);
    this.step = this.step.bind(this);
    this.stop = this.stop.bind(this);
    this.handleInitialMapChange = this.handleInitialMapChange.bind(this);
    this.handleP1CodeChange = this.handleP1CodeChange.bind(this);
    this.handleP2CodeChange = this.handleP2CodeChange.bind(this);
  }

  prepare() {
    this.parseMap();
    this.setState({ currentPlayer: 0 });
  }

  run() {
    this.prepare();
    this.runInterval = setInterval(this.step, 1000);
  }

  step() {
    let { map, playerDirections, currentPlayer } = this.state;
    let currentPlayerCode = (currentPlayer === 0) ? this.state.p0Code : this.state.p1Code;
    let results = executeTurn({ player: currentPlayer, playerCode: currentPlayerCode, map: map, playerDirections: playerDirections });

    let nextPlayer = (currentPlayer === 0) ? 1 : 0;
    this.setState({ map: results.nextMap, playerDirections: results.nextPlayerDirections, currentPlayer: nextPlayer });
  }

  stop() {

  }

  parseMap() {
    const _ = 'NULL';
    const W = 'WALL';
    const X = 'P0';
    const Y = 'P1';
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
                    value={this.state.p0Code}
                    onChange={this.handleP1CodeChange}
                  />
                </td>
                <td style={{ width: '50%', height: '50%' }}>
                  <textarea
                    style={{ boxSizing: 'border-box', width: '100%', height: '100%' }}
                    value={this.state.p1Code}
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
      case 'P0':
        if (this.state.playerDirections[0] === 'top') {
          return '┌╨┐\n│0│\n└─┘';
        } else if (this.state.playerDirections[0] === 'right') {
          return '┌─┐\n│0╞\n└─┘';
        } else if (this.state.playerDirections[0] === 'bottom') {
          return '┌─┐\n│0│\n└╥┘';
        } else if (this.state.playerDirections[0] === 'left') {
          return '┌─┐\n╡0│\n└─┘';
        }
      case 'P1':
        if (this.state.playerDirections[1] === 'top') {
          return '┌╨┐\n│1│\n└─┘';
        } else if (this.state.playerDirections[1] === 'right') {
          return '┌─┐\n│1╞\n└─┘';
        } else if (this.state.playerDirections[1] === 'bottom') {
          return '┌─┐\n│1│\n└╥┘';
        } else if (this.state.playerDirections[1] === 'left') {
          return '┌─┐\n╡1│\n└─┘';
        }
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
    this.setState({ p0Code: value });
  }

  handleP2CodeChange(e) {
    const value = e.target.value;
    this.setState({ p1Code: value });
  }
}

export default App;

class Command {
  constructor() {}
}

class MoveForwardCommand extends Command {
}

class TurnRightCommand extends Command {
}

class TurnLeftCommand extends Command {
}

function executeTurn({ player = null, playerCode = null, map = null, playerDirections = null } = {}) {
  let nextMap = map.slice();
  let nextPlayerDirections = playerDirections.slice();

  const moveForward = () => {
    throw new MoveForwardCommand();
  }

  const turnRight = () => {
    throw new TurnRightCommand();
  }

  const turnLeft = () => {
    throw new TurnLeftCommand();
  }

  try {
    eval(playerCode);
  } catch (e) {
    if (e instanceof Command) {
      if (e instanceof MoveForwardCommand) {
        let playerIndex = getFirstIndexOfItemFromMap(`P${player}`, map);
        let playerDirection = playerDirections[player];
        let nextPlayerIndex = calcMapIndex(playerIndex, playerDirection);
        if (map[nextPlayerIndex] == 'NULL') {
          nextMap[playerIndex] = 'NULL';
          nextMap[nextPlayerIndex] = `P${player}`;
        }
      } else if (e instanceof TurnRightCommand) {
        switch (playerDirections[player]) {
        case 'top':
          nextPlayerDirections[player] = 'right';
          break;
        case 'right':
          nextPlayerDirections[player] = 'bottom';
          break;
        case 'bottom':
          nextPlayerDirections[player] = 'left';
          break;
        case 'left':
          nextPlayerDirections[player] = 'top';
          break;
        }
      } else if (e instanceof TurnLeftCommand) {
        switch (playerDirections[player]) {
        case 'top':
          nextPlayerDirections[player] = 'left';
          break;
        case 'right':
          nextPlayerDirections[player] = 'top';
          break;
        case 'bottom':
          nextPlayerDirections[player] = 'right';
          break;
        case 'left':
          nextPlayerDirections[player] = 'bottom';
          break;
        }
      }
    } else {
      // TODO: handle the real error
    }
  }
  return { nextMap, nextPlayerDirections };
}

function mapIndexToXY(index) {
  return { x: index % MAP_WIDTH, y: parseInt(index/MAP_WIDTH, 10) };
}

function mapXYToIndex(x, y) {
  return y * MAP_WIDTH + x;
}

function getFirstIndexOfItemFromMap(item, map) {
  for (let i = 0; i < map.length; i++) {
    let value = map[i];
    if (map[i] === item) {
      return i;
    }
  }
}

function calcMapIndex(index, direction, distance = 1) {
  let { x, y } = mapIndexToXY(index);

  switch (direction) {
  case 'top':
    y -= distance;
    break;
  case 'right':
    x += distance;
    break;
  case 'bottom':
    y += distance;
    break;
  case 'left':
    x -= distance;
    break;
  }

  if (x < 0) x = 0;
  if (y < 0) y = 0;
  if (x >= MAP_WIDTH) x = MAP_WIDTH - 1;
  if (y >= MAP_HEIGHT) y = MAP_HEIGHT - 1;

  return mapXYToIndex(x, y);
}
