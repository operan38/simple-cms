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
				const userId = response.data.userId;
				localStorage.setItem('token', response.data.token);
				localStorage.setItem('userId', response.data.userId);
				const decoded = jwtDecode(response.data.token);
				dispath(authSuccess(decoded, userId));
			}
		} catch (e) {
			dispath(authError(e));
		}
	};
}

export function autoLogin() {
	return async (dispatch) => {
		try {
			const token = localStorage.getItem('token');
			const userId = localStorage.getItem('userId');

			if (token && userId) {
				const response = await httpAPI.post('/users/checkoutToken', {
					token,
					userId,
				});

				if (response.data) {
					const decoded = jwtDecode(response.data.token);
					dispatch(authSuccess(decoded, response.data.userId));
				} else {
					dispatch(logout());
				}
			} else {
				return {};
			}
		} catch (e) {
			dispatch(authError(e));
		}
	};
}

export function authError(e) {
	localStorage.removeItem('token');
	localStorage.removeItem('userId');

	return {
		type: AUTH_ERROR,
		error: e.response,
	};
}

export function authSuccess(payload, userId) {
	return {
		type: AUTH_SUCCESS,
		payload,
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
