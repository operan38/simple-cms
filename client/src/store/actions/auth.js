import httpAPI from '../../axios/http-api';
import { AUTH_LOGOUT, AUTH_SUCCESS, AUTH_ERROR } from './type';

export function auth(login, password) {
	const authData = { login, password };

	return async (dispath) => {
		try {
			const response = await httpAPI.post('/users/auth', authData);
			const data = response.data;

			if (data) {
				localStorage.setItem('token', data.token);
				localStorage.setItem('userId', data.userId);
				localStorage.setItem('userLogin', data.userLogin);

				dispath(authSuccess(data.token, data.userId, data.userLogin));
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
		if (!token) {
			dispatch(logout());
		} else {
			dispatch(authSuccess(token, userId, userLogin));
		}
	};
}

export function authSuccess(token, userId, userLogin) {
	return {
		type: AUTH_SUCCESS,
		token,
		userId,
		userLogin,
	};
}

export function authError(e) {
	return {
		type: AUTH_ERROR,
		error: e,
	};
}

export function logout() {
	localStorage.removeItem('token');
	localStorage.removeItem('userId');
	localStorage.removeItem('userLogin');

	return {
		type: AUTH_LOGOUT,
	};
}
