//import httpUploadFile from '../../axios/http-uploadFile';
import React, { Component } from 'react';

class FileUpload extends Component {
	constructor(props) {
		super(props);
		this.state = {
			uploadStatus: false,
			imageURL: '',
		};
	}

	handleUploadImage = (e) => {
		e.preventDefault();

		const data = new FormData();
		data.append('file', this.uploadInput.files[0]);
		data.append('filename', this.fileName.value);

		/*httpUploadFile
			.post('/uploads/add', data)
			.then(function (response) {
				this.setState({
					imageURL: `http://localhost:3000/${body.file}`,
					uploadStatus: true,
				});
			})
			.catch(function (error) {
				console.log(error);
			});*/
	};

	render() {
		return (
			<form onSubmit={this.handleUploadImage}>
				<div className='form-group'>
					<input
						className='form-control'
						ref={(ref) => {
							this.uploadInput = ref;
						}}
						type='file'
					/>
				</div>

				<div className='form-group'>
					<input
						className='form-control'
						ref={(ref) => {
							this.fileName = ref;
						}}
						type='text'
						placeholder='Optional name for the file'
					/>
				</div>

				<button className='btn btn-success mb-2'>Загрузить</button>
			</form>
		);
	}
}

export default FileUpload;
