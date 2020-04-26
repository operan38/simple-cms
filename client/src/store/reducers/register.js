import { REGISTER_ERROR, REGISTER_SUCCESS } from '../actions/type';

const initialState = {
	error: null,
};

export default function registerReducer(state = initialState, action) {
	switch (action.type) {
		case REGISTER_SUCCESS:
			return {
				...state,
			};
		case REGISTER_ERROR:
			return {
				...state,
				error: action.error,
			};
		default:
			return state;
	}
}
