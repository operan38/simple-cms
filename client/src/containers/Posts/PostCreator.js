import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col } from 'react-bootstrap';

import ReactQuill from 'react-quill';

import { fetchAddPost } from '../../store/actions/posts';
import {
	createControl,
	validateControl,
	validateForm,
	clearControlsValue,
} from '../../framework/form';

import Input from '../../components/UI/Input/Input';
import CreateAccordion from '../../components/UI/Accordion/CreateAccordion';

class PostCreator extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isFormValid: false,
			quillValue: '',
			formControls: {
				title: createControl(
					{
						tag: 'Input',
						label: 'Заголовок',
						type: 'text',
						parrentDivClassName: 'w-100',
						className: 'mb-2',
						errorMessage: 'Введите заголовок',
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
						errorMessage: 'Введите подзаголовок',
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

		this.setState({
			// Записываем в state
			formControls,
			isFormValid: validateForm(formControls),
		});
	}

	onChangeQuillHandler = (content, delta, source, editor) => {
		this.setState({
			quillValue: editor.getHTML(),
		});
	};

	addPostHandler = () => {
		const post = {
			title: this.state.formControls.title.value,
			subtitle: this.state.formControls.subtitle.value,
			text: this.state.quillValue,
		};

		this.props.fetchAddPost(post).then(() => {
			window.location.reload();
		});

		//this.clearControlsValue();
	};

	clearControlsValue() {
		const formControls = { ...this.state.formControls }; // Выносим объект из state

		this.setState({
			formControls: clearControlsValue(formControls),
			isFormValid: false,
		});
	}

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
			}

			return data;
		});
	}

	render() {
		return (
			<>
				<CreateAccordion
					title={'Новый пост'}
					children={
						<>
							{this.renderInputs()}
							<Col xs='12' className='mb-2'>
								<ReactQuill
									theme='snow'
									value={this.state.quillValue}
									onChange={this.onChangeQuillHandler}
								/>
							</Col>
						</>
					}
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
