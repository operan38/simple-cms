import {
	FETCH_POSTS_START,
	FETCH_POSTS_SUCCESS,
	FETCH_POSTS_ERROR,
	FETCH_POST_START,
	FETCH_POST_SUCCESS,
	FETCH_POST_ERROR,
} from '../actions/type';

const initialState = {
	postsList: [],
	post: null,
	count: null,
	loading: false,
	error: null,
};

export default function postsReducer(state = initialState, action) {
	switch (action.type) {
		case FETCH_POSTS_START:
			return {
				...state,
				loading: true,
			};
		case FETCH_POSTS_SUCCESS:
			return {
				...state,
				loading: false,
				postsList: action.postsList,
				count: action.count,
			};
		case FETCH_POSTS_ERROR:
			return {
				...state,
				loading: false,
				error: action.error,
			};
		case FETCH_POST_START:
			return {
				...state,
				loading: true,
			};
		case FETCH_POST_SUCCESS:
			return {
				...state,
				loading: false,
				post: action.post,
			};
		case FETCH_POST_ERROR:
			return {
				...state,
				loading: false,
				error: action.error,
			};
		default:
			return state;
	}
}
