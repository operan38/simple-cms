import httpAPI from '../../axios/http-api';
import {
	FETCH_COMMENTS_BY_POST_ID_START,
	FETCH_COMMENTS_BY_POST_ID_SUCCESS,
	FETCH_COMMENTS_BY_POST_ID_ERROR,
} from './type';

export function fetchCommentsByPostId(id) {
	return async (dispath) => {
		dispath(fetchCommentsByPostIdStart());

		try {
			const response = await httpAPI.post('/comments/post/' + id);
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
