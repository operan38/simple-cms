import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col } from 'react-bootstrap';

import { fetchUpdRoute } from '../../store/actions/routes';
import { hideEditModal } from '../../store/actions/modal';
import {
	createControl,
	validateControl,
	validateForm,
} from '../../framework/form';

import EditModal from '../../components/UI/Modal/EditModal';
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
						errorMessage: 'Введите заголовок',
					},
					{ required: true, defaultValid: true }
				),
				path: createControl(
					{
						tag: 'Input',
						label: 'Путь',
						type: 'text',
						parrentDivClassName: 'w-100',
						className: 'mb-2',
						errorMessage: 'Введите путь',
					},
					{ required: true, defaultValid: true }
				),
				container_id: createControl(
					{
						tag: 'Select',
						label: 'Контейнер',
						parrentDivClassName: 'w-100',
						className: 'mb-2',
						errorMessage: 'Выберите контейнер',
					},
					{ required: true, defaultValid: true }
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
		this.props.hideEditModal();
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
			<EditModal
				show={this.props.editModal.show}
				title={'Редактирование маршрута'}
				handleSubmit={this.updRouteHandler}
				handleClose={this.props.hideEditModal}
				isFormValid={!this.state.isFormValid}
				children={this.renderInputs()}
			/>
		);
	}
}

function mapStateToProps(state) {
	return {
		containersList: state.containers.containersList,
		route: state.routes.route,
		editModal: state.modal.editModal,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchUpdRoute: (route) => dispatch(fetchUpdRoute(route)),
		hideEditModal: () => dispatch(hideEditModal()),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteEditModal);
