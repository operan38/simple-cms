import httpAPI from '../../axios/http-api';
import { AUTH_LOGOUT, AUTH_SUCCESS } from './type';

export function auth(login, password) {
	const authData = { login, password };

	return async (dispath) => {
		try {
			const response = await httpAPI.post('/users/auth', authData);
			const data = response.data;

			if (data) {
				localStorage.setItem('token', data.token);
				localStorage.setItem('userId', data.userId);

				dispath(authSuccess(data.token, data.userId));
			}
		} catch (e) {}
	};
}

export function autoLogin() {
	return (dispatch) => {
		const token = localStorage.getItem('token');
		const userId = localStorage.getItem('userId');
		if (!token) {
			dispatch(logout());
		} else {
			dispatch(authSuccess(token, userId));
		}
	};
}

export function authSuccess(token, userId) {
	return {
		type: AUTH_SUCCESS,
		token,
		userId,
	};
}

export function logout() {
	localStorage.removeItem('token');
	localStorage.removeItem('userId');

	return {
		type: AUTH_LOGOUT,
	};
}
