import {
	FETCH_POSTS_START,
	FETCH_POSTS_SUCCESS,
	FETCH_POSTS_ERROR,
} from '../actions/type';

const initialState = {
	postsList: [],
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
			};
		case FETCH_POSTS_ERROR:
			return {
				...state,
				loading: false,
				error: action.error,
			};
		default:
			return state;
	}
}
