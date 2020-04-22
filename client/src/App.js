import React, {Component, Suspense, lazy} from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router-dom';

import {fetchRoutes} from './store/actions/routes';

import "bootstrap/dist/css/bootstrap.min.css";
import Loader from './components/UI/Loader/Loader';

import Home from './containers/Home/Home';
import NotFound from './containers/NotFound/NotFound';

const Default = lazy(() => import('./containers/Default/Default'));
const Dynamic = lazy(() => import('./containers/Dynamic/Dynamic'));
const Routes = lazy(() => import('./containers/Routes/Routes'));

class App extends Component {

  updateCustomRoutesList = () => {

    const containersList = {
      'Default' : Default,
      'Dynamic' : Dynamic
    }

    return this.props.customRoutes.map((route, index) => {
      return (
          <Route key={index} path={route.path} component={containersList[route.container_title]}/>
      )
    })
  }

  componentDidMount() {
    this.props.fetchRoutes();
  }

  render() {

    let routes = (
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path='/' component={Home}/>

          <Route path='/routes' component={Routes} />}/>

          { this.props.customRoutes.length !== 0 ? this.updateCustomRoutesList() : ''}

          <Route exact path="" component={NotFound}/>
        </Switch>
      </Suspense>
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