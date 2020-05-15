import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	createControl,
	validateControl,
	validateForm,
} from '../../framework/form';

import { fetchUpdUserPassword } from '../../store/actions/profile';

import ErrorAlertForm from '../../components/UI/Alert/ErrorAlertForm';
import SuccessAlertForm from '../../components/UI/Alert/SuccessAlertForm';
import Input from '../../components/UI/Input/Input';

class ChangePassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isFormValid: false,
			formControls: {
				oldPassword: createControl(
					{
						tag: 'Input',
						placeholder: 'Старый пароль',
						type: 'password',
						parrentDivClassName: 'w-100',
						className: 'mb-2',
					},
					{ required: true }
				),
				newPassword: createControl(
					{
						tag: 'Input',
						placeholder: 'Новый пароль',
						type: 'password',
						parrentDivClassName: 'w-100',
						className: 'mb-2',
					},
					{ required: true }
				),
			},
		};
	}

	updPasswordHandler = () => {
		const token = localStorage.getItem('token');

		const user = {
			id: this.props.id,
			newPassword: this.state.formControls.newPassword.value,
			oldPassword: this.state.formControls.oldPassword.value,
			token,
		};

		this.props.fetchUpdUserPassword(user);
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
			let data = '';

			data = (
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
					label={control.label}
					onChange={(e) => this.onChangeHandler(e, controlName)}
				/>
			);

			return data;
		});
	}

	render() {
		return (
			<>
				<h2 className='mb-2'>Изменение пароля</h2>
				<ErrorAlertForm error={this.props.error} />
				<SuccessAlertForm success={this.props.success} />
				{this.renderInputs()}
				<button
					className='btn btn-success'
					onClick={this.updPasswordHandler}
					disabled={!this.state.isFormValid}
				>
					Сохранить
				</button>
			</>
		);
	}
}

function mapStateToProps(state) {
	return {
		id: state.auth.payload ? state.auth.payload.id : '',
		error: state.profile.formPassword.error,
		success: state.profile.formPassword.success,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchUpdUserPassword: (user) => dispatch(fetchUpdUserPassword(user)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
