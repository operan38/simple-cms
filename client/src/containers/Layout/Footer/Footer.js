import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = (props) => (
	<footer
		className='document-footer'
		style={{
			background: '#696969',
			color: '#fff',
		}}
	>
		<Container fluid className='section-container pt-2 pb-2'>
			<Row>
				<Col>© 2020 simple-cms</Col>
			</Row>
		</Container>
	</footer>
);

export default Footer;
