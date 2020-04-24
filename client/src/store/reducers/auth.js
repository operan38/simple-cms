import { AUTH_LOGOUT, AUTH_SUCCESS } from '../actions/type';

const initialState = {
	userId: null,
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
			};
		case AUTH_LOGOUT:
			return {
				...state,
				token: null,
				userId: null,
			};
		default:
			return state;
	}
}
