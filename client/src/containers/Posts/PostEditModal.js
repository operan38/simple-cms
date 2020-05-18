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
			},
		};
	}

	componentDidMount() {
		this.loadControlsData();
	}

	loadControlsData() {
		const formControls = { ...this.state.formControls }; // Выносим объект из state
		let isFormValid = false;

		if (this.props.post) {
			formControls.title.value = this.props.post.title;
			formControls.title.valid = true;
			formControls.subtitle.value = this.props.post.subtitle;
			formControls.subtitle.valid = true;
			isFormValid = true;
		}

		this.setState({
			formControls,
			isFormValid,
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
		const d = new Date();

		const post = {
			id: this.props.post.id,
			title: this.state.formControls.title.value,
			subtitle: this.state.formControls.subtitle.value,
			text: this.props.post.text,
			updated:
				d.toISOString().split('T')[0] + ' ' + d.toTimeString().split(' ')[0],
		};

		this.props.fetchUpdPost(post).then(() => {
			//window.location.reload();
		});

		//this.props.hideEditModal();
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
