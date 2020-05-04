import httpAPI from '../../axios/http-api';
import { AUTH_LOGOUT, AUTH_SUCCESS, AUTH_ERROR } from './type';

export function auth(data) {
	const authData = { login: data.login.value, password: data.password.value };

	return async (dispath) => {
		try {
			const response = await httpAPI.post('/users/auth', authData);
			const data = response.data;

			if (data) {
				localStorage.setItem('token', data.token);
				localStorage.setItem('userId', data.userId);
				localStorage.setItem('userLogin', data.userLogin);
				localStorage.setItem('userIsAdmin', data.userIsAdmin);

				dispath(
					authSuccess(data.token, data.userId, data.userLogin, data.userIsAdmin)
				);
			}
		} catch (e) {
			dispath(authError(e));
		}
	};
}

export function autoLogin() {
	return (dispatch) => {
		const token = localStorage.getItem('token');
		const userId = localStorage.getItem('userId');
		const userLogin = localStorage.getItem('userLogin');
		const userIsAdmin = localStorage.getItem('userIsAdmin');
		if (!token) {
			dispatch(logout());
		} else {
			dispatch(authSuccess(token, userId, userLogin, userIsAdmin));
		}
	};
}

export function authSuccess(token, userId, userLogin, userIsAdmin) {
	return {
		type: AUTH_SUCCESS,
		token,
		userId,
		userLogin,
		userIsAdmin,
	};
}

export function authError(e) {
	return {
		type: AUTH_ERROR,
		error: e.response,
	};
}

export function logout() {
	localStorage.removeItem('token');
	localStorage.removeItem('userId');
	localStorage.removeItem('userLogin');
	localStorage.removeItem('userIsAdmin');

	return {
		type: AUTH_LOGOUT,
	};
}
