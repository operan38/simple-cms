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
} from '../actions/type';

const initialState = {
	routesList: [],
	route: null,
	loading: false,
	error: null,
};

export default function routesReducer(state = initialState, action) {
	switch (action.type) {
		case FETCH_ROUTES_REQUEST:
			return {
				...state,
				loading: true,
			};
		case FETCH_ROUTES_SUCCESS:
			return {
				...state,
				loading: false,
				routesList: action.routesList,
			};
		case FETCH_ROUTES_ERROR:
			return {
				...state,
				loading: false,
				error: action.error,
			};
		case FETCH_ROUTE_REQUEST:
			return {
				...state,
				loading: true,
			};
		case FETCH_ROUTE_SUCCESS:
			return {
				...state,
				loading: false,
				route: action.route,
			};
		case FETCH_ROUTE_ERROR:
			return {
				...state,
				loading: false,
				error: action.error,
			};
		case FETCH_ADD_ROUTE_REQUEST:
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
		case FETCH_UPD_ROUTE_REQUEST:
			return {
				...state,
				loading: true,
			};
		case FETCH_UPD_ROUTE_SUCCESS:
			return {
				...state,
				loading: false,
			};
		case FETCH_UPD_ROUTE_ERROR:
			return {
				...state,
				loading: false,
				error: action.error,
			};
		case FETCH_DEL_ROUTE_REQUEST:
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
