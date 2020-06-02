import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'react-bootstrap';

import { fetchUpdUserPhoto } from '../../store/actions/profile';

class FileUpload extends Component {
	constructor(props) {
		super(props);
		this.state = {
			profileImg: null,
		};
	}

	onFileChange = (e) => {
		this.setState({ profileImg: e.target.files[0] });
	};

	onSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('profileImg', this.state.profileImg);
		formData.append('id', this.props.id);

		this.props.fetchUpdUserPhoto(formData).then(() => {
			window.location.reload();
		});
	};

	render() {
		return (
			<Row>
				<Col>
					<form onSubmit={this.onSubmit}>
						<div className='form-group mt-2'>
							<input type='file' onChange={this.onFileChange} />
						</div>
						<div className='form-group'>
							<button
								className='btn btn-success'
								type='submit'
								disabled={
									this.state.profileImg !== null && this.state.profileImg
										? false
										: true
								}
							>
								Загрузить
							</button>
						</div>
					</form>
				</Col>
			</Row>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		fetchUpdUserPhoto: (user) => dispatch(fetchUpdUserPhoto(user)),
	};
}

export default connect(null, mapDispatchToProps)(FileUpload);
