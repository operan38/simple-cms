import { AUTH_LOGOUT, AUTH_SUCCESS, AUTH_ERROR } from '../actions/type';

const initialState = {
	payload: null,
	error: null,
};

export default function authReducer(state = initialState, action) {
	switch (action.type) {
		case AUTH_SUCCESS:
			return {
				...state,
				payload: action.payload,
			};
		case AUTH_ERROR:
			return {
				...state,
				error: action.error,
			};
		case AUTH_LOGOUT:
			return {
				...state,
				payload: null,
			};
		default:
			return state;
	}
}
