import React, { Component } from 'react';
import { connect } from 'react-redux';

import { register } from '../../store/actions/register';

import {
	createControl,
	validateControl,
	validateForm,
} from '../../framework/form';

import Input from '../../components/UI/Input/Input';
import ErrorAlertForm from '../../components/UI/Alert/ErrorAlertForm';

class Register extends Component {
	state = {
		isFormValid: false,
		formControls: {
			surname: createControl(
				{
					placeholder: 'Фамилия',
					type: 'text',
					parrentDivClassName: 'mb-2 mt-2',
				},
				{ required: false }
			),
			firstname: createControl(
				{
					placeholder: 'Имя',
					type: 'text',
					parrentDivClassName: 'mb-2 mt-2',
				},
				{ required: false }
			),
			patronymic: createControl(
				{
					placeholder: 'Отчество',
					type: 'text',
					parrentDivClassName: 'mb-2 mt-2',
				},
				{ required: false }
			),
			login: createControl(
				{
					placeholder: 'Логин*',
					type: 'text',
					parrentDivClassName: 'mb-2 mt-2',
					errorMessage: 'Введите логин',
				},
				{ required: true }
			),
			password: createControl(
				{
					placeholder: 'Пароль*',
					type: 'password',
					parrentDivClassName: 'mb-2 mt-2',
					errorMessage: 'Введите пароль',
				},
				{ required: true }
			),
		},
	};

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

	registerHandler = () => {
		const registerData = { ...this.state.formControls };
		this.props.register(registerData, this.props.history);
	};

	renderInputs() {
		return Object.keys(this.state.formControls).map((controlName, index) => {
			const control = this.state.formControls[controlName];
			return (
				<Input
					key={controlName + index}
					type={control.type}
					className={control.className}
					parrentDivClassName={control.parrentDivClassName}
					placeholder={control.placeholder}
					value={control.value}
					valid={control.valid}
					touched={control.touched}
					errorMessage={control.errorMessage}
					onChange={(e) => this.onChangeHandler(e, controlName)}
				/>
			);
		});
	}

	render() {
		return (
			<div>
				<div className='d-flex flex-column align-items-center mt-5'>
					<ErrorAlertForm error={this.props.error} />
					<div>
						{this.renderInputs()}
						<button
							className='btn btn-success mt-2 w-100'
							disabled={!this.state.isFormValid}
							onClick={this.registerHandler}
							type='button'
						>
							Зарегистрироваться
						</button>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		error: state.register.error,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		register: (registerData, history) =>
			dispatch(register(registerData, history)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
