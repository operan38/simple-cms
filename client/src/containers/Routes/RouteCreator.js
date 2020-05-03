import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col } from 'react-bootstrap';

import { fetchAddRoute } from '../../store/actions/routes';
import {
	createControl,
	validateControl,
	validateForm,
	clearControlsValue,
} from '../../framework/form';

import CreateModal from '../../components/UI/Modal/CreateModal';
import Input from '../../components/UI/Input/Input';
import Select from '../../components/UI/Select/Select';

class RouteCreator extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isFormValid: false,
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

	addRouteHandler = () => {
		const route = {
			title: this.state.formControls.title.value,
			path: this.state.formControls.path.value,
			container_id: this.state.formControls.container_id.value,
		};

		this.props.fetchAddRoute(route);
		this.clearControlsValue();
	};

	clearControlsValue() {
		const formControls = { ...this.state.formControls }; // Выносим объект из state

		this.setState({
			formControls: clearControlsValue(formControls),
			isFormValid: false,
		});
	}

	onChangeHandler(e, controlName) {
		const formControls = { ...this.state.formControls }; // Выносим объект из state
		const control = { ...formControls[controlName] }; // Получаем из объекта control

		control.value = e.target.value;
		control.touched = true;
		control.valid = validateControl(control.value, control.validation);

		formControls[controlName] = control; // Сохраняем переменную в объект

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
					<Col key={controlName + index} xs='12' lg='6'>
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
			<CreateModal
				title={'Новый маршрут'}
				children={this.renderInputs()}
				isFormValid={!this.state.isFormValid}
				handleSubmit={this.addRouteHandler}
			/>
		);
	}
}

function mapStateToProps(state) {
	return {
		containersList: state.containers.containersList,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchAddRoute: (route) => dispatch(fetchAddRoute(route)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteCreator);
