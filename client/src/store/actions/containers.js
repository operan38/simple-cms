import httpAPI from '../../axios/http-api';
import {
	FETCH_CONTAINERS_REQUEST,
	FETCH_CONTAINERS_SUCCESS,
	FETCH_CONTAINERS_ERROR,
} from './type';

// GET

export function fetchContainers() {
	return async (dispath) => {
		dispath(request());

		try {
			const response = await httpAPI.post('/containers');
			dispath(success(response.data));
		} catch (e) {
			dispath(error(e));
		}
	};

	function request() {
		return { type: FETCH_CONTAINERS_REQUEST };
	}
	function success(containersList) {
		return { type: FETCH_CONTAINERS_SUCCESS, containersList };
	}
	function error(e) {
		return { type: FETCH_CONTAINERS_ERROR, error: e.response };
	}
}
