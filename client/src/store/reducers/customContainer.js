import { FETCH_CUSTOM_CONTAINER_START, FETCH_CUSTOM_CONTAINER_SUCCESS, FETCH_CUSTOM_CONTAINER_ERROR } from '../actions/type';

const initalState = {
    list: [],
    loading: false,
    error: null
}

export default function customContainerReducer(state = initalState, action) {
    switch (action.type) {
        case FETCH_CUSTOM_CONTAINER_START:
            return {
                ...state, loading: true
            }
        case FETCH_CUSTOM_CONTAINER_SUCCESS:
            return {
                ...state, loading: false, list: action.list
            }
        case FETCH_CUSTOM_CONTAINER_ERROR:
            return {
                ...state, loading: false, error: action.error
            }
        default:
            return state;
    }
}