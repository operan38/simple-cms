import {
	FETCH_CONTAINERS_REQUEST,
	FETCH_CONTAINERS_SUCCESS,
	FETCH_CONTAINERS_ERROR,
} from '../actions/type';

const initialState = {
	containersList: [],
	loading: false,
	error: null,
};

export default function containersReducer(state = initialState, action) {
	switch (action.type) {
		case FETCH_CONTAINERS_REQUEST:
			return {
				...state,
				loading: true,
			};
		case FETCH_CONTAINERS_SUCCESS:
			return {
				...state,
				loading: false,
				containersList: action.containersList,
			};
		case FETCH_CONTAINERS_ERROR:
			return {
				...state,
				loading: false,
				error: action.error,
			};
		default:
			return state;
	}
}
