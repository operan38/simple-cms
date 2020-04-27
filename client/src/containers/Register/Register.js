import React, { Component } from 'react';
import { connect } from 'react-redux';

import { register } from '../../store/actions/register';

import {
	createControl,
	validateControl,
	validateForm,
} from '../../framework/form';

import Input from '../../components/UI/Input/Input';

class Register extends Component {
	state = {
		isFormValid: false,
		formControls: {
			surname: createControl(
				{
					placeholder: 'Фамилия',
					type: 'text',
					className: 'mb-2',
				},
				{ required: true }
			),
			firstname: createControl(
				{
					placeholder: 'Имя',
					type: 'text',
					className: 'mb-2',
				},
				{ required: true }
			),
			patronymic: createControl(
				{
					placeholder: 'Отчество',
					type: 'text',
					className: 'mb-2',
				},
				{ required: true }
			),
			login: createControl(
				{
					placeholder: 'Логин*',
					type: 'text',
					className: 'mb-2',
				},
				{ required: true }
			),
			password: createControl(
				{
					placeholder: 'Пароль*',
					type: 'password',
					className: 'mb-2',
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
		this.props.register(registerData);
		this.props.history.push('/auth');
	};

	renderInputs() {
		return Object.keys(this.state.formControls).map((controlName, index) => {
			const control = this.state.formControls[controlName];
			return (
				<Input
					key={controlName + index}
					type={control.type}
					className={control.className}
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

function mapDispatchToProps(dispatch) {
	return {
		register: (registerData) => dispatch(register(registerData)),
	};
}

export default connect(null, mapDispatchToProps)(Register);
