import React from 'react';
import { Row, Col } from 'react-bootstrap';

import ChangeGeneral from './ChangeGeneral';
import ChangePhoto from './ChangePhoto';
import ChangePassword from './ChangePassword';

const Profile = (props) => (
	<>
		<Row className='mt-2'>
			<Col lg={6} xs={12}>
				<ChangeGeneral {...props} />
			</Col>

			<Col lg={6} xs={12}>
				<ChangePhoto {...props} />
			</Col>

			<Col lg={6} xs={12} className='mt-2 mb-2'>
				<ChangePassword {...props} />
			</Col>
		</Row>
	</>
);

export default Profile;
