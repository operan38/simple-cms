import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import Radium from 'radium';

import Routes from './Routes/Routes';
import Home from './Home/Home';

import './App.css';

class App extends Component {

  /*componentDidMount() {
    fetch('/test')
      .then(res => res.json())
      .then(res => this.setState({ dataView: res, showDataView: true }))
  }*/

  render() {

    /*routes = this.state.routes.map((route, index) => {
      return (
        <div key={index}>
          <h1>{route}</h1>
          <h3>{route}</h3>
        </div>
      )
    })*/

    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/test' component={Routes}/>
        </Switch>
      </div>
    );
  }
}

export default App;
