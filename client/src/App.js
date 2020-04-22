import React, {Component, Suspense, lazy} from 'react';
import {connect} from 'react-redux';
import {Route, Switch, NavLink} from 'react-router-dom';

import {fetchRoutes} from './store/actions/routes';

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import Loader from './components/UI/Loader/Loader';

const Custom = lazy(() => import('./containers/Custom/Custom'));
const Routes = lazy(() => import('./containers/Routes/Routes'));
const Home = lazy(() => import('./containers/Home/Home'));
const NotFound = lazy(() => import('./containers/NotFound/NotFound'));

class App extends Component {

  updateCustomRoutesList = () => {
    return this.props.customRoutes.map((route, index) => {
      return (
          <Route key={index} path={route.path} render={(props) => <Custom {...props} container={route.container_title} />} />
      )
    })
  }

  componentDidMount() {
    this.props.fetchRoutes();
  }

  render() {

    let view = (
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/admin/routes' component={Routes} />}/>

          { this.props.customRoutes.length !== 0 ? this.updateCustomRoutesList() : ''}

          <Route path="" component={NotFound}/>
        </Switch>
      </Suspense>
    );

    return (
      <div className='app'>
          <header style={{boxShadow: '7px 7px 5px rgba(0,0,0,0.1)'}}>
            <div className="container">
              <div className="row">
                <div className="col-4">
                  <div className="d-flex align-items-center">
                    <div>
                      <NavLink to='/'><img src="/logo.svg" alt=""></img></NavLink>
                    </div>
                    <div className="pl-2">
                      <h4>simple-cms</h4>
                    </div>
                  </div>
                </div>
                <div className="col-4">

                </div>
                <div className="col-4">

                </div>
              </div>
            </div>
          </header>
          <main className="container">
            <div className="row">
              <div className="col-12">
                { view }
              </div>
            </div>
          </main>
          <footer className="container">

          </footer>
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