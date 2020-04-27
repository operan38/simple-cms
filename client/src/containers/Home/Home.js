import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Home extends Component {
	render() {
		return (
			<div>
				<h1>
					<i className='fa fa-home' aria-hidden='true'></i>Домашняя страница
				</h1>
				<p>
					<NavLink to='/admin/routes'>Cписок маршрутов</NavLink>
				</p>
				<p>
					<NavLink to='/admin/users'>Cписок пользователей</NavLink>
				</p>
				<p>
					<NavLink to='/posts'>Cписок поcтов</NavLink>
				</p>
			</div>
		);
	}
}

export default Home;
