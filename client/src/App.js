import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';

import { fetchRoutes } from './store/actions/routes';
import { autoLogin } from './store/actions/auth';

import './App.scss';

import RoutesList from './RoutesList';
import Header from './containers/Layout/Header/Header';
import Footer from './containers/Layout/Footer/Footer';

class App extends Component {
	componentDidMount() {
		this.props.autoLogin();
		this.props.fetchRoutes();
	}

	render() {
		return (
			<>
				<Header />
				<Container fluid className='document-content section-container'>
					<Row>
						<Col>
							<RoutesList />
						</Col>
					</Row>
				</Container>
				<Footer />
			</>
		);
	}
}

function mapStateToProps(state) {
	return {
		customRoutes: state.routes.customRoutes,
		isAuthenticated: !!state.auth.payload,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchRoutes: () => dispatch(fetchRoutes()),
		autoLogin: () => dispatch(autoLogin()),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
