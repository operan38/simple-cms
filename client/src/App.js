import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';

import { fetchRoutes } from './store/actions/routes';
import { autoLogin } from './store/actions/auth';

import './App.scss';

import RoutesList from './RoutesList';
import Header from './containers/Layout/Header/Header';

class App extends Component {
	componentDidMount() {
		this.props.autoLogin();
		this.props.fetchRoutes();
	}

	render() {
		return (
			<div className='app'>
				<Header />
				<Container>
					<Row>
						<Col>
							<RoutesList />
						</Col>
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
