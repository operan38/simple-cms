import {
	FETCH_USERS_START,
	FETCH_USERS_SUCCESS,
	FETCH_USERS_ERROR,
} from '../actions/type';

const initialState = {
	usersList: [],
	loading: false,
	error: null,
};

export default function usersReducer(state = initialState, action) {
	switch (action.type) {
		case FETCH_USERS_START:
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
		default:
			return state;
	}
}
