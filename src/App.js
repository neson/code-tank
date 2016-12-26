import React, { Component } from 'react';

import $ from 'jquery';
window.jQuery = $;

require('bootstrap/dist/js/bootstrap.js');
require('bootstrap/dist/css/bootstrap.css');

class App extends Component {
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
                <li className="active"><a href="#">Player</a></li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container-fluid" style={{ width: '100%', height: '100%', paddingTop: '52px' }}>
          <table style={{ width: '100%', height: '100%' }}>
            <tr style={{ width: '100%', height: '50%' }}>
              <td style={{ width: '50%', height: '50%' }}>
                <h3>遊戲畫面</h3>
                <pre>
                  ...<br/>
                  ...<br/>
                  ...<br/>
                  ...<br/>
                  ...<br/>
                </pre>
              </td>
              <td style={{ width: '50%', height: '50%' }}>
                <textarea style={{ boxSizing: 'border-box', width: '100%', height: '100%' }}>
                  // 初始地圖
                </textarea>
              </td>
            </tr>
            <tr style={{ width: '100%', height: '50%' }}>
              <td style={{ width: '50%', height: '50%' }}>
                <textarea style={{ boxSizing: 'border-box', width: '100%', height: '100%' }}>
                  // P1 程式碼
                </textarea>
              </td>
              <td style={{ width: '50%', height: '50%' }}>
                <textarea style={{ boxSizing: 'border-box', width: '100%', height: '100%' }}>
                  // P2 程式碼
                </textarea>
              </td>
            </tr>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
