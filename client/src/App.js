import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router-dom';

import {fetchRoutes} from './store/actions/routes';

import Home from './containers/Home/Home';
import NotFound from './containers/NotFound/NotFound';
import Routes from './containers/Routes/Routes';
import Default from './containers/Default/Default';

import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {

  /*componentDidMount() {
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
  }*/

  updateCustomRoutesList = () => {
    return this.props.customRoutes.map((route, index) => {
      return (
          <Route key={index} path={route.path} component={Default}/>
      )
    })
  }

  componentDidMount() {
    this.props.fetchRoutes();
  }

  render() {

    let routes = (
      <Switch>
        <Route exact path='/' component={Home}/>

        <Route path='/routes' component={Routes} />}/>

        { this.props.customRoutes.length !== 0 ? this.updateCustomRoutesList() : ''}

        <Route exact path="" component={NotFound}/>
      </Switch>
    );

    return (
      <div className='app'>
          { routes }
      </div>
    )

  }
}

function mapStateToProps(state) {
  return {
    customRoutes: state.routes.customRoutes,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchRoutes: () => dispatch(fetchRoutes())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)