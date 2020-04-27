import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchRoutes, fetchDelRoute } from '../../store/actions/routes';

import RouteCreator from './RouteCreator';
import RouteItem from './RouteItem';
import Loader from '../../components/UI/Loader/Loader';
import { Row, Col } from 'react-bootstrap';

class Routes extends Component {
	state = {
		eidtMode: false,
	};

	componentDidMount() {
		this.props.fetchRoutes();
	}

	delRouteHandler = (id) => {
		this.props.fetchDelRoute(id);
	};

	editRouteHandler() {
		this.setState({
			editMode: true,
		});
	}

	editCancelRouteHandler() {
		this.setState({
			editMode: false,
		});
	}

	editApplyRouteHandler() {
		this.setState({
			editMode: false,
		});
	}

	updateRouteHandler = () => {};

	renderRoutes() {
		return this.props.customRoutes.map((route, index) => {
			return (
				<RouteItem
					key={index}
					route={route}
					editRouteHandler={this.editRouteHandler}
					delRouteHandler={this.delRouteHandler}
				/>
			);
		});
	}

	render() {
		return (
			<Row>
				<Col>
					<h1>Список маршрутов</h1>
					<RouteCreator />
					{this.props.loading && this.props.customRoutes.length === 0 ? (
						<Loader />
					) : (
						this.renderRoutes()
					)}
					{!this.props.loading && this.props.customRoutes.length === 0 ? (
						<div className='w-100 text-center'>Список пуст</div>
					) : (
						''
					)}
				</Col>
			</Row>
		);
	}
}

function mapStateToProps(state) {
	return {
		customRoutes: state.routes.customRoutes,
		loading: state.routes.loading,
		error: state.routes.error,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchRoutes: () => dispatch(fetchRoutes()),
		fetchDelRoute: (id) => dispatch(fetchDelRoute(id)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
