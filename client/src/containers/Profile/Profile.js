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
						<Input placeholder={'Логин'}></Input>
						<Input placeholder={'Пароль'}></Input>
						<button>Изменить пароль</button>
					</Col>
				</Row>
			</>
		);
	}
}

export default Profile;
