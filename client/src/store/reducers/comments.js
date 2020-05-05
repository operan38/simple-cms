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
} from '../actions/type';

const initialState = {
	loading: false,
	error: null,
	post: {
		commentsList: [],
	},
};

export default function commentsReducer(state = initialState, action) {
	switch (action.type) {
		case FETCH_COMMENTS_BY_POST_ID_REQUEST:
			return {
				...state,
				loading: true,
				post: { ...state.post },
			};
		case FETCH_COMMENTS_BY_POST_ID_SUCCESS:
			return {
				...state,
				loading: false,
				post: {
					...state.post,
					commentsList: action.commentsList,
				},
			};
		case FETCH_COMMENTS_BY_POST_ID_ERROR:
			return {
				...state,
				error: action.error,
				loading: false,
				post: {
					...state.post,
					commentsList: [],
				},
			};
		case FETCH_DEL_COMMENTS_BY_POST_ID_REQUEST:
			return {
				...state,
				loading: true,
			};
		case FETCH_DEL_COMMENTS_BY_POST_ID_SUCCESS:
			return {
				...state,
				loading: false,
			};
		case FETCH_DEL_COMMENTS_BY_POST_ID_ERROR:
			return {
				...state,
				error: action.error,
			};
		case FETCH_ADD_COMMENT_REQUEST:
			return {
				...state,
				loading: true,
			};
		case FETCH_ADD_COMMENT_SUCCESS:
			return {
				...state,
				loading: false,
			};
		case FETCH_ADD_COMMENT_ERROR:
			return {
				...state,
				loading: false,
				error: action.error,
			};
		case FETCH_DEL_COMMENT_REQUEST:
			return {
				...state,
				loading: true,
			};
		case FETCH_DEL_COMMENT_SUCCESS:
			return {
				...state,
				loading: false,
			};
		case FETCH_DEL_COMMENT_ERROR:
			return {
				...state,
				loading: false,
				error: action.error,
			};
		default:
			return state;
	}
}
