import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	fetchRoutes,
	fetchDelRoute,
	fetchRouteById,
	showRouteEditModal,
} from '../../store/actions/routes';

import { fetchContainers } from '../../store/actions/containers';

import RouteCreator from './RouteCreator';
import RouteItem from './RouteItem';
import RouteEditModal from './RouteEditModal';
import Loader from '../../components/UI/Loader/Loader';
import { Row, Col } from 'react-bootstrap';

class Routes extends Component {
	componentDidMount() {
		//this.props.fetchRoutes();
		this.props.fetchContainers();
	}

	delRouteHandler = (id) => {
		this.props.fetchDelRoute(id);
	};

	editRouteHandler = (id) => {
		this.props.showRouteEditModal(id);
	};

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
					{this.props.editModal.show ? <RouteEditModal /> : ''}
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
		editModal: state.routes.editModal,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchRoutes: () => dispatch(fetchRoutes()),
		fetchRouteById: (id) => dispatch(fetchRouteById(id)),
		fetchDelRoute: (id) => dispatch(fetchDelRoute(id)),
		fetchContainers: () => dispatch(fetchContainers()),
		showRouteEditModal: (id) => dispatch(showRouteEditModal(id)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
