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
			dispath(success(response, history));
		} catch (e) {
			dispath(error(e));
		}
	};

	function success(response, history) {
		history.push('/auth');
		return {
			type: REGISTER_SUCCESS,
		};
	}
	function error(e) {
		return { type: REGISTER_ERROR, error: e.response };
	}
}
