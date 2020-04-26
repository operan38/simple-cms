import React, { Component } from 'react';
import { connect } from 'react-redux';

import { auth } from '../../store/actions/auth';
import {
	createControl,
	validateControl,
	validateForm,
} from '../../framework/form';

import Input from '../../components/UI/Input/Input';

class Auth extends Component {
	state = {
		isFormValid: false,
		formControls: {
			login: createControl(
				{
					placeholder: 'Логин',
					type: 'text',
					className: 'mb-2',
				},
				{ required: true }
			),
			password: createControl(
				{
					placeholder: 'Пароль',
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

	loginHandler = () => {
		this.props.auth(
			this.state.formControls.login.value,
			this.state.formControls.password.value
		);
	};

	render() {
		return (
			<div>
				<div className='d-flex flex-column align-items-center mt-5'>
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

function mapDispatchToProps(dispatch) {
	return {
		auth: (login, password) => dispatch(auth(login, password)),
	};
}

export default connect(null, mapDispatchToProps)(Auth);
