import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

const HeaderNav = (props) => {
	const renderNavs = () => {
		return props.headerNavsList.map((nav, index) => {
			return (
				<Col key={index} xs={12} lg={4}>
					<Nav.Link key={index} as={NavLink} to={nav.path}>
						{nav.title}
					</Nav.Link>
				</Col>
			);
		});
	};

	return (
		<Row className='text-center'>
			{!props.headerNavLoading && props.headerNavsList.length !== 0
				? renderNavs()
				: ''}
		</Row>
	);
};

export default HeaderNav;
