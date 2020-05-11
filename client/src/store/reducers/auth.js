import { AUTH_LOGOUT, AUTH_SUCCESS, AUTH_ERROR } from '../actions/type';

const initialState = {
	userId: null,
	payload: null,
	error: null,
};

export default function authReducer(state = initialState, action) {
	switch (action.type) {
		case AUTH_SUCCESS:
			return {
				...state,
				userId: action.userId,
				payload: action.payload,
				error: null,
			};
		case AUTH_ERROR:
			return {
				...state,
				error: action.error,
				payload: null,
				userId: null,
			};
		case AUTH_LOGOUT:
			return {
				...state,
				payload: null,
				userId: null,
			};
		default:
			return state;
	}
}
