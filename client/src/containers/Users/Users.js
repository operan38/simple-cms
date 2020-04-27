import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchUsers } from '../../store/actions/users';

import Loader from '../../components/UI/Loader/Loader';

class Users extends Component {
	componentDidMount() {
		this.props.fetchUsers();
	}

	renderRoutes() {
		return this.props.usersList.map((user, index) => {
			return (
				<div key={index} className='mt-2 mb-2 border p-2'>
					<b>Логин: </b> {user.login}
					<b> Фамилия: </b> {user.surname}
					<b> Имя: </b> {user.firstname}
					<b> Отчество: </b> {user.patronymic}
				</div>
			);
		});
	}

	render() {
		return (
			<div>
				<h1>Список пользователей</h1>
				{this.props.loading && this.props.usersList.length === 0 ? (
					<Loader />
				) : (
					this.renderRoutes()
				)}
				{!this.props.loading && this.props.usersList.length === 0 ? (
					<div className='w-100 text-center'>Список пуст</div>
				) : (
					''
				)}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		usersList: state.users.usersList,
		loading: state.users.loading,
		error: state.users.error,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchUsers: () => dispatch(fetchUsers()),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
