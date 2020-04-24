import httpAPI from '../../axios/http-api';
import {
	FETCH_CONTAINERS_START,
	FETCH_CONTAINERS_SUCCESS,
	FETCH_CONTAINERS_ERROR,
} from './type';

// GET

export function fetchContainers() {
	return async (dispath) => {
		dispath(fetchContainersStart());

		try {
			const response = await httpAPI.post('/containers');
			dispath(fetchContainersSuccess(response.data));
		} catch (e) {
			dispath(fetchContainersError(e));
		}
	};
}

export function fetchContainersStart() {
	return {
		type: FETCH_CONTAINERS_START,
	};
}

export function fetchContainersSuccess(containersList) {
	return {
		type: FETCH_CONTAINERS_SUCCESS,
		containersList,
	};
}

export function fetchContainersError(e) {
	return {
		type: FETCH_CONTAINERS_ERROR,
		error: e,
	};
}
