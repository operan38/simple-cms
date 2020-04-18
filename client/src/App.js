import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';

import Routes from './components/routes/routes';
import Home from './components/home/home';
import NotFound from './components/notFound/notFound';
import Default from './components/default/default';

import "bootstrap/dist/css/bootstrap.min.css";

export default class App extends Component {

  componentDidMount() {
    fetch('/api/routes', { method: 'POST' })
      .then(res => res.json())
      .then(res => this.setState({ routes: res }))
  }

  constructor(props) {
    super(props);

    this.state = {
      routes: []
    }
  }

  updateRoutesList() {
    return this.state.routes.map((route, index) => {
      return (
          <Route key={index} path={route.url} component={Default} updateRoutesList={this.updateRoutesList}/>
      )
    })
  }

  render() {

    let routesList = [];

    routesList = this.updateRoutesList(routesList);

    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={Home} updateRoutesList={this.updateRoutesList}/>
          <Route path='/routes' component={Routes} updateRoutesList={this.updateRoutesList}/>

          {routesList}

          <Route exact path="" component={NotFound} updateRoutesList={this.updateRoutesList}/>
        </Switch>
      </div>
    )
  }
}