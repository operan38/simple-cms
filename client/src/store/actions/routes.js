import httpAPI from '../../axios/http-api';
import {
	FETCH_ROUTES_REQUEST,
	FETCH_ROUTES_SUCCESS,
	FETCH_ROUTES_ERROR,
	FETCH_ROUTE_REQUEST,
	FETCH_ROUTE_SUCCESS,
	FETCH_ROUTE_ERROR,
	FETCH_ADD_ROUTE_REQUEST,
	FETCH_ADD_ROUTE_SUCCESS,
	FETCH_ADD_ROUTE_ERROR,
	FETCH_DEL_ROUTE_REQUEST,
	FETCH_DEL_ROUTE_SUCCESS,
	FETCH_DEL_ROUTE_ERROR,
	FETCH_UPD_ROUTE_REQUEST,
	FETCH_UPD_ROUTE_SUCCESS,
	FETCH_UPD_ROUTE_ERROR,
} from './type';

export function fetchRoutes() {
	return async (dispath) => {
		dispath(request());

		try {
			const response = await httpAPI.post('/routes');
			dispath(success(response.data));
		} catch (e) {
			dispath(error(e.response));
		}
	};

	function request() {
		return { type: FETCH_ROUTES_REQUEST };
	}
	function success(routesList) {
		return { type: FETCH_ROUTES_SUCCESS, routesList };
	}
	function error(e) {
		return { type: FETCH_ROUTES_ERROR, error: e.response };
	}
}

// GET BY ID

export function fetchRouteById(id) {
	return async (dispath) => {
		dispath(request());

		try {
			const response = await httpAPI.post('/route/' + id);
			dispath(success(response.data));
		} catch (e) {
			dispath(error(e));
		}
	};

	function request() {
		return { type: FETCH_ROUTE_REQUEST };
	}
	function success(route) {
		return { type: FETCH_ROUTE_SUCCESS, route };
	}
	function error(e) {
		return { type: FETCH_ROUTE_ERROR, error: e.response };
	}
}

// ADD

export function fetchAddRoute(route) {
	return async (dispath) => {
		dispath(request());

		try {
			const response = await httpAPI.post('/routes/add', route);
			dispath(success(response));
			dispath(fetchRoutes());
		} catch (e) {
			dispath(error(e));
		}
	};

	function request() {
		return { type: FETCH_ADD_ROUTE_REQUEST };
	}
	function success(response) {
		return { type: FETCH_ADD_ROUTE_SUCCESS };
	}
	function error(e) {
		return { type: FETCH_ADD_ROUTE_ERROR, error: e.response };
	}
}

// UPDATE

export function fetchUpdRoute(route) {
	return async (dispath) => {
		dispath(request());

		try {
			const response = await httpAPI.post('/routes/upd', route);
			dispath(success(response));
			dispath(fetchRoutes());
		} catch (e) {
			dispath(error(e));
		}
	};

	function request() {
		return { type: FETCH_UPD_ROUTE_REQUEST };
	}
	function success(response) {
		return { type: FETCH_UPD_ROUTE_SUCCESS };
	}
	function error(e) {
		return { type: FETCH_UPD_ROUTE_ERROR, error: e.response };
	}
}

// DELETE

export function fetchDelRoute(id) {
	return async (dispath) => {
		dispath(request());

		try {
			const response = await httpAPI.post('/routes/del', { id });
			dispath(success(response));
			dispath(fetchRoutes());
		} catch (e) {
			dispath(error(e));
		}
	};

	function request() {
		return { type: FETCH_DEL_ROUTE_REQUEST };
	}
	function success(response) {
		return { type: FETCH_DEL_ROUTE_SUCCESS };
	}
	function error(e) {
		return { type: FETCH_DEL_ROUTE_ERROR, error: e.response };
	}
}
