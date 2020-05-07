import React, { Component } from 'react';
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
						<img src={notFoundPhoto} alt=''></img>
						<FileUpload />
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

export default Profile;
