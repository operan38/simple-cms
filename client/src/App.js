import React, { Component, Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import { fetchRoutes } from './store/actions/routes';
import { autoLogin } from './store/actions/auth';

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
				<Route
					key={index}
					path={route.path}
					render={(props) => (
						<Custom {...props} container={route.container_title} />
					)}
				/>
			);
		});
	};

	componentDidMount() {
		this.props.autoLogin();
		this.props.fetchRoutes();
	}

	render() {
		let routes = (
			<Suspense fallback={<Loader />}>
				<Switch>
					<Route exact path='/' component={Home} />

					{!this.props.isAuthenticated ? (
						<Route path='/auth' component={Auth} />
					) : (
						<Redirect from='/auth' to='/' />
					)}

					<Route path='/admin/routes' component={Routes} />

					{this.props.customRoutes.length !== 0
						? this.updateCustomRoutesList()
						: ''}

					<Route path='' component={NotFound} />
				</Switch>
			</Suspense>
		);

		return (
			<div className='app'>
				<Header />
				<Container>
					<Row>
						<Col>{routes}</Col>
					</Row>
				</Container>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		customRoutes: state.routes.customRoutes,
		isAuthenticated: !!state.auth.token,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchRoutes: () => dispatch(fetchRoutes()),
		autoLogin: () => dispatch(autoLogin()),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
