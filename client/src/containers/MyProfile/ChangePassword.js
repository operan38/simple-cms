import React, { Component } from 'react';

import {
	createControl,
	validateControl,
	validateForm,
} from '../../framework/form';

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
				{this.renderInputs()}
				<button className='btn btn-success' disabled={!this.state.isFormValid}>
					Сохранить
				</button>
			</>
		);
	}
}

export default ChangePassword;
