import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col } from 'react-bootstrap';

import { fetchAddPost } from '../../store/actions/posts';
import {
	createControl,
	validateControl,
	validateForm,
	clearControlsValue,
} from '../../framework/form';

import Input from '../../components/UI/Input/Input';
import Textarea from '../../components/UI/Textarea/Textarea';
import CreateModal from '../../components/UI/Modal/CreateModal';

class PostCreator extends Component {
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
				subtitle: createControl(
					{
						tag: 'Input',
						label: 'Подзаголовок',
						type: 'text',
						parrentDivClassName: 'w-100',
						className: 'mb-2',
					},
					{ required: true }
				),
				text: createControl(
					{
						tag: 'Textarea',
						label: 'Текст',
						parrentDivClassName: 'w-100',
						className: 'mb-2',
					},
					{ required: true }
				),
				main_photo: createControl(
					{
						tag: 'Input',
						type: 'file',
						label: 'Фото',
						parrentDivClassName: 'w-100',
						className: 'mb-2',
					},
					{ required: false }
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

		this.setState({
			// Записываем в state
			formControls,
			isFormValid: validateForm(formControls),
		});
	}

	addPostHandler = () => {};

	renderInputs() {
		return Object.keys(this.state.formControls).map((controlName, index) => {
			const control = this.state.formControls[controlName];
			const tag = control.tag;
			let data = '';

			if (tag === 'Input') {
				data = (
					<Col key={controlName + index} xs='12' lg='12'>
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
			} else if (tag === 'Textarea') {
				data = (
					<Col key={controlName + index} xs='12'>
						<Textarea
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
			}

			return data;
		});
	}

	render() {
		return (
			<>
				<CreateModal
					title={'Новый пост'}
					children={this.renderInputs()}
					createBtn={
						<Col xs='12'>
							<button
								className='btn btn-success'
								type='submit'
								disabled={!this.state.isFormValid}
								onClick={this.addPostHandler}
							>
								Добавить
							</button>
						</Col>
					}
				/>
			</>
		);
	}
}

function mapStateToProps(state) {
	return {};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchAddPost: (post) => dispatch(fetchAddPost(post)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(PostCreator);
