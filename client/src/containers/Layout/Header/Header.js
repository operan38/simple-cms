import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../../../logo.svg';
import { NavLink, Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import { logout } from '../../../store/actions/auth';
import { fetchHeaderNav } from '../../../store/actions/headerNav';
import { NavDropdown } from 'react-bootstrap';

import HeaderNav from './HeaderNav';

import notFoundPhoto from '../../../assets/profile/notFoundPhoto.png';

class Header extends Component {
	componentDidMount() {
		this.props.fetchHeaderNav();
	}

	render() {
		const userBtn = this.props.isAuthenticated ? (
			<div className='d-flex align-items-center'>
				<div>
					<img
						src={this.props.main_photo ? this.props.main_photo : notFoundPhoto}
						alt=''
						style={{ width: '50px', height: '50px' }}
					></img>
				</div>
				<NavDropdown
					title={
						this.props.isAdmin
							? this.props.userLogin + ' (Администратор)'
							: this.props.userLogin
					}
				>
					<NavDropdown.Item as={Link} to='/my-profile'>
						Профиль
					</NavDropdown.Item>
					<NavDropdown.Item
						as={Link}
						to='/'
						onClick={this.props.logout}
						className='text-danger'
					>
						Выйти
					</NavDropdown.Item>
				</NavDropdown>
			</div>
		) : (
			<div>
				<NavLink className='btn btn-success mr-2' to='/auth'>
					Вход
				</NavLink>
				<NavLink className='btn btn-secondary' to='/reg'>
					Регистрация
				</NavLink>
			</div>
		);

		return (
			<header style={{ boxShadow: '7px 7px 5px rgba(0,0,0,0.1)' }}>
				<Container>
					<Row>
						<Col xs={12} md={2}>
							<div className='d-flex align-items-center'>
								<div>
									<NavLink to='/'>
										<img src={logo} alt=''></img>
									</NavLink>
								</div>
								<div className='pl-2'></div>
							</div>
						</Col>
						<Col xs={12} md={7} className='align-self-center'>
							<HeaderNav {...this.props} />
						</Col>
						<Col xs={12} md={3}>
							<div className='d-flex justify-content-end align-items-center h-100'>
								{userBtn}
							</div>
						</Col>
					</Row>
				</Container>
			</header>
		);
	}
}

function mapStateToProps(state) {
	return {
		isAuthenticated: !!state.auth.payload,
		isAdmin: state.auth.payload ? state.auth.payload.admin : false,
		main_photo: state.auth.payload ? state.auth.payload.main_photo : '',
		userLogin: state.auth.payload ? state.auth.payload.login : '',
		headerNavsList: state.headerNav.headerNavsList,
		headerNavLoading: state.headerNav.loading,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		logout: () => dispatch(logout()),
		fetchHeaderNav: () => dispatch(fetchHeaderNav()),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
