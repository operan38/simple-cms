import httpAPI from '../../axios/http-api';
import {
	FETCH_COMMENTS_BY_POST_ID_REQUEST,
	FETCH_COMMENTS_BY_POST_ID_SUCCESS,
	FETCH_COMMENTS_BY_POST_ID_ERROR,
	FETCH_DEL_COMMENTS_BY_POST_ID_REQUEST,
	FETCH_DEL_COMMENTS_BY_POST_ID_SUCCESS,
	FETCH_DEL_COMMENTS_BY_POST_ID_ERROR,
	FETCH_ADD_COMMENT_REQUEST,
	FETCH_ADD_COMMENT_SUCCESS,
	FETCH_ADD_COMMENT_ERROR,
	FETCH_DEL_COMMENT_REQUEST,
	FETCH_DEL_COMMENT_SUCCESS,
	FETCH_DEL_COMMENT_ERROR,
} from './type';

export function fetchCommentsByPostId(postId) {
	return async (dispath) => {
		dispath(request());

		try {
			const response = await httpAPI.post('/comments/post/' + postId);
			dispath(success(response.data));
		} catch (e) {
			dispath(error(e));
		}
	};

	function request() {
		return { type: FETCH_COMMENTS_BY_POST_ID_REQUEST };
	}
	function success(commentsList) {
		return { type: FETCH_COMMENTS_BY_POST_ID_SUCCESS, commentsList };
	}
	function error(e) {
		return { type: FETCH_COMMENTS_BY_POST_ID_ERROR, error: e.response };
	}
}

// DEL BY POST ID

export function fetchDelCommentsByPostId(id) {
	return async (dispath) => {
		dispath(request());

		try {
			const response = await httpAPI.post('/comments/post/del', { id });
			dispath(success(response.data));
		} catch (e) {
			dispath(error(e));
		}
	};

	function request() {
		return { type: FETCH_DEL_COMMENTS_BY_POST_ID_REQUEST };
	}
	function success(response) {
		return { type: FETCH_DEL_COMMENTS_BY_POST_ID_SUCCESS };
	}
	function error(e) {
		return { type: FETCH_DEL_COMMENTS_BY_POST_ID_ERROR, error: e };
	}
}

// ADD

export function fetchAddComment(comment) {
	return async (dispath) => {
		dispath(request());

		try {
			const response = await httpAPI.post('/comments/add', comment);
			dispath(success(response.data));
		} catch (e) {
			dispath(error(e));
		}
	};

	function request() {
		return { type: FETCH_ADD_COMMENT_REQUEST };
	}
	function success(response) {
		return { FETCH_ADD_COMMENT_SUCCESS };
	}
	function error(e) {
		return { type: FETCH_ADD_COMMENT_ERROR, error: e.response };
	}
}

// DEL

export function fetchDelComment(id) {
	return async (dispath) => {
		dispath(request());

		try {
			const response = await httpAPI.post('/comments/del', { id });
			dispath(success(response));
		} catch (e) {
			dispath(error(e));
		}
	};

	function request() {
		return { type: FETCH_DEL_COMMENT_REQUEST };
	}
	function success(response) {
		return { type: FETCH_DEL_COMMENT_SUCCESS };
	}
	function error(e) {
		return { type: FETCH_DEL_COMMENT_ERROR, error: e.response };
	}
}
