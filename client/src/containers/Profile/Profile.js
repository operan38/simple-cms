import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

import Input from '../../components/UI/Input/Input';

class Profile extends Component {
	render() {
		return (
			<>
				<Row className='mt-2'>
					<Col xs={6}>
						<img src={'/assets/NotFoundPhoto.jpg'} alt=''></img>
						<Input className='mb-2' placeholder={'Логин'}></Input>
						<Input className='mb-2' placeholder={'Пароль'}></Input>
						<button className='btn btn-success'>Изменить пароль</button>
					</Col>
				</Row>
			</>
		);
	}
}

export default Profile;
