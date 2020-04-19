import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';

import Routes from './components/routes/routes';
import Home from './components/home/home';
import NotFound from './components/notFound/notFound';
import Default from './components/default/default';

import "bootstrap/dist/css/bootstrap.min.css";

export default class App extends Component {

  componentDidMount() {
    this.getData();
  }

  constructor(props) {
    super(props);

    this.state = {
      routes: []
    }
  }

  getData = () => {
    fetch('/api/routes', { method: 'POST' })
      .then(res => res.json())
      .then(res => this.setState({ routes: res }))
  }

  updateRoutesList() {
    return this.state.routes.map((route, index) => {
      return (
          <Route key={index} path={route.url} component={Default}/>
      )
    })
  }

  render() {

    let routesList = [];

    routesList = this.updateRoutesList(routesList);

    return (
      <div className="App">
        <header>
          <div className="d-flex align-items-center">
            <img src="logo.svg" alt=""></img>
            <h4>simple cms</h4>
          </div>
          
        </header>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/routes' render={(props) => <Routes {...props} routes={this.state.routes} getData={this.getData} />}/>

          {routesList}

          <Route exact path="" component={NotFound}/>
        </Switch>
      </div>
    )
  }
}