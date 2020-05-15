import {
	FETCH_UPD_USER_FIO_REQUEST,
	FETCH_UPD_USER_FIO_SUCCESS,
	FETCH_UPD_USER_FIO_ERROR,
	FETCH_UPD_USER_PASSWORD_REQUEST,
	FETCH_UPD_USER_PASSWORD_SUCCESS,
	FETCH_UPD_USER_PASSWORD_ERROR,
	FETCH_UPD_USER_PHOTO_REQUEST,
	FETCH_UPD_USER_PHOTO_SUCCESS,
	FETCH_UPD_USER_PHOTO_ERROR,
} from '../actions/type';

const initialState = {
	loading: false,
	formGeneral: {
		error: null,
		success: null,
	},
	formPassword: {
		error: null,
		success: null,
	},
	formPhoto: {
		error: null,
		success: null,
	},
};

export default function profileReducer(state = initialState, action) {
	switch (action.type) {
		case FETCH_UPD_USER_FIO_REQUEST:
			return {
				...state,
				formGeneral: { ...state.formGeneral, loading: true, success: null },
			};
		case FETCH_UPD_USER_FIO_SUCCESS:
			return {
				...state,
				formGeneral: {
					...state.formGeneral,
					loading: false,
					success: action.success,
				},
			};
		case FETCH_UPD_USER_FIO_ERROR:
			return {
				...state,
				formGeneral: {
					...state.formGeneral,
					loading: false,
					error: action.error,
				},
			};
		case FETCH_UPD_USER_PASSWORD_REQUEST:
			return {
				...state,
			};
		case FETCH_UPD_USER_PASSWORD_SUCCESS:
			return {
				...state,
			};
		case FETCH_UPD_USER_PASSWORD_ERROR:
			return {
				...state,
			};
		case FETCH_UPD_USER_PHOTO_REQUEST:
			return {
				...state,
			};
		case FETCH_UPD_USER_PHOTO_SUCCESS:
			return {
				...state,
			};
		case FETCH_UPD_USER_PHOTO_ERROR:
			return {
				...state,
			};
		default:
			return state;
	}
}
