import React, { Component } from 'react';
import './app.css';
import EthernetSettings from './ethernetSettings';
import WirelessSettings from './wirelessSettings';

class App extends Component {
  render() {
    return (
      <div className="App">
          <div className="settings">
              <EthernetSettings />
              <WirelessSettings />
          </div>
          <div className="save_cancel">
            <input type="submit" className="button save" value="Save"/>
            <input type="button" className="button cancel" value="Cancel"/>
          </div>
      </div>
    );
  }
}

export default App;
