import {
	FETCH_HEADER_NAV_REQUEST,
	FETCH_HEADER_NAV_SUCCESS,
	FETCH_HEADER_NAV_ERROR,
} from '../actions/type';

const initialState = {
	headerNavsList: [],
	loading: false,
	error: null,
};

export default function headerNavReducer(state = initialState, action) {
	switch (action.type) {
		case FETCH_HEADER_NAV_REQUEST:
			return {
				...state,
				loading: true,
				error: action.error,
			};
		case FETCH_HEADER_NAV_SUCCESS:
			return {
				...state,
				loading: false,
				headerNavsList: action.headerNavsList,
			};
		case FETCH_HEADER_NAV_ERROR:
			return {
				...state,
				loading: false,
				error: action.error,
			};
		default:
			return state;
	}
}
