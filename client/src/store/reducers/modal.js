import {
	SHOW_DEL_MODAL,
	HIDE_DEL_MODAL,
	SHOW_EDIT_MODAL_START,
	SHOW_EDIT_MODAL_SUCCESS,
	SHOW_EDIT_MODAL_ERROR,
	HIDE_EDIT_MODAL,
} from '../actions/type';

const initialState = {
	editModal: {
		show: false,
		loading: false,
		error: null,
	},
	delModal: {
		id: null,
		show: false,
	},
};

export default function modalReducer(state = initialState, action) {
	switch (action.type) {
		case SHOW_EDIT_MODAL_START:
			return {
				...state,
				editModal: { ...state.editModal, loading: true },
			};
		case SHOW_EDIT_MODAL_SUCCESS:
			return {
				...state,
				editModal: { ...state.editModal, show: action.show, loading: false },
			};
		case SHOW_EDIT_MODAL_ERROR:
			return {
				...state,
				editModal: { ...state.editModal, error: action.error, loading: false },
			};
		case HIDE_EDIT_MODAL:
			return {
				...state,
				editModal: { ...state.editModal, show: false },
			};
		case SHOW_DEL_MODAL:
			return {
				...state,
				delModal: { ...state.delModal, show: true, id: action.id },
			};
		case HIDE_DEL_MODAL:
			return {
				...state,
				delModal: { ...state.delModal, show: false, id: null },
			};
		default:
			return state;
	}
}
