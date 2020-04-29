import httpAPI from '../../axios/http-api';
import {
	FETCH_ROUTES_START,
	FETCH_ROUTES_SUCCESS,
	FETCH_ROUTES_ERROR,
	FETCH_ROUTE_START,
	FETCH_ROUTE_SUCCESS,
	FETCH_ROUTE_ERROR,
	FETCH_ADD_ROUTE_START,
	FETCH_ADD_ROUTE_SUCCESS,
	FETCH_ADD_ROUTE_ERROR,
	FETCH_DEL_ROUTE_START,
	FETCH_DEL_ROUTE_SUCCESS,
	FETCH_DEL_ROUTE_ERROR,
	FETCH_UPD_ROUTE_START,
	FETCH_UPD_ROUTE_SUCCESS,
	FETCH_UPD_ROUTE_ERROR,
	SHOW_ROUTE_EDIT_MODAL_START,
	SHOW_ROUTE_EDIT_MODAL_SUCCESS,
	SHOW_ROUTE_EDIT_MODAL_ERROR,
	HIDE_ROUTE_EDIT_MODAL,
} from './type';

// GET ALL

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

// GET BY id

export function fetchRouteById(id) {
	return async (dispath) => {
		dispath(fetchRouteStart());

		try {
			const response = await httpAPI.post('/route/' + id);
			dispath(fetchRouteSuccess(response.data));
		} catch (e) {
			dispath(fetchRouteError(e));
		}
	};
}

export function fetchRouteStart() {
	return {
		type: FETCH_ROUTE_START,
	};
}

export function fetchRouteSuccess(route) {
	return {
		type: FETCH_ROUTE_SUCCESS,
		route,
	};
}

export function fetchRouteError(e) {
	return {
		type: FETCH_ROUTE_ERROR,
		error: e,
	};
}

// SHOW_ROUTE_EDIT_MODAL

export function showRouteEditModal(id) {
	return async (dispath) => {
		dispath(showRouteEditModalStart());

		try {
			await dispath(fetchRouteById(id));
			await dispath(showRouteEditModalSuccess(true));
		} catch (e) {
			dispath(showRouteEditModalError(e));
		}
	};
}

export function showRouteEditModalStart() {
	return {
		type: SHOW_ROUTE_EDIT_MODAL_START,
	};
}

export function showRouteEditModalSuccess(show) {
	return {
		type: SHOW_ROUTE_EDIT_MODAL_SUCCESS,
		show,
	};
}

export function showRouteEditModalError(e) {
	return {
		type: SHOW_ROUTE_EDIT_MODAL_ERROR,
		error: e,
	};
}

// HIDE_ROUTE_EDIT_MODAL

export function hideRouteEditModal() {
	return {
		type: HIDE_ROUTE_EDIT_MODAL,
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

// UPDATE

export function fetchUpdRoute(route) {
	return async (dispath) => {
		dispath(fetchUpdRouteStart());

		try {
			const response = await httpAPI.post('/routes/upd', route);
			dispath(fetchUpdRouteSuccess(response));
			dispath(fetchRoutes());
		} catch (e) {
			dispath(fetchUpdRouteError(e));
		}
	};
}

export function fetchUpdRouteStart() {
	return {
		type: FETCH_UPD_ROUTE_START,
	};
}

export function fetchUpdRouteSuccess(response) {
	return {
		type: FETCH_UPD_ROUTE_SUCCESS,
	};
}

export function fetchUpdRouteError(e) {
	return {
		type: FETCH_UPD_ROUTE_ERROR,
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
