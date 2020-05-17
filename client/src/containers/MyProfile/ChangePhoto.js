import React, { Component } from 'react';
import { connect } from 'react-redux';
import notFoundPhoto from '../../assets/profile/notFoundPhoto.png';
import FileUpload from '../../components/FileUpload/FileUpload';

import ErrorAlertForm from '../../components/UI/Alert/ErrorAlertForm';
import SuccessAlertForm from '../../components/UI/Alert/SuccessAlertForm';

class ChangePhoto extends Component {
	render() {
		return (
			<>
				<h2 className='mb-2'>Изменение изображения</h2>
				<ErrorAlertForm error={this.props.error} />
				<SuccessAlertForm success={this.props.success} />
				<div>
					<img
						src={this.props.main_photo ? this.props.main_photo : notFoundPhoto}
						alt=''
					></img>
					<FileUpload id={this.props.id} />
				</div>
			</>
		);
	}
}

function mapStateToProps(state) {
	return {
		main_photo: state.auth.payload ? state.auth.payload.main_photo : '',
		id: state.auth.payload ? state.auth.payload.id : null,
		error: state.profile.formPhoto.error,
		success: state.profile.formPhoto.success,
	};
}

export default connect(mapStateToProps)(ChangePhoto);
