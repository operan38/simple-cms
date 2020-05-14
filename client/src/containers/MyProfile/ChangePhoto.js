import React, { Component } from 'react';
import { connect } from 'react-redux';
import notFoundPhoto from '../../assets/profile/notFoundPhoto.png';
import FileUpload from '../../components/FileUpload/FileUpload';

class ChangePhoto extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isFormValid: false,
		};
	}
	render() {
		return (
			<>
				<h2 className='mb-2'>Изменение изображения</h2>
				<img
					src={this.props.main_photo ? this.props.main_photo : notFoundPhoto}
					alt=''
				></img>
				<FileUpload disabled={!this.state.isFormValid} id={this.props.id} />
			</>
		);
	}
}

function mapStateToProps(state) {
	return {
		main_photo: state.auth.payload ? state.auth.payload.main_photo : '',
		id: state.auth.payload ? state.auth.payload.id : null,
	};
}

export default connect(mapStateToProps)(ChangePhoto);
