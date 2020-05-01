import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../../../logo.svg';
import { NavLink, Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import { logout } from '../../../store/actions/auth';

class Header extends Component {
	render() {
		const userBtn = this.props.isAuthenticated ? (
			<div className='d-flex align-items-center'>
				<h4 className='mb-1 mr-2'>
					<i className='fa fa-user-circle mr-2' aria-hidden='true'></i>
					{this.props.userLogin}
				</h4>
				<Link className='btn btn-secondary mr-2' to='/profile'>
					Личный кабинет
				</Link>
				<Link
					className='btn btn-danger mr-2'
					to='/'
					onClick={this.props.logout}
				>
					Выйти
				</Link>
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
						<Col xs={4}>
							<div className='d-flex align-items-center'>
								<div>
									<NavLink to='/'>
										<img src={logo} alt=''></img>
									</NavLink>
								</div>
								<div className='pl-2'>
									<h4>simple-cms</h4>
								</div>
							</div>
						</Col>
						<Col xs={4}></Col>
						<Col xs={4}>
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
		isAuthenticated: !!state.auth.token,
		userLogin: state.auth.userLogin,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		logout: () => dispatch(logout()),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
