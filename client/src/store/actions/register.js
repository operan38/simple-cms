import httpAPI from '../../axios/http-api';
import { REGISTER_ERROR, REGISTER_SUCCESS } from './type';

export function register(data, history) {
	const registerData = {
		login: data.login.value,
		password: data.password.value,
		surname: data.surname.value,
		firstname: data.firstname.value,
		patronymic: data.patronymic.value,
	};

	return async (dispath) => {
		try {
			const response = await httpAPI.post('/users/register', registerData);
			dispath(registerSuccess(response, history));
		} catch (e) {
			dispath(registerError(e));
		}
	};
}

export function registerSuccess(response, history) {
	history.push('/auth');
	return {
		type: REGISTER_SUCCESS,
	};
}

export function registerError(e) {
	return {
		type: REGISTER_ERROR,
		error: e.response,
	};
}
