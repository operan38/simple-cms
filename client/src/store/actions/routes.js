import httpAPI from '../../axios/http-api';
import {
	FETCH_ROUTES_START,
	FETCH_ROUTES_SUCCESS,
	FETCH_ROUTES_ERROR,
	FETCH_ADD_ROUTE_START,
	FETCH_ADD_ROUTE_SUCCESS,
	FETCH_ADD_ROUTE_ERROR,
	FETCH_DEL_ROUTE_START,
	FETCH_DEL_ROUTE_SUCCESS,
	FETCH_DEL_ROUTE_ERROR,
} from './type';

// GET

export function fetchRoutes() {
	return async (dispath) => {
		dispath(fetchRoutesStart());

		try {
			const response = await httpAPI.post('/routes');
			dispath(fetchRoutesSuccess(response.data));
		} catch (e) {
			dispath(fetchRoutesError(e));
		}
	};
}

export function fetchRoutesStart() {
	return {
		type: FETCH_ROUTES_START,
	};
}

export function fetchRoutesSuccess(customRoutes) {
	return {
		type: FETCH_ROUTES_SUCCESS,
		customRoutes,
	};
}

export function fetchRoutesError(e) {
	return {
		type: FETCH_ROUTES_ERROR,
		error: e,
	};
}

// ADD

export function fetchAddRoute(route) {
	return async (dispath) => {
		dispath(fetchAddRouteStart());

		try {
			const response = await httpAPI.post('/routes/add', route);
			dispath(fetchAddRouteSuccess(response));
			dispath(fetchRoutes());
		} catch (e) {
			dispath(fetchAddRouteError(e));
		}
	};
}

export function fetchAddRouteStart() {
	return {
		type: FETCH_ADD_ROUTE_START,
	};
}

export function fetchAddRouteSuccess(response) {
	return {
		type: FETCH_ADD_ROUTE_SUCCESS,
	};
}

export function fetchAddRouteError(e) {
	return {
		type: FETCH_ADD_ROUTE_ERROR,
		error: e,
	};
}

// DELETE

export function fetchDelRoute(id) {
	return async (dispath) => {
		dispath(fetchDelRouteStart());

		try {
			const response = await httpAPI.post('/routes/del', { id: id });
			dispath(fetchDelRouteSuccess(response));
			dispath(fetchRoutes());
		} catch (e) {
			dispath(fetchDelRouteError(e));
		}
	};
}

export function fetchDelRouteStart() {
	return {
		type: FETCH_DEL_ROUTE_START,
	};
}

export function fetchDelRouteSuccess(response) {
	return {
		type: FETCH_DEL_ROUTE_SUCCESS,
	};
}

export function fetchDelRouteError(e) {
	return {
		type: FETCH_DEL_ROUTE_ERROR,
		error: e,
	};
}
