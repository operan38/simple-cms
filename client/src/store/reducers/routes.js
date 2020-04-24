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
} from '../actions/type';

const initialState = {
	customRoutes: [],
	loading: false,
	error: null,
};

export default function routesReducer(state = initialState, action) {
	switch (action.type) {
		case FETCH_ROUTES_START:
			return {
				...state,
				loading: true,
			};
		case FETCH_ROUTES_SUCCESS:
			return {
				...state,
				loading: false,
				customRoutes: action.customRoutes,
			};
		case FETCH_ROUTES_ERROR:
			return {
				...state,
				loading: false,
				error: action.error,
			};
		case FETCH_ADD_ROUTE_START:
			return {
				...state,
				loading: true,
			};
		case FETCH_ADD_ROUTE_SUCCESS:
			return {
				...state,
				loading: false,
			};
		case FETCH_ADD_ROUTE_ERROR:
			return {
				...state,
				loading: false,
				error: action.error,
			};
		case FETCH_DEL_ROUTE_START:
			return {
				...state,
				loading: true,
			};
		case FETCH_DEL_ROUTE_SUCCESS:
			return {
				...state,
				loading: false,
			};
		case FETCH_DEL_ROUTE_ERROR:
			return {
				...state,
				loading: false,
				error: action.error,
			};
		default:
			return state;
	}
}
