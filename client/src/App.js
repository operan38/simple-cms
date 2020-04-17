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

  render() {

    let routesList = [];

    routesList = this.state.routes.map((route, index) => {
      return (
          <Route key={index} path={route.url} component={Default}/>
      )
    })

    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/routes' component={Routes}/>

          {routesList}

          <Route exact path="" component={NotFound} />
        </Switch>
      </div>
    )
  }
}