import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import Input from '../../components/UI/Input/Input';
import notFoundPhoto from '../../assets/notFoundPhoto.jpg';

import FileUpload from '../../components/FileUpload/FileUpload';

class Profile extends Component {
	render() {
		return (
			<>
				<Row className='mt-2'>
					<Col lg={6} xs={12}>
						<h2>Изменение изображения</h2>
						<img src={this.props.main_photo} alt=''></img>
						{console.log(this.props.id)}
						<FileUpload id={this.props.id} />
					</Col>

					<Col lg={6} xs={12} className='mt-2 mb-2'>
						<h2>Изменение пароля</h2>
						<Input className='mb-2' placeholder={'Старый пароль'}></Input>
						<Input className='mb-2' placeholder={'Новый пароль'}></Input>
						<button className='btn btn-success'>Изменить пароль</button>
					</Col>
				</Row>
			</>
		);
	}
}

function mapStateToProps(state) {
	return {
		main_photo: state.auth.payload
			? state.auth.payload.main_photo
			: notFoundPhoto,
		id: state.auth.payload ? state.auth.payload.id : null,
	};
}

export default connect(mapStateToProps)(Profile);
