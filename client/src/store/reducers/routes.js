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
	SHOW_ROUTE_DEL_MODAL,
	HIDE_ROUTE_DEL_MODAL,
} from '../actions/type';

const initialState = {
	editModal: {
		show: false,
		loading: false,
		error: null,
	},
	delModal: {
		id: null,
		show: false,
	},
	customRoutes: [],
	route: null,
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
		case FETCH_ROUTE_START:
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
		case FETCH_UPD_ROUTE_START:
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
		case SHOW_ROUTE_EDIT_MODAL_START:
			return {
				...state,
				editModal: { loading: true },
			};
		case SHOW_ROUTE_EDIT_MODAL_SUCCESS:
			return {
				...state,
				editModal: { show: action.show, loading: false },
			};
		case SHOW_ROUTE_EDIT_MODAL_ERROR:
			return {
				...state,
				editModal: { error: action.error, loading: false },
			};
		case HIDE_ROUTE_EDIT_MODAL:
			return {
				...state,
				editModal: { show: false },
			};
		case SHOW_ROUTE_DEL_MODAL:
			return {
				...state,
				delModal: { show: true, id: action.id },
			};
		case HIDE_ROUTE_DEL_MODAL:
			return {
				...state,
				delModal: { show: false, id: null },
			};
		default:
			return state;
	}
}
