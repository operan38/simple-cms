import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	fetchRoutes,
	fetchDelRoute,
	showRouteEditModal,
} from '../../store/actions/routes';

import { hideDelModal, showDelModal } from '../../store/actions/modal';

import { fetchContainers } from '../../store/actions/containers';

import RouteCreator from './RouteCreator';
import RouteItem from './RouteItem';
import RouteEditModal from './RouteEditModal';

import Loader from '../../components/UI/Loader/Loader';
import DeleteModal from '../../components/UI/Modal/DeleteModal';
import { Row, Col } from 'react-bootstrap';

class Routes extends Component {
	componentDidMount() {
		//this.props.fetchRoutes();
		this.props.fetchContainers();
	}

	submitDelRouteHandler = (id) => {
		// Подтвердить удаление и закрыть окно
		this.props.fetchDelRoute(id);
		this.props.hideDelModal();
	};

	cancelDelRouteHandler = () => {
		// Закрыть окно удаления (отменить)
		this.props.hideDelModal();
	};

	delRouteHandler = (id) => {
		this.props.showDelModal(id);
	};

	editRouteHandler = (id) => {
		// Открыть окно редактирования
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
					<DeleteModal
						title={'Удаление маршрута'}
						show={this.props.delModal.show}
						id={this.props.delModal.id}
						handleSubmit={this.submitDelRouteHandler}
						handleClose={this.cancelDelRouteHandler}
						children={
							<div>Вы уверены что хотите удалить выбранный маршрут?</div>
						}
					/>
					<RouteCreator />
					{this.props.editModal.show ? <RouteEditModal /> : ''}
					{this.props.editModal.loading ? <Loader /> : ''}
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
		editModal: state.modal.editModal,
		delModal: state.modal.delModal,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchRoutes: () => dispatch(fetchRoutes()),
		fetchDelRoute: (id) => dispatch(fetchDelRoute(id)),
		fetchContainers: () => dispatch(fetchContainers()),
		showRouteEditModal: (id) => dispatch(showRouteEditModal(id)),
		showDelModal: (id) => dispatch(showDelModal(id)),
		hideDelModal: () => dispatch(hideDelModal()),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
