import React, { Component } from 'react';
import { Route , Switch } from 'react-router-dom';
import Script from "./Script";
import Subnet from "./Subnet";
import './index.css';

class App extends Component {
  render() {
    return (
      <Switch>
          <Route exact path="/" component={Script} />
          <Route path="/subnet/:ip/:prefix/:i" component={Subnet} />
      </Switch>
      
    );
  }
}

export default App;