import React, { Component } from 'react';

import Input from '../../components/UI/Input/Input';

class ChangePassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isFormValid: false,
		};
	}
	render() {
		return (
			<>
				<h2 className='mb-2'>Изменение пароля</h2>
				<Input className='mb-2' placeholder={'Старый пароль'}></Input>
				<Input className='mb-2' placeholder={'Новый пароль'}></Input>
				<button className='btn btn-success' disabled={!this.state.isFormValid}>
					Сохранить
				</button>
			</>
		);
	}
}

export default ChangePassword;
