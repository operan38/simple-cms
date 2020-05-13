import httpAPI from '../../axios/http-api';
import {
	FETCH_POSTS_REQUEST,
	FETCH_POSTS_SUCCESS,
	FETCH_POSTS_ERROR,
	FETCH_POST_REQUEST,
	FETCH_POST_SUCCESS,
	FETCH_POST_ERROR,
	FETCH_DEL_POST_REQUEST,
	FETCH_DEL_POST_SUCCESS,
	FETCH_DEL_POST_ERROR,
	FETCH_ADD_POST_REQUEST,
	FETCH_ADD_POST_SUCCESS,
	FETCH_ADD_POST_ERROR,
	FETCH_UPD_POST_REQUEST,
	FETCH_UPD_POST_SUCCESS,
	FETCH_UPD_POST_ERROR,
} from './type';

// GET

export function fetchPosts(limit, offset) {
	return async (dispath) => {
		dispath(request());

		try {
			const responsePostsList = await httpAPI.post('/posts', { limit, offset });
			const responsePostsCount = await httpAPI.post('/posts/count');

			console.log(responsePostsList);
			console.log(responsePostsCount);

			if (responsePostsList && responsePostsCount) {
				dispath(success(responsePostsList.data, responsePostsCount.data));
			}
		} catch (e) {
			dispath(error(e));
		}
	};

	function request() {
		return { type: FETCH_POSTS_REQUEST };
	}
	function success(postsList, count) {
		return { type: FETCH_POSTS_SUCCESS, postsList, count };
	}
	function error(e) {
		return { type: FETCH_POSTS_ERROR, error: e.response };
	}
}

// GET BY ID

export function fetchPostById(id) {
	return async (dispath) => {
		dispath(request());

		try {
			const response = await httpAPI.post('/post/' + id);
			dispath(success(response.data));
		} catch (e) {
			dispath(error(e));
		}
	};

	function request() {
		return { type: FETCH_POST_REQUEST };
	}
	function success(post) {
		return { type: FETCH_POST_SUCCESS, post };
	}
	function error(e) {
		return { type: FETCH_POST_ERROR, error: e.response };
	}
}

// DELETE

export function fetchDelPost(id) {
	return async (dispath) => {
		dispath(request());

		try {
			const response = await httpAPI.post('/posts/del', { id });
			dispath(success(response));
		} catch (e) {
			dispath(error(e));
		}
	};

	function request() {
		return { type: FETCH_DEL_POST_REQUEST };
	}
	function success(response) {
		return { type: FETCH_DEL_POST_SUCCESS };
	}
	function error(e) {
		return { type: FETCH_DEL_POST_ERROR, error: e.response };
	}
}

// ADD

export function fetchAddPost(post) {
	return async (dispath) => {
		dispath(request());

		try {
			const response = await httpAPI.post('/posts/add', post);
			dispath(success(response));
		} catch (e) {
			dispath(error(e));
		}
	};

	function request() {
		return { type: FETCH_ADD_POST_REQUEST };
	}
	function success(response) {
		return { type: FETCH_ADD_POST_SUCCESS };
	}
	function error(e) {
		return { type: FETCH_ADD_POST_ERROR, error: e.response };
	}
}

// UPD

export function fetchUpdPost(post) {
	return async (dispath) => {
		dispath(request());

		try {
			const response = await httpAPI.post('/posts/upd', post);
			dispath(success(response));
		} catch (e) {
			dispath(error(e));
		}
	};

	function request() {
		return { type: FETCH_UPD_POST_REQUEST };
	}
	function success(response) {
		return { type: FETCH_UPD_POST_SUCCESS };
	}
	function error(e) {
		return { type: FETCH_UPD_POST_ERROR, error: e.response };
	}
}
