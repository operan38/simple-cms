import httpAPI from '../../axios/http-api';
import {
	FETCH_POSTS_START,
	FETCH_POSTS_SUCCESS,
	FETCH_POSTS_ERROR,
} from './type';

// GET

export function fetchPosts(limit) {
	return async (dispath) => {
		dispath(fetchPostsStart());

		try {
			const response = await httpAPI.post('/posts', limit);
			dispath(fetchPostsSuccess(response.data));
		} catch (e) {
			dispath(fetchPostsError(e));
		}
	};
}

export function fetchPostsStart() {
	return {
		type: FETCH_POSTS_START,
	};
}

export function fetchPostsSuccess(postsList) {
	return {
		type: FETCH_POSTS_SUCCESS,
		postsList,
	};
}

export function fetchPostsError(e) {
	return {
		type: FETCH_POSTS_ERROR,
		error: e,
	};
}
