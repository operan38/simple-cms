import httpCustom from '../../axios/http-custom';
import {
	FETCH_CUSTOM_CONTAINER_REQUEST,
	FETCH_CUSTOM_CONTAINER_SUCCESS,
	FETCH_CUSTOM_CONTAINER_ERROR,
} from './type';

// GET

export function fetchCustomContainerByPath(path) {
	return async (dispath) => {
		dispath(request());

		try {
			const response = await httpCustom.post(path);
			dispath(success(response.data));
		} catch (e) {
			dispath(error(e));
		}
	};

	function request() {
		return { type: FETCH_CUSTOM_CONTAINER_REQUEST };
	}
	function success(list) {
		return { type: FETCH_CUSTOM_CONTAINER_SUCCESS, list };
	}
	function error(e) {
		return { type: FETCH_CUSTOM_CONTAINER_ERROR, error: e.response };
	}
}
