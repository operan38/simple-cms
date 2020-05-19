import React from 'react';
import { connect } from 'react-redux';

let mapStateToProps = (state) => ({
	isAuth: !!state.auth.payload,
	isAdmin: state.auth.payload ? state.auth.payload.admin : false,
});

export const withAuth = (Component) => {
	class RedirectComponent extends React.Component {
		render() {
			if (!this.props.isAuth) {
				return (
					<p className='text-center'>
						Для просмотра содержимого необходимо авторизоватся
					</p>
				);
			}

			return <Component {...this.props} />;
		}
	}

	let ConnectedWithAuthComponent = connect(mapStateToProps)(RedirectComponent);

	return ConnectedWithAuthComponent;
};

export const withAdmin = (Component) => {
	class RedirectComponent extends React.Component {
		render() {
			if (!this.props.isAdmin) {
				return <p className='text-center'>Доступ запрещен</p>;
			} else if (!this.props.isAuth) {
				return (
					<p className='text-center'>
						Для просмотра содержимого необходимо авторизоватся
					</p>
				);
			}

			return <Component {...this.props} />;
		}
	}

	let ConnectedWithAdminComponent = connect(mapStateToProps)(RedirectComponent);

	return ConnectedWithAdminComponent;
};
