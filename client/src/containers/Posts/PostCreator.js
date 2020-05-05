import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col } from 'react-bootstrap';

import { fetchAddPost } from '../../store/actions/posts';
import { createControl } from '../../framework/form';

import Input from '../../components/UI/Input/Input';
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
			},
		};
	}
}

function mapStateToProps(state) {
	return {};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchAdd: (post) => dispatch(fetchAddPost(post)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(PostCreator);
