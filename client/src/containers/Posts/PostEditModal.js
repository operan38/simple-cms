import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col } from 'react-bootstrap';

import { fetchUpdPost } from '../../store/actions/posts';
import { hideEditModal } from '../../store/actions/modal';
import {
	createControl,
	validateControl,
	validateForm,
} from '../../framework/form';

import EditModal from '../../components/UI/Modal/EditModal';
import Input from '../../components/UI/Input/Input';
import Textarea from '../../components/UI/Textarea/Textarea';

class PostEditModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isFormValid: true,
			formControls: {
				title: createControl(
					{
						tag: 'Input',
						label: 'Заголовок',
						type: 'text',
						parrentDivClassName: 'w-100',
						className: 'mb-2',
					},
					{ required: true, defaultValid: true }
				),
				subtitle: createControl(
					{
						tag: 'Input',
						label: 'Подзаголовок',
						type: 'text',
						parrentDivClassName: 'w-100',
						className: 'mb-2',
					},
					{ required: true, defaultValid: true }
				),
				text: createControl(
					{
						tag: 'Textarea',
						label: 'Текст',
						parrentDivClassName: 'w-100',
						className: 'mb-2',
					},
					{ required: true, defaultValid: true }
				),
				/*main_photo: createControl(
					{
						tag: 'Input',
						type: 'file',
						label: 'Фото',
						parrentDivClassName: 'w-100',
						className: 'mb-2',
					},
					{ required: true, defaultValid: true }
				),*/
			},
		};
	}

	componentDidMount() {
		this.loadControlsData();
	}

	loadControlsData() {
		const formControls = { ...this.state.formControls }; // Выносим объект из state

		formControls.title.value = this.props.post ? this.props.post.title : '';
		formControls.subtitle.value = this.props.post
			? this.props.post.subtitle
			: '';
		formControls.text.value = this.props.post ? this.props.post.text : '';

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

		console.log(control.value);

		this.setState({
			// Записываем в state
			formControls,
			isFormValid: validateForm(formControls),
		});
	}

	updPostHandler = () => {
		const post = {
			id: this.props.post.id,
			title: this.state.formControls.title.value,
			subtitle: this.state.formControls.subtitle.value,
			text: this.state.formControls.text.value,
		};

		this.props.fetchUpdPost(post);
		this.props.hideEditModal();
	};

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
			<EditModal
				show={this.props.editModal.show}
				title={'Редактирование поста'}
				size={'lg'}
				handleSubmit={this.updPostHandler}
				handleClose={this.props.hideEditModal}
				isFormValid={!this.state.isFormValid}
				children={this.renderInputs()}
			/>
		);
	}
}

function mapStateToProps(state) {
	return {
		post: state.posts.post,
		editModal: state.modal.editModal,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchUpdPost: (post) => dispatch(fetchUpdPost(post)),
		hideEditModal: () => dispatch(hideEditModal()),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(PostEditModal);
