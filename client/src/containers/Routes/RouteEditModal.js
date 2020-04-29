import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Modal, Button } from 'react-bootstrap';

import { fetchUpdRoute, hideRouteEditModal } from '../../store/actions/routes';
import { fetchContainers } from '../../store/actions/containers';
import {
	createControl,
	validateControl,
	validateForm,
} from '../../framework/form';

import Input from '../../components/UI/Input/Input';
import Select from '../../components/UI/Select/Select';

class RouteEditModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isFormValid: true,
			formControls: {
				title: createControl(
					{
						tag: 'Input',
						label: 'Заголовок',
						type: 'text',
						parrentDivClassName: 'w-100',
						className: 'mb-2',
					},
					{ required: true }
				),
				path: createControl(
					{
						tag: 'Input',
						label: 'Путь',
						type: 'text',
						parrentDivClassName: 'w-100',
						className: 'mb-2',
					},
					{ required: true }
				),
				container_id: createControl(
					{
						tag: 'Select',
						label: 'Контейнер',
						parrentDivClassName: 'w-100',
						className: 'mb-2',
					},
					{ required: true }
				),
			},
		};
	}

	componentDidMount() {
		this.loadControlsData();
	}

	loadControlsData() {
		const formControls = { ...this.state.formControls }; // Выносим объект из state

		formControls.title.value = this.props.route ? this.props.route.title : '';
		formControls.path.value = this.props.route ? this.props.route.path : '';
		formControls.container_id.value = this.props.route
			? this.props.route.container_id
			: '';

		this.setState({
			formControls,
		});
	}

	updRouteHandler = () => {
		const route = {
			id: this.props.route.id,
			title: this.state.formControls.title.value,
			path: this.state.formControls.path.value,
			container_id: this.state.formControls.container_id.value,
		};

		this.props.fetchUpdRoute(route);
		this.props.hideRouteEditModal();
	};

	onChangeHandler(e, controlName) {
		const formControls = { ...this.state.formControls }; // Выносим объект из state
		const control = { ...formControls[controlName] }; // Получаем из объекта control

		control.value = e.target.value;
		control.touched = true;
		control.valid = validateControl(control.value, control.validation);

		formControls[controlName] = control; // Сохраняем переменную в объект

		console.log(control.value);

		this.setState({
			// Записываем в state
			formControls,
			isFormValid: validateForm(formControls),
		});
	}

	renderInputs() {
		return Object.keys(this.state.formControls).map((controlName, index) => {
			const control = this.state.formControls[controlName];
			const tag = control.tag;
			let data = '';

			if (tag === 'Input') {
				data = (
					<Col key={controlName + index} xs='12'>
						<Input
							type={control.type}
							className={control.className}
							parrentDivClassName={control.parrentDivClassName}
							placeholder={control.placeholder}
							value={control.value}
							valid={control.valid}
							touched={control.touched}
							errorMessage={control.errorMessage}
							label={control.label}
							onChange={(e) => this.onChangeHandler(e, controlName)}
						/>
					</Col>
				);
			} else if (tag === 'Select') {
				data = (
					<Col key={controlName + index} xs='12'>
						<Select
							className='mb-2'
							parrentDivClassName={control.parrentDivClassName}
							valid={control.valid}
							value={control.value}
							touched={control.touched}
							errorMessage={control.errorMessage}
							keyOptions={{ value: 'id', text: 'title' }}
							options={this.props.containersList}
							label={control.label}
							onChange={(e) => this.onChangeHandler(e, controlName)}
						/>
					</Col>
				);
			}

			return data;
		});
	}

	render() {
		return (
			<Modal
				show={this.props.editModal.show}
				onHide={() => this.props.hideRouteEditModal()}
			>
				<Modal.Header closeButton>
					<Modal.Title>Редактировать маршрут</Modal.Title>
				</Modal.Header>
				<Modal.Body>{this.renderInputs()}</Modal.Body>
				<Modal.Footer>
					<Button
						variant='secondary'
						onClick={() => this.props.hideRouteEditModal()}
					>
						Закрыть
					</Button>
					<Button
						variant='success'
						disabled={!this.state.isFormValid}
						onClick={() => this.updRouteHandler()}
					>
						Сохранить
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}

function mapStateToProps(state) {
	return {
		containersList: state.containers.containersList,
		route: state.routes.route,
		editModal: state.routes.editModal,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchUpdRoute: (route) => dispatch(fetchUpdRoute(route)),
		fetchContainers: () => dispatch(fetchContainers()),
		hideRouteEditModal: () => dispatch(hideRouteEditModal()),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteEditModal);
