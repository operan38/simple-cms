import {
	FETCH_USERS_REQUEST,
	FETCH_USERS_SUCCESS,
	FETCH_USERS_ERROR,
	FETCH_USER_REQUEST,
	FETCH_USER_SUCCESS,
	FETCH_USER_ERROR,
} from '../actions/type';

const initialState = {
	user: null,
	usersList: [],
	loading: false,
	error: null,
};

export default function usersReducer(state = initialState, action) {
	switch (action.type) {
		case FETCH_USERS_REQUEST:
			return {
				...state,
				loading: true,
			};
		case FETCH_USERS_SUCCESS:
			return {
				...state,
				loading: false,
				usersList: action.usersList,
			};
		case FETCH_USERS_ERROR:
			return {
				...state,
				loading: false,
				error: action.error,
			};
		case FETCH_USER_REQUEST:
			return {
				...state,
				loading: true,
			};
		case FETCH_USER_SUCCESS:
			return {
				...state,
				loading: false,
				user: action.user,
			};
		case FETCH_USER_ERROR:
			return {
				...state,
				loading: false,
				error: action.error,
			};
		default:
			return state;
	}
}
