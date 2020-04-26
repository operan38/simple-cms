import httpAPI from '../../axios/http-api';
import {
	FETCH_USERS_START,
	FETCH_USERS_SUCCESS,
	FETCH_USERS_ERROR,
} from './type';

// GET

export function fetchUsers() {
	return async (dispath) => {
		dispath(fetchUsersStart());

		try {
			const response = await httpAPI.post('/users');
			dispath(fetchUsersSuccess(response.data));
		} catch (e) {
			dispath(fetchUsersError(e));
		}
	};
}

export function fetchUsersStart() {
	return {
		type: FETCH_USERS_START,
	};
}

export function fetchUsersSuccess(usersList) {
	return {
		type: FETCH_USERS_SUCCESS,
		usersList,
	};
}

export function fetchUsersError(e) {
	return {
		type: FETCH_USERS_ERROR,
		error: e,
	};
}
