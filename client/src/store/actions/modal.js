import {
	SHOW_DEL_MODAL,
	HIDE_DEL_MODAL,
	SHOW_EDIT_MODAL_REQUEST,
	SHOW_EDIT_MODAL_SUCCESS,
	SHOW_EDIT_MODAL_ERROR,
	HIDE_EDIT_MODAL,
} from './type';

// SHOW_EDIT_MODAL

export function showEditModal() {
	return async (dispath) => {
		dispath(request());
		try {
			await dispath(success(true));
		} catch (e) {
			dispath(error(e));
		}
	};

	function request() {
		return { type: SHOW_EDIT_MODAL_REQUEST };
	}
	function success(show) {
		return { type: SHOW_EDIT_MODAL_SUCCESS, show };
	}
	function error(e) {
		return { SHOW_EDIT_MODAL_ERROR, error: e.response };
	}
}

// HIDE_EDIT_MODAL

export function hideEditModal() {
	return {
		type: HIDE_EDIT_MODAL,
	};
}

// SHOW_DEL_MODAL

export function showDelModal(id) {
	return {
		type: SHOW_DEL_MODAL,
		id,
	};
}

// HIDE_ROUTE_DEL_MODAL

export function hideDelModal() {
	return {
		type: HIDE_DEL_MODAL,
	};
}
