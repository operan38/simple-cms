import { AUTH_LOGOUT, AUTH_SUCCESS, AUTH_ERROR } from '../actions/type';

const initialState = {
	userId: null,
	userLogin: null,
	error: null,
	token: null,
};

export default function authReducer(state = initialState, action) {
	switch (action.type) {
		case AUTH_SUCCESS:
			return {
				...state,
				token: action.token,
				userId: action.userId,
				userLogin: action.userLogin,
			};
		case AUTH_ERROR:
			return {
				...state,
				error: action.error,
			};
		case AUTH_LOGOUT:
			return {
				...state,
				token: null,
				userId: null,
				userLogin: null,
			};
		default:
			return state;
	}
}
