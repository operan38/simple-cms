import httpAPI from '../../axios/http-api';
import {
	FETCH_COMMENTS_BY_POST_ID_START,
	FETCH_COMMENTS_BY_POST_ID_SUCCESS,
	FETCH_COMMENTS_BY_POST_ID_ERROR,
	FETCH_ADD_COMMENT_BY_POST_ID_START,
	FETCH_ADD_COMMENT_BY_POST_ID_SUCCESS,
	FETCH_ADD_COMMENT_BY_POST_ID_ERROR,
} from './type';

export function fetchCommentsByPostId(postId) {
	return async (dispath) => {
		dispath(fetchCommentsByPostIdStart());

		try {
			const response = await httpAPI.post('/comments/post/' + postId);
			dispath(fetchCommentsByPostIdSuccess(response.data));
		} catch (e) {
			dispath(fetchCommentsByPostIdError(e));
		}
	};
}

export function fetchCommentsByPostIdStart() {
	return {
		type: FETCH_COMMENTS_BY_POST_ID_START,
	};
}

export function fetchCommentsByPostIdSuccess(commentsList) {
	return {
		type: FETCH_COMMENTS_BY_POST_ID_SUCCESS,
		commentsList,
	};
}

export function fetchCommentsByPostIdError(e) {
	return {
		type: FETCH_COMMENTS_BY_POST_ID_ERROR,
		error: e,
	};
}

// ADD
export function fetchAddCommentByPostId(comment) {
	return async (dispath) => {
		dispath(fetchAddCommentByPostIdStart());

		try {
			const response = await httpAPI.post('/comments/add', comment);
			dispath(fetchAddCommentByPostIdSuccess(response.data));
		} catch (e) {
			dispath(fetchAddCommentByPostIdError(e));
		}
	};
}

export function fetchAddCommentByPostIdStart() {
	return {
		type: FETCH_ADD_COMMENT_BY_POST_ID_START,
	};
}

export function fetchAddCommentByPostIdSuccess(response) {
	return {
		type: FETCH_ADD_COMMENT_BY_POST_ID_SUCCESS,
	};
}

export function fetchAddCommentByPostIdError(e) {
	return {
		type: FETCH_ADD_COMMENT_BY_POST_ID_ERROR,
		error: e,
	};
}
