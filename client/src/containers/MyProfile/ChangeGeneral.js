import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	createControl,
	validateControl,
	validateForm,
	clearControlsValue,
} from '../../framework/form';
import Input from '../../components/UI/Input/Input';

class ChangeGeneral extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isFormValid: false,
			formControls: {
				surname: createControl(
					{
						tag: 'Input',
						placeholder: 'Фамилия',
						type: 'text',
						parrentDivClassName: 'w-100',
						className: 'mb-2',
					},
					{ required: true, defaultValid: true }
				),
				firstname: createControl(
					{
						tag: 'Input',
						placeholder: 'Имя',
						type: 'text',
						parrentDivClassName: 'w-100',
						className: 'mb-2',
					},
					{ required: true, defaultValid: true }
				),
				patronymic: createControl(
					{
						tag: 'Input',
						placeholder: 'Отчество',
						type: 'text',
						parrentDivClassName: 'w-100',
						className: 'mb-2',
					},
					{ required: true, defaultValid: true }
				),
			},
		};
	}

	componentDidMount() {}

	updGeneralHandler = () => {};

	render() {
		return (
			<>
				<h2 className='mb-2'>Основная информация</h2>
				<button
					className='btn btn-success'
					onClick={() => this.updGeneralHandler()}
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
		id: state.auth.payload ? state.auth.payload.id : null,
	};
}

export default connect(mapStateToProps)(ChangeGeneral);
