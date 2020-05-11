import httpUploadFile from '../../axios/http-uploadFile';
import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';

class FileUpload extends Component {
	constructor(props) {
		super(props);
		this.state = {
			profileImg: '',
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
		httpUploadFile.post('/users/uploadPhoto', formData).then((res) => {
			console.log(res);
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
							<button className='btn btn-success' type='submit'>
								Загрузить
							</button>
						</div>
					</form>
				</Col>
			</Row>
		);
	}
}

export default FileUpload;
