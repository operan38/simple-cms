import {
	FETCH_COMMENTS_BY_POST_ID_START,
	FETCH_COMMENTS_BY_POST_ID_SUCCESS,
	FETCH_COMMENTS_BY_POST_ID_ERROR,
	FETCH_ADD_COMMENT_BY_POST_ID_START,
	FETCH_ADD_COMMENT_BY_POST_ID_SUCCESS,
	FETCH_ADD_COMMENT_BY_POST_ID_ERROR,
} from '../actions/type';

const initialState = {
	post: {
		commentsList: [],
		loading: false,
		error: null,
	},
};

export default function commentsReducer(state = initialState, action) {
	switch (action.type) {
		case FETCH_COMMENTS_BY_POST_ID_START:
			return {
				...state,
				post: { ...state.post, loading: true },
			};
		case FETCH_COMMENTS_BY_POST_ID_SUCCESS:
			return {
				...state,
				post: {
					...state.post,
					commentsList: action.commentsList,
					loading: false,
				},
			};
		case FETCH_COMMENTS_BY_POST_ID_ERROR:
			return {
				...state,
				post: {
					...state.post,
					error: action.error,
					loading: false,
					commentsList: [],
				},
			};
		case FETCH_ADD_COMMENT_BY_POST_ID_START:
			return {
				...state,
				post: { ...state.post, loading: true },
			};
		case FETCH_ADD_COMMENT_BY_POST_ID_SUCCESS:
			return {
				...state,
				post: { ...state.post, loading: false },
			};
		case FETCH_ADD_COMMENT_BY_POST_ID_ERROR:
			return {
				...state,
				post: { ...state.post, loading: false, error: action.error },
			};
		default:
			return state;
	}
}
