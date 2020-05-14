import httpAPI from '../../axios/http-api';
import {
	FETCH_HEADER_NAV_REQUEST,
	FETCH_HEADER_NAV_SUCCESS,
	FETCH_HEADER_NAV_ERROR,
} from './type';

export function fetchHeaderNav() {
	return async (dispath) => {
		dispath(request());

		try {
			const response = await httpAPI.post('/headerNav');
			dispath(success(response.data));
		} catch (e) {
			dispath(error(e.response));
		}
	};

	function request() {
		return { type: FETCH_HEADER_NAV_REQUEST };
	}
	function success(headerNavsList) {
		return { type: FETCH_HEADER_NAV_SUCCESS, headerNavsList };
	}
	function error(e) {
		return { type: FETCH_HEADER_NAV_ERROR, error: e.response };
	}
}
