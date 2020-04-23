import React, {Component, Suspense, lazy} from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router-dom';

import { Container, Row, Col } from 'react-bootstrap';

import {fetchRoutes} from './store/actions/routes';

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

import Loader from './components/UI/Loader/Loader';
import Header from './containers/Layout/Header/Header';

const Custom = lazy(() => import('./containers/Custom/Custom'));
const Routes = lazy(() => import('./containers/Routes/Routes'));
const Home = lazy(() => import('./containers/Home/Home'));
const Auth = lazy(() => import('./containers/Auth/Auth'));
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
          <Route path='/auth' component={Auth} />
          <Route path='/admin/routes' component={Routes} />

          { this.props.customRoutes.length !== 0 ? this.updateCustomRoutesList() : ''}

          <Route path="" component={NotFound}/>
        </Switch>
      </Suspense>
    );

    return (
      <div className='app'>
        <Header />
        <Container>
          <Row>
            <Col>
              { view }
            </Col>
          </Row>
        </Container>
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