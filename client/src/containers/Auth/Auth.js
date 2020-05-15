import React, { Component } from 'react';
import { connect } from 'react-redux';

import { auth } from '../../store/actions/auth';
import {
	createControl,
	validateControl,
	validateForm,
} from '../../framework/form';

import Input from '../../components/UI/Input/Input';
import ErrorAlertForm from '../../components/UI/Alert/ErrorAlertForm';

class Auth extends Component {
	state = {
		isFormValid: false,
		formErrorMessage: '',
		formControls: {
			login: createControl(
				{
					placeholder: 'Логин',
					type: 'text',
					parrentDivClassName: 'mb-2 mt-2',
					errorMessage: 'Введите логин',
				},
				{ required: true }
			),
			password: createControl(
				{
					placeholder: 'Пароль',
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

		console.log(control);

		this.setState({
			// Записываем в state
			formControls,
			isFormValid: validateForm(formControls),
		});
	}

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

	loginHandler = () => {
		const authData = { ...this.state.formControls };
		this.props.auth(authData);
	};

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
							onClick={this.loginHandler}
							type='button'
						>
							Войти
						</button>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		error: state.auth.error,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		auth: (login, password) => dispatch(auth(login, password)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
