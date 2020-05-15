import httpAPI from '../../axios/http-api';
import {
	FETCH_USERS_REQUEST,
	FETCH_USERS_SUCCESS,
	FETCH_USERS_ERROR,
	FETCH_USER_REQUEST,
	FETCH_USER_SUCCESS,
	FETCH_USER_ERROR,
} from './type';

// GET

export function fetchUsers() {
	return async (dispath) => {
		dispath(request());

		try {
			const response = await httpAPI.post('/users');
			console.log(response.data);
			dispath(success(response.data));
		} catch (e) {
			dispath(error(e));
		}
	};

	function request() {
		return { type: FETCH_USERS_REQUEST };
	}
	function success(usersList) {
		return { type: FETCH_USERS_SUCCESS, usersList };
	}
	function error(e) {
		return { type: FETCH_USERS_ERROR, error: e.response };
	}
}

// GET BY ID

export function fetchUserById(id) {
	return async (dispath) => {
		dispath(request());

		try {
			const response = await httpAPI.post('/user/' + id);
			dispath(success(response.data));
		} catch (e) {
			dispath(error(e));
		}
	};

	function request() {
		return { type: FETCH_USER_REQUEST };
	}
	function success(user) {
		return { type: FETCH_USER_SUCCESS, user };
	}
	function error(e) {
		return { type: FETCH_USER_ERROR, error: e.response };
	}
}
