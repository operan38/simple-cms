import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	fetchRoutes,
	fetchDelRoute,
	fetchRouteById,
} from '../../store/actions/routes';

import { fetchContainers } from '../../store/actions/containers';

import RouteCreator from './RouteCreator';
import RouteItem from './RouteItem';
import RouteEditModal from './RouteEditModal';
import Loader from '../../components/UI/Loader/Loader';
import { Row, Col } from 'react-bootstrap';

class Routes extends Component {
	state = {
		editModal: {
			show: false,
		},
	};

	componentDidMount() {
		//this.props.fetchRoutes();
		this.props.fetchContainers();
	}

	delRouteHandler = (id) => {
		this.props.fetchDelRoute(id);
	};

	editRouteHandler = (id) => {
		this.props.fetchRouteById(id);

		this.setState({
			editModal: {
				show: true,
			},
		});
	};

	cancelModalHandler = () => {
		this.setState({
			editModal: {
				show: false,
			},
		});
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
					<RouteEditModal
						editModal={this.state.editModal}
						cancelModalHandler={this.cancelModalHandler}
					/>
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
		fetchRouteById: (id) => dispatch(fetchRouteById(id)),
		fetchDelRoute: (id) => dispatch(fetchDelRoute(id)),
		fetchContainers: () => dispatch(fetchContainers()),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
