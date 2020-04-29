import {
	SHOW_DEL_MODAL,
	HIDE_DEL_MODAL,
	SHOW_EDIT_MODAL_START,
	SHOW_EDIT_MODAL_SUCCESS,
	SHOW_EDIT_MODAL_ERROR,
	HIDE_EDIT_MODAL,
} from './type';

/*export function showRouteEditModal(id) {
	return async (dispath) => {
		try {
			await dispath(fetchRouteById(id));
			dispath(showEditModal(id)); // show
		} catch (e) {
			dispath(showEditModalError(e));
		}
	};
}*/

// SHOW_EDIT_MODAL

export function showEditModal(id) {
	return async (dispath) => {
		dispath(showEditModalStart());
		try {
			await dispath(showEditModalSuccess(true));
		} catch (e) {
			dispath(showEditModalError(e));
		}
	};
}

export function showEditModalStart() {
	return {
		type: SHOW_EDIT_MODAL_START,
	};
}

export function showEditModalSuccess(show) {
	return {
		type: SHOW_EDIT_MODAL_SUCCESS,
		show,
	};
}

export function showEditModalError(e) {
	return {
		type: SHOW_EDIT_MODAL_ERROR,
		error: e,
	};
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
