import httpAPI from '../../axios/http-api';
import {
	FETCH_POSTS_START,
	FETCH_POSTS_SUCCESS,
	FETCH_POSTS_ERROR,
	FETCH_POST_START,
	FETCH_POST_SUCCESS,
	FETCH_POST_ERROR,
} from './type';

// GET

export function fetchPosts(limit) {
	return async (dispath) => {
		dispath(fetchPostsStart());

		try {
			const responsePostsList = await httpAPI.post('/posts', limit);
			const responsePostsCount = await httpAPI.post('/posts/count');
			const dataPostsList = responsePostsList.data;
			const dataCount = responsePostsCount.data;

			if (dataPostsList && dataCount) {
				dispath(fetchPostsSuccess(dataPostsList, dataCount));
			}
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

export function fetchPostsSuccess(postsList, count) {
	return {
		type: FETCH_POSTS_SUCCESS,
		postsList,
		count,
	};
}

export function fetchPostsError(e) {
	return {
		type: FETCH_POSTS_ERROR,
		error: e,
	};
}

// GET BY id

export function fetchPostById(id) {
	return async (dispath) => {
		dispath(fetchPostStart());

		try {
			const response = await httpAPI.post('/post/' + id);
			dispath(fetchPostSuccess(response.data));
		} catch (e) {
			dispath(fetchPostError(e));
		}
	};
}

export function fetchPostStart() {
	return {
		type: FETCH_POST_START,
	};
}

export function fetchPostSuccess(post) {
	return {
		type: FETCH_POST_SUCCESS,
		post,
	};
}

export function fetchPostError(e) {
	return {
		type: FETCH_POST_ERROR,
		error: e,
	};
}
