import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	createControl,
	validateControl,
	validateForm,
} from '../../framework/form';

import { fetchUpdUserFIO } from '../../store/actions/profile';

import ErrorAlertForm from '../../components/UI/Alert/ErrorAlertForm';
import SuccessAlertForm from '../../components/UI/Alert/SuccessAlertForm';
import Input from '../../components/UI/Input/Input';

class ChangeGeneral extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isFormValid: true,
			formControls: {
				surname: createControl(
					{
						tag: 'Input',
						placeholder: 'Фамилия',
						type: 'text',
						parrentDivClassName: 'w-100',
						className: 'mb-2',
					},
					{ required: false }
				),
				firstname: createControl(
					{
						tag: 'Input',
						placeholder: 'Имя',
						type: 'text',
						parrentDivClassName: 'w-100',
						className: 'mb-2',
					},
					{ required: false }
				),
				patronymic: createControl(
					{
						tag: 'Input',
						placeholder: 'Отчество',
						type: 'text',
						parrentDivClassName: 'w-100',
						className: 'mb-2',
					},
					{ required: false }
				),
			},
		};
	}

	componentDidMount() {
		this.loadControlsData();
	}

	loadControlsData() {
		const formControls = { ...this.state.formControls }; // Выносим объект из state

		formControls.surname.value = this.props.surname;
		formControls.firstname.value = this.props.firstname;
		formControls.patronymic.value = this.props.patronymic;

		console.log(formControls);

		this.setState({
			formControls,
		});
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

	updGeneralHandler = () => {
		const token = localStorage.getItem('token');

		const user = {
			id: this.props.id,
			surname: this.state.formControls.surname.value,
			firstname: this.state.formControls.firstname.value,
			patronymic: this.state.formControls.patronymic.value,
			token,
		};

		this.props.fetchUpdUserFIO(user);
	};

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
				<h2 className='mb-2'>Основная информация</h2>
				<ErrorAlertForm error={this.props.error} />
				<SuccessAlertForm success={this.props.success} />
				<div>
					{this.renderInputs()}
					<button
						className='btn btn-success'
						onClick={() => this.updGeneralHandler()}
						disabled={!this.state.isFormValid}
					>
						Сохранить
					</button>
				</div>
			</>
		);
	}
}

function mapStateToProps(state) {
	return {
		id: state.auth.payload ? state.auth.payload.id : '',
		surname: state.auth.payload ? state.auth.payload.surname : '',
		firstname: state.auth.payload ? state.auth.payload.firstname : '',
		patronymic: state.auth.payload ? state.auth.payload.patronymic : '',
		error: state.profile.formGeneral.error,
		success: state.profile.formGeneral.success,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchUpdUserFIO: (user) => dispatch(fetchUpdUserFIO(user)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeGeneral);
