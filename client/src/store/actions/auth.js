import httpAPI from '../../axios/http-api';
import jwtDecode from 'jwt-decode';
import { AUTH_LOGOUT, AUTH_SUCCESS, AUTH_ERROR } from './type';

export function auth(data) {
	const authData = { login: data.login.value, password: data.password.value };

	return async (dispath) => {
		try {
			const response = await httpAPI.post('/users/auth', authData);
			console.log(response);

			if (data) {
				localStorage.setItem('token', response.data.token);
				const decoded = jwtDecode(response.data.token);
				dispath(authSuccess(decoded));
			}
		} catch (e) {
			dispath(authError(e));
		}
	};
}

export function autoLogin() {
	return (dispatch) => {
		const token = localStorage.getItem('token');
		if (!token) {
			dispatch(logout());
		} else {
			const decoded = jwtDecode(token);
			dispatch(authSuccess(decoded));
		}
	};
}

export function authSuccess(payload) {
	return {
		type: AUTH_SUCCESS,
		payload,
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

	return {
		type: AUTH_LOGOUT,
	};
}
