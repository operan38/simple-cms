import httpAPI from '../../axios/http-api';
import {
	FETCH_UPD_USER_FIO_REQUEST,
	FETCH_UPD_USER_FIO_SUCCESS,
	FETCH_UPD_USER_FIO_ERROR,
	FETCH_UPD_USER_PASSWORD_REQUEST,
	FETCH_UPD_USER_PASSWORD_SUCCESS,
	FETCH_UPD_USER_PASSWORD_ERROR,
	FETCH_UPD_USER_PHOTO_REQUEST,
	FETCH_UPD_USER_PHOTO_SUCCESS,
	FETCH_UPD_USER_PHOTO_ERROR,
} from './type';

export function fetchUpdUserFIO(user) {
	return async (dispath) => {
		dispath(request());

		try {
			const response = await httpAPI.post('/users/changeFIO', user);
			dispath(success(response.data));
		} catch (e) {
			dispath(error(e.response));
		}
	};

	function request() {
		return { type: FETCH_UPD_USER_FIO_REQUEST };
	}
	function success(success) {
		return { type: FETCH_UPD_USER_FIO_SUCCESS, success };
	}
	function error(e) {
		return { type: FETCH_UPD_USER_FIO_ERROR, error: e.response };
	}
}

export function fetchUpdUserPassword(user) {
	return async (dispath) => {
		dispath(request());

		try {
			const response = await httpAPI.post('/users/changePassword', user);
			dispath(success(response.data));
		} catch (e) {
			dispath(error(e.response));
		}
	};

	function request() {
		return { type: FETCH_UPD_USER_PASSWORD_REQUEST };
	}
	function success(success) {
		return { type: FETCH_UPD_USER_PASSWORD_SUCCESS, success };
	}
	function error(e) {
		return { type: FETCH_UPD_USER_PASSWORD_ERROR, error: e.response };
	}
}

export function fetchUpdUserPhoto(user) {
	return async (dispath) => {
		dispath(request());

		try {
			const response = await httpAPI.post('/users/uploadPhoto', user);
			dispath(success(response.data));
		} catch (e) {
			dispath(error(e.response));
		}
	};

	function request() {
		return { type: FETCH_UPD_USER_PHOTO_REQUEST };
	}
	function success(success) {
		return { type: FETCH_UPD_USER_PHOTO_SUCCESS, success };
	}
	function error(e) {
		return { type: FETCH_UPD_USER_PHOTO_ERROR, error: e.response };
	}
}
